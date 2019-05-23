package com.prs.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.prs.business.JsonResponse;
import com.prs.business.Vendor;
import com.prs.db.VendorRepository;

@RestController
@RequestMapping("/vendors")
public class VendorController {

	@Autowired
	private VendorRepository vendorRepo;

	@GetMapping("/")
	public JsonResponse getAll() {
		JsonResponse jr = null;
		try {
			jr = JsonResponse.getInstance(vendorRepo.findAll());
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@GetMapping("/{id}")
	public JsonResponse get(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			if (vendorRepo.existsById(id)) {
				jr = JsonResponse.getInstance(vendorRepo.findById(id));
			} else {
				jr = JsonResponse.getInstance("No vendor found for id: " + id);
			}
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PostMapping("/")
	public JsonResponse add(@RequestBody Vendor v) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			jr = JsonResponse.getInstance(vendorRepo.save(v));
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/")
	public JsonResponse update(@RequestBody Vendor v) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (vendorRepo.existsById(v.getId())) {
				jr = JsonResponse.getInstance(vendorRepo.save(v));
			} else {
				jr = JsonResponse
						.getInstance("Vendor ID: " + v.getId() + " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@DeleteMapping("/")
	public JsonResponse delete(@RequestBody Vendor v) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (vendorRepo.existsById(v.getId())) {
				vendorRepo.delete(v);
				jr = JsonResponse.getInstance("Vendor deleted");
			} else {
				jr = JsonResponse.getInstance(
						"Vendor ID: " + v.getId() + " does not exist and you are attempting to delete it.");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

}
