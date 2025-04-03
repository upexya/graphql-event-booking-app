const Booking = require("./model");
const { UserModel } = require("../User");

const bookEvent = async ({ event_id, user_id, status }) => {
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

    return [
      {
        ...booking._doc,
        _id: booking?.id,
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
      },
    ];
  } catch (error) {
    throw new Error(error?.message || "Error creating booking");
  }
};

const cancelBooking = async ({ booking_id }) => {};

module.exports = {
  bookEvent,
  cancelBooking,
};
