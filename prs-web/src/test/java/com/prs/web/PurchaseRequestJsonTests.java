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

import com.prs.business.PurchaseRequest;
import com.prs.business.User;
import com.prs.db.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureJsonTesters
public class PurchaseRequestJsonTests {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JacksonTester<PurchaseRequest> json;

	@Test
	public void serializeProductJsonTest() {
		Iterable<User> users = userRepo.findAll();
		User u = users.iterator().next();

		PurchaseRequest p = new PurchaseRequest(u, "description", "justification", LocalDate.now(), "deliveryMode",
				"status", 1.00, LocalDateTime.now(), "reasonForRejection");

		try {
			assertThat(json.write(p)).extractingJsonPathStringValue("$.description").isEqualTo("description");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
