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
    File findById(@Param("id") int id);
    List<File> findByFilepathAndDeleted(@Param("filepath") String filepath, @Param("deleted") String deleted);
    List<File> findByEmailAndStarredAndDeleted(@Param("email") String email, @Param("starred") String starred, @Param("deleted") String deleted);
    List<File> findByEmailAndDeleted(@Param("email") String email, @Param("deleted") String deleted);
    List<File> findByEmailAndDeletedAndShared(@Param("email") String email, @Param("deleted") String deleted, @Param("shared") String shared );
}