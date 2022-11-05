import { connect } from "./db";

export default async function handler(req: any, res: any) {

  console.log(req.body)
  // if (req.method === "POST") { TODO:
  //   const mongoDB = await connect("projects");
  //   const response = await mongoDB?.collection.findOne({project: data.project});

  //   if (response) {  
  //       mongoDB?.client.close();
  //       return res.status(201).json(response); 
  //   }

  //   mongoDB?.client.close();
  //   res.status(500).json({ message: "ERROR" });
  //   return;
  // }

}