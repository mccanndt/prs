import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrliService } from '@svc/prli.service';
import { PurchaseRequestLineItem } from '@model/prli.class';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {

  jr: JsonResponse;
  jr2: JsonResponse;
  title: string = "Purchase-Request-Lines";
  lineTitle: string = "Lines";
  pr: PurchaseRequest;
  prIdStr: string;
  prliIdStr: string;
  prlis: PurchaseRequestLineItem[];
  prli: PurchaseRequestLineItem;

  constructor(private prSvc: PrService, private prliSvc: PrliService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    this.route.params.subscribe(params =>
      this.prliIdStr = params['prliId']);
    
    // Get the purchase request
    this.prSvc.get(this.prIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          // if second paramater exists, then delete the prli
          if (this.prliIdStr != null && this.prIdStr != '0') {
            this.remove(this.prliIdStr);
          }
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

  remove(idStr) {
    // Get the line item id
    this.prliSvc.get(idStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.prli = this.jr.data as PurchaseRequestLineItem;
          // remove the line item
          this.prliSvc.remove(this.prli).subscribe(
            jsrep => {
              this.jr = jsrep;
              if (this.jr.errors == null) {
                this.prli = this.jr.data as PurchaseRequestLineItem;
                this.router.navigateByUrl(`/pr/lines/${this.pr.id}`);
              } else {
                console.log("Error getting purchase request");
                // TODO: Implement error handling
              }
            }
          );
        } else {
          console.log("Error getting line item");
          // TODO: Implement error handling
        }
      }
    );
  }

  submitForReview() {
    this.prSvc.submit(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
          console.log(this.pr);
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );
  }

}
