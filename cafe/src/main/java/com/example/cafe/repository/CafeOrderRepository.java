package com.example.cafe.repository;

import com.example.cafe.model.CafeOrder;
import com.example.cafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface CafeOrderRepository extends JpaRepository<CafeOrder, Long> {
    List<CafeOrder> findByUser(User user);
    @Query("SELECT o FROM CafeOrder o JOIN FETCH o.items")
    List<CafeOrder> findAllWithItems();
}
