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
  motives = ['EDUCATION', 'LEGAL', 'CHARITY', 'SOCIAL', 'HEALTH', 'COMMUNITY', 'EMPLOYMENT', 'OTHER'];
  status = ['STARTED', 'CANCELLED', 'ONGOING', 'ENDED'];
  type = ['INPERSON', 'VIRTUAL'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  selectedTags: string[] = [];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })

  constructor(private ES: EventService, private _Activatedroute: ActivatedRoute, private _router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tags.slice())),
    );
  }

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  addEvent(e: event) {

    e.tags = this.selectedTags;
    console.log(e.type);
    if (this.ngForm.valid) {
      this.ES.AddEvent(e).subscribe(res => {
        console.log(e + "Has been added");
      })
    }
    setTimeout(() => this._router.navigateByUrl("admin/events"), 1000);
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


  ngOnInit(): void {
    this.ES.GetTags().subscribe(res => {
      console.log(res);
      this.tags = res;
    })
  }


}
