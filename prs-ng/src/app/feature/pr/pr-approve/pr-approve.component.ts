import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { PurchaseRequestLineItem } from '@model/prli.class';

@Component({
  selector: 'app-pr-approve',
  templateUrl: './pr-approve.component.html',
  styleUrls: ['./pr-approve.component.css']
})
export class PrApproveComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Purchase-Request-Approve / Reject";
  pr: PurchaseRequest;
  prlis: PurchaseRequestLineItem[];

  constructor() { }

  ngOnInit() {
  }

}
