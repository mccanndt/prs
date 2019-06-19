import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  jr: JsonResponse;
  user: User;
  userIdStr: string;
  title: string = "User-Detail";

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

  remove() {
    this.userSvc.remove(this.user).subscribe(
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
