const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Building=require("../models/Building")


// @desc      Get Buildings
// @route     GET /api/buildings
// @access    Public
exports.getBuildings = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    const buildings = await Building.find()
        .skip(skip)
        .limit(pageSize)
        .exec();

    if (!buildings || !buildings.length) {
        return next(
            new ErrorResponse(`No Building Found`, 404)
        );
    }

    const totalDocuments = await Building.countDocuments();

    if (!totalDocuments) {
        return next(
            new ErrorResponse(`SomeThing Went Wrong!`, 404)
        );
    }

    const totalPages = Math.ceil(totalDocuments / pageSize);

    const response = {
        buildings,
        page,
        pageSize,
        totalPages,
        totalDocuments,
    };
    res.status(200).json({
        success: true,
        statusCode:200,
        data: response
    });

});

// @desc      Get single Building
// @route     GET /api/buildings/:id
// @access    Public
exports.getBuilding = asyncHandler(async (req, res, next) => {
    const building = await Building.findOne({ building_id: req.params.id })

    if (!building) {
        return next(
            new ErrorResponse(`No building found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        statusCode:200,
        data: building
    });
});

// @desc      Add review
// @route     POST /api/buildings
// @access    Public
exports.addBuilding = asyncHandler(async (req, res, next) => {
    let { name, floors, location } = req.body

    if (!name || !floors || !location) {
        return next(new ErrorResponse("Please pass parameters", 400));
    }

    const building = await Building.create({ name, floors, location });

    if (!building) {
        return next(new ErrorResponse("can't Add building", 400));
    }

    res.status(201).json({
        success: true,
        statusCode:201,
        data: building
    });
});

// @desc      Update Building details
// @route     PUT /api/buildings/:id
// @access    Public
exports.updateBuilding = asyncHandler(async (req, res, next) => {
    let building = await Building.findOne({ building_id: req.params.id });

    if (!building) {
        return next(
            new ErrorResponse(`No building with the id of ${req.params.id}`, 404)
        );
    }

    building = await Building.findOneAndUpdate({ building_id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    });

    if (!building) {
        return next(
            new ErrorResponse(`Update Conflict!!`, 409)
        );
    }

    res.status(200).json({
        success: true,
        statusCode:200,
        data: building
    });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Public
exports.deleteBuilding = asyncHandler(async (req, res, next) => {
    const building = await Building.findOneAndRemove({ building_id: req.params.id });

    if (!building) {
        return next(
            new ErrorResponse(`No building with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        statusCode:200,
        data: {}
    });
});