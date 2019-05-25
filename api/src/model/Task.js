import mongoose from 'mongoose'
import _ from 'lodash'
import Doeval from '../model/Doeval'

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
    standards: [{
      type: Schema.Types.ObjectId,
      ref: 'Standard',
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isExpert: {
      type: Boolean,
      required: true,
    },
    experts: [
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
    mateRatio: {
      type: Number,
      required: true,
    },
    expertRatio: {
      type: Number,
      default: 0,
    },
    userData: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
  },
)

taskSchema.methods.createEval = function createEval(selfId, dotaskId) {
  var list = _.sampleSize(_.without(_.uniq([...this.userData]), selfId), (this.taskSize - 1))
  list.push(this.owner)
  list.push(selfId)
  if (this.isExpert) list.concat(this.experts)

  console.log(list)

  list.map(item => {
    const doeval = new Doeval({
      dotaskId,
      owner: item
    })
    doeval.save().then(r => {
      console.log(r)
    })
  })

  for( let i = 0; i < list.length; i++) {
    var index = this.userData.indexOf(list[i])
    if (index > -1) this.userData.splice(index, 1)
  }

  this.save()
}

export default mongoose.model('Task', taskSchema)
