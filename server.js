const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 56470;

// Statische Dateien aus dem Projektordner serven
app.use(express.static(__dirname));

// Route: Liste der Bilder
app.get('/images', (req, res) => {
  const imgDir = path.join(__dirname, 'images');
  fs.readdir(imgDir, (err, files) => {
    if (err) return res.status(500).send(err);
    const images = files.filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f));
    res.json(images);
  });
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));


