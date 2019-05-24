package com.prs.db;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.prs.business.Product;
import com.prs.business.PurchaseRequest;
import com.prs.business.PurchaseRequestLineItem;
import com.prs.business.User;
import com.prs.business.Vendor;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class PurchaseRequestLineItemRepoTests {

	@Autowired
	private PurchaseRequestLineItemRepository purchaseRequestLineItemRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private TestEntityManager entityManager;

	@Test
	public void findByPurchaseRequestLineItemShouldReturnPurchaseRequestLineItem() {
		Iterable<User> users = userRepo.findAll();
		User u = users.iterator().next();
		PurchaseRequest pr = new PurchaseRequest(u, "description", "justification", LocalDate.now(), "deliveryMode",
				"status", 1.00, LocalDateTime.now(), "reasonForRejection");

		Iterable<Vendor> vendors = vendorRepo.findAll();
		Vendor v = vendors.iterator().next();
		Product p = new Product(v, "partNumber", "name", 99.99, "unit", "photoPath");

		PurchaseRequestLineItem prli = new PurchaseRequestLineItem(pr, p, 5);

		entityManager.persist(pr);
		entityManager.persist(p);
		entityManager.persist(prli);

		Optional<PurchaseRequestLineItem> prli1 = purchaseRequestLineItemRepo.findById(prli.getId());

		assertThat(prli1.get().getQuantity()).isEqualTo(5);
	}
}
