const router = require('express').Router();
let Doctor = require('../Model/Doctors.model');
var bcrypt = require('bcryptjs');



router.route('/signup').post(async (req, res) => {
    // const name = req.body.name;
    const { name, email, tags, desc, specialisation, slots, password, cpassword } = req.body;
    const existingUser = await Doctor.findOne({ email: email });


    if (existingUser) {
        res.json('user already exists');
        // console.log(existingUser);

    }
    else {
        if (password !== cpassword) {
            res.status(500).json('cpassword and password are not same');
        }
        else {
            const salt = await bcrypt.genSaltSync(10);
            const encryptedPassword = await bcrypt.hashSync(password, salt);
            const newDoctor = new Doctor({
                email,
                slots,
                tags,
                desc,
                specialisation,
                name,
                password: encryptedPassword
            });
            newDoctor.save()
                .then(() => res.json('user added'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
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