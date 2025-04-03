const Event = require("./model");

const { UserModel } = require("../User");

const _events = async (event_ids) => {
  try {
    const events = await Event.find({ _id: { $in: event_ids } });
    if (!events) {
      throw new Error("Events not found");
    }
    return events.map((event) => ({
      ...event._doc,
      _id: event?._doc?._id.toString(),
      created_by: _user(event?.created_by),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const _user = async (user_id) => {
  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      ...user._doc,
      _id: user?._doc?._id.toString(),
      password: null,
      created_events: _events(user?.created_events),
    };
  } catch (error) {
    throw new Error(error);
  }
};

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
    await event.populate("created_by", "-password");

    await UserModel.findByIdAndUpdate(created_by, {
      $push: { created_events: event?._doc?._id },
    });

    return [
      {
        ...event?._doc,
        _id: event?._doc?._id.toString(),
        date: new Date(event._doc.date).toISOString(),
      },
    ];
  } catch (error) {
    throw new Error(error);
  }
};

const getEvents = async () => {
  try {
    const events = await Event.find().populate("created_by", "-password");

    return events.map((event) => ({
      ...event._doc,
      _id: event._doc._id.toString(),
      date: new Date(event._doc.date).toISOString(),
    }));

    // NOTE: Uncomment and return this instead if you want to fetch detailed user object, but it may cause performance issues
    // return await Promise.all(
    //   events.map(async (event) => ({
    //     ...event._doc,
    //     _id: event._doc._id.toString(),
    //     // created_by: await _user(event.created_by),
    //   }))
    // );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
};
