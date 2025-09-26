const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, User, Product, Order, OrderItem } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const path = require("path");

const JWT_SECRET = 'replace_this_with_a_strong_secret_in_prod';
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// Login (dummy auth; accepts email/password from seed)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch products (supports category & search via query params)
app.get('/api/products', async (req, res) => {
  try {
    const { category, q } = req.query;
    const where = {};
    if (category) where.category = category;
    if (q) where.title = { [sequelize.Op.like]: `%${q}%` };
    const products = await Product.findAll({ where });
    console.log('products in', res.json(products));
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Place order (requires auth)
app.post('/api/orders', auth(JWT_SECRET), async (req, res) => {
  try {
    const { items, total, paymentMethod, razorpayOrderId } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    const order = await Order.create({
      userId: req.user.id,
      total,
      paymentMethod: paymentMethod || 'cod',
      razorpayOrderId: razorpayOrderId || null
    });

    for (const it of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: it.id,
        price: it.price,
        qty: it.qty
      });
    }

    res.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get past orders for user
app.get('/api/orders', auth(JWT_SECRET), async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, include: [Product] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/* Razorpay: create an order (server side) - optional
   You need to configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env or replace below.
*/
const Razorpay = require('razorpay');
const RAZORPAY_KEY_ID = process.env.RP_KEY_ID || 'rzp_test_your_key';
const RAZORPAY_KEY_SECRET = process.env.RP_KEY_SECRET || 'rzp_test_secret';
const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });

app.post('/api/razorpay/create-order', auth(JWT_SECRET), async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    // amount should be in paise
    const options = {
      amount: amount, currency, receipt: `rcpt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Razorpay error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await sequelize.sync();
});
