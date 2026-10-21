package com.placetrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PlaceTrackApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlaceTrackApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  PlaceTrack Backend is running on port 8080!    ");
        System.out.println("  Swagger/API root: http://localhost:8080/api/places ");
        System.out.println("=================================================");
    }
}
