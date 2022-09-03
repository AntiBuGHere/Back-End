const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine = new Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    desc: { type: String, required: false },
    duration: { type: String, required: false }
})
const Test = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true }
})

const Prescription = new Schema({
    tests: { type: [Test], required: false },
    medicines: { type: [Medicine], required: false },
    desc: { type: String, required: false }
})
const MedHistory = new Schema({
    date: { type: Date, required: true },
    aadharno: { type: Number, required: true },
    prescriptions: { type: [Prescription], required: true },
    name: { type: String, required: true },

},
    {
        timestamps: true,
    });
const User = mongoose.model('MedHistory', MedHistory);
module.exports = User;