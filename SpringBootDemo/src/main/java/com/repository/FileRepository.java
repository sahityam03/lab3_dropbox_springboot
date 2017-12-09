package com.repository;

import com.entity.File;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

/*public interface FileRepository extends CrudRepository<File,  Long> {

    List<File> findByEmail(@Param("email") String email);

}*/

public interface FileRepository extends CrudRepository<File,  Long>
{
    List<File> findByFilepath(@Param("filepath") String filepath);
}