import axios from "axios";
import express from "express";
import { User } from "../Entity/User";
import { createUserValiation } from "../Utils/validation";
import bcrypt from 'bcrypt';

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).send("users not found!")
        res.status(200).send({ data: users });
    } catch (e) {
        res.status(500).send(e);
    }
});


userRouter.post('/signup', async (req, res) => {
    try {
        const data = await axios.get('https://randomuser.me/api/')
        const imgUrl = data.data.results["0"].picture.thumbnail;

        const {firstName, lastName, email, password} = req.body;

        if (createUserValiation(firstName, lastName, email, password, res)) {
            const hashedPassword = await bcrypt.hash(password, 7);
            const user = User.create({
                firstName, lastName, email, imgUrl, password: hashedPassword
            });
            await user.save();
            res.status(200).send({ data: user });
        }
        else {
            createUserValiation(firstName, lastName, email, password, res);
        }
    } catch (error) {
        console.log(error)
    }
})

// userRouter.get("/:id", async (req, res) => {
//     try {
//         const id = +req.params.id;
//         const order = await Order.findOne({
//             where: { id },
//             relations: { orderLine: true }
//         });
//         if (!order) return res.status(404).send("posts not found!");
//         order.completed = true;
//         await order.save();
//         res.status(200).send({ data: order });
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

// userRouter.post("/", async (req, res) => {
//     try {
//         console.log(req.body);
//         const { firstName, lastName, mobNum, city, address, ordersCart } = req.body;
//         if (!firstName || !lastName || !mobNum || !city || !address || ordersCart.length < 0) return res.status(401).send("missing data");
//         const order = Order.create({
//             firstName,
//             lastName,
//             mobNum,
//             city,
//             address,
//         })
//         if (!order) return res.status(404).send("order not found!");

//         await order.save();

//         for (let i = 0; i < ordersCart?.length; i++) {
//             let orderLine = OrderLine.create(
//                 {
//                     quantity: ordersCart[i].quantity,
//                     product: ordersCart[i].id,
//                     order
//                 }
//             )
//             await orderLine.save()
//         };

//         res.status(201).send({ data: order })
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e);
//     }
// });

// userRouter.patch("/:id", async (req, res) => {
//     const { id } = req.params;
//     if (!id) {
//         return res.status(400).send({ message: "OrderId is required as params!" });
//     }
//     try {
//         const order = await Order.findOne({ where: { id: +id } });
//         if (!order) {
//             return res.status(404).send({ message: "Order is not found!" });
//         }
//         order.completed = true;
//         await order.save();
//         res.send({ order })
//     } catch (e) {
//         res.status(500).send({ error: "Server is down!" });
//     }
// });

// userRouter.delete("/:id", async (req, res) => {
//     try {
//         const id = +req.params.id;
//         const order = await Order.delete(id);
//         if (!order) return res.status(404).send("posts not found!");
//         res.status(200).send("delted succefully!");
//     } catch (e) {
//         res.status(500).send();
//     }
// });

export default userRouter;