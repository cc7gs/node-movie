const {readFile}=require('fs')
const EventEmitter=require('events');

class EE extends EventEmitter{}
const yy=new EE();

yy.on('event',()=>{
    console.log('event 监听');
})

setTimeout(() => {
    console.log("0 毫秒后执行的定时器回调 ");
}, 0);

setTimeout(() => {
    console.log("100 毫秒后执行的定时器回调 ");
}, 100);

setTimeout(() => {
    console.log("200 毫秒后执行的定时器回调 ");
}, 200);

readFile('./async.js',data=>{
    console.log('完成文件 async读操作');
})

readFile('../index.js',data=>{
    console.log('完成文件 async读操作');
})

setImmediate(()=>{
    console.log('immediate 回调');
})
process.nextTick(()=>{
    console.log('process.nextTick 的回调');
})

Promise.resolve()
.then(()=>{
    yy.emit('event');
    process.nextTick(()=>{
        console.log('Process.nextTick 2 回调');
    })
    console.log('Promise的一次回调');
})
.then(()=>{
    console.log('Promise 的2 次回调');
})