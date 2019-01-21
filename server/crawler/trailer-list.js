const  puppeteer=require('puppeteer');
const URL=`https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0`;

const sleep=time=>new Promise(resolve=>{
    setTimeout(resolve,time);  
});
console.log('开始执行...');
(
    async ()=>{
        console.log('Start visit the target page');
        const browser= await puppeteer.launch({
            args:['--no-sanbox'], //启动非沙箱模式
            dumpio:false
        });
        const page=await browser.newPage(); //开启新页面
        await page.goto(URL,{
            waitUntil:'networkidle2'
        })
         await sleep(3000);
        //点击页面加载更多
        await page.waitForSelector('.more');
        for(let i=0;i<1;i++){
            await page.click('.more');
            await sleep(3000);
        }
        const result=await page.evaluate(()=>{
            var $=window.$;
            var items=$('.list-wp a');
            var links=[];
            
            if(items.length>=1){
                items.each((index,item)=>{
                    let it=$(item);
                    let doubanId=it.find('div').data('id');
                    let title=it.find('img').attr('alt');
                    let rate=Number(it.find('strong').text())
                    let poster=it.find('img').attr('src');
                    //换成大图
                    // let poster=it.find('img').attr('src').replace('s_ratio','l_ratio');

                    links.push({
                        doubanId,
                        title,
                        rate,
                        poster
                    })
                })
            }
            return links;
        })  
        //关闭浏览器
        browser.close();
        // console.log(result);
        // console.log(result.length,'length--------')
        
        //将结果发送出去
        process.send({result});
        //退出进程
        process.exit(0);
    })()