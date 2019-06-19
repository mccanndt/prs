import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PrService } from '@svc/pr.service';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {

  jr: JsonResponse;
  prs: PurchaseRequest[];
  title: string = "Purchase-Request-List";
  formattedDate: Date;
  
  constructor(private prSvc: PrService) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
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
