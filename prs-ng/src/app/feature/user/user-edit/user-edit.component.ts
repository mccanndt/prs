import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  jr: JsonResponse;
  user: User;
  userIdStr: string;
  title: string = "User-Edit";

  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.userIdStr = params['id']);
    
    this.userSvc.get(this.userIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.user = this.jr.data as User;
        } else {
          console.log("Error getting user");
          // TODO: Implement error handling
        }
      }
    );
  }

  edit() {
    this.userSvc.edit(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.user = this.jr.data as User;
          this.router.navigate(['/user/list']);
        } else {
          console.log("Error getting user");
          // TODO: Implement error handling
        }
      }
    );
  }

}
