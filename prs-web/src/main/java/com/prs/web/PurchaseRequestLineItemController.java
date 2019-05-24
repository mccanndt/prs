package com.prs.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.prs.business.JsonResponse;
import com.prs.business.PurchaseRequest;
import com.prs.business.PurchaseRequestLineItem;
import com.prs.db.PurchaseRequestLineItemRepository;
import com.prs.db.PurchaseRequestRepository;

@RestController
@RequestMapping("/purchase-request-line-items")
public class PurchaseRequestLineItemController {

	@Autowired
	private PurchaseRequestLineItemRepository purchaseRequestLineItemRepo;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;

	@GetMapping("/")
	public JsonResponse getAll() {
		JsonResponse jr = null;
		try {
			jr = JsonResponse.getInstance(purchaseRequestLineItemRepo.findAll());
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@GetMapping("/{id}")
	public JsonResponse get(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			if (purchaseRequestLineItemRepo.existsById(id)) {
				jr = JsonResponse.getInstance(purchaseRequestLineItemRepo.findById(id));
			} else {
				jr = JsonResponse.getInstance("No purchaseRequestLineItem found for id: " + id);
			}
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}
	
	@GetMapping("/lines-for-pr/{id}")
	public JsonResponse getLineItemsForPurchaseRequest(@PathVariable int id) {
		JsonResponse jr = null;
		try {
			if (purchaseRequestRepo.existsById(id)) {
				PurchaseRequest pr = purchaseRequestRepo.findById(id).orElse(null);
				jr = JsonResponse.getInstance(purchaseRequestLineItemRepo.findByPurchaseRequest(pr));
			} else {
				jr = JsonResponse.getInstance("No purchaseRequest found for id: " + id);
			}
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PostMapping("/")
	public JsonResponse add(@RequestBody PurchaseRequestLineItem prli) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			jr = JsonResponse.getInstance(purchaseRequestLineItemRepo.save(prli));
			calculatePurchaseRequestTotal(prli);
		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@PutMapping("/")
	public JsonResponse update(@RequestBody PurchaseRequestLineItem prli) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestLineItemRepo.existsById(prli.getId())) {
				jr = JsonResponse.getInstance(purchaseRequestLineItemRepo.save(prli));
				calculatePurchaseRequestTotal(prli);
			} else {
				jr = JsonResponse.getInstance("PurchaseRequestLineItem ID: " + prli.getId()
						+ " does not exist and you are attempting to save it");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	@DeleteMapping("/")
	public JsonResponse delete(@RequestBody PurchaseRequestLineItem prli) {
		JsonResponse jr = null;
		// NOTE: May need to enhance execption handling if more than one excpetion type
		// needs to be caught
		try {
			if (purchaseRequestLineItemRepo.existsById(prli.getId())) {
				purchaseRequestLineItemRepo.delete(prli);
				calculatePurchaseRequestTotal(prli);
				jr = JsonResponse.getInstance("PurchaseRequestLineItem deleted");
			} else {
				jr = JsonResponse.getInstance("PurchaseRequestLineItem ID: " + prli.getId()
						+ " does not exist and you are attempting to delete it.");
			}

		} catch (Exception e) {
			jr = JsonResponse.getInstance(e);
		}
		return jr;
	}

	private void calculatePurchaseRequestTotal(PurchaseRequestLineItem prli) {
		double sum = 0;
		PurchaseRequest pr = prli.getPurchaseRequest();
		Iterable<PurchaseRequestLineItem> prlis = purchaseRequestLineItemRepo.findByPurchaseRequest(pr);
		for (PurchaseRequestLineItem li : prlis) {
			sum += li.getQuantity() * li.getProduct().getPrice();
		}
		prli.getPurchaseRequest().setTotal(sum);

		purchaseRequestRepo.save(pr);
	}

}
