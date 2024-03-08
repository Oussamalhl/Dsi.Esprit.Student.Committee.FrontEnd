import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../../models/Reclamation";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../../_services/reclamation.service";
import {reclamationFile} from "../../../../models/reclamationFile";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user-reclamation-files-add',
  templateUrl: './user-reclamation-files-add.component.html',
  styleUrls: ['./user-reclamation-files-add.component.scss']
})
export class UserReclamationFilesAddComponent implements OnInit {

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
  files: reclamationFile[] = [];
  pdf: any[] = [];
  secured: any;
  pdfFiles: reclamationFile[] = [];
  retrievedImages: reclamationFile[] = [];
  src: any[] = []

  constructor(private _Activatedroute: ActivatedRoute, private _router: Router, private RS: ReclamationService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

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
    this.ngOnInit();
  }
  reload() {
    this.pdf = []
    this.retrievedImages=[]
    this.RS.GetReclamationFiles(this.id).subscribe(res => {
      this.files = res;
      console.log(res);
      res.forEach(f => {
        if (f.fileName.includes(".pdf")) {
          this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
          this.pdf.push(this.secured);
          this.pdfFiles.push(f);

        } else if (f.fileName.includes(".png") || f.fileName.includes(".jpg")){
          this.retrievedImages.push(f);
          this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
        }
        //console.log(this.pdf);
      })
    })

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
    this.reload()
  }

}
