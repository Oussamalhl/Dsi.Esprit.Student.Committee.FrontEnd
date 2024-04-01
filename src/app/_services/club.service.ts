import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {clubFile} from "../models/clubFile";
import {Club} from "../models/Club";

const API_URL = 'http://localhost:8085/api/club/';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private _http: HttpClient) { }

  AddClub(e: Club): Observable<Club> {
    return this._http.post<Club>(API_URL + 'addClub', e);
  }

  updateClub(e: Club) {
    return this._http.put<Club>(API_URL + 'updateClub', e);
  }

  removeClub(id: number) {
    return this._http.delete<Club>(API_URL + 'deleteClub?idClub=' + id);
  }

  deleteUserClub(id:number) {
    return this._http.post(API_URL + 'deleteU?id=' + id,{});
  }
  deleteUserClubAdm(id:number) {
    return this._http.post(API_URL + 'deleteU?id=' + id,{});
  }

  GetClub(id: number): Observable<Club> {
    return this._http.get<Club>(API_URL + 'showClub?idClub=' + id);
  }
  GetClubId(name: string): Observable<number> {
    return this._http.get<number>(API_URL + 'showCId?name=' + name);
  }
  getClubUsers(idClub: number): Observable<any> {
    return this._http.get<any>(API_URL + 'showClubU?idClub=' + idClub);
  }
  FindAllClubs(): Observable<Club[]> {
    return this._http.get<Club[]>(API_URL + 'showallClubs');
  }

  FindAllClubNames(): Observable<string[]> {
    return this._http.get<string[]>(API_URL + 'showAllCNames');
  }

  GetClubFiles(id: number): Observable<clubFile[]> {
    return this._http.get<clubFile[]>(API_URL + 'getFiles/' + id);
  }

  AddClubFiles(id: number, file: FormData) {
    return this._http.post<clubFile>(API_URL + 'addFile/' + id, file, {observe: 'response'});
  }

  RemoveClubFile( fid: number) {
    return this._http.delete<clubFile>(API_URL + 'deleteFile/' + fid);
  }

  ConfirmUserClub(idClub: number, id: number) {
    return this._http.post<any>(API_URL + 'confirmU?idClub=' + idClub + '&id=' + id, {});
  }

  GetClubEvents(idClub:number) {
    return this._http.get<any>(API_URL + 'getClubEvents?idClub='+idClub);
  }
  GetUserClub(): Observable<Club> {
    return this._http.get<Club>(API_URL + 'showUClub');
  }
  GetUserClubId() {
    return this._http.get<number>(API_URL + 'getC');
  }



  bestClubEvents(idClub:number): Observable<any> {
    return this._http.get<any>(API_URL + 'bestclubEv?idClub='+idClub)
  }

  topClubParticipations(): Observable<any> {
    return this._http.get<any>(API_URL + 'topClPart')
  }

  countAllClubs(): Observable<number> {
    return this._http.get<number>(API_URL + 'countAll')
  }

  countAllClubsParticipations(): Observable<number> {
    return this._http.get<number>(API_URL + 'countAllPart')
  }

  countClubParticipations(idClub:number):Observable<number> {
    return this._http.get<number>(API_URL + 'countClPart?idClub='+idClub)
  }

  countClubEvents(idClub:number):Observable<number> {
    return this._http.get<number>(API_URL + 'countClEv?idClub='+idClub)
  }

  countAllClubsByType():Observable<any> {
    return this._http.get<any>(API_URL + 'countClType')
  }

  countAllClubsByStatus():Observable<any> {
    return this._http.get<any>(API_URL + 'countClStatus')
  }

}
