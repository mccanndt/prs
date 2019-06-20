import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-pr-review',
  templateUrl: './pr-review.component.html',
  styleUrls: ['./pr-review.component.css']
})
export class PrReviewComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Review";
  prs: PurchaseRequest[];
  loggedInUser: User;

  constructor(private prSvc: PrService, private systemSvc: SystemService) { }

  ngOnInit() {
    if (this,this.systemSvc.data.user.loggedIn) {
      this.loggedInUser = this.systemSvc.data.user.instance;
    }
    this.prSvc.review(this.loggedInUser.id.toString()).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prs = this.jr.data as PurchaseRequest[];
          console.log(this.prs);
        } else {
          console.log("Error getting purchase requests");
          // TODO: Implement error handling
        }
      }
    );
  }

}
