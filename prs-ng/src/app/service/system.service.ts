import { Injectable } from '@angular/core';

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

}
