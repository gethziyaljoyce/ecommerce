//require
const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../routes/verifyToken");

//create Order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        console.log(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//To update Order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
        console.log(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})


//Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User Order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all User's Order
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$sales" } } }
        ]);
      console.log(income);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;