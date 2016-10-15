package com.chairbender.consensus.webservice.resource;

/**
 * Represents a paper.
 */
public class Paper {
    private long id;
    private String title;
    private String url;

    public Paper() {

    }

    public Paper(long id, String title, String url) {
        this.id = id;
        this.title = title;
        this.url = url;
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

    public void setId(long id) {
        this.id = id;
    }
}
