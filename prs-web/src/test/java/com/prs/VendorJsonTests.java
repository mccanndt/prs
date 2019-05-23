package com.prs;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.context.junit4.SpringRunner;

import com.prs.business.Vendor;

@RunWith(SpringRunner.class)
@JsonTest
public class VendorJsonTests {

	@Autowired
	private JacksonTester<Vendor> json;

	@Test
	public void serializeUserJsonTest() {
		Vendor vendor = new Vendor("code", "name", "address", "city", "st", "zip", "phoneNumber", "email", true);

		try {
			assertThat(json.write(vendor)).extractingJsonPathStringValue("$.name").isEqualTo("name");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
