const Koa=require('koa');
const app=new Koa();
const views=require('koa-views');
const {resolve} =require('path');
console.log(resolve(__dirname,'./views'));

app.use(views(resolve(__dirname + '/views'), {
    extension: 'pug'    // 以 pug 模版为例
  }))

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