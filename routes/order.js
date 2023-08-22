const express = require('express')
const router = express.Router()
const {creatOrder, getOneOrder, getLoggedInOrders, admingetAllOrders, adminUpdateOrder, adminDeleteOrder} = require("../controllers/orderController")

const { isLoggedIn, customRole } = require("../middlewares/user");



router.route("/order/create").post(isLoggedIn, creatOrder)
router.route("/order/:id").get(isLoggedIn, getOneOrder )
router.route("/myorder").get(isLoggedIn, getLoggedInOrders )

router
.route('/admin/orders')
.get(isLoggedIn, customRole('admin'), admingetAllOrders)
.put(isLoggedIn, customRole('admin'), adminUpdateOrder)
.delete(isLoggedIn, customRole('admin'), adminDeleteOrder)

module.exports  = router;