# node-movie
基于react koa2 node 搭建的一个电影预告片项目


#获取数据
 通过 puppeteer 模拟浏览器获取数据 [github地址](https://github.com/GoogleChrome/puppeteer)

  除此之外我们还可以用其它库比如:Selenium、PhantomJs
    
**Puppeteer好处:**
- 利用网页生成PDF、图片
- 爬取SPA应用,并生成预渲染内容(SSR)
- 获取网页内容

**常用知识点**
- puppeteer.launch 启动浏览器
- browser.newPage() 创建一个新页面
- page.goto 进入指定网页
- page.screenshot 截图

## node父子进程通信

## 进程问题
### 什么是同步异步
 同步和异步关注的是**消息通信机制**。
 **同步:** 指的是发送者发出消息后，若消息没有返回,调用者就主动等待结果什么时也不干。
**异步:** 指的发送者发出消息后,就去做别的事,当消息回来后就通知它,它就处里该消息。

### 什么是异步IO

### 什么是阻塞与非阻塞
 阻塞与非阻塞关注的是**程序等待调用结果时的==状态==**
**阻塞:** 指的是调用结果返回之前,当前线程处于被挂起。调用线程只有在得到结果后才会返回。
**非阻塞:** 指的调用结果返回之前，该调用者不会阻塞当前线程。

### 什么是事件循环与事件驱动
### 什么是单线程
### 什么是进程
### 什么是子进程
### 怎么来启动子进程
### 进程如何通信


## node上传资源到七牛云

> nanoid //可以生成随机id





**git常用操作**
```
git checkout master -b 分支名
git add .
git commit -m 描述
//将分支提交到远程分支
git push origin 分支名
//回到主分支
git checkout master
//合并远程分支 
git merge origin/分支名
//推送
git push master

```