const Event = require("./model");

const createEvent = async ({ title, description, price, date }) => {
  try {
    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
    });
    await event.save();
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
