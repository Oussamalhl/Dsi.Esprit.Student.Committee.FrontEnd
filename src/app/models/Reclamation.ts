import {User} from "./User";
import {Observable} from "rxjs";


export class Reclamation{
  id !: number
  name !: string
  description !: string
  user!:Observable<User>
}
