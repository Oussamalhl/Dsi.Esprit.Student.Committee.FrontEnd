import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Reclamation} from "../models/Reclamation";
import {User} from "../models/User";
import {UserService} from "./user.service";
const API_URL = 'http://localhost:8083/api/reclamation/';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient,private us: UserService) { }

  AddReclamation(r: Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(API_URL+'addReclamation',r);
  }
  getAllReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(API_URL+'showallReclamations');
  }

  getReclamation(id:number){
    return this.http.get<Reclamation>(API_URL+'showReclamation?idReclamation='+id);
  }

  getUser(id:number){
    let user!:Observable<User>
    this.http.get<number>(API_URL + 'getUser?idReclamation=' + id).forEach(e =>
      user=this.us.getUser(e))
    return user
     //this.http.get<number>(API_URL+'getUser?idReclamation='+id);
  }
  deleteReclamation(id:number){
    return this.http.delete<Reclamation>(API_URL+'deleteReclamation?idReclamation='+id);
  }
  updateReclamation(r:Reclamation){
    return this.http.put<Reclamation>(API_URL+'updateReclamation',r);
  }
}
