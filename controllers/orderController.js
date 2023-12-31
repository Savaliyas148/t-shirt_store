const Order = require("../models/order");
const Product = require("../models/product");
const CustomError = require("../utils/customError")
const BigPromise = require("../middlewares/bigPromise");

exports.creatOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id,
  });

  res.send(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = BigPromise(async ( req, res, next)  => {
    const order = await Order.findById(req.params.id).populate('user',  'name email')

    if (!order) {
            return next(new CustomError("please check order id", 401))
    }

    res.status(200).json({
        success: true,
        order,
    })
})

exports.getLoggedInOrders = BigPromise(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id})
    if (!order) {
        return next(new CustomError("please check order id", 401))
    }

    res.status(200).json({
        success:true,
        order,
    })
})

exports.admingetAllOrders = BigPromise(async ( req, res, next) => {
    const orders = await Order.find()

    res.status(200).json({
        success: true,
        orders,
    })
})

exports.adminUpdateOrder = BigPromise(async(req, res, next) => {
    const order = await Order.findById(req.parmas.id)

    if (order.orderStatus === "Delivered") {
        return next(new CustomError("Order is alredy marked for delivered", 401))
        
    }

    order.orderStatus = req.body.orderStatus

order.orderItems.fprEach(async prod => {
  await  updateProductStock(prod.product, prod.quantity)
})

await order.save()

    res.status(200).json({
        success: true,
        orders,
    })
})


exports.adminDeleteOrder = BigPromise(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    await order.remove()

    res.status(200).json({
        success: true,
    })
})

async function updateProductStock(productId, quantity){
    const product = await Product.findById(productId)

    product.stock = product.stock - quantity

    await product.save({validateBeforeSave: false})
}