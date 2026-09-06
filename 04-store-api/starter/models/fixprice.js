require('dotenv').config();
const mongoose = require('mongoose');

const forceNumericPrices = async () => {
  try {
    const connString = process.env.MONGO_URL || process.env.MONGO_URI;
    await mongoose.connect(connString);

    // Forces MongoDB engine to re-cast 'price' to Double (numeric)
    const result = await mongoose.connection.db.collection('products').updateMany(
      {},
      [{ $set: { price: { $toDouble: '$price' } } }]
    );

    console.log(`Updated ${result.modifiedCount} documents directly in MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

forceNumericPrices();