setImmediate(()=>{
    console.log('阶段三 immediate 回调1');
});
setImmediate(()=>{
    console.log('阶段三 immediate 回调2');
});
setImmediate(()=>{
    console.log('阶段三 immediate 回调3');
});

setTimeout(() => {
   console.log('定时器零毫秒'); 
},0);