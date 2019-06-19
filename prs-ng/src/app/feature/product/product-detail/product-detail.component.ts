import { Component, OnInit } from '@angular/core';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { JsonResponse } from '@model/json-response.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  jr: JsonResponse;
  product: Product;
  productIdStr: string;
  title: string = "Product-Detail";

  constructor(private productSvc: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.productIdStr = params['id']);

    this.productSvc.get(this.productIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.product = this.jr.data as Product;
        } else {
          console.log("Error getting product");
          // TODO: Implement error handling
        }
      }
    );
  }

  remove() {
    this.productSvc.remove(this.product).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.product = this.jr.data as Product;
          this.router.navigate(['/product/list']);
        } else {
          console.log("Error getting product");
          // TODO: Implement error handling
        }
      }
    );
  }

}
