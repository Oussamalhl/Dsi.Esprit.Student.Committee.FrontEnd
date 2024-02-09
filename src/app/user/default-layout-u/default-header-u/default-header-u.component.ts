import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "@coreui/angular";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {AuthService} from "../../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header-u',
  templateUrl: './default-header-u.component.html',
  styleUrls: ['./default-header-u.component.scss']
})
export class DefaultHeaderUComponent extends HeaderComponent{
  isLoggedIn=false;
  roles: string[] = [];
  username="" ;
  showAdminBoard = false;
  constructor(private tokenStorage: TokenStorageService,private router : Router,private authService: AuthService,) {
    super();
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username=this.tokenStorage.getUser().username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.router.navigate(['/']);
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorage.clean();
        //window.location.reload();
        this.router.navigate(['/signin']).then(() => {
          window.location.reload();
        });
        },
      error: err => {
        console.log(err);
      }
    });
  }

}
