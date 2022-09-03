const router = require('express').Router();
let Hospital = require('../Model/Hospital.model');
let User = require('../Model/User.model');




router.route('/add').post(async (req, res) => {
    const { totalBeds, doctorids, bed, name, desc, tegs, email } = req.body;

    try {
        if (!email || !totalBeds || !doctorids) {
            return res.status(404).json({ message: 'enter all details' })
        } else {
            var bedsavailable = 0;
            bed.map((b) => {
                bedsavailable += b.number
                // console.log(b.number)
            })
            const hospital = new Hospital({
                bed,
                email,
                bedsAvailable: bedsavailable,
                totalBeds,
                doctorids,
                name,
                tegs,
                desc
            });

            hospital.save()
                .then(() => res.json("Successfully Saved"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        }


    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})

router.route('/edit/:id').post(async (req, res) => {
    Hospital.findById(req.params.id)
        .then(hospital => {
            hospital.bedsAvailable = req.body.bedsAvailable;
            hospital.totalBeds = req.body.totalBeds;
            hospital.doctorid = req.body.doctorid;
            hospital.bed = req.body.bed;
            hospital.save()
                .then(() => res.json("Successfully updated"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        })
})
router.route('/').get(async (req, res) => {
    Hospital.find({})
        .then(hospital => res.json(hospital))
        .catch(err => res.status(404).json(`error-> ${err}`))
})

router.route('/bed').get(async (req, res) => {
    Hospital.find({ bedsAvailable: { $gt: 0 } })
        .then(hospital => res.json(hospital.map(h => `bedsAvailable: ${h.bedsAvailable} name: ${h.name}`)))
        .catch(err => res.status(404).json(`error-> ${err}`))
})
router.route('/:id/beds').get(async (req, res) => {
    Hospital.findById(req.params.id)
        .then(hospital => res.json(hospital.bed))
        .catch(err => res.status(404).json(`error-> ${err}`))
})
router.route('/bed/:id').post(async (req, res) => {
    const type = req.body.type;
    const uid = req.body.uid;
    Hospital.findById(req.params.id)
        .then(hospital => {
            User.findOne({ _id: uid })
                .then(existingUser => {
                    if (existingUser.hospitalbooked.id == null) {
                        existingUser.hospitalbooked.id = req.params.id
                        existingUser.hospitalbooked.tob = Date.now()
                        existingUser.hospitalbooked.bedtype = type
                        existingUser.save()
                            .then(() => {
                                var alterBed = hospital.bed.map(b => {
                                    if (b.type == type) {
                                        b.number -= 1;
                                    }
                                    return b
                                })
                                hospital.bed = alterBed;
                                hospital.save()
                                    .then(() => res.json({ success: true }))
                                    .catch((err) => res.status(404).json(`error-> ${err}`))
                            })

                    } else {
                        res.json({ success: false, message: "You have already booked a bed" })
                    }
                })
        })
        .catch(err => res.status(404).json(`error-> ${err}`))
})


router.route('/delete/:id').delete((req, res) => {

    Hospital.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;