1. 打开Terminal
2.  找到Techbow文件夹 (cd Techbow 进入文件夹； cd.. 是回退上一个菜单目录）
3. 安装 ，输入 npm install readline-sync
3. 输入  node depositCal.js
4. 根据提示输入信息


-------------------------
depositCal.js里运行的计算方法：

1. 先计算完整月的Utility分摊给个人（已扣除包的部分）

2. 再计算第一个月，和最后一个月，按天/月的比例计算

3. 相加得出结果