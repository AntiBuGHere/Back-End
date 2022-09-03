const router = require('express').Router();
let medHistory = require('../Model/medHistory.model');



router.route('/add').post(async (req, res) => {
    const { aadharno, name, prescriptions } = req.body;

    try {
        if (!name || !aadharno || !prescriptions) {
            return res.status(404).json({ message: 'enter all details' })
        } else {
            const History = new medHistory({
                aadharno,
                name,
                prescriptions,
                date: Date.now()
            });

            History.save()
                .then(() => res.json("Successfully Saved"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        }


    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})

router.route('/:aadharno').get((req, res) => {
    const aadharno = req.params.aadharno;

    medHistory.findOne({ "aadharno": aadharno })
        .then(result => res.json(result))
})

module.exports = router;