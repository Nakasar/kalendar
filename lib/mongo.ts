import "server-only";

import { Db, MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
if (!process.env.MONGODB_DBNAME) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DBNAME"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let dbPromise: Promise<Db>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  dbPromise = globalWithMongo._mongoClientPromise.then((client) =>
    client.db(process.env.MONGODB_DBNAME),
  );
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  dbPromise = client
    .connect()
    .then((client) => client.db(process.env.MONGODB_DBNAME));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default dbPromise;
