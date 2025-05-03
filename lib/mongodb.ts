import { MongoClient, Db } from "mongodb";

const uri = process.env.DATABASE_URL;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error("Please define the DATABASE_URL environment variable");
if (!dbName) throw new Error("Please define the MONGODB_DB environment variable");

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
  mongoDb: Db | undefined;
};

let client: MongoClient;
let db: Db;

if (!globalForMongo.mongoClient || !globalForMongo.mongoDb) {
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  globalForMongo.mongoClient = client;
  globalForMongo.mongoDb = db;
} else {
  client = globalForMongo.mongoClient;
  db = globalForMongo.mongoDb;
}

export { client, db };
