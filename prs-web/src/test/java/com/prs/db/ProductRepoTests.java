package com.prs.db;

import static org.assertj.core.api.Assertions.assertThat;

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
import com.prs.business.Vendor;
import com.prs.db.ProductRepository;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ProductRepoTests {

	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private TestEntityManager entityManager;

	@Test
	public void findByProductNameShouldReturnProduct() {
		Iterable<Vendor> vendors = vendorRepo.findAll();
		Vendor v = vendors.iterator().next();

		Product p = new Product(v, "partNumber", "name", 99.99, "unit", "photoPath");
		entityManager.persist(p);

		Optional<Product> p1 = productRepo.findById(p.getId());

		assertThat(p1.get().getName()).isEqualTo("name");
	}
}
