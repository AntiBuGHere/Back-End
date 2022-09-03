const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bed = new Schema({
    number: { type: Number, required: true },
    type: { type: String, required: true },
    desc: { type: String }
})


const HospitalSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    bedsAvailable: { type: Number, required: true },
    bed: { type: [Bed], required: true },
    totalBeds: { type: Number, required: true },
    tags: { type: [String], required: true },
    doctorids: { type: [String], required: true },
    desc: { type: String, required: true }

},
    {
        timestamps: true,
    });
const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports = Hospital;