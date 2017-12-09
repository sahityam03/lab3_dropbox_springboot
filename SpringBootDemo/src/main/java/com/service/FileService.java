package com.service;
import com.entity.File;
import com.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    /*public Iterable<File> getAllFiles(){
        return fileRepository.findByEmail(email);
    }*/
    public Iterable<File> getAllFiles(){
        return fileRepository.findAll();
    }

    public List<File> getFiles(String filepath){
        System.out.println("get files request >>>> "+filepath);
       List<File> files =  fileRepository.findByFilepath(filepath);
       System.out.println("Files >>>>>> "+files);
       return files;
    }
}