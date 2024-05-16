import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {event} from "../../../../models/event";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../../_services/event.service";
import {ClubService} from "../../../../_services/club.service";
import {Club} from "../../../../models/Club";

@Component({
  selector: 'app-club-add-file',
  templateUrl: './club-add-file.component.html',
  styleUrls: ['./club-add-file.component.scss']
})
export class ClubAddFileComponent implements OnInit {

  @ViewChild('fileInput', {static: false})
  myFileInput!: ElementRef;
  id!: number;
  c!: Club;
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
  constructor(private _Activatedroute: ActivatedRoute, private _router: Router, private CS: ClubService, private formBuilder: FormBuilder) { }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.empty = false;
    this.uploadForm.get('fileu')?.setValue(this.file);
    console.log(this.file.type);
    this.formData.append('file', this.uploadForm.get('fileu')?.value);
    const file = (event.target as HTMLInputElement).files?.[0];
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
      this.CS.AddClubFiles(this.id, this.formData).subscribe((response) => {
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
      this.CS.GetClub(this.id).subscribe(res => {
        console.log(res);
        this.c = res;
        this.name=res.name;


      });
    }
    this.uploadForm = this.formBuilder.group({
      fileu: ['']
    });
  }

}
