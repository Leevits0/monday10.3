const express = require("express");
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getAllProperties);
router.post("/", createProperty);

router.use(requireAuth);

router.get("/:propertyId", getPropertyById);
router.put("/:propertyId", updateProperty);
router.delete("/:propertyId", deleteProperty);

module.exports = router;
