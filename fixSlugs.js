const mongoose = require('mongoose');
require('dotenv').config();

async function fixSlugs() {
  await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecom-backend-saas');
  
  function generateSlug(name) {
    return name
      .trim()
      .toLowerCase()
      .replace(/[\s\u00A0]+/g, '-')
      .replace(/[^\p{L}\p{N}\-]+/gu, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36);
  }

  const db = mongoose.connection.db;
  
  const categories = await db.collection('categories').find({}).toArray();
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const newSlug = generateSlug(cat.name) + '-' + (i + 1);
    await db.collection('categories').updateOne({ _id: cat._id }, { $set: { slug: newSlug } });
  }

  const products = await db.collection('products').find({}).toArray();
  for (const prod of products) {
    const newSlug = generateSlug(prod.title);
    await db.collection('products').updateOne({ _id: prod._id }, { $set: { slug: newSlug } });
  }

  console.log(`Updated ${categories.length} categories and ${products.length} products.`);
  process.exit(0);
}

fixSlugs().catch(console.error);
