import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {ReclamationService} from "../../../_services/reclamation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-reclamation-update',
  templateUrl: './reclamation-update.component.html',
  styleUrls: ['./reclamation-update.component.scss']
})
export class ReclamationUpdateComponent implements OnInit {
  r: Reclamation = new Reclamation();
  id!:number;
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
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  UpdateReclamation(r:Reclamation) {

    if (this.ngForm.valid){
      this.RS.updateReclamation(r).subscribe(res=>{
        console.log(r + "Has been updated");
      })
    }
    setTimeout(() => this.reroute(), 1000);
  }

  reroute(){
    this._router.navigateByUrl("admin/reclamations");
  }

  reset(){
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.RS.getReclamation(this.id).subscribe(res => {
        console.log(res);
        this.r = res;
        this.RS.getUser(this.id).subscribe(res=>this.r.user=res)
      });
    }
  }









  ngOnInit(): void {
    this.reset()
    }

}
