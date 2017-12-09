package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.print.attribute.standard.DateTimeAtCreation;

@Entity // This tells Hibernate to make a table out of this class

public class File {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String email;

    private String filename;

    private String filepath;
    private DateTimeAtCreation modifiedtime;

    private String deleted;

    private String starred;

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}