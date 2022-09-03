const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    slots: { type: String, requared: true },
    patientid: { type: String, requared: true },
    sourceuid: { type: [String], requared: true },
    bed: { type: [String], requared: true },
    duration: { type: [Date], required: true }

},
    {
        timestamps: true,
    });
const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;