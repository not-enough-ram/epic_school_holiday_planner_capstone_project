package de.neuefische.backend.controller;

import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.HolidaysRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HolidaysControllerTest {

    @LocalServerPort
    private int port;


    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private HolidaysRepository holidaysRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder encoder;


    @Test
    void getListOfHolidaysShouldReturnAListOfAllHolidays() {
        //GIVEN
        Holidays[] holidays = {Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build()};
        when(mockedTemplate.getForEntity("http://localhost:" + port + "/api/holidays", Holidays[].class)).thenReturn(ResponseEntity.ok(holidays));

        //WHEN
        HttpHeaders headers = getHttpHeaderWithAuthToken();
        ResponseEntity<Holidays[]> response = testRestTemplate.exchange("http://Localhost:" + port + "/api/holidays",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Holidays[].class);

        //THEN
        Holidays[] expectedHolidays = {Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build()};
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody(), arrayContainingInAnyOrder(expectedHolidays));
        verify(mockedTemplate).getForEntity(
                "http://Localhost:" + port + "/api/holidays",
                Holidays[].class);
    }

    private HttpHeaders getHttpHeaderWithAuthToken() {
        appUserRepository.save(AppUser.builder().username("test_username").password(encoder.encode("test_password")).build());
        AppUser appUser = new AppUser("test_username", "test_password");
        ResponseEntity<String> tokenResponse = testRestTemplate.postForEntity("http://localhost:" + port + "/api/auth", appUser, String.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenResponse.getBody());
        return headers;
    }
}
