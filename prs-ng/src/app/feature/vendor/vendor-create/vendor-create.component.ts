import { Component, OnInit } from '@angular/core';
import { VendorService } from '@svc/vendor.service';
import { Vendor } from '@model/vendor.class';
import { JsonResponse } from '@model/json-response.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  jr: JsonResponse;
  title: string = "Vendor-Create";
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.vendorSvc.create(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/vendor/list']);
          console.log(this.vendor);
        } else {
          console.log("Error getting vendor");
          // TODO: Implement error handling
        }
      }
    );
  }

}
