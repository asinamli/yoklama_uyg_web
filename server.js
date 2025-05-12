const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL bağlantısı
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // MySQL şifrenizi buraya girin
  database: 'yoklama_db',
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err);
    return;
  }
  console.log('MySQL veritabanına bağlandı.');
});

// Sınıf listesini getir
app.get('/siniflar', (req, res) => {
  connection.query(
    'SELECT DISTINCT sinif FROM ogrenciler ORDER BY sinif',
    (err, results) => {
      if (err) {
        console.error('Sınıf listesi alınamadı:', err);
        return res.status(500).json({ error: 'Sınıf listesi alınamadı' });
      }
      res.json(results);
    }
  );
});

// Sınıfa göre öğrencileri getir
app.get('/ogrenciler/:sinif', (req, res) => {
  const { sinif } = req.params;
  connection.query(
    'SELECT * FROM ogrenciler WHERE sinif = ? ORDER BY ad, soyad',
    [sinif],
    (err, results) => {
      if (err) {
        console.error('Öğrenci listesi alınamadı:', err);
        return res.status(500).json({ error: 'Öğrenci listesi alınamadı' });
      }
      res.json(results);
    }
  );
});

// Yoklama kaydet
app.post('/yoklama', (req, res) => {
  const { ogrenci_id, tarih, durum } = req.body;
  
  // Önce bu öğrenci için aynı tarihte yoklama var mı kontrol et
  connection.query(
    'SELECT * FROM yoklamalar WHERE ogrenci_id = ? AND tarih = ?',
    [ogrenci_id, tarih],
    (err, results) => {
      if (err) {
        console.error('Yoklama kontrolü yapılamadı:', err);
        return res.status(500).json({ error: 'Yoklama kaydedilemedi' });
      }
      
      // Eğer kayıt varsa güncelle
      if (results.length > 0) {
        connection.query(
          'UPDATE yoklamalar SET durum = ? WHERE ogrenci_id = ? AND tarih = ?',
          [durum, ogrenci_id, tarih],
          (updateErr) => {
            if (updateErr) {
              console.error('Yoklama güncellenemedi:', updateErr);
              return res.status(500).json({ error: 'Yoklama güncellenemedi' });
            }
            res.json({ message: 'Yoklama güncellendi!' });
          }
        );
      } else {
        // Yoksa yeni kayıt ekle
        connection.query(
          'INSERT INTO yoklamalar (ogrenci_id, tarih, durum) VALUES (?, ?, ?)',
          [ogrenci_id, tarih, durum],
          (insertErr) => {
            if (insertErr) {
              console.error('Yoklama eklenemedi:', insertErr);
              return res.status(500).json({ error: 'Yoklama kaydedilemedi' });
            }
            res.json({ message: 'Yoklama kaydedildi!' });
          }
        );
      }
    }
  );
});

// Sınıf ve tarihe göre yoklamaları getir
app.get('/yoklamalar/:sinif/:tarih', (req, res) => {
  const { sinif, tarih } = req.params;
  
  connection.query(
    `SELECT o.id, o.ad, o.soyad, o.numara, y.durum 
     FROM ogrenciler o 
     LEFT JOIN yoklamalar y ON o.id = y.ogrenci_id AND y.tarih = ? 
     WHERE o.sinif = ?
     ORDER BY o.ad, o.soyad`,
    [tarih, sinif],
    (err, results) => {
      if (err) {
        console.error('Yoklama listesi alınamadı:', err);
        return res.status(500).json({ error: 'Yoklama listesi alınamadı' });
      }
      res.json(results);
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
