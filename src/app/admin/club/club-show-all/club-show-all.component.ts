import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Club} from "../../../models/Club";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ClubService} from "../../../_services/club.service";

@Component({
  selector: 'app-club-show-all',
  templateUrl: './club-show-all.component.html',
  styleUrls: ['./club-show-all.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClubShowAllComponent implements OnInit {

  clubsList: Club[] = [];
  displayedColumns: string[] = ['name', 'description', 'type', 'field', 'status', 'files', 'Update', 'Remove'];
  dataSource = new MatTableDataSource<Club>(this.clubsList);
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private CS: ClubService, private _Activatedroute: ActivatedRoute, private _router: Router, private _liveAnnouncer: LiveAnnouncer) { }

  Delete(id: number) {
    this.CS.removeClub(id).subscribe(res => console.log("Club Deleted"));
    setTimeout(() => this.reload(), 1000);
  }

  reload() {
    this.CS.FindAllClubs().subscribe(res => {
      console.log(res);
      this.clubsList = res;
      this.dataSource = new MatTableDataSource<Club>(this.clubsList);
      if (this.clubsList != []) {
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
