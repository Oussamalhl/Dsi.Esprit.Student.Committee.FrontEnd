import {eventFile} from "./eventFile";

export class event{
  id!:number;
  name!:string;
  description!:string;
  eventDateStart!:Date;
  eventDateEnd!:Date;
  eventTime!:string;
  eventLocation!:string;
  eventMotive!:string;
  type!:string;
  status!:Boolean;
  places!: number;
  tags !:string[];
  files!:eventFile[];
  clubs!:string[];
}
