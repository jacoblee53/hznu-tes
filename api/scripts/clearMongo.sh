#!/usr/bin/env mongo

var db = new Mongo().getDB('hznu-tes')
db.tasks.deleteMany({})
db.dotasks.deleteMany({})
db.doevals.deleteMany({})