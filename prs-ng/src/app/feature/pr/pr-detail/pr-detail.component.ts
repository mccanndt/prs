import { Component, OnInit } from '@angular/core';
import { PrService } from '@svc/pr.service';
import { PurchaseRequest } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.component.html',
  styleUrls: ['./pr-detail.component.css']
})
export class PrDetailComponent implements OnInit {

  jr: JsonResponse;
  prIdStr: string;
  pr: PurchaseRequest;
  title: string = "Purchase-Request-Detail";

  constructor(private prSvc: PrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    
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
  }

  remove() {
    this.prSvc.remove(this.pr).subscribe(
      jsrep => {
        this.jr = jsrep;
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

}
