import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../_services/reclamation.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-reclamation-add',
  templateUrl: './reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.scss']
})
export class ReclamationAddComponent implements OnInit {

  isLoading = false;
  isSending = false;
  sent = false;

  r: Reclamation = new Reclamation();
  selectedType!: string
  status = ['OPEN', 'CLOSED'];
  type = ['CLUB', 'EVENT', 'OTHER'];
  targets!: string[]
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })
  users: string[] = [];
  userCtrl = new FormControl();
  filteredUsers!: Observable<string[]>;
  selectedUsers: string[] = [];

  constructor(private RS: ReclamationService, private _Activatedroute: ActivatedRoute, private _router: Router, private dialog: MatDialog) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filterUsers(user) : this.users.slice())),
    );
  }

  @ViewChild('dialogRef', {static: true}) dialogRef!: TemplateRef<any>;
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  openDialog() {
    let dialog = this.dialog.open(this.dialogRef);
  }

  addReclamation(r: Reclamation) {
    this.isSending = true;
    let dialog = this.dialog.open(this.dialogRef);

    if (this.ngForm.valid) {
      this.selectedUsers.forEach(u => {
        if(r.type=='OTHER')
          r.target='OTHER'
          this.RS.AddReclamationAdmin(r, u).subscribe(res => {

              console.log(res);
              this.isSending = false;
              this.sent = true;
              dialog.addPanelClass('success-dialog');
            },
            (err) => {
              console.log(err);
              this.isSending = false;
              this.sent = false;
              dialog.addPanelClass('fail-dialog')
            }
          )
        }
      )
      // this.RS.AddReclamationAdmin(r,username).subscribe(res => {
      //
      //     console.log(res);
      //     this.isSending = false;
      //     this.sent = true;
      //     dialog.addPanelClass('success-dialog');
      //   },
      //   (err) => {
      //     console.log(err);
      //     this.isSending = false;
      //     this.sent = false;
      //     dialog.addPanelClass('fail-dialog')
      //   }
      // )
    }
    setTimeout(() => this._router.navigateByUrl("admin/reclamations"), 1000);
  }

  getTargets(type: string) {
    console.log("type: " + type);
    this.RS.GetReclamationTargets(type).subscribe(e => {
      this.targets = []
      this.targets = e
      console.log("this type: " + e);

      //e.forEach(t=>console.log("targets: "+t))
      //console.log("targets: "+e);

    })
    //return this.targets

  }

  addUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedUsers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }


  removeUser(user: string): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selectedUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filterUsers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(u => u.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    this.RS.GetUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

}
