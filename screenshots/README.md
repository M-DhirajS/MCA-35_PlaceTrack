# PlaceTrack Screenshots Guide

This folder is designated for storing application screenshots captured during execution or for practical examination submission reports.

---

## Required Screenshots to Capture

1. **`01_dashboard.png`**
   - **Page:** Dashboard (`http://localhost:5173`)
   - **Content:** 4 Summary cards (Total Places, Pending, In Progress, Completed), status progress bar, and recently added records table.

2. **`02_all_places_records.png`**
   - **Page:** All Places page (`http://localhost:5173` -> All Places tab)
   - **Content:** Full table of place records, search input, status filter dropdown, category filter dropdown, record count badge, and action buttons (View, Edit, Delete).

3. **`03_add_place_form.png`**
   - **Page:** Add New Place page (`http://localhost:5173` -> Add New Place tab)
   - **Content:** Form displaying all required fields (Place Name, Location, Category, Status, Contact Person, Contact Number, Description) and buttons (Save Place, Reset Form).

4. **`04_status_update_or_modal.png`** (Optional Bonus)
   - **Content:** View / Edit modal dialog or status update in action.

---

## Instructions for Taking Screenshots

1. Start MySQL database: ensure `placetrack_db` is created and seeded using `database/placetrack.sql`.
2. Start the Spring Boot backend (`mvn spring-boot:run` inside `/backend`).
3. Start the Vite React frontend (`npm run dev` inside `/frontend`).
4. Open `http://localhost:5173` in your browser.
5. Take screenshots using your OS snipping tool (`Win + Shift + S` on Windows or `Cmd + Shift + 4` on macOS) and save them directly in this directory (`screenshots/`).
