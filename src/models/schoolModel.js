const mongoose = require("mongoose");
// const autoIncrement = require('mongoose-sequence')(mongoose);




const classSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    assignature: {
      type: Number,
      required: [true, "Se requiere seleccionar una asignatura"],
    },
    teacher: Number,
    room: String,
    type: Number,
});

const scheduleSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
      required: true,
  },
  hourModel: Number,
  classes: [classSchema],
});

const weekSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
      required: true,
    },
  hourModel: Number,
  days: [scheduleSchema],
});

const groupSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
      required: true,
   },
   name: {
     type: String,
     required: [true, "Se requiere un nombre del grupo"],
   },
   hourModel: Number,
   schedule: [weekSchema],
});

const yearSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
      required: true,
  },
   hourModel: Number,
   groups: [groupSchema],
});

const facultySchema = new mongoose.Schema({
   name: {
     type: String,
     required: [true, "Se requiere el nombre de la facultad"],
   },
   code: String,
   hourModel: Number,
   years: [yearSchema],
});

const assignatureSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
      required: true,
   },
   name: {
     type: String,
     requiered: [true, "Nombre de la asignatura requerida"],
   },
   abbr: String,
});

const teacherSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
      required: true,
  },
  name: {
    type: String,
    requiered: [true, "Nombre del profesor requerido"],
  },
  default_assignatures: [Number],
});

const hourSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
      required: true,
    },
  from: String,
  to: String,
});

const hourModelSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
    },
  hours: [hourSchema],
});

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    requiered: [true, "Nombre de la escuela obligatorio"],
  },
  hourModel: {
    type: Number,
    default: 0,
  },
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
const Teacher = mongoose.model("Teacher", teacherSchema);
const Hour = mongoose.model("Hour", hourSchema);
const HourModel = mongoose.model("HourModel", hourModelSchema);

const School = mongoose.model("School", schoolSchema);


(async () => {
  if (!(await HourModel.findOne({}))) {
    await HourModel.create(new HourModel({
      id: 0,
      hours: [
        new Hour({id: 0, from: "8:00", to: "9:20"}),
        new Hour({id: 1, from: "9:30", to: "10:50"}),
        new Hour({id: 2, from: "11:00", to: "12:20"}),
        new Hour({id: 3, from: "12:30", to: "13:50"}),
        new Hour({id: 4, from: "14:00", to: "15:20"}),
        new Hour({id: 5, from: "15:30", to: "16:50"}),
     ],
  }));
  console.log("El Modelo de Horario 0 ha sido creado correctamente!")
  }
  else {
    console.log("El Modelo de Horario 0 ya ha sido creado!")
  }
})();


module.exports = { School, Faculty, Year, Group, Week, Schedule, Class, Assignature, Teacher, Hour, HourModel };
