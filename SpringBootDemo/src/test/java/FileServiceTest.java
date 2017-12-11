import com.SpringBootDemo;
import com.entity.File;
import com.repository.FileRepository;
import com.service.FileService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)

public class FileServiceTest {
    @TestConfiguration
    public static class FileServiceTestContextConfiguration {
        @Bean
        public FileService fileService() {
            return new FileService();
        }
    }

    @Autowired
    private FileService fileService;

    @MockBean
    private FileRepository fileRepository;

    @Before
    public void setUp() {
        File file = new File();
        file.setEmail("xyz@gmail.com");
        file.setFilename("test.txt");
        file.setFilepath("./Springboot/xyz@gmail.com");
        file.setModifiedtime();
        file.setType("file");
        file.setDeleted("N");

        File file2 = new File();
        file2.setEmail("xyz@gmail.com");
        file2.setFilename("test2.txt");
        file2.setFilepath("./Springboot/xyz@gmail.com");
        file2.setModifiedtime();
        file2.setType("file");
        file2.setDeleted("N");

        List<File> springBootFiles = new ArrayList<>();
        springBootFiles.add(file);
        springBootFiles.add(file2);

        Mockito.when(fileRepository.findByFilepathAndDeleted("./Springboot/xyz@gmail.com","N"))
                .thenReturn(springBootFiles);

        File file3 = new File();
        file3.setEmail("abc@gmail.com");
        file3.setFilename("paypaldetails.txt");
        file3.setFilepath("./Springboot/abc@gmail.com");
        file3.setModifiedtime();
        file3.setType("file");
        file3.setDeleted("N");
        file3.setStarred("Y");

        File file4 = new File();
        file4.setEmail("abc@gmail.com");
        file4.setFilename("Mango.txt");
        file4.setFilepath("./Springboot/abc@gmail.com");
        file4.setModifiedtime();
        file4.setType("file");
        file4.setDeleted("N");
        file4.setStarred("Y");
        List<File> starredFiles = new ArrayList<>();
        starredFiles.add(file4);

        Mockito.when(fileRepository.findByEmailAndStarredAndDeleted("abc@gmail.com","Y","N"))
                .thenReturn(starredFiles);

        File file5 = new File();
        file5.setEmail("abc@gmail.com");
        file5.setFilename("Mango.txt");
        file5.setFilepath("./Springboot/abc@gmail.com");
        file5.setModifiedtime();
        file5.setType("file");
        file5.setDeleted("Y");
        file5.setStarred("Y");
        List<File> deletedFiles = new ArrayList<>();
        deletedFiles.add(file5);

        Mockito.when(fileRepository.findByEmailAndDeleted("abc@gmail.com","Y"))
                .thenReturn(deletedFiles);
    }

    @Test
    public void getFilesTest() {
        List<File> found = fileService.getFiles("./Springboot/xyz@gmail.com");
        assertThat(found).isNotEmpty();
    }

    @Test
    public void getStarredFilesFailureTest() {
        List<File> found = fileService.getStarFiles("xyz@gmail.com");
        assertThat(found).isEmpty();
    }

    @Test
    public void getStarredFilesTest() {
        List<File> found = fileService.getStarFiles("abc@gmail.com");
        assertThat(found).isNotEmpty();
    }

    @Test
    public void getDeletedFilesTest() {
        List<File> found = fileService.getStarFiles("abc@gmail.com");
        assertThat(found.size()).isEqualTo(1);
    }
}
