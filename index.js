const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
    const target = "https://google.com/"; // Yönlendirilecek adres
    if (!target) {
        return res.sendStatus(500);
    }
    return createProxyMiddleware({ target: target, changeOrigin: true, onProxyReq: fixRequestBody, })(req, res);
});

app.listen(80, () => {
    console.log('Reverse Proxy Başlatıldı! http://localhost:80 adresinden erişebilirsiniz. (DDOS Korumalı bir sunucu üzerinde çalıştırarak kullanmanız tavsiye edilir.)');
});