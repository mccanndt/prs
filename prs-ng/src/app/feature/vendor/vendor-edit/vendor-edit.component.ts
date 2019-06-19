import { Component, OnInit } from '@angular/core';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';
import { JsonResponse } from '@model/json-response.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  jr: JsonResponse;
  vendor: Vendor;
  vendorIdStr: string;
  title: string = "Vendor-Edit";

  constructor(private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.vendorIdStr = params['id']);
    
    this.vendorSvc.get(this.vendorIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendor = this.jr.data as Vendor;
        } else {
          console.log("Error getting vendor");
          // TODO: Implement error handling
        }
      }
    );
  }

  edit() {
    this.vendorSvc.edit(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
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
