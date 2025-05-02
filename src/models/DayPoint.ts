import mongoose, { Schema } from 'mongoose';

const MarkingSchema = new Schema({
  marked_at: {
    type: Date,
    default: Date.now
  },
  points: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    default: null
  }
}, { _id: false });

const DayPointSchema = new Schema({
  dare_id: {
    type: Schema.Types.ObjectId,
    ref: "Dare",
    required: true
  },
  days: {
    type: Map,
    of: [MarkingSchema],
    default: {}
  }
});

export default mongoose.model("DayPoint", DayPointSchema);
