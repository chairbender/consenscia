package com.chairbender.consensus.webservice.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Represents a single paper.
 */
@Entity
public class Paper {
    @Id
    @GeneratedValue
    private long id;

    private String title;
    private String url;
    private int acceptions = 0;
    private int rejections = 0;

    public Paper() { // jpa only

    }

    public long getId() {
        return id;
    }

    public int getAcceptions() {
        return acceptions;
    }

    public void setAcceptions(int pAcceptions) {
        acceptions = pAcceptions;
    }

    public int getRejections() {
        return rejections;
    }

    public void setRejections(int pRejections) {
        rejections = pRejections;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Indicate that a review has changed from ~pAccept to pAccept. Updates
     * the corresponding review counts.
     *
     * @param pAccept whether the new review is accept or reject
     */
    public void changeReview(boolean pAccept) {
        if (pAccept) {
            acceptions++;
            rejections--;
        } else {
            rejections++;
            acceptions--;
        }
    }

    /**
     * Indicate that a new review is submitted for the paper. Updates
     * the corresponding review count.
     *
     * @param pAccept whether the new review is accept or reject
     */
    public void addReview(boolean pAccept) {
        if (pAccept) {
            acceptions++;
        } else {
            rejections++;
        }
    }
}
