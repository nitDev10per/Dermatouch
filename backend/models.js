const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' });

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  passwordHash: DataTypes.STRING
});

const Product = sequelize.define('Product', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  category: DataTypes.STRING,
  image: DataTypes.STRING
});

const Order = sequelize.define('Order', {
  total: DataTypes.FLOAT,
  paymentMethod: DataTypes.STRING,
  razorpayOrderId: DataTypes.STRING
});

const OrderItem = sequelize.define('OrderItem', {
  price: DataTypes.FLOAT,
  qty: DataTypes.INTEGER
});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = { sequelize, User, Product, Order, OrderItem, Op };
