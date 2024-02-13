import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../_services/reclamation.service";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-reclamation-add',
  templateUrl: './reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.scss']
})
export class ReclamationAddComponent implements OnInit {

  r: Reclamation = new Reclamation();
  selectedType!:string
  status=['OPEN', 'CLOSED'];
  type=['CLUB', 'EVENT','OTHER..'];
  targets:string[]=['Enactus','Sport']
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngForm=new FormGroup({
    type: new FormControl(null)
  })

  constructor(private RS: ReclamationService, private _Activatedroute: ActivatedRoute, private _router: Router) {

  }

  addReclamation(r:Reclamation) {

    if (this.ngForm.valid){
      this.RS.AddReclamation(r).subscribe(res=>{
        console.log(r + "Has been added");
      })
    }
    this._router.navigateByUrl("admin/reclamations");
  }

  ngOnInit(): void {

  }

}
