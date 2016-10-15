package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.entity.Paper;
import com.chairbender.consensus.webservice.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/papers")
public class PaperController {
    @Autowired
    private PaperRepository paperRepository;

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping(method = RequestMethod.GET)
    public List<Paper> papers() {
        return paperRepository.findAll();
    }

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping(method = RequestMethod.POST)
    public void createPaper(@RequestBody Paper paper) {
        paperRepository.save(paper);
    }
}
