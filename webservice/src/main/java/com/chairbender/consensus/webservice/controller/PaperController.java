package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.resource.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 *
 */
@RestController
public class PaperController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping("/papers")
    public List<Paper> papers() {
        return jdbcTemplate.query("SELECT * FROM paper", (rs, rownumber) -> {
            return new Paper(rs.getInt("id"),rs.getString("title"),rs.getString("url"));
        });
    }

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping("/paper/create")
    public void createPaper(@RequestBody Paper paper) {
        String sql = "INSERT INTO paper " +
                "(title, url) VALUES (?, ?)";

        jdbcTemplate.update(sql, paper.getTitle(), paper.getUrl());
    }
}
