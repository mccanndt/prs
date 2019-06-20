import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { Product } from '@model/product.class';
import { PurchaseRequestLineItem } from '@model/prli.class';
import { PrliService } from '@svc/prli.service';
import { ProductService } from '@svc/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prli-edit',
  templateUrl: './prli-edit.component.html',
  styleUrls: ['./prli-edit.component.css']
})
export class PrliEditComponent implements OnInit {

  jr: JsonResponse;
  title: string;
  products: Product[];
  prli: PurchaseRequestLineItem;
  prliIdStr: string;

  constructor(private prliSvc: PrliService, private productSvc: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get all products
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
        } else {
          console.log("Error getting products");
        }
      }
    );

    // Get the current line item
    this.route.params.subscribe(params =>
      this.prliIdStr = params['id']);

    this.prliSvc.get(this.prliIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prli = this.jr.data as PurchaseRequestLineItem;
          this.title = `Purchase-Request-Line-Item-Edit - PR ID: ${this.prli.purchaseRequest.id}`;
        } else {
          console.log("Error getting line item");
        }
      }
    );

  }

  edit() {
    this.prliSvc.edit(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prli = this.jr.data as PurchaseRequestLineItem;
          this.router.navigate([`/pr/lines/${this.prli.purchaseRequest.id}`]);
        } else {
          console.log("Error getting product");
          // TODO: Implement error handling
        }
      }
    );
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
