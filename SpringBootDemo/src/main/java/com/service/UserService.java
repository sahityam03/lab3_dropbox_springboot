package com.service;

import com.entity.User;
import com.entity.Userdetails;
import com.repository.UserRepository;
import com.repository.UserdetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserdetailsRepository userdetailsRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user){
        System.out.println("in userservice "+ user);
        userRepository.save(user);
    }

    public void addUserDetails(Userdetails userdetails){
        userdetailsRepository.save(userdetails);
    }

    public void editUserdetails(Userdetails userdetails, String email){
        List<Userdetails> users = userdetailsRepository.findByEmail(email);
        Userdetails user = users.get(0);
        user.setCountry(userdetails.getCountry());
        user.setDescription(userdetails.getDescription());
        user.setEducation(userdetails.getEducation());
        user.setInterests(userdetails.getInterests());
        user.setWork(userdetails.getWork());
        user.setPhone(userdetails.getPhone());
        userdetailsRepository.save(user);
    }


    public List<User> login(String email,String password){
       return userRepository.findByEmailAndPassword(email,password);
    }
    public List<Userdetails> getMe(String email){
        System.out.println(userdetailsRepository.findByEmail(email));
        return userdetailsRepository.findByEmail(email);
    }
}