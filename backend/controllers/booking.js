const Booking = require("../models/Booking");

//@desc    Get all Requests by user/admin
//@route   GET /api/v1/booking or /api/v1/booking/:userName
//@access  Public
exports.getRequests = async (req, res, next) => {
  try {
    console.log('user = ', req.user)
    if (!req.user) {
      return res.status(400).json({
        success: false,
        msg: "You don't have permission to access this route",
      });
    }
    let bookingReq;
    if (req.user.role == "admin") {
      bookingReq = await Booking.find();
    }
    if (req.user.role == "user") {
      bookingReq = await Booking.find({ userName: req.user.name });
    }

    res.status(200).json({
      success: true,
      count: bookingReq.length,
      data: bookingReq,
    });
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err);
  }
};

//@desc    create booking request
//@route   POST /api/v1/booking
//@access  Public
exports.createRequest = async (req, res, next) => {
  try {
    //req.body
    const {userName, tel} = req.body;
    const alreadyBooked = await Booking.find({userName, tel});

    if (alreadyBooked.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: "You already have a booking" });
    }

    const createReq = await Booking.create(req.body);

    res.status(200).json({
      success: true,
      data: createReq,
      msg: "Booking successful",
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
    console.log(err);
  }
};

//@desc    Update one campground
//@route   PUT /api/v1/booking
//@access  Private
exports.updateRequest = async (req, res, next) => {
  try {
    const bookingReq = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, //ให้ return document ค่าหลังจาก update แล้ว
        runValidators: true, //ให้ตรวจสอบข้อมูลใหม่ตาม schema ก่อนอัปเดต ถ้าไม่ใส่ Mongoose จะ ไม่เช็ก validation และอัปเดตลงฐานข้อมูลได้เลย
      } 
    );

    if (!bookingReq) {
      res
        .status(400)
        .json({ success: false, msg: "This booking request not found" });
    }

    res.status(200).json({ success: true, data: bookingReq });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc    Delete one booking request
//@route   DELETE /api/v1/booking/:id
//@access  Private
exports.deleteRequest = async (req, res, next) => {
  try {
    const bookingReq = await Booking.findByIdAndDelete(req.params.id);

    if (!bookingReq) {
      res
        .status(400)
        .json({ success: false, msd: "Booking request not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
