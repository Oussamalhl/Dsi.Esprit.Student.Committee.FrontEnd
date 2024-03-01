import { Component } from '@angular/core';
import {User} from "../../../../models/User";
import {AuthService} from "../../../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user:User=new User();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    //const { username, email, password } = this.user;

    this.authService.register(this.user.username,this.user.firstName,this.user.lastName, this.user.email, this.user.password, this.user.sexe).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
