import com.SpringBootDemo;
import com.entity.File;
import com.entity.User;
import com.entity.Userdetails;
import com.repository.FileRepository;
import com.repository.UserRepository;
import com.repository.UserdetailsRepository;
import com.service.FileService;
import com.service.UserService;
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

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class UserServiceTest {

    @TestConfiguration
    public static class UserServiceTestContextConfiguration {
        @Bean
        public UserService fileService() {
            return new UserService();
        }
    }

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserdetailsRepository userdetailsRepository;

    @Before
    public void setUp() {

        Userdetails userDetails = new Userdetails();
        userDetails.setEmail("abc@gmail.com");
        userDetails.setPhone("666-7892345");
        userDetails.setWork("s/w engineer");
        userDetails.setCountry("USA");
        userDetails.setDescription("I am fun loving person");
        userDetails.setEducation("Graduation");
        userDetails.setInterests("art");
        List<Userdetails> userData = new ArrayList<>();
        userData.add(userDetails);

        Mockito.when(userdetailsRepository.findByEmail("abc@gmail.com"))
                .thenReturn(userData);

        User user = new User();
        user.setEmail("abc@gmail.com");
        user.setPassword("abc");
        user.setFirstname("ABC One");
        user.setUsername("ABC-One");
        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito.when(userRepository.findByEmailAndPassword("abc@gmail.com","dbff282c768a4f8c03e64bcc7cd89e95993ef1bb"))
                .thenReturn(users);
    }

    @Test
    public void logInTest() {
        List<User> found = userService.login("abc@gmail.com","abc");
        assertThat(found).isNotEmpty();
        assertThat(found.size()).isEqualTo(1);
    }

    @Test
    public void logInFailureTest() {
        List<User> found = userService.login("abc@gmail.com","abc123");
        assertThat(found).isEmpty();
    }

    @Test
    public void getMeTest() {
        List<Userdetails> found = userService.getMe("abc@gmail.com");
        assertThat(found).isNotEmpty();
    }
}
