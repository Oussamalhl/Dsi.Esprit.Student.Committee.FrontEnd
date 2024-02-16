import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../../models/Reclamation";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../../_services/reclamation.service";

@Component({
  selector: 'app-reclamation-add-file',
  templateUrl: './reclamation-add-file.component.html',
  styleUrls: ['./reclamation-add-file.component.scss']
})
export class ReclamationAddFileComponent implements OnInit {

  @ViewChild('fileInput', {static: false})
  myFileInput!: ElementRef;
  id!: number;
  r!: Reclamation;
  file!: File;
  uploadForm!: FormGroup
  formData = new FormData();
  postResponse: any;
  successResponse!: string;
  URL!: string;
  uploaded: boolean = false;
  empty!: boolean;
  myFiles: string [] = [];
  name!:string;
  constructor(private _Activatedroute: ActivatedRoute, private _router: Router, private RS: ReclamationService, private formBuilder: FormBuilder) { }

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

  onSubmit() {
    if (this.myFileInput.nativeElement.value == '') {
      this.empty = true;
    } else {
      this.RS.AddReclamationFiles(this.id, this.formData).subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            console.log(response);
            this.successResponse = this.postResponse.body.message;


          } else {
            this.successResponse = 'File not uploaded due to some error!';
          }
        }
      );
      this.uploaded = true;
      this.myFileInput.nativeElement.value = '';
    }


  }

  ngOnInit(): void {
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.RS.getReclamation(this.id).subscribe(res => {
        console.log(res);
        this.r = res;
        this.name=res.name;


      });
    }
    this.uploadForm = this.formBuilder.group({
      fileu: ['']
    });
  }

}
