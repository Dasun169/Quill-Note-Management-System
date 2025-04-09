const express = require("express");
const router = express.Router();

const ProfileController = require("../Controllers/ProfileController");

router.post("/create", ProfileController.createProfile);
router.get("/link/:email", ProfileController.getLinkByEmail);
router.put("/link/:email", ProfileController.updateLinkByEmail);

module.exports = router;
