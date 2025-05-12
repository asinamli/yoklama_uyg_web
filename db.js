const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // şifre boşsa boş bırak
  database: 'yoklama_db' // phpMyAdmin'de gördüğünüz veritabanı adı
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('MySQL veritabanına başarıyla bağlanıldı!');
  }
});

module.exports = connection;
