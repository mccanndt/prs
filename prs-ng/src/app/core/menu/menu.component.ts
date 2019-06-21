import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@model/menu-item.class';
import { SystemService } from '@svc/system.service';
import { User } from '@model/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [
    //new MenuItem("PRS","/home","This is the home menu item"),
    new MenuItem("User","/user/list","This is the user menu item"),
    new MenuItem("Vendor","/vendor/list","This is the vendor menu item"),
    new MenuItem("Product","/product/list","This is the product menu item"),
    new MenuItem("Request","/pr/list","This is the pr menu item"),
    new MenuItem("Review","/pr/review","This is the pr review menu item"),
    //new MenuItem("Login","/user/login","This is the login menu item"),
    new MenuItem("About","/about","This is the about menu item")
  ];
  loggedInUser: User;

  constructor(private systemSvc: SystemService, private router: Router) { }

  ngOnInit() {
    if (this.systemSvc.data.user.loggedIn) {
      this.loggedInUser = this.systemSvc.data.user.instance;
    } else {
      console.log("User is not logged in");
      this.router.navigateByUrl("/user/login");
    }
  }

  logout() {
    this.systemSvc.data.user.loggedIn = false;
    this.systemSvc.data.user.instance = null;
    this.router.navigateByUrl("/user/login");
  }
}
