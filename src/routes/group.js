const { Router } = require("express");
const { getAllGroups } = require("../Controlle/groupController");

const router = Router();

router.get("/", getAllGroups);

module.exports = router;
