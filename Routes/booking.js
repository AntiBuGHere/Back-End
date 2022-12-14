const router = require('express').Router();
let Doctor = require('../Model/Doctors.model');
let Hospital = require('../Model/Hospital.model');
let Booking = require('../Model/booking.model');
let BookingConfirmation = require('../Model/bookingconfirmation.model')
var bcrypt = require('bcryptjs');



router.route('/add').post(async (req, res) => {
    // const name = req.body.name;
    const { slots, patientid, sourceuid, beduid, duration, patientName, bedType } = req.body;
    // res.json({slots, patientid, sourceuid, beduid, duration})
    if (beduid) {
        // console.log("enter")
        if(patientid && sourceuid && beduid && duration && patientName && bedType){
            // console.log("enter")
            const data = {
                patientid, sourceuid, beduid, duration, patientName, bedType
            }
            const newBooking = new Booking(data)
            newBooking.save()
                .then(()=>{
                    res.json({ status: "Awaiting confirmation", success: true })
                })
                .catch(err=>res.json(err))
        }
    }else{
        // console.log("enter")
        if(patientid && sourceuid && slots && duration){
            // console.log("enter")
            const data = {
                patientid, sourceuid, slots, duration, patientName
            }
            const newBooking = new Booking(data)
            newBooking.save()
                .then(()=>{
                    res.json({ status: "Awaiting confirmation", success: true })
                })
                .catch(err=>res.json(err))
        }
    }
})

router.route('/confirm').post((req,res)=>{
    const {bookingUid} = req.body;
    Booking.findOne({"_id":bookingUid})
        .then((data)=>{
            const newReq = {
                patientid:data.patientid, 
                sourceuid:data.sourceuid, 
                beduid:data.beduid, 
                duration:data.duration,
                patientName:data.patientName,
                bedType:data.bedType
            }
            console.log()
            const newBookingConfirmation = new BookingConfirmation(newReq)
            newBookingConfirmation.save()
                .then(async()=>{
                    await Booking.findOneAndDelete({"_id":bookingUid})
                    res.json({ status: "confirmed", success: true })
                })
                .catch(err=>res.json(err))
        })
})

router.route('/:id').get((req,res)=>{
    const sourceuid = req.params.id
    Booking.find({sourceuid})
        .then(data=>{
            res.json({data})
        })

})

router.route('/confirmed/:id').get((req,res)=>{
    const sourceuid = req.params.id
    BookingConfirmation.find({sourceuid})
        .then(data=>{
            res.json({data})
        })

})

module.exports = router;