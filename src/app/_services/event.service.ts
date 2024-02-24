import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {eventFile} from "../models/eventFile";
import {User} from "../models/User";
import {event} from "../models/event";

const API_URL = 'http://localhost:8084/api/event/';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) { }
  AddEvent(e: event):Observable<event>{
    return this._http.post<event>(API_URL + 'addEvent', e);
  }

  updateEvent(e:event){
    return this._http.put<event>(API_URL + 'updateEvent', e);
  }

  removeEvent(id:number){
    return this._http.delete<event>(API_URL + 'deleteEvent?idEvent='+id);
  }
  GetEvent(id:number):Observable<event>{
    return this._http.get<event>(API_URL + 'showEvent?idEvent='+ id);
  }
  FindAllEvents():Observable<event[]>{
    return this._http.get<event[]>(API_URL + 'showallEvents');
  }
  GetTags(){
    return this._http.get<string[]>(API_URL + 'getTags');
  }

  EventOfTheMonth():Observable<event[]>{
    return this._http.get<event[]>("http://localhost:8081/Event-of-the-month");
  }
  EventByStatus(stat:string){
    return this._http.get<event[]>("http://localhost:8081/Event-by-status/"+stat);
  }
  EventByType(type:string){
    return this._http.get<event[]>("http://localhost:8081/Event-by-type/"+type);
  }

  ParticipantBadge(eid:number,uid:number){
    return this._http.get<event[]>("http://localhost:8081/generateParticipantBadge/"+eid+"/"+uid);
  }
  GenerateBadge(eid:number,uid:number,type:string){
    return this._http.get<event[]>("http://localhost:8081/generateBadge/"+eid+"/"+uid+"/"+type);
  }








  GetEventFiles(id:number):Observable<eventFile[]> {
    return this._http.get<eventFile[]>(API_URL + 'getFiles/' + id);
  }

  AddEventFiles(id:number, file:FormData){
    return this._http.post<eventFile>(API_URL + 'addFile/' + id, file, {observe: 'response'});
  }

  RemoveEventFile(id:number, fid:number){
    return this._http.delete<eventFile>(API_URL + id + "/deleteFile/" + fid);
  }
  GetUsersList() {
    return this._http.get<User[]>("http://localhost:8081/donation/getAllUsers");
  }
  GetUser(idUser:number,idEvent:number){
    return this._http.get<event[]>(API_URL + 'showallEvents?idUser='+idUser+'&idEvent='+idEvent)
  }
  GetUserEvent(idUser:number,idEvent:number) {
    return this._http.get<number>(API_URL + 'showallEvents?idUser='+idUser+'&idEvent='+idEvent);
  }
  GetParticipants(idEvent:number) {
    return this._http.get<any>(API_URL + 'getParticipations?idEvent='+idEvent);
  }

}
