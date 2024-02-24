import {Component, OnInit, ViewChild} from '@angular/core';
import {event} from "../../../../../models/event";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../../models/User";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {EventService} from "../../../../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-event-add-participants',
  templateUrl: './event-add-participants.component.html',
  styleUrls: ['./event-add-participants.component.scss']
})
export class EventAddParticipantsComponent implements OnInit {

  e: event = new event();
  id!: number;
  name: string = "";
  participatables: string[][] = [];
  displayedColumns: string[] = ['select', 'username', 'email', 'club', 'participate'];
  dataSource = new MatTableDataSource<string[]>(this.participatables);
  u: User = new User();
  selection = new SelectionModel<string[]>(true, []);
  generated: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EventService, private _Activatedroute: ActivatedRoute, private _router: Router, private _liveAnnouncer: LiveAnnouncer) {
  }

  //@delay(1000)
  reload() {
    this.generated = false;
    this.selection = new SelectionModel<string[]>(true, []);
    this.ngOnInit();
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: string[]): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row[0] + 1}`;
  }

  RemoveParticipant() {
    this.selection.selected.forEach(u => {
      //this.FeS.GetParticipantEventFeedBack(u.id,this.id).subscribe();
    })

    setTimeout(() => this.reload(), 2500);
  }

  Participate(username: string) {
    console.log(username + this.id)
    this.ES.ParticipateUser(this.id, username).subscribe(res =>
      setTimeout(() => this.reload(), 2500)
    )
  }

  GenerateBadge() {
    this.selection.selected.forEach(u => {
      this.ES.ParticipantBadge(this.id, Number(u[0])).subscribe(res => console.log(u[0] + "Badge generated"));
    })
    this.generated = true;
    setTimeout(() => this.reload(), 2500);
  }

  ngOnInit(): void {
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.ES.GetEvent(this.id).subscribe(res => {
        console.log(res);
        this.ES.GetEventClubs(this.id).subscribe(c=>this.e.clubs=c)
        this.e = res;
        this.name = res.name;
        this.ES.GetParticipatables(this.id).subscribe(res => {
          console.log(res);
          this.participatables = res;
          this.dataSource = new MatTableDataSource<string[]>(this.participatables);
          if (this.participatables != []) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        })

      });
    }
  }

}
