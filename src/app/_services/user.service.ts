import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/User";
const API_URL = 'http://localhost:9092/userservice-ms/api/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  //////////////////////
  AddUser(u: User):Observable<User>{
    return this.http.post<User>(API_URL+'addUser',u);
  }
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(API_URL+'showallUser');
  }

  getUser(id:number){
    return this.http.get<User>(API_URL+'showUser?idUser='+id);
  }
  deleteUser(id:number){
    return this.http.delete<User>(API_URL+'deleteUser?idUser='+id);
  }
  updateUser(u:User){
    return this.http.put<User>(API_URL+'updateUser?idUser=',u);
  }



}
