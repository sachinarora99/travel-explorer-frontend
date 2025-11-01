import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSource = new BehaviorSubject<string | null>(localStorage.getItem('loggedInUser'));
  loggedInUser$ = this.loggedInUserSource.asObservable();

  // Update when user logs in
  login(userName: string) {
    localStorage.setItem('loggedInUser', userName);
    this.loggedInUserSource.next(userName);
  }

  // Update when user logs out
  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSource.next(null);
  }
}
