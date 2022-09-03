const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingconfirmationSchema = new Schema({
    slots: { type: String, requared: true },
    patientid: { type: String, requared: true },
    sourceuid: { type: String, requared: true },
    beduid: { type: String, requared: true },
    duration: { type: String, required: true }
},
    {
        timestamps: true,
    });
const bookingconfirmation = mongoose.model('bookingConfirmation', bookingconfirmationSchema);
module.exports = bookingconfirmation;