const mysql = require('mysql2');
const db = global.db;

exports.findAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};


exports.signIn = (req, res) => {
  const { email , password} = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email,password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ message: 'Kullanıcı bulunamadı.' });
    }
  });
};

exports.signUp = (req, res) => {
  const { email, isim, soyisim, tel_no , password} = req.body;
  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(400).send({ message: 'Bu e-posta adresi zaten kullanılmaktadır.' });
    } else {
      const insertSql = 'INSERT INTO users (email, isim, soyisim, tel_no, password) VALUES (?, ?, ?, ?, ?)';
      db.query(insertSql, [email, isim, soyisim, tel_no, password], (err, result) => {
        if (err) throw err;
        console.log('Kullanıcı kaydedildi:', result);
        res.send({ message: 'Kullanıcı başarıyla kaydedildi.' });
      });
    }
  });
};
