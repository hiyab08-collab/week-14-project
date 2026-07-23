INSERT INTO diet_types (name)
VALUES
  ('Vegan'),
  ('Gluten-Free'),
  ('Kosher');

INSERT INTO restaurants (name, description, address, phone, cuisine_type, price_range, diet_type_id)
VALUES
  ('Green Table Kitchen', 'Fully plant-based menu with seasonal produce.', '123 Maple St, Columbus, OH', '614-555-0101', 'American', '$$', 1),
  ('Pure Roots Cafe', 'Casual vegan spot known for its buddha bowls.', '456 Oak Ave, Westerville, OH', '614-555-0102', 'Cafe', '$', 1),
  ('Sprout & Stem', 'Farm-to-table vegan tasting menu in a converted greenhouse.', '88 Garden Way, Columbus, OH', '614-555-0107', 'Contemporary', '$$$', 1),
  ('Moonleaf Noodle Bar', 'Plant-based ramen and noodle bowls with house-made broths.', '212 Summit St, Columbus, OH', '614-555-0108', 'Asian Fusion', '$$', 1),
  ('The Wandering Radish', 'Vegan comfort food classics with a Southern twist.', '77 Peachtree Ln, Columbus, OH', '614-555-0110', 'Southern', '$$', 1),
  ('Basil & Bloom', 'Bright, herb-forward vegan Mediterranean small plates.', '340 Harbor Blvd, Columbus, OH', '614-555-0111', 'Mediterranean', '$$$', 1),
  ('Celiac Haven Bakery', 'Dedicated gluten-free bakery and sandwich shop.', '789 Birch Rd, Columbus, OH', '614-555-0103', 'Bakery', '$', 2),
  ('The GF Plate', 'Full-service restaurant with a 100% gluten-free kitchen.', '321 Pine St, Dublin, OH', '614-555-0104', 'American', '$$$', 2),
  ('Wheatless Wonders Pizzeria', 'Gluten-free wood-fired pizza with a dedicated prep line.', '56 Crescent Ave, Columbus, OH', '614-555-0112', 'Pizza', '$$', 2),
  ('Golden Grain Diner', 'Classic diner fare, entirely reworked to be gluten-free.', '410 Route 9, Columbus, OH', '614-555-0113', 'Diner', '$', 2),
  ('Riverside GF Grill', 'Steakhouse-style grill with a certified gluten-free menu.', '18 Riverside Dr, Columbus, OH', '614-555-0114', 'Steakhouse', '$$$$', 2),
  ('Freewheat Bistro', 'French-inspired bistro plates made entirely gluten-free.', '9 Lafayette Sq, Columbus, OH', '614-555-0115', 'French', '$$$', 2),
  ('Shalom Bites', 'Traditional kosher deli serving classic favorites.', '654 Cedar Ln, Bexley, OH', '614-555-0105', 'Deli', '$$', 3),
  ('Jerusalem Grill', 'Kosher-certified Middle Eastern grill house.', '987 Elm St, Columbus, OH', '614-555-0106', 'Middle Eastern', '$$', 3),
  ('Kosher Corner Bagels', 'Kosher bagel shop with house-cured lox and spreads.', '1200 Ocean Pkwy, Columbus, OH', '614-555-0116', 'Bagel Shop', '$', 3),
  ('Sababa Kitchen', 'Kosher Israeli comfort food, family recipes served fast-casual.', '45 Commerce St, Columbus, OH', '614-555-0117', 'Israeli', '$$', 3),
  ('The Kosher Table', 'Upscale kosher dining with a rotating seasonal menu.', '300 Michigan Ave, Columbus, OH', '614-555-0118', 'Contemporary', '$$$$', 3),
  ('Challah Back Cafe', 'Kosher bakery-cafe known for challah bread and pastries.', '22 King St, Columbus, OH', '614-555-0119', 'Bakery', '$', 3),
  ('Olive & Salt', 'Kosher Mediterranean seafood and grill.', '150 Bayshore Dr, Columbus, OH', '614-555-0120', 'Mediterranean', '$$$', 3),
  ('Beit Kitchen', 'Home-style kosher cooking with a rotating weekly menu.', '65 Fairview Rd, Columbus, OH', '614-555-0121', 'Home-style', '$$', 3);
