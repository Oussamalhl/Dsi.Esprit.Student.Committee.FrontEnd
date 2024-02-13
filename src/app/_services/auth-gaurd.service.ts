import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {state} from "@angular/animations";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private router:Router, private tokenStorage: TokenStorageService) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      }
      if (this.isLoggedIn && this.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
