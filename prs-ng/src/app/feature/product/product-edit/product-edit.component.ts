import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Vendor } from '@model/vendor.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Product-Edit";
  vendors: Vendor[];
  product: Product;
  productIdStr: string;

  constructor(private productSvc: ProductService, private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendors = this.jr.data as Vendor[];
          console.log(this.vendors);
        } else {
          console.log("Error getting vendors");
          // TODO: Implement error handling
        }
      }
    );

    this.route.params.subscribe( params =>
      this.productIdStr = params['id']);
    
    this.productSvc.get(this.productIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.product = this.jr.data as Product;
        } else {
          console.log("Error getting product");
          // TODO: Implement error handling
        }
      }
    );
  }

  edit() {
    this.productSvc.edit(this.product).subscribe(
      jresp => {
        this.jr = jresp;
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

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
