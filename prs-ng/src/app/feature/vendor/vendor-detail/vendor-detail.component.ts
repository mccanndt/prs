import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  jr: JsonResponse;
  vendor: Vendor;
  vendorIdStr: string;
  title: string = "Vendor-Detail";

  constructor(private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.vendorIdStr = params['id']);

    this.vendorSvc.get(this.vendorIdStr).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.vendor = this.jr.data as Vendor;
        } else {
          console.log("Error getting vendor");
          // TODO: Implement error handling
        }
      }
    );
  }

  remove() {
    this.vendorSvc.remove(this.vendor).subscribe(
      jsrep => {
        this.jr = jsrep;
        if (this.jr.errors == null) {
          this.vendor = this.jr.data as Vendor;
          this.router.navigate(['/vendor/list']);
        } else {
          console.log("Error getting vendor");
          // TODO: Implement error handling
        }
      }
    );
  }

}
