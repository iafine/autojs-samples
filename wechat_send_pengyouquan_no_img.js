// Text('通讯录').waiteFor()
// sleep(1000)

// id("f30").className("android.widget.TextView").text("发现").findOne().click()
// toastLog(obj)

// var obj = id("f30").className("android.widget.TextView").text("发现")

// // obj.click()
// toastLog(obj)

toastLog('脚本开始运行')
app.launch('com.tencent.mm')
sleep(1000)

textContains('通讯录').waitFor()
sleep(1000)

// 进入发现页
const btnList = id("com.tencent.mm:id/kdk").find()
const faxian = btnList[2]
faxian.click()
sleep(1000)
textContains('朋友圈').waitFor()

// 进入朋友圈
const listViews = id("com.tencent.mm:id/iwp").find()
listViews[0].click()

// 进入文本朋友圈测试
sleep(1000)
const postBtn = desc('拍照分享').findOne()
postBtn.longClick()
textContains('这一刻的想法').waitFor()
const contentInput = textContains('这一刻的想法').findOne()
contentInput.setText('这是一条测试文本')

sleep(1000)
const submitBtn = id('com.tencent.mm:id/em').findOne()
submitBtn.click()
toastLog('发表成功')

// var x = obj.boundsInParent().centerX()
// var y = obj.boundsInParent().centerY()

// click(x, y)

// toastLog('脚本结束运行')
// back()
// com.tencent.mm:id/kdk