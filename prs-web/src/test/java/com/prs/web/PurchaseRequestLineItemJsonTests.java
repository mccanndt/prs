package com.prs.web;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.prs.business.Product;
import com.prs.business.PurchaseRequest;
import com.prs.business.PurchaseRequestLineItem;
import com.prs.business.User;
import com.prs.business.Vendor;
import com.prs.db.ProductRepository;
import com.prs.db.PurchaseRequestRepository;
import com.prs.db.UserRepository;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureJsonTesters
@Transactional
public class PurchaseRequestLineItemJsonTests {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private JacksonTester<PurchaseRequestLineItem> json;

	@Test
	public void serializeProductJsonTest() {
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

		try {
			assertThat(json.write(prli)).extractingJsonPathNumberValue("$.quantity").isEqualTo(5);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
