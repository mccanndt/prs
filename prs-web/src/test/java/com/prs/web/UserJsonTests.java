package com.prs.web;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.context.junit4.SpringRunner;

import com.prs.business.User;

@RunWith(SpringRunner.class)
@JsonTest
public class UserJsonTests {

	@Autowired
	private JacksonTester<User> json;

	@Test
	public void serializeUserJsonTest() {
		User user = new User("userName", "password", "firstName", "lastName", "phoneNumber", "email", true, true);

		try {
			assertThat(json.write(user)).extractingJsonPathStringValue("$.password").isEqualTo("password");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
