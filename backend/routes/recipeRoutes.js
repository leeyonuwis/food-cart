import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

/**
 * 🔹 GET all recipes (requires auth)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 🔹 GET all recipes (public, no auth)
 */
router.get("/public", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 🔹 CREATE new recipe (link instead of file upload)
 */
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image link is required" });
    }

    const recipe = new Recipe({
      name,
      description,
      price,
      image, // directly store link
    });

    await recipe.save();
    res.json({ message: "Recipe added successfully", recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 UPDATE recipe (with new link if provided)
 */
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.name = name || recipe.name;
    recipe.description = description || recipe.description;
    recipe.price = price || recipe.price;
    recipe.image = image || recipe.image; // update link if new one provided

    await recipe.save();
    res.json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 DELETE recipe
 */
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 GET recipe by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
