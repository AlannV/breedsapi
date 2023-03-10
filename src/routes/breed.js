const { Router } = require("express");
const {
  getAllBreeds,
  addBreed,
  getById,
  getByName,
} = require("../controllers/breedController");

const router = Router();

router.get("/", getAllBreeds);
router.get("/name/", getByName);
router.get("/:id", getById);
router.post("/", addBreed);

module.exports = router;
