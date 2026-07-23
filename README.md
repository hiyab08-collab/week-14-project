# KindTable

## Problem Statement
Finding a restaurant that actually fits your diet takes time — time you don't always have. Whether you're new to an area or just juggling a packed schedule, vegan, gluten-free, and kosher diners often end up digging through generic review sites and cross-referencing menus by hand just to find somewhere safe to eat. KindTable solves this by giving diners one directory of restaurants verified to fit vegan, gluten-free, or kosher diets — searchable and filterable by diet type, so finding a place to eat takes seconds, not a scavenger hunt.

## Target User
KindTable is built for anyone looking for a place to eat, but it's especially useful for people with dietary restrictions — vegan, gluten-free, or kosher diners — as well as health-conscious eaters who care about knowing a restaurant's dietary options before they go.

## Features
- Browse a directory of restaurants verified for vegan, gluten-free, or kosher diets
- Search restaurants by name
- Filter restaurants by diet type
- View full restaurant details (address, phone, cuisine, price range, and diet certification)
- Add a new restaurant through a simple form
- Edit an existing restaurant's details
- Delete a restaurant, with a confirmation prompt before removal
- Color-coded "certification stamp" badges for each diet type, so you can spot a match at a glance
- Loading, empty, and error states so the app always tells you what's happening
- Responsive layout that works on both desktop and mobile

## Technology
- **Frontend:** React, Vite, JavaScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, run via Docker Compose
- **ORM:** Prisma (with `@prisma/adapter-pg`)
- **API style:** REST
- **Environment config:** dotenv (`.env` files, excluded from Git)
- **Version control:** Git and GitHub

## Database Design

The database has two related tables:

### `diet_types`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | Primary key |
| name | CHARACTER VARYING(50) | Unique — e.g. "Vegan", "Gluten-Free", "Kosher" |
| created_at | TIMESTAMP | Defaults to now |

### `restaurants`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | Primary key |
| name | CHARACTER VARYING(150) | Required |
| description | TEXT | Optional |
| address | CHARACTER VARYING(255) | Required |
| phone | CHARACTER VARYING(20) | Optional |
| cuisine_type | CHARACTER VARYING(100) | Optional |
| price_range | CHARACTER VARYING(4) | One of `$`, `$$`, `$$$`, `$$$$` |
| diet_type_id | INTEGER | Foreign key → `diet_types.id` |
| created_at | TIMESTAMP | Defaults to now |

**Relationship:** Each restaurant belongs to exactly one diet type (one-to-many: one diet type can have many restaurants). This is enforced with a foreign key (`restaurants.diet_type_id → diet_types.id`), so every restaurant must reference a valid, existing diet type.

**Why this design:** Separating diet types into their own table avoids repeating the same text ("Vegan", "Gluten-Free", "Kosher") across every restaurant row, keeps the diet list consistent (no typos like "vegen"), and makes it easy to add new diet types later without touching the `restaurants` table. Each `CHARACTER VARYING` column uses a maximum length appropriate to what it stores — short for a diet name, longer for a full address.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check that the API is running |
| GET | `/api/diet-types` | Get all diet types (used for the filter dropdown) |
| GET | `/api/restaurants` | Get all restaurants; supports `?diet=` and `?search=` query params |
| GET | `/api/restaurants/:id` | Get one restaurant by id |
| POST | `/api/restaurants` | Create a new restaurant |
| PUT | `/api/restaurants/:id` | Update an existing restaurant |
| DELETE | `/api/restaurants/:id` | Delete a restaurant |

`GET /api/restaurants` uses a SQL join to include each restaurant's diet type name in the response — this is the required JOIN endpoint.

## Installation Instructions

### 1. Clone the repository
```
git clone <repository-url>
cd kindtable
```

### 2. Set up environment variables
In `apps/backend`, copy the example env file:
```
cd apps/backend
cp .env.example .env
```

Update `.env` if needed. Default values:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/backend-db?schema=public"
PORT=3001
```

### 3. Create the PostgreSQL database
This project uses Docker Compose for PostgreSQL. From `apps/backend`, run:
```
npm run db:up
```

### 4. Set up the backend
From `apps/backend`:
```
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
npm run dev
```
The backend will run at `http://localhost:3001`.

### 5. Set up the frontend
Open a second terminal, then from `apps/frontend`:
```
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`.

### Alternative: running schema.sql and seed.sql directly
If you'd rather set up the tables with raw SQL instead of Prisma migrations, after your `.env` is configured and PostgreSQL is running:
```
npm run sql:schema
npm run sql:seed
```

## AI Reflection

**How did you use AI?**
I used AI throughout the project — to help build the backend and frontend code, explain concepts like database column types and foreign key relationships, and help debug errors as they came up (like npm and file-copying issues on Windows).

**What did AI help you understand?**
Honestly, I'm still working through understanding all of it.

**What incorrect or incomplete AI response did you encounter?**
The first version of the restaurant card design used a dark forest green and a dark navy blue as the color-coded top borders for "Vegan" and "Kosher." Visually, the two colors were too close in darkness to tell apart at a glance, which defeated the purpose of color-coding by diet type. I pointed this out, and the colors were changed to a clearly distinct green, amber, and purple.

**How did you test the AI-generated code?**
I ran the app in the browser and visually checked that restaurants displayed correctly, search and filtering worked, and that create/edit/delete actions worked and persisted after refreshing the page.

**What part of the project can you explain without AI assistance?**
*(To be filled in — revisit after more hands-on practice with the codebase.)*
