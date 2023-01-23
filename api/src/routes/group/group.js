const { Router } = require("express");
const { getAllGroups } = require("../../controllers/groupController");

const router = Router();

router.get("/", getAllGroups);

module.exports = router;
