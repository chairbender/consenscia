package com.chairbender.consensus.webservice.entity;

import javax.persistence.*;

/**
 * Represents a review of a paper by a user
 */
@Entity
public class Review {
    @Id
    @GeneratedValue
    private long id;

    @Column(name = "userId")
    private long userId;
    @Column(name = "paperId")
    private long paperId;
    private boolean accept;

    Review() { // jpa only

    }

    /**
     *
     * @param pUserId id of user whose review this is
     * @param pPaperId id of the paper this review is for
     * @param pAccept whether the review is an accept or reject
     */
    public Review(long pUserId, long pPaperId, boolean pAccept) {
        userId = pUserId;
        paperId = pPaperId;
        accept = pAccept;
    }

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(int pUserId) {
        userId = pUserId;
    }

    public long getPaperId() {
        return paperId;
    }

    public void setPaperId(int pPaperId) {
        paperId = pPaperId;
    }

    public boolean isAccept() {
        return accept;
    }

    public void setAccept(boolean pAccept) {
        accept = pAccept;
    }
}
