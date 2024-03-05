import {Component, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../models/Reclamation";
import {TokenStorageService} from "../../_services/token-storage.service";
import {ReclamationService} from "../../_services/reclamation.service";
import {User} from "../../models/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-browse-reclamations',
  templateUrl: './browse-reclamations.component.html',
  styleUrls: ['./browse-reclamations.component.scss']
})
export class BrowseReclamationsComponent implements OnInit {

  isLoggedIn=false;
  username="" ;
  u!:User;
  reclamationList:Reclamation[]=[];
  displayedColumns: string[] = ['reclamation','name', 'description', 'date','type','target','status'];
  dataSource = new MatTableDataSource<Reclamation>(this.reclamationList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private RS:ReclamationService, private _liveAnnouncer: LiveAnnouncer) { }

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
    this.RS.getUserReclamations().subscribe(res=>{
      console.log(res);
      this.reclamationList=res;
      this.dataSource = new MatTableDataSource<Reclamation>(this.reclamationList);
      if (this.reclamationList != []) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    console.log(this.u);

  }
}
