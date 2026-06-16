import config from "./app/config/config";
import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";

let server : Server;


async function main(){
    try{
//Connecting to database
await mongoose.connect(config.db_url as string)
console.log("Connected to Database");

//Connecting to server
server = app.listen(config.port, () =>  {
    console.log(`App listening on port ${config.port}`)
});
} catch(error){
        console.error(error)
    }
}

main();

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  process.exit(1);
});
