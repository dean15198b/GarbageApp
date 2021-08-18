import mongoose from 'mongoose';
 
const connectDbs = ()=> {
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connection to mongo succeeded")
    }); 
}

export default connectDbs;