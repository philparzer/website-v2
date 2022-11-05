//What: MongoDB helper functions

import { MongoClient } from "mongodb";

interface DB {
  collection: any;
  db: any;
  client: any;
}

//helper function to connect to MongoDB
export async function connect(collectionName: string) {
  if (process.env.MONGODB_URI) {
    const client: any = await MongoClient.connect(process.env.MONGODB_URI);
    const db: any = client.db("PersonalWebsite");
    const collection: any = db.collection(collectionName);
    const mongoDB: DB = {
      client,
      db,
      collection
    }
    return mongoDB;
  }
}