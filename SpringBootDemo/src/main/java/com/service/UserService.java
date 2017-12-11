package com.service;

import com.entity.User;
import com.entity.Userdetails;
import com.repository.UserRepository;
import com.repository.UserdetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
            for(int i = 0; i < hashedBytes.length; ++i) {
                byte b = hashedBytes[i];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        }catch(NoSuchAlgorithmException e){
            System.out.println("error occured in encryptoin");
        }
        return hash.toString();
    }

    public static final String SALT = "ABCDEFGHIJKL";

    public void addUser(User user){
        System.out.println("in userservice "+ user);
        String hashPassword = generateHash(SALT + user.getPassword());
        user.setPassword(hashPassword);
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
        String hashPassword =  generateHash(SALT + password);
       return userRepository.findByEmailAndPassword(email,hashPassword);
    }
    public List<Userdetails> getMe(String email){
        System.out.println(userdetailsRepository.findByEmail(email));
        return userdetailsRepository.findByEmail(email);
    }
}