//根据电影id获取电影信息列表 api
//http://api.douban.com/v2/movie/subject/电影id

const rp = require('request-promise-native');
//获取电影详情信息
async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
    const res = await rp(url);
    return res;
}

(async () => {
    let movies = [{
            doubanId: 26972258,
            title: '江湖儿女',
            rate: 7.6,
            poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2533283770.jpg'
        },
        {
            doubanId: 26654498,
            title: '爱你，西蒙',
            rate: 8.3,
            poster: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2523592367.jpg'
        }
    ];
    movies.map(async moive => {
        let moiveData = await fetchMovie(moive);
        try{
            moiveData=JSON.parse(moiveData);
            console.log(moiveData,'movieData');
        }catch(error){
            console.log('转换异常',error);
        }
    })
})();
