package com.prs.web;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.prs.business.User;
import com.prs.db.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserTests {

	@Autowired
	private UserRepository userRepo;

	@Test
	public void testUserGetAll() {
		Iterable<User> users = userRepo.findAll();
		assertNotNull(users);
	}

	@Test
	public void testUserAdd() {
		User u = new User("userName", "password", "firstName", "lastName", "phoneNumber", "email", true, true);
		assertNotNull(userRepo.save(u));
		assertEquals("lastName", u.getLastName());
	}

}
