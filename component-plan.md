# Component Plan: KindTable

```
App
├── Navbar
├── FilterBar
├── RestaurantList
│   └── RestaurantCard
└── RestaurantForm
```

## What each component does

- **App** — the top-level component. Holds the current view (Browse or Add/Edit), the active search/filter values, and which restaurant (if any) is being edited. Decides whether to show the browse view or the form.
- **Navbar** — shows the app title and tagline, plus navigation buttons to switch between "Browse" and "Add Restaurant."
- **FilterBar** — a search input and a diet-type dropdown. Fetches the list of diet types for the dropdown, and reports search/filter changes back up to `App`.
- **RestaurantList** — fetches restaurants from the backend based on the current search/filter, and handles the loading, error, and empty states. Renders one `RestaurantCard` per restaurant.
- **RestaurantCard** — displays a single restaurant's details (name, description, address, phone, cuisine, price, and a color-coded diet-type stamp), plus Edit and Delete buttons.
- **RestaurantForm** — one shared form used for both creating a new restaurant and editing an existing one. Pre-fills its fields when editing, validates required fields, and submits to the backend.
