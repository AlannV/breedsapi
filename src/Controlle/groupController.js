const { Group } = require("../db");
const { GROUPS } = require("../dbFillers/dbGroups.js");

async function getAllGroups(req, res, next) {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
}

async function fillGroups() {
  const groups = Group.bulkCreate(
    GROUPS.map((g) => {
      return {
        name: g,
      };
    })
  );
  if (!groups) {
    throw new Error("The groups cannot be loaded into the database");
  } else {
    console.log("Groups successfully loaded into the database");
  }
  return groups;
}

module.exports = {
  getAllGroups,
  fillGroups,
};
