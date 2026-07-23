# API Plan: KindTable

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check that the API is running |
| GET | `/api/diet-types` | Get all diet types |
| GET | `/api/restaurants` | Get all restaurants (supports `?diet=` and `?search=` filters) |
| GET | `/api/restaurants/:id` | Get one restaurant by id |
| POST | `/api/restaurants` | Create a new restaurant |
| PUT | `/api/restaurants/:id` | Update an existing restaurant |
| DELETE | `/api/restaurants/:id` | Delete a restaurant |
