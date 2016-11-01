package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.bean.response.PaperWithUserReview;
import com.chairbender.consensus.webservice.entity.Paper;
import com.chairbender.consensus.webservice.entity.Review;
import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.repository.PaperRepository;
import com.chairbender.consensus.webservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoints related to reviews
 */
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository mReviewRepository;
    @Autowired
    private PaperController mPaperController;


    @RequestMapping(path = "/accept/{paperId}")
    public PaperWithUserReview acceptReviewForCurrentUser(@PathVariable("paperId") long paperId) {
        return createOrUpdateReviewForCurrentUser(paperId, true);
    }

    @RequestMapping(path = "/reject/{paperId}")
    public PaperWithUserReview rejectReviewForCurrentUser(@PathVariable("paperId") long paperId) {
        return createOrUpdateReviewForCurrentUser(paperId, false);
    }

    /**
     * Updates or sets the current user's review of the paper.
     * @param paperId id of paper to review
     * @param accept whether to accept or reject the paper
     * @return the paper details after applying the user's vote
     */
    private PaperWithUserReview createOrUpdateReviewForCurrentUser(long paperId, boolean accept) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //check if there is an existing review
        Review currentReview = mReviewRepository.findFirstByUserIdAndPaperId(currentUser.getId(), paperId);
        if (currentReview != null) {
            currentReview.setAccept(accept);
            mReviewRepository.save(currentReview);
        } else {
            Review newReview = new Review(currentUser.getId(),paperId,accept);
            mReviewRepository.save(newReview);
        }

        return mPaperController.getPaperWithCurrentUserReview(paperId);
    }


}
