const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./db.config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Veritabanı bağlantısı
const db = mysql.createConnection(dbConfig.db);
global.db = db;
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL bağlantısı başarılı.');
});

// Route'ları kullan
const userRoutes = require('./routes/user.routes');
const urunRoutes = require('./routes/urun.routes');

app.use('/users', userRoutes);
app.use('/urunler', urunRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
