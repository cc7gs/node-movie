const puppeteer = require('puppeteer');
const base = 'https://movie.douban.com/subject/';
const doubanId = '27110296';

const sleep = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

;(async () => {
    console.log('开始执行');
    const broser = await puppeteer.launch({
        args: ['no-sanbox'],
        dumpio: false
    });
    const page = await broser.newPage();
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    });
    await sleep(1000);
    const result = await page.evaluate(() => {
        const $ = window.$;
        const item = $('.related-pic-video');
        if (item && item.length > 0) {
            const link = item.attr('href');
            //过滤url
            const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;    
            const cover = item.attr('style').match(reg)[0];
            return {
                link,
                cover
            }
        }
        return {}
    })
    let video
    if (result && result.link) {
        console.log('go page');
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000);
        video = await page.evaluate(() => {
            const $ = window.$;
            const item = $('source');
            if (item && item.length > 0) {
                return item.attr('src');
            }
            return '';
        })
    }
    const data={
        video,
        vover:result.cover
    }
    process.send(data);

    broser.close();
   
    process.exit(0);
})();