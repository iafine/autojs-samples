var packageName = app.getPackageName('抖音极速版');
toastLog('获取抖音极速版包名: ' + packageName);

app.launch(packageName);

sleep(5000);

toastLog('退出抖音极速版');

exit();



$x('//div/span[contains(@class, "mt-text-content")]//text()').map((dom) => {
    return dom.data.trim()
}).filter(data => data.includes('B09'))