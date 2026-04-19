const kcrData = require('./dist/data/kcrData.js');
const fs = require('fs');
const path = require('path');

const products = kcrData.catalogProducts;
let missingCount = 0;
let foundCount = 0;

products.forEach((product, idx) => {
  if (product.img && product.img.startsWith('/assets/images/products/')) {
    const imagePath = `./public${product.img}`;
    if (!fs.existsSync(imagePath)) {
      console.log(`Missing: ${product.name} - ${product.img}`);
      missingCount++;
    } else {
      foundCount++;
    }
  }
});

console.log(`\nSummary: ${foundCount} images found, ${missingCount} images missing`);
