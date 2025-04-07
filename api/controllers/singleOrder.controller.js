import SingleOrder from "../models/singleOrder.model.js";


// Create a new single order
export const createSingleOrder = async (req, res) => {
    try {
        const { size, color, placement, quantity, price } = req.body;

        if (!size || !color || !placement || !quantity || !price) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newSingleOrder = new SingleOrder({ size, color, placement, quantity, price });
        await newSingleOrder.save();

        res.status(201).json({ message: "Single order placed successfully", order: newSingleOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Fetch all single orders
export const getAllSingleOrders = async (req, res) => {
    try {
        const orders = await SingleOrder.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// };
// // Fetch a single order by ID
// export const getSingleOrderById = async (req, res) => {
//     try {
//         const order = await SingleOrder.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: "Order not found" });

//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// // Delete a single order
// export const deleteSingleOrder = async (req, res) => {
//     try {
//         const order = await SingleOrder.findByIdAndDelete(req.params.id);
//         if (!order) return res.status(404).json({ message: "Order not found" });

//         res.status(200).json({ message: "Order deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// // Update a single order
// export const updateSingleOrder = async (req, res) => {
//     try {
//         const { size, color, placement, quantity, price } = req.body;

//         if (!size || !color || !placement || !quantity || !price) {
//             return res.status(400).json({ message: "Invalid order data" });
//         }

//         const updatedOrder = await SingleOrder.findByIdAndUpdate(
//             req.params.id,
//             { size, color, placement, quantity, price },
//             { new: true }
//         );

//         if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

//         res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
