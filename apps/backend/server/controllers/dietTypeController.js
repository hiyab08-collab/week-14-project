import prisma from "../db/prisma.js";

// GET /api/diet-types
export async function getDietTypes(req, res) {
  try {
    const dietTypes = await prisma.dietType.findMany({
      orderBy: { name: "asc" }
    });

    return res.status(200).json({
      message: "Diet types retrieved successfully",
      data: dietTypes
    });
  } catch (error) {
    console.error("Error fetching diet types:", error);
    return res.status(500).json({ message: "Failed to retrieve diet types" });
  }
}
