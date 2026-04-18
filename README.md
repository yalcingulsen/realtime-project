# Gerçek Zamanlı Veri Akışı ve İşleme Projesi

Canlı Site (GitHub Pages)

Detaylı Anlatım Vidyosu (Youtube)
https://youtu.be/XYBt8NOEdLI

## Proje Açıklaması
Bu proje, Bulut Bilişim dersi kapsamında geliştirilmiş bir gerçek zamanlı veri akışı ve işleme uygulamasıdır. Bu projede sensör verileri simüle edilerek WebSocket teknolojisi ile gerçek zamanlı olarak iletilmiştir. Gelen veriler analiz edilmiş, MongoDB üzerinde saklanmış ve AWS platformuna gönderilerek bulut tarafında işlenmiştir.

## Kullanılan Teknolojiler
- Node.js
- WebSocket (ws)
- MongoDB Atlas
- AWS Lambda
- AWS API Gateway
- Git & GitHub

## Proje Özellikleri
- Gerçek zamanlı sensör verisi simülasyonu
- WebSocket ile veri iletimi
- Sıcaklık ve nem analizi
- Yüksek sıcaklık uyarı sistemi
- Verilerin MongoDB’de saklanması
- AWS ile bulut entegrasyonu

## Proje Akışı
1. Client tarafında sensör verisi (sıcaklık ve nem) üretilir  
2. Bu veriler WebSocket ile server’a gönderilir  
3. Server gelen verileri analiz eder  
4. Son 10 veri üzerinden ortalama hesaplanır  
5. Belirli eşik aşılırsa uyarı verilir  
6. Veriler MongoDB Atlas’a kaydedilir  
7. Aynı veriler AWS API Gateway üzerinden Lambda’ya gönderilir  

## Dosyalar
- client.js → Sensör verisi simülasyonu yapar  
- server.js → Veriyi alır, analiz eder, kaydeder ve AWS’e gönderir  
- package.json → Proje bağımlılıklarını içerir  

## Çalıştırma Adımları

### 1. Bağımlılıkları yükle
npm install

### 2. Server’ı başlat
node server.js

### 3. Client’ı başlat
node client.js

## Çıktılar
Sistem aşağıdaki çıktıları üretir:
- Gerçek zamanlı sensör verisi
- Ortalama sıcaklık ve nem değerleri
- Yüksek sıcaklık uyarıları
- MongoDB kayıt logları
- AWS gönderim logları

## Amaç
Bu projenin amacı, gerçek zamanlı verilerin nasıl üretildiğini, işlendiğini, analiz edildiğini, saklandığını ve bulut sistemlerine entegre edildiğini basit ve anlaşılır bir şekilde göstermektir.
