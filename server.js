const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'KolosExample';
const collectionName = 'products';

app.use(express.json());

app.get('/products', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const sortField = req.query.sortField || 'nazwa';
    const sortOrder = parseInt(req.query.sortOrder) || 1;

    const sortOptions = { [sortField]: sortOrder };

    const queryObject = {};

    if (req.query.nazwa) {
      queryObject.nazwa = { $regex: new RegExp(req.query.nazwa, 'i') };
    }
    if (req.query.cena) {
      queryObject.cena = { $lte: parseInt(req.query.cena) };
    }
    if (req.query.ilosc) {
      queryObject.ilosc = { $gte: parseInt(req.query.ilosc) };
    }

    const products = await collection.find(queryObject).sort(sortOptions).toArray();
    res.json(products);
  } finally {
    await client.close();
  }
});

app.post('/products', async (req, res) => {
  const newProduct = req.body;

  const clientCheck = new MongoClient(mongoUrl);
  try {
    await clientCheck.connect();
    const dbCheck = clientCheck.db(dbName);
    const collectionCheck = dbCheck.collection(collectionName);

    const existingProduct = await collectionCheck.findOne({ nazwa: newProduct.nazwa });

    if (existingProduct) {
      return res.status(400).json({ error: 'Produkt o tej nazwie już istnieje.' });
    }
  } finally {
    await clientCheck.close();
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(newProduct);

    res.status(201).json({ message: 'Produkt dodany pomyślnie.' });
  } finally {
    await client.close();
  }
});

app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID produktu.' });
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingProduct = await collection.findOne({ _id: new ObjectId(productId) });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produkt o podanym ID nie istnieje.' });
    }

    await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedProductData }
    );

    res.json({ message: 'Produkt zaktualizowany pomyślnie.' });
  } finally {
    await client.close();
  }
});

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID produktu.' });
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingProduct = await collection.findOne({ _id: new ObjectId(productId) });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produkt o podanym ID nie istnieje.' });
    }

    if (existingProduct.ilosc <= 0) {
      return res.status(400).json({ error: 'Produkt nie jest dostępny na magazynie.' });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Produkt usunięty pomyślnie.' });
    } else {
      res.status(500).json({ error: 'Błąd podczas usuwania produktu.' });
    }
  } finally {
    await client.close();
  }
});

app.get('/stock-report', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const report = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$cena', '$ilosc'] } },
          products: {
            $push: {
              _id: '$_id',
              nazwa: '$nazwa',
              ilosc: '$ilosc',
              cena: '$cena',
              totalProductValue: { $multiply: ['$cena', '$ilosc'] }
            }
          }
        }
      }
    ]).toArray();

    if (report.length === 0) {
      return res.json({ message: 'Brak produktów na magazynie.' });
    }

    res.json(report[0]);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
