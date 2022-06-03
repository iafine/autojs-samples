
// // 抖音点赞
// const like = descStartsWith('未点赞').visibleToUser().findOne()

// like.click()

// 抖音自动浏览
for (let i = 0; i < 5; i++) {
    swipe(device.width / 2, device.height / 3 * 2, device.width / 2, device.height / 3 * 2 - 1000, 500)
    let time = random(1000, 5000)
    toastLog('等待' + time + '毫秒开始下次浏览播放')
    sleep(time)    
}