const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingconformationSchema = new Schema({
    slots: { type: String, requared: true },
    patientid: { type: String, requared: true },
    dbuid: { type: [String], requared: true },
    duration: { type: [Date], required: true }

},
    {
        timestamps: true,
    });
const bookingconformation = mongoose.model('Hospital', bookingconformationSchema);
module.exports = bookingconformation;