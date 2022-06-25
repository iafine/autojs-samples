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
//           entries="快手养号|选项2|选项3"
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
  let time = random(4000, 15000);
  toastLog("第" + (i + 1) + "个视频，请等待 " + time / 1000 + "秒");
  sleep(time);

  // 开始滑动视频
  let x1 = random(device.width / 4, (device.width / 4) * 3);
  let y1 = random((device.height / 4) * 3.1, (device.height / 4) * 3.3);
  let x2 = random(device.width / 4, (device.width / 4) * 3);
  let y2 = random((device.height / 4) * 0.7, (device.height / 4) * 0.5);

  let s = random(35, 80); // 滑动耗时
  // randomSwipe(x1, y1, x2, y2, s);
  swipe(700, 1700, 800, 800, 100);
}

function likeVideo() {
  // 是否点赞，概率40%
  let isLike = random(0, 100);
  if (isLike > 40) {
    return;
  }

  // 开始点赞
  let like = id("com.smile.gifmaker:id/like_icon")
    .visibleToUser()
    .findOne(2000);
  if (!like || like.selected()) {
    log("未找到点赞元素");
    return;
  }

  const clickableView = getClickableParentView(like);
  clickableView.click();
}

function viewVideos(num) {
  for (let i = 0; i < num; i++) {
    likeVideo();
    swipeVideo(i);
  }
}

function launchKuaiShou() {
  app.launch("com.smile.gifmaker");
  sleep(2000);

  // 等待精选出现
  descStartsWith("精选").waitFor();
  sleep(1000);

  // 点击进入精选
  let jingxuan = descStartsWith("精选").findOne();
  jingxuan.click();
  sleep(2000);
}

function kuaishouyanghao() {
  toastLog("快手自动化脚本开启");
  // 进入快手App
  launchKuaiShou();
  // 开启养号模式
  viewVideos(10);
  toastLog("快手养号脚本结束");
}

// function main() {
//   let sp = ui.choose.getSelectedItem();
//   toastLog(sp);
//   kuaishouyanghao();
// }

kuaishouyanghao()