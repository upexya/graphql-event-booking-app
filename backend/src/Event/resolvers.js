const Event = require("./model");

const { UserModel } = require("../User");

const createEvent = async ({
  title,
  description,
  price,
  date,
  location,
  created_by,
}) => {
  try {
    const event = new Event({
      title,
      description,
      price,
      location,
      created_by,
      date: new Date(date),
    });
    await event.save();

    await UserModel.findByIdAndUpdate(created_by, {
      $push: { created_events: event?._doc?._id },
    });

    return [{ ...event?._doc, _id: event?._doc?._id.toString() }];
  } catch (error) {
    throw new Error(error);
  }
};

const getEvents = async () => {
  try {
    const events = await Event.find();
    return events.map((event) => ({
      ...event?._doc,
      _id: event?._doc?._id.toString(),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
};
