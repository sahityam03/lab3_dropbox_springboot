package com.service;
import com.entity.File;
import com.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
       List<File> files =  fileRepository.findByFilepathAndDeleted(filepath, "N");
       System.out.println("Files in getfiles>>>>>> "+files);
       return files;
    }
    public List<File> getStarFiles(String email){
        String starred;
        String deleted;
        System.out.println("get star files request ");
        starred = new String("Y");
        deleted = new String("N");
        List<File> files =  fileRepository.findByEmailAndStarredAndDeleted(email, starred, deleted);
        System.out.println("Files in get star files>>>>>> "+files);
        return files;
    }

    public List<File> getDeletedFiles(String email){
        String deleted;
        System.out.println("get delete files request ");
        deleted = new String("Y");
        List<File> files =  fileRepository.findByEmailAndDeleted(email, deleted);
        System.out.println("Files in get delete files>>>>>> "+files);
        return files;
    }

    public List<File> getSharedFiles(String email){
        String deleted;
        String shared;
        System.out.println("get delete files request ");
        deleted = new String("N");
        shared = new String("Y");
        List<File> files =  fileRepository.findByEmailAndDeletedAndShared(email, deleted, shared);
        System.out.println("Files in get delete files>>>>>> "+files);
        return files;
    }

    public List<File> getRecentFiles(String email){
        String deleted;
        System.out.println("get getRecentFiles files request ");
        deleted = new String("N");
        List<File> files =  fileRepository.findByEmailAndDeleted(email, deleted);
        System.out.println("Files in  getRecentFiles files>>>>>> "+files);
        Collections.sort(files, new Comparator<File>() {
            @Override
            public int compare(File file1, File file2) {
                try {
                    DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                    Date date1 = sdf.parse(file1.getModifiedtime());
                    Date date2 = sdf.parse(file1.getModifiedtime());
                    return date1.compareTo(date2);
                }catch(Exception exp){
                    System.out.println(exp);
                }
                return 0;
            }
        });
        List<File> finalFiles = new ArrayList<>();
        if(files.size() < 5) {
            finalFiles = new ArrayList<>(files);
        }else {
            for (int i = 0; i < 5 ; i++) {
                finalFiles.add(files.get(i));
            }
        }
        return finalFiles;
    }

    public File changeStars(int id, String status){
        System.out.println("in fileservice changeStars ");
        File file1 = fileRepository.findById(id);
        file1.setStarred(status);
        fileRepository.save(file1);
        System.out.println("Files in get delete files>>>>>> "+file1);
        return file1;
    }

    public File getShareFile(int id){
        System.out.println("in fileservice changeStars ");
        File file1 = fileRepository.findById(id);
        System.out.println("Files in getShareFile>>>>>> "+file1);
        return file1;
    }

    public void changeDeleteStatus(int id){
        System.out.println("in fileservice changeDeleteStatus ");
        File file1 = fileRepository.findById(id);
        file1.setDeleted();
        fileRepository.save(file1);
        System.out.println("Files in get delete files>>>>>> "+file1);
        //return file1;
    }

    public void uploadFile(File file1){
        System.out.println("in fileservice uploadFile ");
        fileRepository.save(file1);
        System.out.println("Files in get delete files>>>>>> "+file1);
        //return file1;
    }

    public void createFolder(File file1){
        System.out.println("in fileservice createFolder ");
        fileRepository.save(file1);
        System.out.println("Files in get delete files>>>>>> "+file1);
    }

}