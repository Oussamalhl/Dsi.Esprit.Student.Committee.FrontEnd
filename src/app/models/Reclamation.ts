import {User} from "./User";
import {Observable, Subject} from "rxjs";
import {reclamationFile} from "./reclamationFile";


export class Reclamation {
  id!:number
  name!: string
  date!: Date
  type!: string
  target!: string
  status!: Boolean
  description!: string
  user!:User
  files!:reclamationFile[]
}
