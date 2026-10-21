package com.placetrack.controller;

import com.placetrack.dto.PlaceDto;
import com.placetrack.dto.StatsResponseDto;
import com.placetrack.dto.StatusUpdateDto;
import com.placetrack.entity.Place;
import com.placetrack.service.PlaceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
public class PlaceController {

    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    /**
     * GET /api/places/stats
     * Dashboard statistics endpoint. Defined before /{id} to ensure proper routing.
     */
    @GetMapping("/stats")
    public ResponseEntity<StatsResponseDto> getPlaceStats() {
        StatsResponseDto stats = placeService.getPlaceStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * GET /api/places/recent
     * Top 5 most recent places for the dashboard.
     */
    @GetMapping("/recent")
    public ResponseEntity<List<Place>> getRecentPlaces() {
        List<Place> recentPlaces = placeService.getRecentPlaces();
        return ResponseEntity.ok(recentPlaces);
    }

    /**
     * GET /api/places/categories
     * Distinct categories list for filter dropdowns.
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = placeService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * GET /api/places
     * Returns all records, with optional search and filter parameters.
     */
    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        List<Place> places = placeService.getAllPlaces(search, status, category);
        return ResponseEntity.ok(places);
    }

    /**
     * GET /api/places/{id}
     * Return a single place by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Place place = placeService.getPlaceById(id);
        return ResponseEntity.ok(place);
    }

    /**
     * POST /api/places
     * Validate and create a new record.
     */
    @PostMapping
    public ResponseEntity<Place> createPlace(@Valid @RequestBody PlaceDto placeDto) {
        Place createdPlace = placeService.createPlace(placeDto);
        return new ResponseEntity<>(createdPlace, HttpStatus.CREATED);
    }

    /**
     * PUT /api/places/{id}
     * Update an existing record.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(
            @PathVariable Long id,
            @Valid @RequestBody PlaceDto placeDto) {
        Place updatedPlace = placeService.updatePlace(id, placeDto);
        return ResponseEntity.ok(updatedPlace);
    }

    /**
     * PATCH /api/places/{id}/status
     * Update only the record's status.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Place> updatePlaceStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateDto statusDto) {
        Place updatedPlace = placeService.updatePlaceStatus(id, statusDto.getStatus());
        return ResponseEntity.ok(updatedPlace);
    }

    /**
     * DELETE /api/places/{id}
     * Delete a record by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Place record with ID " + id + " has been successfully deleted.");
        return ResponseEntity.ok(response);
    }
}
