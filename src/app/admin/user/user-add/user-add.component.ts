import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/User";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../_services/user.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  u: User = new User();
  role: Role[]=[]
  sexe=['Homme','Femme'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roles:string[]=[];
  tagCtrl= new FormControl();
  filteredRoles:Observable<string[]>;
  selectedRoles:string[]=[];
  ngForm=new FormGroup({
    type: new FormControl(null)
  })

  constructor(private US: UserService, private _Activatedroute: ActivatedRoute, private _router: Router) {
    this.filteredRoles = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.roles.slice())),
    );
  }
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement> | undefined;

  addUser(u:User) {
    let role : Role[]=[]
    // u.roles.forEach(e=> this.selectedRoles.forEach(t=>e.name=t))
    // this.selectedRoles.forEach(e=>
    //   role.name=e,
    //  u.roles.push(role))
    this.selectedRoles.forEach(e=>role.push(new Role(e)))
    u.roles=role;
    console.log(u.roles);
    if (this.ngForm.valid){
      this.US.AddUser(u).subscribe(res=>{
        console.log(u + "Has been added");
      })
      setTimeout(() => this._router.navigateByUrl("admin/users"),1000);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedRoles.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.selectedRoles.indexOf(tag);

    if (index >= 0) {
      this.selectedRoles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedRoles.push(event.option.viewValue);
    //this.roleInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.roles.filter(t => t.toLowerCase().includes(filterValue));
  }



  ngOnInit(): void {
    this.roles=['ROLE_ADMIN','ROLE_USER','ROLE_MODERATOR'];

  }


}