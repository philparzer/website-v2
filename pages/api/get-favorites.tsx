import { connect } from "./db";

export default async function handler(req: any, res: any) {
  let data = req.body;
 
  if (req.method === "GET") {
    const mongoDB = await connect("projects");
    const entry = await mongoDB?.collection.find().toArray();

    if (entry) {  
        mongoDB?.client.close();
        return res.status(201).json(entry); 
    }

    mongoDB?.client.close();
    res.status(500).json({ message: "ERROR" });
    return;
  }

}