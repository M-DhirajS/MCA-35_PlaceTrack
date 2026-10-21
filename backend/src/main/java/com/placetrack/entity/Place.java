package com.placetrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Place Name is required")
    @Size(max = 150, message = "Place Name must not exceed 150 characters")
    @Column(name = "place_name", nullable = false, length = 150)
    private String placeName;

    @NotBlank(message = "Location / Address is required")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @NotBlank(message = "Category is required")
    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Column(name = "category", nullable = false, length = 100)
    private String category;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", length = 500)
    private String description;

    @NotBlank(message = "Contact Person is required")
    @Size(max = 100, message = "Contact Person must not exceed 100 characters")
    @Column(name = "contact_person", nullable = false, length = 100)
    private String contactPerson;

    @NotBlank(message = "Contact Number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Contact Number must contain exactly 10 digits")
    @Column(name = "contact_number", nullable = false, length = 10)
    private String contactNumber;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(Pending|In Progress|Completed)$", message = "Status must be Pending, In Progress, or Completed")
    @Column(name = "status", nullable = false, length = 20)
    private String status = "Pending";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Place() {
    }

    public Place(Long id, String placeName, String location, String category, String description,
                 String contactPerson, String contactNumber, String status, LocalDateTime createdAt) {
        this.id = id;
        this.placeName = placeName;
        this.location = location;
        this.category = category;
        this.description = description;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.status = status;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.status == null || this.status.trim().isEmpty()) {
            this.status = "Pending";
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName != null ? placeName.trim() : null;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location != null ? location.trim() : null;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category != null ? category.trim() : null;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description != null ? description.trim() : null;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson != null ? contactPerson.trim() : null;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber != null ? contactNumber.trim() : null;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status != null ? status.trim() : null;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
