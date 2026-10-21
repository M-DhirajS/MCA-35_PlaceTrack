package com.placetrack.service;

import com.placetrack.dto.PlaceDto;
import com.placetrack.dto.StatsResponseDto;
import com.placetrack.entity.Place;
import com.placetrack.exception.ResourceNotFoundException;
import com.placetrack.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Transactional(readOnly = true)
    public List<Place> getAllPlaces(String search, String status, String category) {
        String trimmedSearch = (search != null) ? search.trim() : "";
        String trimmedStatus = (status != null) ? status.trim() : "";
        String trimmedCategory = (category != null) ? category.trim() : "";

        return placeRepository.findWithSearchAndFilters(trimmedSearch, trimmedStatus, trimmedCategory);
    }

    @Transactional(readOnly = true)
    public Place getPlaceById(Long id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));
    }

    public Place createPlace(PlaceDto placeDto) {
        Place place = new Place();
        place.setPlaceName(placeDto.getPlaceName().trim());
        place.setLocation(placeDto.getLocation().trim());
        place.setCategory(placeDto.getCategory().trim());
        place.setDescription(placeDto.getDescription() != null ? placeDto.getDescription().trim() : null);
        place.setContactPerson(placeDto.getContactPerson().trim());
        place.setContactNumber(placeDto.getContactNumber().trim());
        place.setStatus(placeDto.getStatus() != null ? placeDto.getStatus().trim() : "Pending");

        return placeRepository.save(place);
    }

    public Place updatePlace(Long id, PlaceDto placeDto) {
        Place existingPlace = getPlaceById(id);

        existingPlace.setPlaceName(placeDto.getPlaceName().trim());
        existingPlace.setLocation(placeDto.getLocation().trim());
        existingPlace.setCategory(placeDto.getCategory().trim());
        existingPlace.setDescription(placeDto.getDescription() != null ? placeDto.getDescription().trim() : null);
        existingPlace.setContactPerson(placeDto.getContactPerson().trim());
        existingPlace.setContactNumber(placeDto.getContactNumber().trim());
        existingPlace.setStatus(placeDto.getStatus().trim());

        return placeRepository.save(existingPlace);
    }

    public Place updatePlaceStatus(Long id, String status) {
        Place existingPlace = getPlaceById(id);

        String trimmedStatus = status.trim();
        if (!trimmedStatus.equals("Pending") && !trimmedStatus.equals("In Progress") && !trimmedStatus.equals("Completed")) {
            throw new IllegalArgumentException("Invalid status value: " + status + ". Allowed values: Pending, In Progress, Completed.");
        }

        existingPlace.setStatus(trimmedStatus);
        return placeRepository.save(existingPlace);
    }

    public void deletePlace(Long id) {
        Place existingPlace = getPlaceById(id);
        placeRepository.delete(existingPlace);
    }

    @Transactional(readOnly = true)
    public StatsResponseDto getPlaceStats() {
        long total = placeRepository.count();
        long pending = placeRepository.countByStatus("Pending");
        long inProgress = placeRepository.countByStatus("In Progress");
        long completed = placeRepository.countByStatus("Completed");

        return new StatsResponseDto(total, pending, inProgress, completed);
    }

    @Transactional(readOnly = true)
    public List<Place> getRecentPlaces() {
        return placeRepository.findTop5ByOrderByIdDesc();
    }

    @Transactional(readOnly = true)
    public List<String> getAllCategories() {
        return placeRepository.findDistinctCategories();
    }
}
