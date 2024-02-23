import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {EventService} from "../../../_services/event.service";
import {User} from "../../../models/User";
import {event} from "../../../models/event";

@Component({
  selector: 'app-event-show-all',
  templateUrl: './event-show-all.component.html',
  styleUrls: ['./event-show-all.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventShowAllComponent implements OnInit {

  eventsList: event[]=[]
  displayedColumns: string[] = ['name', 'description', 'eventDateStart', 'eventDateEnd', 'eventTime',
    'eventLocation', 'eventMotive', 'type', 'status', 'places', 'tags', 'files','Participants', 'Update', 'Remove'];
  dataSource = new MatTableDataSource<event>(this.eventsList);
  expandedElement!: event | null;
  panelOpenState = false;
  u: User = new User();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EventService, private _Activatedroute: ActivatedRoute, private _router: Router, private _liveAnnouncer: LiveAnnouncer) {

  }

  Delete(id: number) {
    this.ES.removeEvent(id).subscribe(res => console.log("Event Deleted"));
    setTimeout(() => this.reload(), 2500);  }

  reload() {
    this.ES.FindAllEvents().subscribe(res => {
      console.log(res);
      this.eventsList = res;
      this.dataSource = new MatTableDataSource<event>(this.eventsList);
      if (this.eventsList != []) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  ngOnInit(): void {

    this.reload()
  }

}
