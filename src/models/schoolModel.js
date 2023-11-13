const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
    assignature: Number, 
    teacher: Number,
    room: String,
    type: Number,
});

const scheduleSchema = new mongoose.Schema({
  id: Number,
  hourModel: Number,
  classes: [classSchema],
});

const weekSchema = new mongoose.Schema({
  id: Number,
  hourModel: Number,
  days: [scheduleSchema],
});

const groupSchema = new mongoose.Schema({
   id: Number, 
   name: String,
   hourModel: Number,
   schedule: [weekSchema],
});

const yearSchema = new mongoose.Schema({
   id: Number,
   hourModel: Number,
   groups: [groupSchema],
});

const facultySchema = new mongoose.Schema({
   name: String,
   code: Number,
   hourModel: Number,
   years: [yearsSchema],
});

const assignatureSchema = new mongoose.Schema({
   id: Number,
   name: String, 
   abbr: Number,
});

const teacherSchema = new mongoose.Schema({
  id: Number,
  name: String,
  default_assignatures: [Number],
});

const hourSchema = new mongoose.Schema({
  id: Number,
  from: String,
  to: String,
});

const hourModelSchema = new mongoose.Schema({
  id: Number,
  hours: [hourSchema],
});

const schoolSchema = new mongoose.Schema({
  name: String,
  hourModel: Number,
  faculties: [facultySchema],
  assignatures: [assignatureSchema],
  teachers: [teacherSchema],
  hourModels: [hourModelSchema],
});


const Class = mongoose.model("Class", classSchema);
const Schedule = mongoose.model("Schedule", scheduleSchema);
const Week = mongoose.model("Week", weekSchema);
const Group = mongoose.model("Group", groupSchema);
const Year = mongoose.model("YearsSchema", yearSchema);
const Faculty = mongoose.model("Faculty", facultySchema);

const Assignature = mongoose.model("Assignature", assignatureSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Hour = mongoose.model("Hour", HourSchema);
const HourModel = mongoose.model("HourModel", hourModelSchema);

const School = mongoose.model("School", schoolSchema);


module.exports = { School, Faculty, Year, Group, Week, Schedule, Class, Assignature, Teacher, Hour, hourModel };

    
