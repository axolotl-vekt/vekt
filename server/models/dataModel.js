const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI = 'mongodb+srv://sean:stab@tasks.dcsgmqh.mongodb.net/';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const infoSchema = new Schema({
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
  bloodSugar: { type: Number },
  sysPressure: { type: Number },
  diaPressure: { type: Number },
  beforeMeal: { type: Boolean },
});

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Session = mongoose.model('Session', sessionSchema);
const Info = mongoose.model('Info', infoSchema);
const db = mongoose.connection;

module.exports = { Session, User, Info, db };
