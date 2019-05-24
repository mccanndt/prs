package com.prs.web;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.prs.business.Product;
import com.prs.business.PurchaseRequest;
import com.prs.business.PurchaseRequestLineItem;
import com.prs.business.User;
import com.prs.business.Vendor;
import com.prs.db.ProductRepository;
import com.prs.db.PurchaseRequestLineItemRepository;
import com.prs.db.PurchaseRequestRepository;
import com.prs.db.UserRepository;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PurchaseRequestLineItemTests {

	@Autowired
	private PurchaseRequestLineItemRepository purchaseRequestLineItemRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;
	@Autowired
	private ProductRepository productRepo;

	@Test
	public void testPurchaseRequestLineItemGetAll() {
		Iterable<PurchaseRequestLineItem> prlis = purchaseRequestLineItemRepo.findAll();
		assertNotNull(prlis);
	}

	@Test
	public void testPurchaseRequestLineItemAdd() {
		Iterable<User> users = userRepo.findAll();
		User u = users.iterator().next();
		PurchaseRequest pr = new PurchaseRequest(u, "description", "justification", LocalDate.now(), "deliveryMode",
				"status", 1.00, LocalDateTime.now(), "reasonForRejection");
		purchaseRequestRepo.save(pr);

		Iterable<Vendor> vendors = vendorRepo.findAll();
		Vendor v = vendors.iterator().next();
		Product p = new Product(v, "partNumber", "name", 99.99, "unit", "photoPath");
		productRepo.save(p);

		PurchaseRequestLineItem prli = new PurchaseRequestLineItem(pr, p, 5);
		assertNotNull(purchaseRequestLineItemRepo.save(prli));
		assertEquals(5, prli.getQuantity());
	}

}
