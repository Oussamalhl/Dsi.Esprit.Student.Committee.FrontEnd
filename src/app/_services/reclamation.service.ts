import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Reclamation} from "../models/Reclamation";
import {User} from "../models/User";
import {UserService} from "./user.service";

const API_URL = 'http://localhost:8083/api/reclamation/';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private idUser!:number
  constructor(private http: HttpClient, private us: UserService) {
  }

  AddReclamation(r: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(API_URL + 'addreclamation', r);
  }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(API_URL + 'showallReclamations');
  }

  getReclamation(id: number) {
    return this.http.get<Reclamation>(API_URL + 'showReclamation?idReclamation=' + id);
  }

  getUser(id: number) {
    var subject = new Subject<User>();
    let user:User;

     this.http.get<number>(API_URL + 'getUser?idReclamation=' + id).subscribe(data=>{
       //console.log(data)
       //subject.next(this.us.getReclamationUser(data))
       this.us.getReclamationUser(data).subscribe(r=>{
           user=r
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
}
