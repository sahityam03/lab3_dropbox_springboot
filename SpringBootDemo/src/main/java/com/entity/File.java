package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.print.attribute.standard.DateTimeAtCreation;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity // This tells Hibernate to make a table out of this class

public class File {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String email;
    private String filename;
    private String filepath;
    private String modifiedtime;
    private String deleted;
    private String starred;
    private String shared;
    private String type;

    public String getFilepath() {
        return filepath;
    }

    public String getType() {
        return type;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public void setModifiedtime() {
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        this.modifiedtime = sdf.format(new Date());
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

    public String getStarred() {
        return starred;
    }

    public String getModifiedtime() {
        return modifiedtime;
    }

    public String getDeleted() {
        return deleted;
    }

    public String getShared() {
        return shared;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setStarred(String status) {
        this.starred = status;
    }

    public void setDeleted() {
        this.deleted = "Y";
    }

    public void setShared() {
        this.shared = "Y";
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDeleted(String status) {
        this.deleted = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", filename='" + filename + '\'' +
                ", filepath='" + filepath + '\'' +
                ", modifiedtime='" + modifiedtime + '\'' +
                ", deleted='" + deleted + '\'' +
                ", starred='" + starred + '\'' +
                ", shared='" + shared + '\'' +
                '}';
    }
}