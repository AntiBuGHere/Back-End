const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    slots: { type: String, requared: true },
    patientid: { type: String, requared: true },
    sourceuid: { type: String, requared: true },
    beduid: { type: String, requared: true },
    duration: { type: String, required: true },
    patientName: { type: String, required: true },
    bedType: { type: String }
},
    {
        timestamps: true,
    });
const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;