const mongoose=require('mongoose');
const  db='mongodb://localhost/douban-trailer'
mongoose.Promise=global.Promise;

exports.connect=()=>{
    //生产环境打印日志
    if(process.env.NODE_ENV!=='production'){
        mongoose.set('debug',true)
    }
    mongoose.connect(db);
    //连接失败重新连接一次
    mongoose.connection.on('disconnected',()=>{
        if()
        mongoose.connect(db);
    })

    mongoose.connection.on('error',err=>{
        console.log(err);
    })
    mongoose.connection.once('open',()=>{
        console.log('MongoDB connected success');
    })
}