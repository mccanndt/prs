import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrliService } from '@svc/prli.service';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Lines";
  lineTitle: string = "Lines";
  pr: PurchaseRequest;
  prIdStr: string;

  constructor(private prSvc: PrService, private prliSvc: PrliService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    
    this.prSvc.get(this.prIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          // Get PRLI's
          this.prliSvc.getByPurchaseRequest(this.pr.id.toString()).subscribe(
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
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );
    
  }

}
