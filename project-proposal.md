# Project Proposal: KindTable

**What is the application?**
KindTable is a full-stack web app that lets users browse, search, and filter a directory of restaurants that are verified to accommodate vegan, gluten-free, or kosher diets.

**What problem does it solve?**
Finding a restaurant that actually fits your diet takes time — time you don't always have. Whether you're new to an area or juggling a packed schedule, vegan, gluten-free, and kosher diners often end up digging through generic review sites and cross-referencing menus by hand just to find somewhere safe to eat. KindTable gives diners one directory of verified restaurants, searchable and filterable by diet type.

**Who is the target user?**
Anyone looking for a place to eat, but especially people with dietary restrictions (vegan, gluten-free, or kosher diners) and health-conscious eaters who want to know a restaurant's dietary options before they go.

**What is the main resource being managed?**
Restaurants — each one has a name, description, address, phone number, cuisine type, price range, and an associated diet type.

**What CRUD actions will users perform?**
- **Create:** Add a new restaurant to the directory through a form
- **Read:** Browse all restaurants, search by name, filter by diet type, and view an individual restaurant's details
- **Update:** Edit an existing restaurant's details
- **Delete:** Remove a restaurant from the directory, with a confirmation step first

**What are the two related database tables?**
- `diet_types` — the list of supported diets (Vegan, Gluten-Free, Kosher)
- `restaurants` — each restaurant, linked to exactly one diet type through a foreign key (`diet_type_id`)
