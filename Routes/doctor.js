const router = require('express').Router();
let Doctor = require('../Model/Doctors.model');

router.route('/add').post(async (req, res) => {
    const { name, specialization, email, tags, slots, password} = req.body;

    try {
        if (!email || !password || !specialization || !name || !slots) {
            return res.status(404).json({ message: 'enter all details' })
        } else {
            const newDoctor = new Doctor({
                name, 
                specialization, 
                email, 
                tags, 
                slots, 
                password
            });
            newDoctor.save()
                .then(() => res.json("Successfully Saved"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        }
    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})

router.route('/').get(async (req, res) => {
    Doctor.find({})
        .then(doctor => res.json(doctor))
        .catch(err => res.status(404).json(`error-> ${err}`))
})

router.route('/login').post(async (req, res) => {
    const { email, password } = req.body
    Doctor.findOne({email,password})
        .then(doctor => res.json(doctor))
        .catch(err => res.status(404).json(`wrongUsernamePassword`))
})

module.exports = router;