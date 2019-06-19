import { Component, OnInit } from '@angular/core';
import { User } from '@model/user.class';
import { PurchaseRequest } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { UserService } from '@svc/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrService } from '@svc/pr.service';

@Component({
  selector: 'app-pr-edit',
  templateUrl: './pr-edit.component.html',
  styleUrls: ['./pr-edit.component.css']
})
export class PrEditComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Edit";
  users: User[];
  pr: PurchaseRequest;
  prIdStr: string;

  constructor(private prSvc: PrService, private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.users = this.jr.data as User[];
          console.log(this.users);
        } else {
          console.log("Error getting users");
          // TODO: Implement error handling
        }
      }
    );

    this.route.params.subscribe( params =>
      this.prIdStr = params['id']);
    
    this.prSvc.get(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );
  }

  edit() {
    this.prSvc.edit(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          this.router.navigate(['/pr/list']);
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
