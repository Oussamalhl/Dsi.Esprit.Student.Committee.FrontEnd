import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {eventFile} from "../models/eventFile";
import {User} from "../models/User";
import {event} from "../models/event";

const API_URL = 'http://localhost:8084/api/event/';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) {
  }

  AddEvent(e: event): Observable<event> {
    return this._http.post<event>(API_URL + 'addEvent', e);
  }

  updateEvent(e: event) {
    return this._http.put<event>(API_URL + 'updateEvent', e);
  }

  removeEvent(id: number) {
    return this._http.delete<event>(API_URL + 'deleteEvent?idEvent=' + id);
  }

  deleteUserEvent(username: string) {
    return this._http.delete(API_URL + 'deleteUserEvent?username=' + username);
  }

  deleteUserEventM(eventId: number, username: string) {
    return this._http.delete(API_URL + 'deleteUserEventm?eventId=' + eventId + '&username=' + username);
  }

  GetEvent(id: number): Observable<event> {
    return this._http.get<event>(API_URL + 'showEvent?idEvent=' + id);
  }

  FindAllEvents(): Observable<event[]> {
    return this._http.get<event[]>(API_URL + 'showallEvents');
  }

  GetTags() {
    return this._http.get<string[]>(API_URL + 'getTags');
  }

  ParticipantBadge(id: number, user: string) {
    return this._http.get(API_URL + "generateParticipantBadge/" + id + "/" + user);
  }

  GenerateBadge(id: number, user: string) {
    return this._http.get<event[]>("generateParticipantBadge/" + id + "/" + user);
  }

  addClubEvent(id: number, clubs: string[]) {
    return this._http.post<any>(API_URL + "addClubEvent?idEvent=" + id, clubs);
  }


  GetEventFiles(id: number): Observable<eventFile[]> {
    return this._http.get<eventFile[]>(API_URL + 'getFiles/' + id);
  }

  AddEventFiles(id: number, file: FormData) {
    return this._http.post<eventFile>(API_URL + 'addFile/' + id, file, {observe: 'response'});
  }

  RemoveEventFile(id: number, fid: number) {
    return this._http.delete<eventFile>(API_URL + id + "/deleteFile/" + fid);
  }

  GetUser(idUser: number, idEvent: number) {
    return this._http.get<event[]>(API_URL + 'showallEvents?idUser=' + idUser + '&idEvent=' + idEvent)
  }

  GetUserEvent(idUser: number, idEvent: number) {
    return this._http.get<number>(API_URL + 'showallEvents?idUser=' + idUser + '&idEvent=' + idEvent);
  }

  GetParticipants(idEvent: number) {
    return this._http.get<any>(API_URL + 'getParticipations?idEvent=' + idEvent);
  }

  GetParticipatables(idEvent: number) {
    return this._http.get<any>(API_URL + 'getParticipatables?idEvent=' + idEvent);
  }

  ParticipateUser(idEvent: number, username: string) {
    return this._http.post<any>(API_URL + 'addUserEventa?idEvent=' + idEvent + '&username=' + username, {});
  }

  GetEventClubs(idEvent: number) {
    return this._http.get<string[]>(API_URL + 'getEventClubs?idEvent=' + idEvent);
  }

  GetClubs() {
    return this._http.get<string[]>(API_URL + 'getClubs');
  }

  countAllEventByMonth(year:number): Observable<any> {

    return this._http.get<any>(API_URL + 'countAllEvByMonth?year='+year)

  }

  countEventStatusByYear(year:number): Observable<any> {

    return this._http.get<any>(API_URL + 'countEvStatusByYear?year='+year)

  }

  countEventTypeByYear(year:number): Observable<any> {

    return this._http.get<any>(API_URL + 'countEvTypeByYear?year='+year)

  }

  bestEventsOfTheYear(year: number): Observable<any> {

    return this._http.get<any>(API_URL + 'bestEvOfYear?year=' + year)

  }
  countAllEvents():Observable<number> {

    return this._http.get<number>(API_URL + 'countAllEv')

  }
  countAllEventsParticipations():Observable<number> {

    return this._http.get<number>(API_URL + 'countAllEvPartc')

  }
  countAllConfirmedEvents():Observable<number> {

    return this._http.get<number>(API_URL + 'countAllConfEv')

  }
  countEventParticipations(idEvent:number):Observable<number> {

    return this._http.get<number>(API_URL + 'countEvParti?idEvent='+idEvent)

  }
  countEventConfirmed(idEvent:number):Observable<number> {

    return this._http.get<number>(API_URL + 'countEvConfirmed?idEvent='+idEvent)

  }


}
