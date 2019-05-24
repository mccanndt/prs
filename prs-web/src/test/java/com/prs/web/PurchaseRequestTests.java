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

import com.prs.business.PurchaseRequest;
import com.prs.business.User;
import com.prs.db.PurchaseRequestRepository;
import com.prs.db.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PurchaseRequestTests {

	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;
	@Autowired
	private UserRepository userRepo;

	@Test
	public void testPurchaseRequestGetAll() {
		Iterable<PurchaseRequest> prs = purchaseRequestRepo.findAll();
		assertNotNull(prs);
	}

	@Test
	public void testPurchaseRequestAdd() {
		Iterable<User> users = userRepo.findAll();
		User u = users.iterator().next();

		PurchaseRequest p = new PurchaseRequest(u, "description", "justification", LocalDate.now(), "deliveryMode",
				"status", 1.00, LocalDateTime.now(), "reasonForRejection");
		assertNotNull(purchaseRequestRepo.save(p));
		assertEquals("description", p.getDescription());
	}

}
