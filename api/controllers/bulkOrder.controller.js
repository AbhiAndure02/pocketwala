import OrderBulk from "../models/bulkOrder.js";

// Create a new bulk order
export const createBulkOrder = async (req, res) => {
  try {
    const order = new OrderBulk(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bulk orders (optionally filter by userId)
export const getBulkOrders = async (req, res) => {
  try {
    const query = req.query.userId ? { userId: req.query.userId } : {};
    const orders = await OrderBulk.find(query).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single bulk order by id
export const getBulkOrder = async (req, res) => {
  try {
    const order = await OrderBulk.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a bulk order (status or items)
export const updateBulkOrder = async (req, res) => {
  try {
    const order = await OrderBulk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a bulk order
export const deleteBulkOrder = async (req, res) => {
  try {
    const order = await OrderBulk.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all bulk orders by userId (controllers/bulkOrderController.js)
export const getBulkOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params; // or req.query for query string variants
    const orders = await OrderBulk.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
