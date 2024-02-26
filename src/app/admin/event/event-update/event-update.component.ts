import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {event} from "../../../models/event";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {EventService} from "../../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.scss']
})
export class EventUpdateComponent implements OnInit {

  e: event = new event();
  id!:number;
  motives=['EDUCATION', 'LEGAL', 'CHARITY', 'SOCIAL', 'HEALTH', 'COMMUNITY', 'EMPLOYMENT', 'OTHER'];
  status=['OPEN', 'CLOSED', 'CANCELLED','ONGOING'];
  type=['INPERSON', 'VIRTUAL'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags:string[]=[];
  tagCtrl= new FormControl();
  clubCtrl = new FormControl();
  filteredTags:Observable<string[]>;
  filteredClubs: Observable<string[]>;
  selectedClubs: string[] = [];
  clubs:string[]=[];

  selectedTags:string[]=[];
  ngForm=new FormGroup({
    type: new FormControl(null)
  })

  constructor(private ES: EventService, private _Activatedroute: ActivatedRoute, private _router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tags.slice())),
    );
    this.filteredClubs = this.clubCtrl.valueChanges.pipe(
      startWith(null),
      map((club: string | null) => (club ? this._filterClubs(club) : this.clubs.slice())),
    );
  }
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('clubInput') clubInput!: ElementRef<HTMLInputElement>;

  UpdateEvent(e:event) {

    e.tags=this.selectedTags;
    console.log(e.type);
    if (this.ngForm.valid){
      this.ES.addClubEvent(this.id,this.selectedClubs).subscribe(res=>{
        console.log(e + "Clubs has been updated");
      })
      this.ES.updateEvent(e).subscribe(res=>{
        console.log(e + "Has been updated");
      })
    }

    setTimeout(() => this.reroute(), 1000);

  }

  reroute(){
    this._router.navigateByUrl("admin/events");
  }

  reset(){
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.ES.GetEvent(this.id).subscribe(res => {
        console.log(res);
        this.e = res;
        this.selectedTags=this.e.tags;
      });
      this.ES.GetEventClubs(this.id).subscribe(res=>{
        this.selectedClubs=res
      })
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedTags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(t => t.toLowerCase().includes(filterValue));
  }
  addClub(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedClubs.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.clubCtrl.setValue(null);
  }
  selectedClub(event: MatAutocompleteSelectedEvent): void {
    this.selectedClubs.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.clubCtrl.setValue(null);
  }
  private _filterClubs(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clubs.filter(t => t.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    this.ES.GetTags().subscribe(res=>{
      console.log(res);
      this.tags=res;
    })
    this.ES.GetClubs().subscribe(res=>{
      console.log(res);
      this.clubs=res;
    })
    this.reset()

    }

}
