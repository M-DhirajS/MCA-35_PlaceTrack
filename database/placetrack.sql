-- ====================================================================
-- PlaceTrack - Database Initialization & Seed Script
-- Database: placetrack_db
-- Compatible with MySQL 8.0+ and MySQL Workbench
-- ====================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS placetrack_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Use Database
USE placetrack_db;

-- 3. Drop Table if exists (clean setup for exams/testing)
DROP TABLE IF EXISTS places;

-- 4. Create Places Table
CREATE TABLE places (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    contact_person VARCHAR(100) NOT NULL,
    contact_number VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_status CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    CONSTRAINT chk_contact_number CHECK (contact_number REGEXP '^[0-9]{10}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Insert Sample Records (at least 5 required, inserting 6 realistic records)
INSERT INTO places (place_name, location, category, description, contact_person, contact_number, status, created_at)
VALUES
(
    'Metro Innovation Tech Park',
    'Plot 42, Electronic City Phase 1, Bengaluru',
    'Technology',
    'Premier IT hub housing multi-tenant software development facilities and incubation labs.',
    'Rajesh Sharma',
    '9876543210',
    'Completed',
    '2026-03-10 09:30:00'
),
(
    'City Heritage Cultural Center',
    'Old Fort Road, Sector 4, New Delhi',
    'Heritage & Tourism',
    'Historical exhibition hall and amphitheater undergoing preservation and visitor facilitation upgrades.',
    'Pooja Verma',
    '9123456780',
    'In Progress',
    '2026-03-15 11:15:00'
),
(
    'Apex Super Specialty Hospital',
    '12 Healthcare Avenue, Baner, Pune',
    'Healthcare',
    'Modern multi-specialty regional hospital with 300 beds and 24/7 trauma care center.',
    'Dr. Vikram Patel',
    '9845012345',
    'Pending',
    '2026-03-18 14:00:00'
),
(
    'National Institute of Computing',
    'Knowledge Boulevard, Knowledge Park III, Greater Noida',
    'Education',
    'Higher education institute offering undergraduate and research degrees in computer science.',
    'Dr. Ananya Roy',
    '9765432109',
    'Completed',
    '2026-03-20 10:45:00'
),
(
    'Grand Sapphire Convention Center',
    'Beach Road, MVP Colony, Visakhapatnam',
    'Commercial',
    'International exhibition space suitable for business symposiums, expos, and tech summits.',
    'Suresh Naidu',
    '9012345678',
    'In Progress',
    '2026-03-22 16:20:00'
),
(
    'Greenfield Logistics & Cold Storage Hub',
    'NH 48 Bypass, Sector 18, Gurugram',
    'Logistics',
    'Automated sorting and cold-chain facility for pharmaceutical and agricultural distribution.',
    'Manoj Kumar',
    '9898123456',
    'Pending',
    '2026-03-25 08:50:00'
);

-- 6. Verification query
SELECT * FROM places;
