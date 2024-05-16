import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Reclamation} from "../models/Reclamation";
import {User} from "../models/User";
import {UserService} from "./user.service";
import {reclamationFile} from "../models/reclamationFile";

const API_URL = 'http://localhost:9094/api/reclamation/';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private idUser!: number

  constructor(private http: HttpClient, private us: UserService) {
  }

  AddReclamation(r: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(API_URL + 'addreclamation', r);
  }
  AddReclamationAdmin(r: Reclamation,username:string): Observable<Reclamation> {
    return this.http.post<Reclamation>(API_URL + 'addreclamationa?username='+username, r);
  }
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(API_URL + 'showallReclamations');
  }

  getReclamation(id: number) {
    return this.http.get<Reclamation>(API_URL + 'showReclamation?idReclamation=' + id);
  }
  getUserReclamations() {
    return this.http.get<Reclamation[]>(API_URL + 'showURec');
  }
  GetUsers() {
    return this.http.get<string[]>(API_URL + 'getusers');
  }
  getUser(id: number) {
    var subject = new Subject<User>();
    let user: User;

    this.http.get<number>(API_URL + 'getUser?idReclamation=' + id).subscribe(data => {
      //console.log(data)
      //subject.next(this.us.getReclamationUser(data))
      this.us.getReclamationUser(data).subscribe(r => {
        user = r
        //console.log(user)
        subject.next(user);

      })

      //return subject.asObservable();
      //user=this.us.getUser(data)
      //this.us.getReclamationUser(data)
      //user=this.us.getReclamationUser(data)
      //console.log(user);
    })
    return subject.asObservable();
  }

  deleteReclamation(id: number) {
    return this.http.delete<Reclamation>(API_URL + 'deleteReclamation?idReclamation=' + id);
  }

  updateReclamation(r: Reclamation) {
    return this.http.put<Reclamation>(API_URL + 'updateReclamation', r);
  }

  GetReclamationFiles(id: number): Observable<reclamationFile[]> {
    return this.http.get<reclamationFile[]>(API_URL + 'getFiles/' + id);
  }

  AddReclamationFiles(id: number, file: FormData) {
    return this.http.post<reclamationFile>(API_URL + 'addFile/' + id, file, {observe: 'response'});
  }

  RemoveReclamationFile(fid: number) {
    return this.http.delete<reclamationFile>(API_URL + "deleteFile/" + fid);
  }

  GetReclamationTargets(type: string):Observable<string[]> {

    return this.http.get<string[]>(API_URL + 'getTargets?type=' + type)

  }
  countAllReclamationByMonth(year:number):Observable<any> {

    return this.http.get<any>(API_URL + 'countAllRecByMonth?year='+year)

  }
  countReclamationStatusByYear(year:number):Observable<any> {

    return this.http.get<any>(API_URL + 'countRecStatusByYear?year='+year)

  }
  countReclamationTypeByYear(year:number):Observable<any> {

    return this.http.get<any>(API_URL + 'countRecTypeByYear?year='+year)

  }
  countAllReclamation():Observable<number> {

    return this.http.get<number>(API_URL + 'countAllRec')

  }
  countAllDoneReclamation():Observable<number> {

    return this.http.get<number>(API_URL + 'countAllDoneRec')

  }

  countReclamationTargetByYear(year:number):Observable<any> {

    return this.http.get<any>(API_URL + 'countRecTargetByYear?year='+year)

  }

}
