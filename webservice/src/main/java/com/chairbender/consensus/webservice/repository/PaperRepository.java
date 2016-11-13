package com.chairbender.consensus.webservice.repository;

import com.chairbender.consensus.webservice.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaperRepository extends JpaRepository<Paper, Long> {
    List<Paper> findFirst10ByOrderByCreatedDesc();
    List<Paper> findByTitleContainingIgnoreCase(String query);

    Paper save(Paper toSave);

}
