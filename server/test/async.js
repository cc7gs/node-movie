
function doSync(doSth,time){
   return new Promise(resolve=>{
    setTimeout(()=>{
        console.log(doSth+'用了'+time+'毫秒');
        resolve();
    },time) 
   }) 
}
const Scott={doSync}
const Meizi={doSync}
;(async ()=>{
    console.log('case 1: 起床来到门口')
    await Scott.doSync('刷牙',1000)
    console.log('啥也没干 一直等');
    await Meizi.doSync('去洗澡...',2000);
    console.log('什么也没干...');
})();