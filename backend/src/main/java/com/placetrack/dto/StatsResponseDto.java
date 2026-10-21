package com.placetrack.dto;

public class StatsResponseDto {

    private long totalPlaces;
    private long pendingPlaces;
    private long inProgressPlaces;
    private long completedPlaces;

    public StatsResponseDto() {
    }

    public StatsResponseDto(long totalPlaces, long pendingPlaces, long inProgressPlaces, long completedPlaces) {
        this.totalPlaces = totalPlaces;
        this.pendingPlaces = pendingPlaces;
        this.inProgressPlaces = inProgressPlaces;
        this.completedPlaces = completedPlaces;
    }

    public long getTotalPlaces() {
        return totalPlaces;
    }

    public void setTotalPlaces(long totalPlaces) {
        this.totalPlaces = totalPlaces;
    }

    public long getPendingPlaces() {
        return pendingPlaces;
    }

    public void setPendingPlaces(long pendingPlaces) {
        this.pendingPlaces = pendingPlaces;
    }

    public long getInProgressPlaces() {
        return inProgressPlaces;
    }

    public void setInProgressPlaces(long inProgressPlaces) {
        this.inProgressPlaces = inProgressPlaces;
    }

    public long getCompletedPlaces() {
        return completedPlaces;
    }

    public void setCompletedPlaces(long completedPlaces) {
        this.completedPlaces = completedPlaces;
    }
}
