package com.controller;
import com.entity.File;
import com.service.FileService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
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
        System.out.println("this is in filecontrolelr of get all files");
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
             newpath = new String("./dropbox/"+ session.getAttribute("name").toString());
        }
        else {
            System.out.println("this is in path not null condition");
            newpath = new String(jsonObject.getString("path"));
        }
        return fileService.getFiles(newpath);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @GetMapping(path="/getStarFiles")
    public @ResponseBody
    List<File> getStarFiles(HttpSession session)
    {
        System.out.println("this is in filecontrolelr of getStarfiles");
        System.out.println(session.getAttribute("name"));
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        return fileService.getStarFiles(session.getAttribute("name").toString());
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @GetMapping(path="/getDeletedFiles")
    public @ResponseBody
    List<File> getDeletedFiles(HttpSession session)
    {
        System.out.println("this is in filecontrolelr of getDeletedFiles");
        System.out.println(session.getAttribute("name"));
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        return fileService.getDeletedFiles(session.getAttribute("name").toString());
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @GetMapping(path="/getSharedFiles")
    public @ResponseBody
    List<File> getSharedFiles(HttpSession session)
    {
        System.out.println("this is in filecontrolelr of getSharedFiles");
        System.out.println(session.getAttribute("name"));
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        return fileService.getSharedFiles(session.getAttribute("name").toString());
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @GetMapping(path="/getRecentFiles")
    public @ResponseBody
    List<File> getRecentFiles(HttpSession session)
    {
        System.out.println("this is in filecontrolelr of getSharedFiles");
        System.out.println(session.getAttribute("name"));
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        return fileService.getRecentFiles(session.getAttribute("name").toString());
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping(path="/changeStars")
    public ResponseEntity
    changeStars(@RequestBody String filedetails, HttpSession session)
    {
        System.out.println("this is in filecontrolelr of changeStars");
        System.out.println(session.getAttribute("name"));
        int id;
        JSONObject jsonObject = new JSONObject(filedetails);
        id = jsonObject.optInt("id");
        //ResponseEntity(fileService.getFiles((String)session.getAttribute("name")), HttpStatus.OK);
        return new ResponseEntity(fileService.changeStars(id, jsonObject.getString("status")), HttpStatus.OK);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping(path="/createFolder")
    public ResponseEntity
    createFolder(@RequestBody String folderdetails, HttpSession session)
    {
        System.out.println("this is in filecontrolelr of createFolder");
        System.out.println(session.getAttribute("name"));
        JSONObject jsonObject = new JSONObject(folderdetails);
        File file1 =new File();
        file1.setFilename(jsonObject.getString("foldername"));
        file1.setFilepath(jsonObject.getString("path"));
        file1.setEmail(session.getAttribute("name").toString());
        file1.setModifiedtime();
        file1.setDeleted("N");
        file1.setType("folder");
        fileService.createFolder(file1);
        try {
            Path path = Paths.get(jsonObject.getString("path"),jsonObject.getString("foldername"));
            System.out.println(new java.io.File(".").getAbsoluteFile());
            System.out.println(path.toAbsolutePath());
            Files.createDirectory(path);
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ResponseEntity(HttpStatus.OK);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping(path="/changeDeleteStatus")
    public ResponseEntity
    changeDeleteStatus(@RequestBody String filedetails, HttpSession session)
    {
        System.out.println("this is in filecontrolelr of changeDeleteStatus");
        System.out.println(session.getAttribute("name"));
        int id;
        JSONObject jsonObject = new JSONObject(filedetails);
        id = jsonObject.optInt("id");
        fileService.changeDeleteStatus(id);
        return new ResponseEntity(HttpStatus.OK);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping(path="/sharedocument")
    public ResponseEntity
    sharedocument(@RequestBody String sharedetails, HttpSession session)
    {
        System.out.println("this is in filecontrolelr of sharedocument");
        System.out.println(session.getAttribute("name"));
        int id;
        JSONObject jsonObject = new JSONObject(sharedetails);
        System.out.println(jsonObject.toString());
        id = jsonObject.optInt("id");
        String[] emailIds = jsonObject.getString("emailids").split(",");
        File file = fileService.getShareFile(id);
        Path fromPath = Paths.get("./dropbox",file.getEmail(),file.getFilename());
        for(String emailId : emailIds){
            Path toPath = Paths.get("./dropbox",emailId,file.getFilename());
            try {
                Files.copy(fromPath, toPath);
                File file1 =new File();
                file1.setFilename(file.getFilename());
                file1.setFilepath("./dropbox/"+emailId);
                file1.setEmail(emailId);
                file1.setModifiedtime();
                file1.setDeleted("N");
                file1.setShared();
                file1.setType(file.getType());
                fileService.uploadFile(file1);
            } catch (IOException e) {
                System.out.println(e);
            }
        }
        return new ResponseEntity(HttpStatus.OK);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping(path="/doUpload")
    public ResponseEntity
    uploadFile(@RequestParam("myfile") MultipartFile filedata, @RequestParam("filepath") String filepath, HttpSession session)
    {
        System.out.println("this is in filecontrolelr of uploadFile"+filedata.getOriginalFilename());
        System.out.println("this is in filecontrolelr of uploadFile filepath"+filepath);
        String fileName = filedata.getOriginalFilename();
        if(filepath == null || filepath.equalsIgnoreCase("undefined"))
        {
            filepath = new String("./dropbox/"+ session.getAttribute("name").toString());
        }
        Path path = Paths.get(filepath,fileName);
        try (BufferedOutputStream iostream = new BufferedOutputStream(
                Files.newOutputStream(path, StandardOpenOption.CREATE)
        )) {
            iostream.write(filedata.getBytes(),0,filedata.getBytes().length);
            iostream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        File file1 =new File();
        System.out.println(session.getAttribute("name"));
        file1.setFilename(fileName);
        file1.setFilepath(filepath);
        file1.setEmail(session.getAttribute("name").toString());
        file1.setModifiedtime();
        file1.setDeleted("N");
        file1.setType("file");
        fileService.uploadFile(file1);
        return new ResponseEntity(HttpStatus.OK);
        //return fileService.getFiles(jsonObject.getString("path"));
    }

    @PostMapping("/downloadfile")
    public ResponseEntity<?> downloadfile(@RequestBody String filepath, HttpSession session, HttpServletResponse response) {
        JSONObject jsonObject = new JSONObject(filepath);
        Path downloadfilePath = Paths.get(jsonObject.getString("path"));
         try {
            InputStream is = new FileInputStream(downloadfilePath.toAbsolutePath().normalize().toString());
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}