import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Reclamation} from "../../../models/Reclamation";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ReclamationService} from "../../../_services/reclamation.service";
import {User} from "../../../models/User";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-reclamation-show-all',
  templateUrl: './reclamation-show-all.component.html',
  styleUrls: ['./reclamation-show-all.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReclamationShowAllComponent implements OnInit {

  reclamationsList: Reclamation[] = [];
  userDetails!:User;
  displayedColumns: string[] = ['name', 'type', 'target', 'description', 'date', 'status','user', 'Update', 'Remove'];
  dataSource = new MatTableDataSource<Reclamation>(this.reclamationsList);
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private RS: ReclamationService, private US: UserService, private _Activatedroute: ActivatedRoute, private _router: Router, private _liveAnnouncer: LiveAnnouncer) {

  }

  Delete(id: number) {
    this.RS.deleteReclamation(id).subscribe(res => console.log("Reclamation Deleted"));
    setTimeout(() => this.reload(), 1000);
  }

  reload() {
    this.RS.getAllReclamations().subscribe(res => {
      console.log(res);
      this.reclamationsList = res;
      this.dataSource = new MatTableDataSource<Reclamation>(this.reclamationsList);
      if (this.reclamationsList != []) {
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

  showUserDetails(recId:number):User{
    this.RS.getUser(recId).subscribe(u=>{this.userDetails=u
      //this.panelOpenState=true
      console.log(u)})
    //console.log(this.userDetails)
    return this.userDetails
  }

  ngOnInit(): void {
    let user: User
    this.RS.getAllReclamations().subscribe(res => {
      console.log(res);
      this.reclamationsList = res;
      // this.reclamationsList.forEach(e => {
      //  this.RS.getUser(e.id).subscribe(u=>e.user=u)
      //   //console.log(e.user);
      //   //this.US.getUser(e.user)
      // });

      this.dataSource = new MatTableDataSource<Reclamation>(this.reclamationsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

}
