import {Role} from "./Role";
import {Reclamation} from "./Reclamation";

export class User {
  id !: number;
  firstName! : string;
  lastName !: string;
  username!:string;
  password!:string;
  passwordConfirm!:string;
  email!:string;
  tel!:string;
  roles!:Role[];
  sexe!:boolean;
  reclamations!:Reclamation[];
  clubId!:number;


}
