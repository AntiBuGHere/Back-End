const router = require('express').Router();
let Doctor = require('../Model/Doctors.model');
let booking = require('../Model/booking.model');
var bcrypt = require('bcryptjs');



router.route('/book').post(async (req, res) => {
    // const name = req.body.name;
    const { slots, patientid, sourceuid, bed, duration, drid } = req.body;
    if (!bed) {
        booking.find({ sourceuid: drid }).then((res) => {
            res.data.duration.map((date) => {
                if (date in duration) {
                    res.status(505).json(`already occupied`)
                }
                Doctor.find({ sourceuid: drid }).then((res) => {
                    res.data.availability.push(slots)
                })
            })
        })
    }
})





router.route('/signin').post(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!password || !email) {
            return res.status(404).json({ message: 'enter all details' })
        }

        const existingUser = await Doctor.findOne({ email: email })
        if (existingUser) {

            const ispassCorrect = await bcrypt.compare(password, existingUser.password)
            if (!ispassCorrect) {
                return res.json("password is incorrect");
            }
            else {
                res.json({ status: "you are signed in", uid: aadharno });
            }
        } else { res.json("invalid user") }
    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})


router.route('/:email').get((req, res) => {
    const email = req.params.email;
    Doctor.findOne({ "email": email })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(`Error: ` + err));

});

module.exports = router;