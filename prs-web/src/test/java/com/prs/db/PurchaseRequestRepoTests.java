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

import com.prs.business.PurchaseRequest;
import com.prs.business.User;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class PurchaseRequestRepoTests {

	@Autowired
	private PurchaseRequestRepository purchaseRequestRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private TestEntityManager entityManager;

	@Test
	public void findByPurchaseRequestShouldReturnPurchaseRequest() {
		Iterable<User> users = userRepo.findAll();
		User u = users.iterator().next();

		PurchaseRequest p = new PurchaseRequest(u, "description", "justification", LocalDate.now(), "deliveryMode",
				"status", 1.00, LocalDateTime.now(), "reasonForRejection");
		entityManager.persist(p);

		Optional<PurchaseRequest> p1 = purchaseRequestRepo.findById(p.getId());

		assertThat(p1.get().getDescription()).isEqualTo("description");
	}
}
