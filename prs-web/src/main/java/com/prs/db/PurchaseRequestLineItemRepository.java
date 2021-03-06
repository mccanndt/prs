package com.prs.db;

import org.springframework.data.repository.CrudRepository;

import com.prs.business.PurchaseRequest;
import com.prs.business.PurchaseRequestLineItem;

public interface PurchaseRequestLineItemRepository extends CrudRepository<PurchaseRequestLineItem, Integer> {
	Iterable<PurchaseRequestLineItem> findByPurchaseRequest(PurchaseRequest purchaseRequest);
}
