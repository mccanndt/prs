import { Injectable } from '@angular/core';
import { User } from '@model/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  data = {
    about: 'System Service',
    user: {
      loggedIn: false,
      instance: null
    }
  };

  userIsReviewer() {
    let u: User = this.data.user.instance as User;
    return u.reviewer;
  }

  userIsAdmin() {
    let u: User = this.data.user.instance as User;
    return u.admin;
  }
}
