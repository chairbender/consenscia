package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.bean.response.PaperWithUserReview;
import com.chairbender.consensus.webservice.entity.Paper;
import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.repository.PaperRepository;
import com.chairbender.consensus.webservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/papers")
public class PaperController {
    @Autowired
    private PaperRepository mPaperRepository;
    @Autowired
    private ReviewRepository mReviewRepository;

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping(method = RequestMethod.GET)
    public List<Paper> papers() {
        return mPaperRepository.findAll();
    }

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping(method = RequestMethod.POST)
    public void createPaper(@RequestBody Paper paper) {
        mPaperRepository.save(paper);
    }

    /**
     *
     * @return all of the papers in the database
     */
    @RequestMapping("/detail")
    public PaperWithUserReview getPaperWithCurrentUserReview(@RequestParam long pPaperId) {
        Paper requestedPaper = mPaperRepository.findOne(pPaperId);
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return PaperWithUserReview.getFromPaperForCurrentUser(requestedPaper, currentUser,mReviewRepository);
    }
}
