-- MySQL veritabanı oluşturma
CREATE DATABASE IF NOT EXISTS yoklama_db;
USE yoklama_db;

-- ogrenciler tablosu
CREATE TABLE IF NOT EXISTS ogrenciler (
  id INT(11) NOT NULL AUTO_INCREMENT,
  ad VARCHAR(50) NOT NULL,
  soyad VARCHAR(50) NOT NULL,
  numara VARCHAR(20) NOT NULL,
  sinif VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

-- yoklamalar tablosu
CREATE TABLE IF NOT EXISTS yoklamalar (
  id INT(11) NOT NULL AUTO_INCREMENT,
  ogrenci_id INT(11) NOT NULL,
  tarih DATE NOT NULL,
  durum ENUM('geldi', 'gelmedi') NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (ogrenci_id) REFERENCES ogrenciler(id) ON DELETE CASCADE
);

-- Örnek veriler
INSERT INTO ogrenciler (ad, soyad, numara, sinif) VALUES
('Ahmet', 'Yılmaz', '1001', '10-A'),
('Mehmet', 'Kaya', '1002', '10-A'),
('Ayşe', 'Demir', '1003', '10-A'),
('Fatma', 'Şahin', '1004', '10-A'),
('Ali', 'Öz', '1005', '10-B'),
('Zeynep', 'Yıldız', '1006', '10-B'),
('Mustafa', 'Çelik', '1007', '10-B'),
('Emine', 'Arslan', '1008', '11-A'),
('Hüseyin', 'Aydın', '1009', '11-A'),
('Hatice', 'Erdoğan', '1010', '11-B');
