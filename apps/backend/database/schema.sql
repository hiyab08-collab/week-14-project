CREATE TABLE diet_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cuisine_type VARCHAR(100),
  price_range VARCHAR(4) NOT NULL DEFAULT '$$',
  diet_type_id INTEGER NOT NULL REFERENCES diet_types(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurants_diet_type_id ON restaurants(diet_type_id);
