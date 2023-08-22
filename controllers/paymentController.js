
const BigPromise = require('../middlewares/bigPromise')
const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.sendStripekey = BigPromise(async (req, res, next)  => {
    res.status(200).json({
        stripekey: process.env.STRIPE_API_KEY
    })
})

exports.captureStripePayment = BigPromise (async (req,res,next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',    
    })

    res.status(200).json({
        sucess: true,
        amount: req.body.amount,
        client_secret:  paymentIntent.client_secret
    })
})

exports.sendRazorpaykey = BigPromise(async(req, res, next) => {
    res.status(200).json({
        razorpaykey: process.env.RAZORPAY_API_KEY
    })
})

exports.captureRazorpayPayment = BigPromise (async (req, res, next) => {
    var instance = new Razorpay({
        ket_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    })
    var options = {
        amount: req.body,amount,
        currency: 'INR',
  
    }

    const myOrder = await instance.orders.create(options)

    res.status(200).json({
        success: true,
        amount: res.body.amount,
        order: myOrder
    })
})