import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { Router } from '@angular/router';
import { PrService } from '@svc/pr.service';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.component.html',
  styleUrls: ['./pr-create.component.css']
})
export class PrCreateComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Create";
  pr: PurchaseRequest = new PurchaseRequest();
  
  constructor(private prSvc: PrService, private systemSvc: SystemService, private router: Router) { }

  ngOnInit() {
    if (this.systemSvc.data.user.loggedIn) {
      this.pr.user = this.systemSvc.data.user.instance;
    } else {
      console.log("User is not logged in");
    }
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
          // TODO: Implement error handling
        }
      }
    );
  }

}
