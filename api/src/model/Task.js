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

function rnd(n, m) {
	var random = Math.floor(Math.random()*(m-n+1)+n)
	return random
}

taskSchema.methods.createEval = function createEval(selfId, dotaskId) {
  var res = []
  var count = this.taskSize

  res.push(selfId)
  res.push(this.owner)
  if (this.isExpert) res.concat(this.experts)

  while(1) {
    var i = rnd(0, this.userData.length - 1)
    if (!res.includes(this.userData[i])) {
      res.push(this.userData[i])
      count --
      if (count < 2) break
    }
  }

  res.map(item => {
    const doeval = new Doeval({
      dotaskId,
      owner: item
    })
    doeval.save()
  })

  for(let i = 0; i < res.length; i++) {
    var index = this.userData.indexOf(res[i])
    if (index > -1) this.userData.splice(index, 1)
  }

  this.save()
}

export default mongoose.model('Task', taskSchema)
