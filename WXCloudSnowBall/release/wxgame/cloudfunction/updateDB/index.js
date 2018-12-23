// 云函数入口文件
const cloud = require('wx-server-sdk')

//cloud.init()
cloud.init({
  env: 'snowball-release-b953cc'
})
// 可在入口函数外缓存 db 对象
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  
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
  let querResult = (await Promise.all(scorePromises)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))

  try {
    // const promise = await db.collection('score').limit(1).get()
    for (let i = 0; i < querResult.data.length; i++) {
      let promiseData = querResult.data[i];  
      console.log("----promise id= " + promiseData._id);
      console.log("----promise max= " + promiseData.max);
      console.log("----promise nickname= " + promiseData.nickname);
      //删除一条数据
      await db.collection('score').doc(promiseData._id).remove();
    }
  } catch (e) {
    console.error(e)
  }

  
}