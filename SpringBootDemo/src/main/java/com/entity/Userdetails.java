package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Userdetails {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String email;
    private String description;
    private String phone;
    private String country;
    private String work;
    private String education;
    private String interests;

    public String getEmail() {
        return email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public String getPhone() {
        return phone;
    }

    public String getCountry() {
        return country;
    }

    public String getWork() {
        return work;
    }

    public String getEducation() {
        return education;
    }

    public String getInterests() {
        return interests;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDescription(String description) {
        this.description = description ;
    }

    public void setPhone(String phone) {
        this.phone = phone ;
    }

    public void setCountry(String country) {
        this.country = country ;
    }

    public void setWork(String work) {
        this.work = work ;
    }

    public void setEducation(String education) {
        this.education = education ;
    }

    public void setInterests(String interests) {
        this.interests = interests ;
    }
    @Override
    public String toString() {
        return "Userdetails{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", country='" + country + '\'' +
                ", work='" + work + '\'' +
                ", education='" + education + '\'' +
                ", interests='" + interests + '\'' +
                '}';
    }
}
