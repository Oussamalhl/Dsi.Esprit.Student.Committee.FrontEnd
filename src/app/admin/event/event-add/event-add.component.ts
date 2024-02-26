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
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  e: event = new event();
  clubs:string[]=[];
  motives = ['EDUCATION', 'LEGAL', 'CHARITY', 'SOCIAL', 'HEALTH', 'COMMUNITY', 'EMPLOYMENT', 'OTHER'];
  status = ['STARTED', 'CANCELLED', 'ONGOING', 'ENDED'];
  type = ['INPERSON', 'VIRTUAL'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  tagCtrl = new FormControl();
  clubCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  filteredClubs: Observable<string[]>;
  selectedTags: string[] = [];
  selectedClubs: string[] = [];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })

  constructor(private ES: EventService, private _Activatedroute: ActivatedRoute, private _router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filterTags(tag) : this.tags.slice())),
    );
    this.filteredClubs = this.clubCtrl.valueChanges.pipe(
      startWith(null),
      map((club: string | null) => (club ? this._filterClubs(club) : this.clubs.slice())),
    );
  }

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('clubInput') clubInput!: ElementRef<HTMLInputElement>;
  addEvent(e: event) {

    e.tags = this.selectedTags;
    if (this.ngForm.valid) {
      this.ES.AddEvent(e).subscribe(event => {
        this.ES.addClubEvent(event.id,this.selectedClubs).subscribe(res =>{
          console.log(event.name + "Clubs has been added");
        })
        console.log(e + "Has been added");
      })
    }
    setTimeout(() => this._router.navigateByUrl("admin/events"), 1000);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedTags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
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

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  selectedClub(event: MatAutocompleteSelectedEvent): void {
    this.selectedClubs.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.clubCtrl.setValue(null);
  }

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(t => t.toLowerCase().includes(filterValue));
  }
  private _filterClubs(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clubs.filter(t => t.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.ES.GetTags().subscribe(res => {
      console.log(res);
      this.tags = res;
    })
    this.ES.GetClubs().subscribe(res=>{
      console.log(res);
      this.clubs=res;
      }
    )

  }


}
