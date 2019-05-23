package com.prs;

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

import com.prs.business.Vendor;
import com.prs.db.VendorRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class VendorRepoTests {

	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private TestEntityManager entityManager;

	@Test
	public void findByVendorNameShouldReturnVendor() {
		entityManager
				.persist(new Vendor("code", "name", "address", "city", "st", "zip", "phoneNumber", "email", true));

		Optional<Vendor> v = vendorRepo.findByName("name");

		assertThat(v.get().getName()).isEqualTo("name");
	}
}
