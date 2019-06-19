import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from '@model/pr.class';
import { User } from '@model/user.class';
import { JsonResponse } from '@model/json-response.class';
import { Router } from '@angular/router';
import { UserService } from '@svc/user.service';
import { PrService } from '@svc/pr.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.component.html',
  styleUrls: ['./pr-create.component.css']
})
export class PrCreateComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Create";
  users: User[];
  pr: PurchaseRequest = new PurchaseRequest();
  
  constructor(private prSvc: PrService, private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    this.userSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.users = this.jr.data as User[];
          console.log(this.users);
        } else {
          console.log("Error getting users");
        }
      }
    );
  }

  create() {
    this.prSvc.create(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
          console.log(this.pr);
        } else {
          console.log("Error getting purchase request");
          console.log(this.jr.errors);
          // TODO: Implement error handling
        }
      }
    );
  }

}
