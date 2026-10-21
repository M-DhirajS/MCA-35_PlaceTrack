package com.placetrack.repository;

import com.placetrack.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    // Count places by status
    long countByStatus(String status);

    // Search and filter query
    @Query("SELECT p FROM Place p WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           " LOWER(p.placeName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(p.location) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(p.category) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(p.contactPerson) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR :status = 'All' OR p.status = :status) AND " +
           "(:category IS NULL OR :category = '' OR :category = 'All' OR p.category = :category) " +
           "ORDER BY p.id DESC")
    List<Place> findWithSearchAndFilters(@Param("search") String search,
                                         @Param("status") String status,
                                         @Param("category") String category);

    // Find all distinct categories for category dropdown
    @Query("SELECT DISTINCT p.category FROM Place p ORDER BY p.category ASC")
    List<String> findDistinctCategories();

    // Find top 5 recent places for dashboard
    List<Place> findTop5ByOrderByIdDesc();
}
