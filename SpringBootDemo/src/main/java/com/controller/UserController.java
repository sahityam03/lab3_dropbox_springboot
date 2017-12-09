package com.controller;
import com.entity.User;
import com.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path="/doSignUp",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        System.out.println("reached into login function");
        JSONObject jsonObject = new JSONObject(user);
        System.out.println("this is username");
        System.out.println(jsonObject.getString("username"));
        List<User> user1 = userService.login(jsonObject.getString("username"), jsonObject.getString("password"));
        if(!(user1.isEmpty())) {
            System.out.println("this is in if condition");
            session.setAttribute("name", jsonObject.getString("username"));
            return new ResponseEntity(userService.login(jsonObject.getString("username"), jsonObject.getString("password")), HttpStatus.OK);
        }
        System.out.println("didnt enter if condition");
        return new ResponseEntity(userService.login(jsonObject.getString("username"), jsonObject.getString("password")), HttpStatus.NO_CONTENT);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
}