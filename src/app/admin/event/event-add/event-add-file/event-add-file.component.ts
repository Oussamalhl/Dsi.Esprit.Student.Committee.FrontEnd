import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../../models/Reclamation";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../../_services/reclamation.service";
import {EventService} from "../../../../_services/event.service";
import {event} from "../../../../models/event";

@Component({
  selector: 'app-event-add-file',
  templateUrl: './event-add-file.component.html',
  styleUrls: ['./event-add-file.component.scss']
})
export class EventAddFileComponent implements OnInit {

  @ViewChild('fileInput', {static: false})
  myFileInput!: ElementRef;
  id!: number;
  e!: event;
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
  constructor(private _Activatedroute: ActivatedRoute, private _router: Router, private ES: EventService, private formBuilder: FormBuilder) { }

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
      this.ES.AddEventFiles(this.id, this.formData).subscribe((response) => {
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
      this.ES.GetEvent(this.id).subscribe(res => {
        console.log(res);
        this.e = res;
        this.name=res.name;


      });
    }
    this.uploadForm = this.formBuilder.group({
      fileu: ['']
    });
  }

}
