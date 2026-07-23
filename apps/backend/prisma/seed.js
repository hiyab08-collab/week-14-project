import "dotenv/config";
import prisma from "../server/db/prisma.js";

async function main() {
  await prisma.restaurant.deleteMany();
  await prisma.dietType.deleteMany();

  const dietTypes = await prisma.dietType.createMany({
    data: [
      { name: "Vegan" },
      { name: "Gluten-Free" },
      { name: "Kosher" }
    ]
  });

  if (dietTypes.count === 0) {
    return;
  }

  const savedDietTypes = await prisma.dietType.findMany({
    orderBy: { id: "asc" }
  });

  const vegan = savedDietTypes.find((d) => d.name === "Vegan").id;
  const glutenFree = savedDietTypes.find((d) => d.name === "Gluten-Free").id;
  const kosher = savedDietTypes.find((d) => d.name === "Kosher").id;

  await prisma.restaurant.createMany({
    data: [
      {
        name: "Green Table Kitchen",
        description: "Fully plant-based menu with seasonal produce.",
        address: "123 Maple St, Columbus, OH",
        phone: "614-555-0101",
        cuisineType: "American",
        priceRange: "$$",
        dietTypeId: vegan
      },
      {
        name: "Pure Roots Cafe",
        description: "Casual vegan spot known for its buddha bowls.",
        address: "456 Oak Ave, Westerville, OH",
        phone: "614-555-0102",
        cuisineType: "Cafe",
        priceRange: "$",
        dietTypeId: vegan
      },
      {
        name: "Sprout & Stem",
        description: "Farm-to-table vegan tasting menu in a converted greenhouse.",
        address: "88 Garden Way, Columbus, OH",
        phone: "614-555-0107",
        cuisineType: "Contemporary",
        priceRange: "$$$",
        dietTypeId: vegan
      },
      {
        name: "Moonleaf Noodle Bar",
        description: "Plant-based ramen and noodle bowls with house-made broths.",
        address: "212 Summit St, Columbus, OH",
        phone: "614-555-0108",
        cuisineType: "Asian Fusion",
        priceRange: "$$",
        dietTypeId: vegan
      },
      {
        name: "The Wandering Radish",
        description: "Vegan comfort food classics with a Southern twist.",
        address: "77 Peachtree Ln, Columbus, OH",
        phone: "614-555-0110",
        cuisineType: "Southern",
        priceRange: "$$",
        dietTypeId: vegan
      },
      {
        name: "Basil & Bloom",
        description: "Bright, herb-forward vegan Mediterranean small plates.",
        address: "340 Harbor Blvd, Columbus, OH",
        phone: "614-555-0111",
        cuisineType: "Mediterranean",
        priceRange: "$$$",
        dietTypeId: vegan
      },
      {
        name: "Celiac Haven Bakery",
        description: "Dedicated gluten-free bakery and sandwich shop.",
        address: "789 Birch Rd, Columbus, OH",
        phone: "614-555-0103",
        cuisineType: "Bakery",
        priceRange: "$",
        dietTypeId: glutenFree
      },
      {
        name: "The GF Plate",
        description: "Full-service restaurant with a 100% gluten-free kitchen.",
        address: "321 Pine St, Dublin, OH",
        phone: "614-555-0104",
        cuisineType: "American",
        priceRange: "$$$",
        dietTypeId: glutenFree
      },
      {
        name: "Wheatless Wonders Pizzeria",
        description: "Gluten-free wood-fired pizza with a dedicated prep line.",
        address: "56 Crescent Ave, Columbus, OH",
        phone: "614-555-0112",
        cuisineType: "Pizza",
        priceRange: "$$",
        dietTypeId: glutenFree
      },
      {
        name: "Golden Grain Diner",
        description: "Classic diner fare, entirely reworked to be gluten-free.",
        address: "410 Route 9, Columbus, OH",
        phone: "614-555-0113",
        cuisineType: "Diner",
        priceRange: "$",
        dietTypeId: glutenFree
      },
      {
        name: "Riverside GF Grill",
        description: "Steakhouse-style grill with a certified gluten-free menu.",
        address: "18 Riverside Dr, Columbus, OH",
        phone: "614-555-0114",
        cuisineType: "Steakhouse",
        priceRange: "$$$$",
        dietTypeId: glutenFree
      },
      {
        name: "Freewheat Bistro",
        description: "French-inspired bistro plates made entirely gluten-free.",
        address: "9 Lafayette Sq, Columbus, OH",
        phone: "614-555-0115",
        cuisineType: "French",
        priceRange: "$$$",
        dietTypeId: glutenFree
      },
      {
        name: "Shalom Bites",
        description: "Traditional kosher deli serving classic favorites.",
        address: "654 Cedar Ln, Bexley, OH",
        phone: "614-555-0105",
        cuisineType: "Deli",
        priceRange: "$$",
        dietTypeId: kosher
      },
      {
        name: "Jerusalem Grill",
        description: "Kosher-certified Middle Eastern grill house.",
        address: "987 Elm St, Columbus, OH",
        phone: "614-555-0106",
        cuisineType: "Middle Eastern",
        priceRange: "$$",
        dietTypeId: kosher
      },
      {
        name: "Kosher Corner Bagels",
        description: "Kosher bagel shop with house-cured lox and spreads.",
        address: "1200 Ocean Pkwy, Columbus, OH",
        phone: "614-555-0116",
        cuisineType: "Bagel Shop",
        priceRange: "$",
        dietTypeId: kosher
      },
      {
        name: "Sababa Kitchen",
        description: "Kosher Israeli comfort food, family recipes served fast-casual.",
        address: "45 Commerce St, Columbus, OH",
        phone: "614-555-0117",
        cuisineType: "Israeli",
        priceRange: "$$",
        dietTypeId: kosher
      },
      {
        name: "The Kosher Table",
        description: "Upscale kosher dining with a rotating seasonal menu.",
        address: "300 Michigan Ave, Columbus, OH",
        phone: "614-555-0118",
        cuisineType: "Contemporary",
        priceRange: "$$$$",
        dietTypeId: kosher
      },
      {
        name: "Challah Back Cafe",
        description: "Kosher bakery-cafe known for challah bread and pastries.",
        address: "22 King St, Columbus, OH",
        phone: "614-555-0119",
        cuisineType: "Bakery",
        priceRange: "$",
        dietTypeId: kosher
      },
      {
        name: "Olive & Salt",
        description: "Kosher Mediterranean seafood and grill.",
        address: "150 Bayshore Dr, Columbus, OH",
        phone: "614-555-0120",
        cuisineType: "Mediterranean",
        priceRange: "$$$",
        dietTypeId: kosher
      },
      {
        name: "Beit Kitchen",
        description: "Home-style kosher cooking with a rotating weekly menu.",
        address: "65 Fairview Rd, Columbus, OH",
        phone: "614-555-0121",
        cuisineType: "Home-style",
        priceRange: "$$",
        dietTypeId: kosher
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
