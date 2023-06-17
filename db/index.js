const mongoose = require('mongoose')
mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://tuloncse:Tulon123@cluster0.zinzu5n.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connect to Mongodb")
    // app.listen(port)
    // console.debug(`server listening on `, port)
}).catch((error)=>{
    console.log(error)
})