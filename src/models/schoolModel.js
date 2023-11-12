const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
    assignature: Number, // ID correspondiente a la asignatura
    teacher: Number, // ID correspondiente al profesor
    room: String, // Nombre del aula o salon
    type: Number, // ID referente al tipo de clase
});

const scheduleSchema = new mongoose.Schema({
  id: Number, // Identificador, representa el dia de la semana
  hourModel: Number, // ID del modelo de horario (nivel dia) No se usa a menos q el usuario lo defina
  classes: [classSchema], // Lista de turnos, su ID representa el ID en hoursTurns
});

const weekSchema = new mongoose.Schema({
  id: Number, // Identificador, representa la semana
  hourModel: Number, // ID del modelo de horario (nivel semana) No se usa a menos q el usuario lo defina
  days: [scheduleSchema], // Lista de dias de la semana
});

const groupSchema = new mongoose.Schema({
   id: Number, // Identificador del grupo, usado como referencia
   name: String, // Nombre del grupo
   hourModel: Number, // ID del modelo de horario (nivel grupo) No se usa a menos q el usuario lo defina
   schedule: [weekSchema], // Lista de  semanas
});

const yearSchema = new mongoose.Schema({
   id: Number, // Numero referente al año
   hourModel: Number, // ID del modelo de horario (nivel año) No se usa a menos q el usuario lo defina
   groups: [groupSchema], // Lista de grupos
});

const facultySchema = new mongoose.Schema({
   name: String, // Nombre de la facultad
   code: Number, // Codigo referente a la facultad
   hourModel: Number, // ID del modelo de horario (nivel facultad) No se usa a menos q el usuario lo defina
   years: [yearsSchema], // Lista de años con sus datos
});

const assignatureSchema = new mongoose.Schema({
   id: Number, // Identificador de la asignatura, usado como referencia
   name: String, // nombre de la asignatura
   abbr: Number, // abreviatura de la asignatura
});

const teacherSchema = new mongoose.Schema({
  id: Number, // Identificador al profesor, usado como referencia
  name: String, // Nombre del profesor
  default_assignatures: [Number], // Lista de IDs ds las asignaturas asignadas por el usuario
});

const hourSchema = new mongoose.Schema({
  id: Number, // Identificador del horario del turno, usado como referencia
  from: String, // hora desde, inicio del turno
  to: String, // hora hasta, fin del turno
});

const hourModelSchema = new mongoose.Schema({
  id: Number, // Identificador del modelo de horarios de turnos, usado como referencia
  hours: [hourSchema], // Lista de horarios de los turnos
});

const schoolSchema = new mongoose.Schema({
  name: String, // Nombre de la Escuela o Universidad
  hourModel: Number, // ID del modelo de horario (nivel escuela) Usa por defecto el modelo 0 a no ser q lo cambien
  faculties: [facultySchema], // Lista de facultades
  assignatures: [assignatureSchema], // Lista de asignaturas
  teachers: [teacherSchema], // Lista de profesores
  hourModels: [hourModelSchema], // Lista de los modelos de horarios
});

// Si no hay un hourModel la app crea uno por defecto


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
