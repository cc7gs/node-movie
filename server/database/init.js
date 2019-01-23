const mongoose = require('mongoose');
const db = 'mongodb://localhost/douban-trailer';
const glob=require('glob');
const {resolve}=require('path');

mongoose.Promise = global.Promise;

exports.connect = () => {
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {

        //生产环境打印日志
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(db);
        //连接失败重新连接一次
        mongoose.connection.on('disconnected', () => {
           maxConnectTimes++;
            if(maxConnectTimes<5){
                mongoose.connect(db);
            }else{
                throw new Error('连接多次失败,请确认开启mongoose')
            }
        })

        mongoose.connection.on('error', err => {
            maxConnectTimes++;
            if(maxConnectTimes<5){
                mongoose.connect(db);
            }else{
                reject(err);            
            }
        })
        mongoose.connection.once('open', () => {
            resolve();
            console.log('MongoDB connected success');
        })
    })
}

const initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}
initSchemas();