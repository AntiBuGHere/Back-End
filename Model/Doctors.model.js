const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialisation: { type: String, required: true },
    email: { type: String, required: true },
    tags: { type: [String], required: true },
    desc: { type: String },
    slots: { type: [String], required: true },
    password: { type: String }

}, {
    timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;