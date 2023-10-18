const fs=require("fs")
const mongoose=require("mongoose")
const colors=require("colors")
const path=require("path")
const dotenv=require("dotenv")


//Load Env Vars
dotenv.config({path:'./config/config.env'})

const Building=require("./models/Building")


//connect To Db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
})

const buildings=JSON.parse(fs.readFileSync(`${__dirname}/_data/buildings.json`),'utf-8')

//Import data into DB
const importData=async()=>{
    try {
        await Building.create(buildings)
        console.log("Data Imported".green.inverse)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// Delete data from DB
const deleteData=async()=>{
    try {
        await Building.deleteMany()
        console.log("Data Deleted....".red.inverse)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2]==='-i'){
    importData()
}
else if(process.argv[2]=='-d'){
    deleteData()
}
