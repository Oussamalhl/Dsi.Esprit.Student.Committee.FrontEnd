import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user!:User;
  id!:number;
  constructor(private _service: UserService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get("id"));
    this._service.getUser(this.id).subscribe((data)=>{
        this.user=<User>data;
      }
    );
  }

}
