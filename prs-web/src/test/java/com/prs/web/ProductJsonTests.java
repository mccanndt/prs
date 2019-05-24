package com.prs.web;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.context.junit4.SpringRunner;

import com.prs.business.Product;
import com.prs.business.Vendor;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureJsonTesters
public class ProductJsonTests {

	@Autowired
	private VendorRepository vendorRepository;
	@Autowired
	private JacksonTester<Product> json;

	@Test
	public void serializeProductJsonTest() {
		Iterable<Vendor> vendors = vendorRepository.findAll();
		Vendor v = vendors.iterator().next();
		Product p = new Product(v, "partNumber", "name", 99.99, "unit", "photoPath");

		try {
			assertThat(json.write(p)).extractingJsonPathStringValue("$.name").isEqualTo("name");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
