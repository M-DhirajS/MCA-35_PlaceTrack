package com.placetrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class StatusUpdateDto {

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(Pending|In Progress|Completed)$", message = "Status must be Pending, In Progress, or Completed")
    private String status;

    public StatusUpdateDto() {
    }

    public StatusUpdateDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status != null ? status.trim() : null;
    }
}
