package com.controller;
import com.entity.File;
import com.service.FileService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class FileController {
    @Autowired
    private FileService fileService;


    @PostMapping(path="/getFiles")
    public @ResponseBody
    List<File> getFiles(@RequestBody String filedetails, HttpSession session)
    {
        System.out.println("this is in filecontrolelr");
        System.out.println(session.getAttribute("name"));
        String newpath;
        JSONObject jsonObject = new JSONObject(filedetails);
        System.out.println("this is filepath" + jsonObject);
       // System.out.println(jsonObject.getString("path"));
        //System.out.println(session.getAttribute("name"));
        //JSONObject jsonObject = new JSONObject(session);
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        if(jsonObject.optString("path").equals(""))
        {
            System.out.println("this is in path null condition");
             newpath = new String("http://localhost:8080/users_records/"+ session.getAttribute("name"));
        }
        else {
            System.out.println("this is in path not null condition");
            newpath = new String(jsonObject.getString("path"));
        }
        return fileService.getFiles(newpath);
        //return fileService.getFiles(jsonObject.getString("path"));


    }





}