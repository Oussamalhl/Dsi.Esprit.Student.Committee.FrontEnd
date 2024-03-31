import {clubFile} from "./clubFile";

export class Club {
  id!:number

  name!:string

  description!:string

  type!:string

  field!:string

  status!:string

  files!:clubFile[]
}
