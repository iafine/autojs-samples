// "ui";

// ui.layout(
//   <vertical>
//     <appbar>
//       <horizontal>
//         <toolbar title="快手Auto"></toolbar>
//       </horizontal>
//     </appbar>
//     <card
//       w="*"
//       h="40"
//       margin="10"
//       cardCornerRadious="2dp"
//       cardElevation="1dp"
//       gravity="center_vertical"
//     >
//       <Switch
//         id="autoService"
//         text="无障碍服务"
//         checked="{{auto.service != null}}"
//         padding="18 8 8 8"
//         textSize="15sp"
//       ></Switch>
//       <View bg="#4caf50" h="*" w="10"></View>
//     </card>
//     <card
//       w="*"
//       h="40"
//       margin="10 1"
//       cardCornerRadious="2dp"
//       cardElevation="1dp"
//       gravity="center_vertical"
//     >
//       <horizontal>
//         <text
//           text="功能选择"
//           padding="18 8 8 8"
//           textSize="15sp"
//           gravity="center_vertical"
//           texColor="black"
//         ></text>
//         <spinner
//           id="choose"
//           entries="抖音点赞评论"
//           textColor="blue"
//           marginLeft="20"
//         ></spinner>
//       </horizontal>
//     </card>
//     <button
//       id="start"
//       text="开始运行"
//       style="Widget.AppCompat.Button.Colored"
//       w="*"
//       margin="10"
//     ></button>
//   </vertical>
// );

// ui.autoService.on("check", function (checked) {
//   if (checked && auto.service == null) {
//     app.startActivity({
//       action: "android.settings.ACCESSIBILITY_SETTINGS",
//     });
//   }
//   if (!checked && auto.service != null) {
//     auto.service.disableSelf();
//   }
// });

// ui.start.on("click", function () {
//   if (auto.service == null) {
//     toastLog("请先开启无障碍服务");
//     return;
//   }
//   threads.start(function () {
//     //在新线程执行的代码
//     main();
//   });
// });

function getClickableParentView(view) {
  const tempView = view;
  const parentView = tempView.parent();
  if (parentView.clickable()) {
    return parentView;
  }
  return getClickableParentView(parentView);
}

function bezier_curves(cp, t) {
  cx = 3.0 * (cp[1].x - cp[0].x);
  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  ax = cp[3].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[1].y - cp[0].y);
  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  ay = cp[3].y - cp[0].y - cy - by;

  tSquared = t * t;
  tCubed = tSquared * t;
  result = {
    x: 0,
    y: 0,
  };
  result.x = ax * tCubed + bx * tSquared + cx * t + cp[0].x;
  result.y = ay * tCubed + by * tSquared + cy * t + cp[0].y;
  return result;
}

function randomSwipe(qx, qy, zx, zy, time) {
  var xxy = [time];
  var point = [];
  var dx0 = {
    x: qx,
    y: qy,
  };

  var dx1 = {
    x: random(qx - 100, qx + 100),
    y: random(qy, qy + 50),
  };
  var dx2 = {
    x: random(zx - 100, zx + 100),
    y: random(zy, zy + 50),
  };
  var dx3 = {
    x: zx,
    y: zy,
  };
  for (var i = 0; i < 4; i++) {
    eval("point.push(dx" + i + ")");
  }
  // log(point[3].x)

  for (let i = 0; i < 1; i += 0.08) {
    xxyy = [
      parseInt(bezier_curves(point, i).x),
      parseInt(bezier_curves(point, i).y),
    ];

    xxy.push(xxyy);
  }
  gesture.apply(null, xxy);
}

function swipeVideo(i) {
  let time = random(3000, 7000);
  sleep(time);
  toastLog("第" + (i + 1) + "个视频，请等待 " + time / 1000 + "秒");
  // 开始滑动视频
  // let x1 = random(device.width / 4, (device.width / 4) * 3);
  // let y1 = random((device.height / 4) * 3.1, (device.height / 4) * 3.3);
  // let x2 = random(device.width / 4, (device.width / 4) * 3);
  // let y2 = random((device.height / 4) * 0.7, (device.height / 4) * 0.5);
  // let s = random(35, 80); // 滑动耗时
  // randomSwipe(x1, y1, x2, y2, s);
  swipe(700, 1700, 800, 800, 100);
}

function likeVideo() {
  // 是否点赞，概率40%
  let isLike = random(0, 100);
  if (isLike > 30) {
    return;
  }

  // 开始点赞
  sleep(1000);
  const like = descStartsWith("未点赞").visibleToUser().findOne(4000);
  if (like) {
    like.click();
  }
}

// 评论
function commentVideo() {
  // 是否评论，概率40%
  let isComment = random(0, 100);
  if (isComment > 70) {
    return;
  }

  const list = [
    "有来必有往，诚不我欺[比心]",
    "加油，有缘的年轻人，为我们的理想而奋斗！",
    "一起抱抱，相亲相爱[比心]",
    "猫和老鼠，诚不欺我[比心]",
    "为了带货开直播，花尽心思等各位[比心]",
    '优质队友，一起成长[比心]',
    "冲刺1000粉丝[比心]",
    "可能会迟到，但不会拖欠[比心]",
    "为了涨点粉，到处评论太难了[比心]",
    '有什么回什么，不亏欠[比心]',
    '可能会迟，但必不缺席[比心]',
  ];
  const randomNum = random(0, 10);
  sleep(1000);
  const testText = id("com.ss.android.ugc.aweme:id/ckz").find();
  testText.setText(list[parseInt(randomNum)]);
  sleep(1000);
  const submitBtn = descStartsWith("发送").findOne();
  if (submitBtn) {
    submitBtn.click();
  }
}

function viewVideos(num) {
  for (let i = 0; i < num; i++) {
    likeVideo();
    commentVideo();
    swipeVideo(i);
  }
}

function launchDouyin() {
  app.launch("com.ss.android.ugc.aweme");
  sleep(2000);
}

function isZhiBo() {
  const zhibo = textContains("点击进入直播间").visibleToUser().find();
  toastLog(zhibo);
  return zhibo ? true : false;
}

function startDouYinScript() {
  toastLog("抖音自动评论点赞脚本开启");
  // 进入快手App
  // launchDouyin();
  // 开启养号模式
  viewVideos(100);
  toastLog("抖音自动评论点赞脚本结束");
}

startDouYinScript()

function main() {
  let sp = ui.choose.getSelectedItem();
  toastLog(sp);
  startDouYinScript();
}
