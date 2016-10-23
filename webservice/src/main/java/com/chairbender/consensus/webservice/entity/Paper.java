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

    Paper() { // jpa only

    }

    public long getId() {
        return id;
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
}