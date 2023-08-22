import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;
  
    constructor(private http: HttpClient, private router: Router) { }
  
    isAuthenticated(): boolean {
      return this.authenticated;
    }
  
    login(username: string, password: string) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const payload = {
        username: username,
        password: password
      };
  
      this.http.post<any>('http://localhost:8000/api/login/', JSON.stringify(payload), { headers })
        .subscribe(
          (response: any) => {
            if (response && response.message === 'Login successful') {
              console.log('Login successful');
              this.setAuthenticated(true);
              this.router.navigate(['/csv']);
              window.alert('Login successful!');
            } else {
              console.log('Invalid credentials');
              window.alert('Invalid credentials!');
            }
          },
          error => {
            console.error(error);
            console.log('An error occurred');
            window.alert('An error occurred. Please try again later.');

          }
        );
    }
  
    setAuthenticated(authenticated: boolean): void {
      this.authenticated = authenticated;
    }
  }
  


