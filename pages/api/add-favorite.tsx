import { connect } from "./db";

export default async function handler(req: any, res: any) {
  let data = req.body;
 
  if (req.method === "POST") {
    console.log(data)
    const mongoDB = await connect("projects");

    const entry = await mongoDB?.collection.findOne({
      project: data.projectName
    })

    let response;

    if (entry) {
      response = await mongoDB?.collection.updateOne(
        {project: data.projectName},
        {$inc: {faves: 1} }
        );
    }

    else {
      response = await mongoDB?.collection.insertOne(
        {project: data.projectName},
        {faves: 0}
        );
    }

    if (response) {  
        mongoDB?.client.close();
        return res.status(201).json(response); 
    }

    mongoDB?.client.close();
    res.status(500).json({ message: "ERROR" });
    return;
  }

}