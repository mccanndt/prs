import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';
import { Product } from '@model/product.class';
import { PrliService } from '@svc/prli.service';
import { PrService } from '@svc/pr.service';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestLineItem } from '@model/prli.class';

@Component({
  selector: 'app-prli-create',
  templateUrl: './prli-create.component.html',
  styleUrls: ['./prli-create.component.css']
})
export class PrliCreateComponent implements OnInit {

  jr: JsonResponse;
  title: string;
  pr: PurchaseRequest;
  prIdStr: string;
  products: Product[];
  prli: PurchaseRequestLineItem = new PurchaseRequestLineItem();

  constructor(private prliSvc: PrliService, private prSvc: PrService, private productSvc: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get all products
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
          console.log(this.products);
        } else {
          console.log("Error getting products");
        }
      }
    );

    // Get the current purchase request
    this.route.params.subscribe(params =>
      this.prIdStr = params['prId']);

    this.prSvc.get(this.prIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          // Set purchase request
          this.prli.purchaseRequest = this.pr;
          // Set title
          this.title = `Purchase-Request-Line-Item-Create - PR ID: ${this.pr.id}`;
        } else {
          console.log("Error getting purchase request");
          // TODO: Implement error handling
        }
      }
    );

  }

  create() {
    console.log(this.prli);
    this.prliSvc.create(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
          console.log(this.pr);
        } else {
          console.log("Error getting purchase request");
          console.log(this.jr.errors);
          // TODO: Implement error handling
        }
      }
    );
  }

}
