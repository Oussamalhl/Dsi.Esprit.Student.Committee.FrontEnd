import {Component, OnInit} from '@angular/core';
import {reclamationFile} from "../../../../models/reclamationFile";
import {Reclamation} from "../../../../models/Reclamation";
import {ReclamationService} from "../../../../_services/reclamation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-reclamation-show-files',
  templateUrl: './reclamation-show-files.component.html',
  styleUrls: ['./reclamation-show-files.component.scss']
})
export class ReclamationShowFilesComponent implements OnInit {

  name: string = "";
  id!: number;
  r!: Reclamation;
  files: reclamationFile[] = [];
  pdf: any[] = [];
  secured: any;
  pdfFiles: reclamationFile[] = [];
  retrievedImages: reclamationFile[] = [];
  src: any[] = []

  constructor(private RS: ReclamationService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  Remove(id: number) {

    // this.tmp = (new URL(f.filePath)).toString();
    this.RS.RemoveReclamationFile(this.id, id).subscribe(res => {
      console.log(res);
      console.log("File Deleted");
    });


    setTimeout(() => this.reload(), 1000);
  }


  RemovePdf(id: number) {
    this.RS.RemoveReclamationFile(this.id, id).subscribe(res => {
        console.log(res);
        console.log("File Deleted");
      }
    );
    setTimeout(() => this.reload(), 1000);
  }


  reload() {
    this.pdf = [];
    this.RS.GetReclamationFiles(this.id).subscribe(res => {
      this.files = res;
      console.log(res);
      res.forEach(f => {
        if (f.filePath.includes(".pdf")) {
          this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
          this.pdf.push(this.secured);
          this.pdfFiles.push(f);

        } else{
          this.retrievedImages.push(f);
          this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
        }
        console.log(this.pdf);
      })
    })

  }

  ngOnInit(): void {
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.RS.getReclamation(this.id).subscribe(res => {
        console.log(res);
        this.r = res;
        this.name = this.r.name;

      });


      this.RS.GetReclamationFiles(this.id).subscribe(res => {
        this.files = res;
        //console.log(res);
        res.forEach(f => {
          if (f.filePath.includes(".pdf")) {
            this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
            this.pdf.push(this.secured);
            this.pdfFiles.push(f);

          } else {
            this.retrievedImages.push(f);
            this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
          }
          //this.retrievedImages.forEach(e=>console.log("retrieved image: "+e.fileName));
          console.log(f.fileName);
          //this.retrievedImages.forEach(e=>console.log("retrieved image: "+e));
          // console.log(this.pdf);
        })
      })
    }
  }

}