const express = require('express');
const {
  getBuildings,
  addBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding
} = require('../controllers/building.controller');

const router = express.Router();

router
  .route("/")
  .get(getBuildings)
  .post(addBuilding);

router
  .route("/:id")
  .get(getBuilding)
  .put(updateBuilding)
  .delete(deleteBuilding);

module.exports = router;