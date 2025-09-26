const { sequelize, User, Product } = require('./models');
const bcrypt = require('bcrypt');
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // fallback
}

(async () => {
  await sequelize.sync({ force: true });

  // Create user
  const passwordHash = await bcrypt.hash('password123', 10);
  await User.create({ name: 'Test User', email: 'test@demo.com', passwordHash });

  // Get local IP for backend URL
  const localIP = getLocalIP();
  const baseUrl = `http://${localIP}:4000/images/Niacinamide_30ml_1024x1024.webp`;

  const sampleProducts = [
    { title: 'Dermacream A', description: 'Hydrating face cream', price: 499, category: 'Skincare', image: baseUrl },
    { title: 'Sunshield SPF50', description: 'Sunscreen', price: 349, category: 'Skincare', image: baseUrl },
    { title: 'Hair Care Oil', description: 'Nourish scalp', price: 299, category: 'Hair', image: baseUrl },
    { title: 'Face Wash', description: 'Gentle cleansing', price: 199, category: 'Skincare', image: baseUrl },
    { title: 'Mohair Combo', description: 'Anti-dandruff', price: 599, category: 'Hair', image: baseUrl },
  ];

  for (const p of sampleProducts) {
    await Product.create(p);
    console.log('Product created:', p.title);
  }

  console.log(`Seeded DB. Login with email: test@demo.com password: password123`);
  console.log(`Base image URL used: ${baseUrl}`);
  process.exit(0);
})();
