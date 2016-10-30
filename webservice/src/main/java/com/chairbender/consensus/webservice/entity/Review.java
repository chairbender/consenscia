package com.chairbender.consensus.webservice.entity;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Represents a review of a paper by a user
 */
@Entity
public class Review {
    @Id
    @GeneratedValue
    private long id;

    private long userId;
    private long paperId;
    private boolean accept;

    Review() { // jpa only

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
