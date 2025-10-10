const mongoose = require("mongoose");

const CampgroundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    price: {
        type: Number
    },
    address: {
        type: String,
        required: [true, "Please add a address"]
    },
    district: {
        type: String,
        required: [true, "Please add a districe"]
    },
    province: {
        type: String,
        required: [true, "Please add a province"]
    },
    postalcode: {
        type: String,
        required: [true, "Please add a postalcode"],
        maxlength: [5, "Postal Code can not be more than 5 digits"]
    },
    tel: {
        type: String
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);