import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/User";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-user-show-all',
  templateUrl: './user-show-all.component.html',
  styleUrls: ['./user-show-all.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserShowAllComponent implements OnInit {
  ListUsers:User[]=[];
  dataSource = new MatTableDataSource<User>(this.ListUsers);
  panelOpenState = false;
  displayedColumns =['details','username','email','sexe','roles','update','remove'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _service:UserService,private _liveAnnouncer: LiveAnnouncer) { }

  Delete(id: number) {
    this._service.deleteUser(id).subscribe(res => console.log("User Deleted"));
    setTimeout(() => this.reload(), 1000);

  }

  reload() {
    this._service.getAllUsers().subscribe(res => {
      console.log(res);
      this.ListUsers = res;
      this.dataSource = new MatTableDataSource<User>(this.ListUsers);
      if (this.ListUsers != []) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
  }
  ngOnInit(): void {
    this.reload()
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
