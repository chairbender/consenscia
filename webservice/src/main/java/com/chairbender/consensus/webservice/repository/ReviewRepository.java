package com.chairbender.consensus.webservice.repository;

import com.chairbender.consensus.webservice.entity.Paper;
import com.chairbender.consensus.webservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserIdAndPaperId(long userId, long paperId);
}
