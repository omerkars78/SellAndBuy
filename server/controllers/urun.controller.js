const mysql = require('mysql2');
const db = global.db;

exports.getCategories = (req, res) => {
  const sql = 'SELECT * FROM category';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.findAllUrunler = (req, res) => {
  const sql = 'SELECT * FROM urunler INNER JOIN category ON urunler.category_id = category.category_id';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.createUrun = (req, res) => {
  const { user_id, category_id, urun_adi, urun_bilgisi, urun_fiyati, satildi_bilgisi, imageURI } = req.body;
  const sql = 'INSERT INTO urunler (user_id, category_id, urun_adi, urun_bilgisi, urun_fiyati, satildi_bilgisi, imageURI) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, category_id, urun_adi, urun_bilgisi, urun_fiyati, satildi_bilgisi, imageURI], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Ürün başarıyla eklendi.' });
  });
};


exports.updateUrun = (req, res) => {
  const { category_id ,urun_adi, urun_bilgisi, urun_fiyati, satildi_bilgisi  } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE urunler SET category_id = ?, urun_adi = ?, urun_bilgisi = ?, urun_fiyati = ?, satildi_bilgisi = ?  WHERE urun_id = ?';
  db.query(sql, [category_id, urun_adi, urun_bilgisi, urun_fiyati, satildi_bilgisi,  id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Ürün başarıyla güncellendi.' });
  });
};

exports.deleteUrun = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM urunler WHERE urun_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Ürün başarıyla silindi.' });
  });
};

exports.findSatistakiUrunler = (req, res) => {
  const sql = 'SELECT * FROM urunler INNER JOIN category ON urunler.category_id = category.category_id INNER JOIN users ON urunler.user_id = users.user_id WHERE satildi_bilgisi = 0';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.getUrunlerByCategory = (req, res) => {
  const {category_id} = req.params;
  const sql = `  SELECT 
  urunler.*, 
  category.category_name, 
  users.isim, 
  users.soyisim, 
  users.email, 
  users.tel_no
FROM urunler, category, users 
WHERE 
  urunler.category_id = category.category_id AND 
  urunler.user_id = users.user_id AND 
  urunler.category_id = ? AND 
  satildi_bilgisi = 0`;
  db.query(sql, [category_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.getUrunlerSorted = (req, res) => {
  const {order} = req.query;
  const validOrders = ['asc', 'desc'];
  if (!validOrders.includes(order)) {
    res.status(400).send({message: 'Geçersiz sıralama parametresi.'});
    return;
  }
  const sql = `  SELECT 
  urunler.*, 
  category.category_name, 
  users.isim, 
  users.soyisim, 
  users.email, 
  users.tel_no
FROM urunler, category, users 
WHERE 
  urunler.category_id = category.category_id AND 
  urunler.user_id = users.user_id
ORDER BY urun_id ${order}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.getUrunlerByUser = (req, res) => {
  const {user_id} = req.params;
  const sql =' SELECT * FROM urunler JOIN users ON urunler.user_id = users.user_id WHERE urunler.user_id = ?';
  ;
  db.query(sql, [user_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};


exports.updateSatildi = (req, res) => {
  const { urun_id } = req.params;
  const { satildi_bilgisi } = req.body;
  const sql = 'UPDATE urunler SET satildi_bilgisi = ? WHERE urun_id = ?';
  db.query(sql, [satildi_bilgisi, urun_id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Ürün satıldı bilgisi başarıyla güncellendi.' });
  });
};

