toastLog("开始自动聊天工具");

function getClickableParentView(view) {
  const tempView = view;
  const parentView = tempView.parent();
  if (parentView.clickable()) {
    return parentView;
  }
  return getClickableParentView(parentView);
}

function randomSleep() {
  const time = random(1000, 5000);
  toastLog("等待" + time / 1000 + "秒开始执行下一次任务");
  sleep(time);
}

// 获取接口数据
const res = http.get("https://api.github.com/users/iafine/repos");
const infoList = res.body.json();

toastLog("一共获取到" + infoList.length + "个仓库");

const testGroupLayout = text("模拟测试群").find();
const testClickView = getClickableParentView(testGroupLayout[0]);
testClickView.click();

sleep(1000);

function sendText(textStr) {
  const testEditText = className("EditText").findOne();
  testEditText.setText(textStr);
  sleep(1000);

  const testSendBtn = text("发送").className("Button").findOne();
  testSendBtn.click();
}

for (let i = 0; i < infoList.length; i++) {
  let repoInfo = infoList[i];
  let repoInfoText =
    "iafine的仓库名称：" +
    repoInfo.name +
    ", 上次更新时间：" +
    repoInfo.updated_at;
  sendText(repoInfoText);
  log(repoInfoText);
  randomSleep();
}

toastLog('脚本结束运行')
