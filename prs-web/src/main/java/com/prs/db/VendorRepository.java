package com.prs.db;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.prs.business.Vendor;

public interface VendorRepository extends CrudRepository<Vendor, Integer> {
	Optional<Vendor> findByName(String name);
}
