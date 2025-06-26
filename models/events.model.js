import mongoose, { Types } from "mongoose";

const eventSchema = new mongoose.Schema({
  events: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Events_Group = mongoose.model("Events_Group", eventSchema);

export default Events_Group;
