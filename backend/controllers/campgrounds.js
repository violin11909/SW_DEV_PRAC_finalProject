const Campground = require('../models/Campground')

//@desc    Get all campgrounds
//@route   GET /api/v1/campgrounds
//@access  Public
exports.getCampgrounds= async (req, res, next) => {
    try {
        const campgrounds = await Campground.find();

        res.status(200).json({
            success: true,
            count: campgrounds.length,
            data: campgrounds 
        });
    } catch (err) {
        res.status(400).json({success: false});
    }
};

//@desc    Get one campground
//@route   GET /api/v1/campgrounds/:id
//@access  Public
exports.getCampground=(req, res, next) => {
    res.status(200).json({success: true, msg:`Show campground ${req.params.id}`});
};

//@desc    Create one campground
//@route   POST /api/v1/campgrounds
//@access  Private
exports.createCampground= async (req, res, next) => {
    const campground = await Campground.create(req.body);
    res.status(200).json({
        success: true, 
        msg:campground
    });
};

//@desc    Update one campground
//@route   PUT /api/v1/campgrounds/:id
//@access  Private
exports.updateCampground=(req, res, next) => {
    res.status(200).json({success: true, msg:`Update hospital ${req.params.id}`});
};

//@desc    Delete one campground
//@route   DELETE /api/v1/campgrounds/:id
//@access  Private
exports.deleteCampground=(req, res, next) => {
    res.status(200).json({success: true, msg:`Delete campground ${req.params.id}`});
};