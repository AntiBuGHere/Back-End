const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedHistory = new Schema({
    date: { type: Date, required: true },
    aadharno: { type: Number, required: true },
    prescriptions: { type: String, required: true },
    prescribedBy: { type: String, required: true },
    name: { type: String, required: true },
},
    {
        timestamps: true,
    });
const User = mongoose.model('MedHistory', MedHistory);
module.exports = User;