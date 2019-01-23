const Koa=require('koa');
const {connect}=require('./database/init');
const views=require('koa-views');
const {resolve} =require('path');



const app=new Koa();
app.use(views(resolve(__dirname + '/views'), {
    extension: 'pug'    // 以 pug 模版为例
  }))

;(async ()=>{
    await connect()
})()

app.use(async (ctx,next)=>{
    await ctx.render('index',{
        you:'Luck',
        me:'Scott'
    })
})
// //添加端口号
app.listen(3333,()=>{
    console.log('监听端口 3333');
});