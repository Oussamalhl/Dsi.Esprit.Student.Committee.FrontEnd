import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {User} from "../../../models/User";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../_services/reclamation.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-reclamation-add',
  templateUrl: './user-reclamation-add.component.html',
  styleUrls: ['./user-reclamation-add.component.scss']
})
export class UserReclamationAddComponent implements OnInit {

  isLoading = false;
  isSending = false;
  sent = false;

  r: Reclamation = new Reclamation();
  selectedType!: string
  type = ['CLUB', 'EVENT', 'OTHER'];
  targets!: string[]
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })

  constructor(private RS: ReclamationService, private _Activatedroute: ActivatedRoute, private _router: Router, private dialog: MatDialog) {

  }
  @ViewChild('dialogRef', {static: true}) dialogRef!: TemplateRef<any>;

  openDialog() {
    let dialog = this.dialog.open(this.dialogRef);
  }
  addReclamation(r: Reclamation) {
    this.isSending = true;
    let dialog = this.dialog.open(this.dialogRef);

    if (this.ngForm.valid) {
      this.RS.AddReclamation(r).subscribe(res => {

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
    setTimeout(() => this._router.navigateByUrl("reclamations"), 1000);
  }

  getTargets(type: string) {
    console.log("type: " + type);
    switch (type){
      case 'CLUB':{
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(16,1,156,0.31)" ;
        document.getElementById("reclamationTypeForm")!.style.border = "2px solid";
        document.getElementById("reclamationTypeHeader")!.innerText = "Your voice can only make our clubs do better.";

        break
      }
      case 'EVENT':{
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(156,1,1,0.31)" ;
        document.getElementById("reclamationTypeForm")!.style.border = "2px solid";
        document.getElementById("reclamationTypeHeader")!.innerText = "Your voice can only make our event organizers do better.";

        break
      }
      case 'OTHER':{
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(72,49,62,0.31)" ;
        document.getElementById("reclamationTypeForm")!.style.border = "2px solid";
        document.getElementById("reclamationTypeHeader")!.innerText = "What's on your mind?";

      }
    }

    this.RS.GetReclamationTargets(type).subscribe(e => {
      this.targets = []
      this.targets = e
      console.log("this type: " + e);

      //e.forEach(t=>console.log("targets: "+t))
      //console.log("targets: "+e);

    })
    //return this.targets

  }

  ngOnInit(): void {

  }

}
