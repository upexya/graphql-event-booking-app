const Booking = require("./model");
const { UserModel } = require("../User");

const { dateToString } = require("../utils/date");

const populateBooking = async (booking) => {
  return {
    ...booking._doc,
    _id: booking?.id,
    createdAt: dateToString(booking?.createdAt),
    updatedAt: dateToString(booking?.updatedAt),
    event: {
      ...booking?.event?._doc,
      _id: booking?.event?.id,
      created_by: {
        ...booking?.event?.created_by?._doc,
        _id: booking?.event?.created_by?.id,
      },
    },
    user: {
      ...booking?.user?._doc,
      _id: booking?.user?.id,
    },
  };
};

const createBooking = async ({ event_id, user_id, status }) => {
  try {
    // check if user has already booked the event
    const existingBooking = await Booking.findOne({
      event: event_id,
      user: user_id,
    });
    if (existingBooking) {
      throw new Error("You have already booked this event");
    }

    let booking = new Booking({
      event: event_id,
      user: user_id,
      status: status,
    });
    await booking.save();

    await booking.populate("event");
    await booking.populate("user", "-password");
    await UserModel.populate(booking, {
      path: "event.created_by",
      select: "-password",
    });

    return [populateBooking(booking)];
  } catch (error) {
    throw new Error(error?.message || "Error creating booking");
  }
};

const updateBookingStatus = async ({ _id, status }) => {
  try {
    await Booking.findByIdAndUpdate(_id, { status });
    let booking = await Booking.findById(_id)
      .populate("event")
      .populate("user", "-password");

    await UserModel.populate(booking, {
      path: "event.created_by",
      select: "-password",
    });

    return [populateBooking(booking)];
  } catch (error) {
    throw new Error(error?.message || "Error cancelling booking");
  }
};

const getBookings = async ({ event_id, user_id }) => {
  try {
    const bookings =
      event_id && user_id
        ? await Booking.find({ event: event_id, user: user_id })
            .populate("event")
            .populate("user", "-password")
        : await Booking.find().populate("event").populate("user", "-password");
    await UserModel.populate(bookings, {
      path: "event.created_by",
      select: "-password",
    });

    return bookings.map((booking) => populateBooking(booking));
  } catch (error) {
    throw new Error(error?.message || "Error fetching bookings");
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookings,
};
