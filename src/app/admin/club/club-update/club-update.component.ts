import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {ClubService} from "../../../_services/club.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {Reclamation} from "../../../models/Reclamation";
import {ReclamationService} from "../../../_services/reclamation.service";
import {Club} from "../../../models/Club";
@Component({
  selector: 'app-club-update',
  templateUrl: './club-update.component.html',
  styleUrls: ['./club-update.component.scss']
})
export class ClubUpdateComponent implements OnInit {
  isLoading = false;
  isSending = false;
  sent = false;

  c: Club = new Club();
  id!:number;

  selectedType!: string
  status = ['OPEN', 'CLOSED'];
  type = ['EDUCATION', 'SPORTS', 'ENTERTAINMENT','SOCIAL','OTHER'];
  field = ['A','B','C'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })
  constructor(private CS: ClubService, private _Activatedroute: ActivatedRoute, private _router: Router, private dialog: MatDialog) {

  }
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dialogRef', {static: true}) dialogRef!: TemplateRef<any>;

  UpdateClub(c:Club) {
    this.isSending = true;
    let dialog = this.dialog.open(this.dialogRef);
    if (this.ngForm.valid){
      this.CS.updateClub(c).subscribe(res => {

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
    setTimeout(() => this.reroute(), 1000);
  }

  reroute(){
    this._router.navigateByUrl("admin/clubs");
  }

  reset(){
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.CS.GetClub(this.id).subscribe(res => {
        console.log(res);
        this.c = res;
      });
    }
  }

  ngOnInit(): void {
    this.reset()
  }

}
