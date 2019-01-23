

const qiniu=require('qiniu');
const nanoid=require('nanoid');
const config=require('../config')
//bucket 即七牛上的存储空间名
const bucket=config.qiniu.bucket;
//生成鉴权对象
const mac=new qiniu.auth.digest.Mac(config.qiniu.AK,config.qiniu.SK);
//构建配置对象
const cfg=new qiniu.conf.Config();
const client=new qiniu.rs.BucketManager(mac,cfg);

const uploadToQiniu=async(url,key)=>{
    return new Promise((resolve,reject)=>{
        client.fetch(url,bucket,key,(err,ret,info)=>{
            if(err){
                reject(err);
            }else{
                if(info.statusCode===200){
                    resolve({key});
                }else{
                    reject(info);
                }
            }
        })
    }) 
}
;(async ()=>{
    const movies = [{
        doubanId: 27110296,
        video: 'http://vt1.doubanio.com/201901221122/f5bffd7d2db0f38c62c3ae394584aede/view/movie/M/402390189.mp4M/402390189.mp4',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2539667252.jpg',
        poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539661066.jpg'
    }]
    movies.map(async moive=>{
        if(moive.video && !moive.key){
            try {
                console.log('正在转换video');
                let videoData=await uploadToQiniu(moive.video,nanoid()+'.mp4');
                console.log('正在转换cover');
                let coverData=await uploadToQiniu(moive.cover,nanoid()+'.png');
                console.log('正在转换poster');
                let posterData=await uploadToQiniu(moive.video,nanoid()+'.png');
                if(videoData.key){
                    moive.videoKey=videoData.key
                }
                if(coverData.key){
                    moive.coverKey=coverData.key
                }
                if(posterData.key){
                    moive.posterKey=posterData.key
                }
                console.log(moive)
            } catch (error) {
                console.log(error,'error');
            }
        }
    })
})()