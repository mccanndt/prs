import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Router } from '@angular/router';
import { VendorService } from '@svc/vendor.service';
import { Vendor } from '@model/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Product-Create";
  vendors: Vendor[];
  product: Product = new Product();
  
  constructor(private productSvc: ProductService, private vendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendors = this.jr.data as Vendor[];
        } else {
          console.log("Error getting vendors");
        }
      }
    );
  }

  create() {
    this.productSvc.create(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/product/list']);
          console.log(this.product);
        } else {
          console.log("Error getting product");
          // TODO: Implement error handling
        }
      }
    );
  }

}
