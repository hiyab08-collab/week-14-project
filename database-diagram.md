# Database Diagram

KindTable's database has two related tables: `diet_types` and `restaurants`. Each restaurant belongs to exactly one diet type, and one diet type can have many restaurants (one-to-many relationship), enforced by a foreign key.

```mermaid
erDiagram
    DIET_TYPES ||--o{ RESTAURANTS : "has many"

    DIET_TYPES {
        int id PK
        varchar name
        timestamp created_at
    }

    RESTAURANTS {
        int id PK
        varchar name
        text description
        varchar address
        varchar phone
        varchar cuisine_type
        varchar price_range
        int diet_type_id FK
        timestamp created_at
    }
```

- **PK** = Primary key
- **FK** = Foreign key (`restaurants.diet_type_id` references `diet_types.id`)
