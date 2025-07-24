require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const materialRoutes = require('./routes/materialRoutes');
const dischargeRoutes = require('./routes/dischargeRoutes');
const app = express();
const cors = require('cors');

// app.use(cors({
//   origin: process.env.CLIENT_ORIGIN, // 👈 your React dev server port
//   credentials: true
// }));
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.CLIENT_ORIGIN_D
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow REST clients like Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/admin', adminRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/discharge', dischargeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
