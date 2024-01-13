const mongoose = require('mongoose');

const db = process.env.DB_CLOUD_LINK.replace(
    '<PASSWORD>', 
    process.env.DB_PASSWORD
);
const DB_OPTIONS = {
    dbName: "RUET-Official-Server",
  };
mongoose.connect(db,DB_OPTIONS).then(()=>{
    console.log("DB succesfully connected!");
}).catch((error)=>{
    console.log("Error in db", error.message);
})

