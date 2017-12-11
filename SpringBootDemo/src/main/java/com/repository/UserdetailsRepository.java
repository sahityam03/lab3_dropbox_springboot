package com.repository;

import com.entity.User;
import com.entity.Userdetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserdetailsRepository  extends CrudRepository<Userdetails,  Long> {

    List<Userdetails> findByEmail(@Param("email") String email);
}
