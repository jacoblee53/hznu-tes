import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      unique: true,
    },
    taskDesc: {
      type: String,
      required: true,
    },
    taskSize: {
      type: Number,
      required: true,
    },
    taskClass: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    expert: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    teacherRatio: {
      type: Number,
      required: true,
    },
    selfRatio: {
      type: Number,
      required: true,
    },
    expertRatio: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Task', taskSchema)
