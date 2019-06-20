package com.prs.web;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.prs.business.JsonResponse;
import com.prs.business.PurchaseRequest;
import com.prs.business.User;
import com.prs.db.PurchaseRequestRepository;
import com.prs.db.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/purchase-requests")
public class PurchaseRequestController {

	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;
	@Autowired
	private UserRepository userRepo;

	@GetMapping("/")
	public JsonResponse getAll() {
		JsonResponse jr = null;
		try {
			jr = JsonResponse.getInstance(purchaseRequestRepo.findAll());
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@GetMapping("/{id}")
	public JsonResponse get(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			if (purchaseRequestRepo.existsById(id)) {
				jr = JsonResponse.getInstance(purchaseRequestRepo.findById(id));
			} else {
				jr = JsonResponse.getInstance("No purchaseRequest found for id: " + id);
			}
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PostMapping("/")
	public JsonResponse add(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/")
	public JsonResponse update(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestRepo.existsById(pr.getId())) {
				jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
			} else {
				jr = JsonResponse.getInstance(
						"PurchaseRequest ID: " + pr.getId() + " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@DeleteMapping("/{id}")
	public JsonResponse delete(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			Optional<PurchaseRequest> purchaseRequest = purchaseRequestRepo.findById(id);
			if (purchaseRequest.isPresent()) {
				purchaseRequestRepo.deleteById(id);
				jr = JsonResponse.getInstance(purchaseRequest);
			} else
				jr = JsonResponse.getInstance("Delete failed. No purchaseRequest for id: " + id);
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PostMapping("/submit-new")
	public JsonResponse submitNew(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			pr.setStatus("New");
			pr.setSubmittedDate(LocalDateTime.now());
			jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/submit-review")
	public JsonResponse submitForReview(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestRepo.existsById(pr.getId())) {
				if (pr.getTotal() <= 50.00) {
					pr.setStatus("Approved");
					pr.setSubmittedDate(LocalDateTime.now());
				} else {
					pr.setStatus("Review");
					pr.setSubmittedDate(LocalDateTime.now());
				}
				jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
			} else {
				jr = JsonResponse.getInstance(
						"PurchaseRequest ID: " + pr.getId() + " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@GetMapping("/list-review")
	public JsonResponse listReview(@RequestBody User user) {
		JsonResponse jr = null;
		try {
			Iterable<PurchaseRequest> prs = purchaseRequestRepo.findByStatusAndUserNot("Review", user);
			jr = JsonResponse.getInstance(prs);
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}
	
	@GetMapping("/list-review/{id}")
	public JsonResponse listReview(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			User user = userRepo.findById(id).orElse(null);
			Iterable<PurchaseRequest> prs = purchaseRequestRepo.findByStatusAndUserNot("Review", user);
			jr = JsonResponse.getInstance(prs);
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/approve")
	public JsonResponse approve(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestRepo.existsById(pr.getId())) {
				pr.setStatus("Approved");
				jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
			} else {
				jr = JsonResponse.getInstance(
						"PurchaseRequest ID: " + pr.getId() + " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/reject")
	public JsonResponse reject(@RequestBody PurchaseRequest pr) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestRepo.existsById(pr.getId())) {
				pr.setStatus("Rejected");
				jr = JsonResponse.getInstance(purchaseRequestRepo.save(pr));
			} else {
				jr = JsonResponse.getInstance(
						"PurchaseRequest ID: " + pr.getId() + " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

}
