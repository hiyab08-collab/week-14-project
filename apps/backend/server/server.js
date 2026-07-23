import "dotenv/config";
import express from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurants.js";
import dietTypeRoutes from "./routes/dietTypes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/diet-types", dietTypeRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
