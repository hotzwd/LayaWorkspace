// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'snowball-release-b953cc'
})
// 可在入口函数外缓存 db 对象
const db = cloud.database()

const MAX_LIMIT = 100
const LimitNum = 5;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let curpage = event.pagenum - 1;
  let skinNum = curpage * LimitNum;
  let maxpage = 0;
  //查询的所有数据
  let querResult;
  //限制的本页数据
  let limitDataArray = [];
  let ownrank = -1;
  let ownscore = 0;

  // 以 openid-score 作为记录 id
  const docId = `${event.userInfo.openId}-score`

  // 先取出集合记录总数
  const countResult = await db.collection('score').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const scorePromises = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('score').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    scorePromises.push(promise)
  }
  
  // 等待所有
  querResult = (await Promise.all(scorePromises)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))

  //排序
  querResult.data.sort(function (a, b) {
    return b.max - a.max;
  });


  // try {
  //   querResult = await db.collection('score').orderBy('max', 'desc').get()
  //   limitQuerResult = await db.collection('score').orderBy('max', 'desc').skip(skinNum).limit(limitNum).get()
  //   // userRecord = querResult.data
  // } catch (err) {
  //   // 找不到数据库
  // }

  if(querResult){
    maxpage = Math.ceil(querResult.data.length / LimitNum);
    
    for(let i=0; i<querResult.data.length; i++){
        let t_data = querResult.data[i];
        if (t_data._openid != null && t_data._openid == event.userInfo.openId){
          ownrank = i;
          ownscore = t_data.max;
          break;
        }
    }
    let nextNum = event.pagenum * LimitNum;
    if (nextNum > querResult.data.length){
      nextNum = querResult.data.length;
    }
    for (let x = skinNum; x < nextNum; x++){
      let t_l_data = querResult.data[x];
      t_l_data.rank = x;
      limitDataArray.push(t_l_data);
    }
  }

  return {
    info: limitDataArray,
    ownrank: ownrank,
    ownscore: ownscore,
    curpage: event.pagenum,
    maxpage: maxpage,
  }
  
}