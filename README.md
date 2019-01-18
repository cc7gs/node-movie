# node-movie
基于react koa2 node 搭建的一个电影预告片项目


#获取数据
 通过 puppeteer 模拟浏览器获取数据,
  除此之外我们还可以用其它库比如:Selenium、PhantomJs
    [github地址](https://github.com/GoogleChrome/puppeteer)
**Puppeteer好处:**
- 利用网页生成PDF、图片
- 爬取SPA应用,并生成预渲染内容(SSR)
- 获取网页内容

**常用知识点**
- puppeteer.launch 启动浏览器
- browser.newPage() 创建一个新页面
- page.goto 进入指定网页
- page.screenshot 截图
- 

