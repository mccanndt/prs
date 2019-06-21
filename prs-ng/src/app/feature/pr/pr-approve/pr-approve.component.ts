import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PurchaseRequestLineItem } from '@model/prli.class';
import { PrService } from '@svc/pr.service';
import { PrliService } from '@svc/prli.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-approve',
  templateUrl: './pr-approve.component.html',
  styleUrls: ['./pr-approve.component.css']
})
export class PrApproveComponent implements OnInit {

  jr: JsonResponse;
  jr2: JsonResponse;
  title: string = "Purchase-Request-Approve / Reject";
  lineTitle: string = "Lines";
  pr: PurchaseRequest;
  prIdStr: string;
  prlis: PurchaseRequestLineItem[];

  constructor(private prSvc: PrService, private prliSvc: PrliService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);

    // Get the purchase request
    this.prSvc.get(this.prIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );

    // Get PRLI's
    this.prliSvc.getByPurchaseRequest(this.prIdStr).subscribe(
      jsrep2 => {
        this.jr2 = jsrep2;
        if (this.jr2.errors == null) {
          this.prlis = this.jr2.data as PurchaseRequestLineItem[];
          console.log(this.prlis);
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );

  }

  approve() {
    this.prSvc.approve(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
        } else {
          console.log("Error getting purchase rquest");
        }
      }
    );
  }

  reject() {
    this.prSvc.reject(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
        } else {
          console.log("Error getting purchase rquest");
        }
      }
    );
  }

}
