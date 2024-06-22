import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {User} from "../../../models/User";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../_services/reclamation.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  uploaded: boolean = false;
  empty!: boolean;
  postResponse: any;
  successResponse!: string;
  formData = new FormData();
  uploadForm!: FormGroup
  file!: File;
  URL!: string;

  r: Reclamation = new Reclamation();
  selectedType!: string
  type = ['CLUB', 'EVENT', 'OTHER'];
  targets!: string[]
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngForm = new FormGroup({
    type: new FormControl(null)
  })

  constructor(private RS: ReclamationService, private formBuilder: FormBuilder, private _Activatedroute: ActivatedRoute, private _router: Router, private dialog: MatDialog) {

  }

  @ViewChild('dialogRef', {static: true}) dialogRef!: TemplateRef<any>;


  openDialog() {
    let dialog = this.dialog.open(this.dialogRef);
  }
  onFileChange(reclamation: any) {
    this.file = reclamation.target.files[0];
    this.empty = false;
    this.uploadForm.get('fileu')?.setValue(this.file);
    console.log(this.file.type);
    this.formData.append('file', this.uploadForm.get('fileu')?.value);
    const file = (reclamation.target as HTMLInputElement).files?.[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('fileu')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      if (this.file.type.includes("image"))
        this.URL = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }

  addReclamation(r: Reclamation) {
    this.isSending = true;
    let dialog = this.dialog.open(this.dialogRef);
    if (this.ngForm.valid) {
      this.RS.AddReclamation(r).subscribe(res => {
          this.RS.AddReclamationFiles(res.id, this.formData).subscribe((response) => {
              if (response.status === 200) {
                this.postResponse = response;
                console.log(response);
                this.successResponse = this.postResponse.body.message;

              } else {
                this.successResponse = 'File not uploaded due to some error!';
              }
            }
          );
          console.log(res.id);
          this.isSending = false;
          this.sent = true;
          this.empty = true;
          this.uploaded = true;
          dialog.addPanelClass('success-dialog');
          setTimeout(() => this._router.navigateByUrl("reclamations"), 1000);
        },
        (err) => {
          console.log(err);
          this.isSending = false;
          this.sent = false;
          dialog.addPanelClass('fail-dialog')
        }
      )
    }
  }

  getTargets(type: string) {
    console.log("type: " + type);
    switch (type) {
      case 'CLUB': {
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(16,1,156,0.31)";
        document.getElementById("reclamationTypeForm")!.style.border = "2px solid";
        document.getElementById("reclamationTypeHeader")!.innerText = "Your voice can will surely help our clubs to do better.";

        break
      }
      case 'EVENT': {
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(156,1,1,0.31)";
        document.getElementById("reclamationTypeForm")!.style.border = "2px solid";
        document.getElementById("reclamationTypeHeader")!.innerText = "Your voice can only help our event organizers to do better.";

        break
      }
      case 'OTHER': {
        document.getElementById("reclamationTypeForm")!.style.backgroundColor = "rgba(72,49,62,0.31)";
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
    this.uploadForm = this.formBuilder.group({
      fileu: ['']
    });
  }

}
