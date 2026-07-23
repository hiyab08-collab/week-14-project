import prisma from "../db/prisma.js";

const VALID_PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];

function validateRestaurantInput(body, { partial = false } = {}) {
  const errors = [];
  const { name, address, dietTypeId, priceRange } = body;

  if (!partial || name !== undefined) {
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("Name is required.");
    }
  }

  if (!partial || address !== undefined) {
    if (!address || typeof address !== "string" || !address.trim()) {
      errors.push("Address is required.");
    }
  }

  if (!partial || dietTypeId !== undefined) {
    if (!dietTypeId || Number.isNaN(Number(dietTypeId))) {
      errors.push("A valid dietTypeId is required.");
    }
  }

  if (priceRange !== undefined && !VALID_PRICE_RANGES.includes(priceRange)) {
    errors.push(`priceRange must be one of: ${VALID_PRICE_RANGES.join(", ")}`);
  }

  return errors;
}

// GET /api/restaurants
// Supports ?diet=vegan (or gluten-free / kosher) and ?search=name
export async function getRestaurants(req, res) {
  try {
    const { diet, search } = req.query;

    const where = {};

    if (diet) {
      where.dietType = {
        name: {
          equals: diet.replace(/-/g, " "),
          mode: "insensitive"
        }
      };
      // Also allow hyphenated matches like "gluten-free"
      where.OR = undefined;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive"
      };
    }

    // Prisma include performs the equivalent of a SQL JOIN against diet_types.
    const restaurants = await prisma.restaurant.findMany({
      where,
      include: { dietType: true },
      orderBy: { createdAt: "desc" }
    });

    return res.status(200).json({
      message: "Restaurants retrieved successfully",
      data: restaurants
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "Failed to retrieve restaurants" });
  }
}

// GET /api/restaurants/:id
export async function getRestaurantById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: { dietType: true }
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant retrieved successfully",
      data: restaurant
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Failed to retrieve restaurant" });
  }
}

// POST /api/restaurants
export async function createRestaurant(req, res) {
  try {
    const errors = validateRestaurantInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const { name, description, address, phone, cuisineType, priceRange, dietTypeId } = req.body;

    const dietTypeExists = await prisma.dietType.findUnique({
      where: { id: Number(dietTypeId) }
    });

    if (!dietTypeExists) {
      return res.status(400).json({ message: "dietTypeId does not match an existing diet type" });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name: name.trim(),
        description: description?.trim() ?? null,
        address: address.trim(),
        phone: phone?.trim() ?? null,
        cuisineType: cuisineType?.trim() ?? null,
        priceRange: priceRange ?? "$$",
        dietTypeId: Number(dietTypeId)
      },
      include: { dietType: true }
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      data: restaurant
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Failed to create restaurant" });
  }
}

// PUT /api/restaurants/:id
export async function updateRestaurant(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }

    const existing = await prisma.restaurant.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const errors = validateRestaurantInput(req.body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const { name, description, address, phone, cuisineType, priceRange, dietTypeId } = req.body;

    if (dietTypeId !== undefined) {
      const dietTypeExists = await prisma.dietType.findUnique({
        where: { id: Number(dietTypeId) }
      });
      if (!dietTypeExists) {
        return res.status(400).json({ message: "dietTypeId does not match an existing diet type" });
      }
    }

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() ?? null }),
        ...(address !== undefined && { address: address.trim() }),
        ...(phone !== undefined && { phone: phone?.trim() ?? null }),
        ...(cuisineType !== undefined && { cuisineType: cuisineType?.trim() ?? null }),
        ...(priceRange !== undefined && { priceRange }),
        ...(dietTypeId !== undefined && { dietTypeId: Number(dietTypeId) })
      },
      include: { dietType: true }
    });

    return res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res.status(500).json({ message: "Failed to update restaurant" });
  }
}

// DELETE /api/restaurants/:id
export async function deleteRestaurant(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }

    const existing = await prisma.restaurant.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await prisma.restaurant.delete({ where: { id } });

    return res.status(200).json({
      message: "Restaurant deleted successfully",
      data: { id }
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res.status(500).json({ message: "Failed to delete restaurant" });
  }
}
