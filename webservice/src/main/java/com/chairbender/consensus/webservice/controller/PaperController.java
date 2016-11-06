package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.bean.response.PaperWithUserReview;
import com.chairbender.consensus.webservice.entity.Paper;
import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.repository.PaperRepository;
import com.chairbender.consensus.webservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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

    @RequestMapping(method = RequestMethod.POST)
    public void createPaper(@RequestBody Paper paper) {
        mPaperRepository.save(paper);
    }

    /**
     *
     * @return the requested paper along with the current user's review of that paper
     */
    @RequestMapping("/detail/{paperId}")
    public PaperWithUserReview getPaperWithCurrentUserReview(@PathVariable("paperId") long pPaperId) {
        Paper requestedPaper = mPaperRepository.findOne(pPaperId);
        //check if they're logged in. If so, provide the user's vote info along with the response
        User currentUser = null;
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken)) {
            currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }

        return PaperWithUserReview.getFromPaperForCurrentUser(requestedPaper, currentUser,mReviewRepository);
    }
}
