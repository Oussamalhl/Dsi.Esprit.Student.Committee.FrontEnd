import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {C, COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../../_services/club.service";
import {MatDialog} from "@angular/material/dialog";
import {Club} from "../../../models/Club";
@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.scss']
})
export class ClubAddComponent implements OnInit {
  isLoading = false;
  isSending = false;
  sent = false;

  c: Club = new Club();
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
  @ViewChild('dialogRef', {static: true}) dialogRef!: TemplateRef<any>;

  openDialog() {
    let dialog = this.dialog.open(this.dialogRef);
  }
  addClub(c: Club) {
    this.isSending = true;
    let dialog = this.dialog.open(this.dialogRef);

      this.CS.AddClub(c).subscribe(res => {

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

    setTimeout(() => this._router.navigateByUrl("admin/clubs"), 1000);
  }


  ngOnInit(): void {

  }

}
