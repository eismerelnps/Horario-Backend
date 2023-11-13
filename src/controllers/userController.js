const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
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
  },
  hourModel: Number,
  classes: [classSchema],
});

const weekSchema = new mongoose.Schema({
  id: {
      type: Number,
      unique: true,
    },
  hourModel: Number,
  days: [scheduleSchema],
});

const groupSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
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
  },
   hourModel: Number,
   groups: [groupSchema],
});

const facultySchema = new mongoose.Schema({
   name: {
     type: String,
     required: [true, "Se requiere el nombre de la facultad"]
   },
   code: String,
   hourModel: Number,
   years: [yearsSchema],
});

const assignatureSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
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
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Hour = mongoose.model("Hour", HourSchema);
const HourModel = mongoose.model("HourModel", hourModelSchema);

const School = mongoose.model("School", schoolSchema);


const defaultHourModel = new HourModel({
  id: 0,
  hours: [
   new Hour({id: 0, from: "8:00", to: "9:20"}),
   new Hour({id: 1, from: "9:30", to: "10:50"}),
   new Hour({id: 2, from: "11:00", to: "12:20"}),
   new Hour({id: 3, from: "12:30", to: "13:50"}),
   new Hour({id: 4, from: "14:00", to: "15:20"}),
   new Hour({id: 5, from: "15:30", to: "16:50"}),
  ],
});

Class.index({ id: 0 }, { unique: true });
Schedule.index({ id: 0 }, { unique: true });
Week.index({ id: 0 }, { unique: true });
Group.index({ id: 0 }, { unique: true });
Year.index({ id: 0 }, { unique: true });

Assignature.index({ id: 0 }, { unique: true });
Teacher.index({ id: 0 }, { unique: true });
Hour.index({ id: 0 }, { unique: true });
HourModel.index({ id: 0 }, { unique: true });


const AutoIncrement = (Schema) => {
  return () => {
    let doc = this;
    Schema.findOne({}, {}, function(err, schema) {
        if (err) return next(err);
        if (!schema) {
          schema = new Schema();
          schema.save(function(err) {
            if (err) return next(err);
            doc.id = schema.id;
            next();
          });
        } else {
          doc.id = schema.id;
          schema.id += 1;
          schema.save(function(err) {
            if (err) return next(err);
              next();
            });
        }
    });
  };
}

Class.pre('save', AutoIncrement(Class));
//Schedule.pre('save', AutoIncrement(Schedule));
//Week.pre('save', AutoIncrement(Week));
Group.pre('save', AutoIncrement(Group));
//Year.pre('save', AutoIncrement(Year));

Assignature.pre('save', AutoIncrement(Assignature));
Teacher.pre('save', AutoIncrement(Teacher));
Hour.pre('save', AutoIncrement(Hour));
HourModel.pre('save', AutoIncrement(HourModel));


(async () => {
  if (!(await HourModel.findOne({}))) {
    await HourModel.create(defaultHourModel);
  }
})();


module.exports = { School, Faculty, Year, Group, Week, Schedule, Class, Assignature, Teacher, Hour, hourModel };

  
