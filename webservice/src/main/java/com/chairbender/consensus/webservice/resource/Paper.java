package com.chairbender.consensus.webservice.resource;

/**
 * Represents a paper.
 */
public class Paper {
    private final long id;
    private final String title;
    private final String url;

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
}
