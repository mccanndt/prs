package com.prs;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.prs.business.Product;
import com.prs.business.Vendor;
import com.prs.db.ProductRepository;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ProductTests {

	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private VendorRepository vendorRepo;

	@Test
	public void testProductGetAll() {
		Iterable<Product> products = productRepo.findAll();
		assertNotNull(products);
	}

	@Test
	public void testProductAdd() {
		Iterable<Vendor> vendors = vendorRepo.findAll();
		Vendor v = vendors.iterator().next();
		
		Product p = new Product(v, "partNumber", "name", 99.99, "unit", "photoPath");
		assertNotNull(productRepo.save(p));
		assertEquals("partNumber", p.getPartNumber());
	}

}
