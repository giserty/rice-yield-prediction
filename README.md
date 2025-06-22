# 基于"3S+ABC"的水稻产量预测系统

## 环境配置

### 后端环境配置

打开IDEA，使用Spring Initializr服务创建Spring Boot应用程序：

![image-20250622221224844](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221224844.png)

![image-20250622221600479](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221600479.png)

### 前端环境配置

在进行环境配置前，首先需安装相关开发环境：

* 首先在node.js官网(https://nodejs.org/zh-cn/)，下载最新的长期版本，直接运行完成安装，即可具备node和npm的环境
* 接下来安装vue环境，使用淘宝npm，在终端输入以下语句：npm install -g cnpm --registry=https://registry.npm.taobao.org
* 安装vue-cli依赖包：cnpm install --g vue-cli
* 打开vue的可视化管理工具界面：vue ui

Vue项目管理器主界面如下：

![image-20250622221519459](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221519459)

在指定位置新建一个Vue项目：

![image-20250622221504460](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221504460.png)

完成项目初始化后，进一步使用npm安装项目运行需要的第三方库，完成环境配置：

* element-ui：cnpm install element-ui --save
* axios：cnpm install axios --save
* qs：cnpm install qs --save
* mockjs：cnpm install mockjs --save-dev

## 操作和使用

### 用户登录

在浏览器地址栏中输入"http://localhost:8080/"，跳转至系统登录界面如图所示：

![image-20250622221751043](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221751043.png)

超级管理员账号成功登录系统后，进入水稻产量预测系统的后台管理界面，如下图所示：

![image-20250622221820008](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221820008.png)

### 菜单栏

该水稻产量预测系统共有四个子系统模块，分别为：二维可视化、产量预测、VR协作和后台管理。其旨在实现水稻的产量预测、水稻属性、图形报表展示及对后台数据进行增删改查等基本管理操作，同时也为用户提供了一个VR协作子模块，实现远程协作管控，增强用户的交互体验感，通过实践来感受水稻种植等体验。如下图所示：

![image-20250622221853879](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622221853879.png)

### 首页

用户成功登录系统后，首先进入的是后台管理页面，然后点击左上角的首页按钮，即可进入到系统的首页页面。在这里可以查看到系统的四大功能模块按钮以及默认展示的二维可视化子系统界面。如下图所示：

![image-20250622222120973](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222120973.png)

首页页面左侧为动态预测报表，包括各区域的室外环境检测和长沙市近十年的水稻种植面积；右侧为统计分析报表，包括近十年的水稻产量及不同作物的产值占比情况分析图形报表，如下图所示。以上四个图表均为统计分析模块的内容，只对系统获取的数据源进行了一个初步的展示，若需完成其他类型的统计分类结果，可以从系统导出数据再自行分析。
中间为水稻地图，为二维可视化子模块的主要功能。点击右下角的圆盘，可实现二三维地图的转换，是通过改变角度来实现的。

点击左上角的条形按钮，可切换底图至国家、省、市、街道界面展示；点击右上角的"卫星"按钮，可切换底图为卫星影像图。

![image-20250622222149695](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222149695.png)

在卫星影像图中，点击蓝色按钮，可查该定位区域的水稻数据。同时计划在卫星底图中叠加矢量图形，实现地图钻取功能，例如点击区或村镇矢量区域，地图就可缩放至该区或村镇卫星图形界面，查看详细情况。

![image-20250622222159846](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222159846.png)

点击"统计分析报表"按钮，系统提示"导出成功"，说明报表文件生成成功，用户可以按需下载。

### 产量预测

产量预测是本系统的核心功能，属于下属四大子系统之一的产量预测子系统。本模块包含两种地图选择查询模式和预测模型，其中，两种地图选择模式为自定义查询和按行政区查询；两种预测模型为①预测模型一：时间序列预测模型；②预测模型二：基于遥感的回归模型。

![image-20250622222221637](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222221637.png)

选择地图选择模式为按行政区查询，用户按需点选相应的区县和街道名称，然后再选择预测模型，得到相应的预测结果。如下图选择的区县为浏阳市，街道为淳口镇，左侧橘色矢量图为查询的行政区域。

![image-20250622222228698](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222228698.png)

选择自定义地图选择模式，点击右下角的"画点、画折线、画多边形、画矩形或画图"按钮，根据用户自己的需求，在地图上自定义框选地区，选择预测模型获取自定义区域的预测结果。同时在画图的过程中，若是出错了可以点击"清除"按钮删掉所绘制的图形，若是完成绘制则可以点击"关闭绘图"按钮保存绘图结果。

![image-20250622222238519](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222238519.png)

点击"预测模型一"或"预测模型二"按钮，系统会弹出提示框"预测模型一/二预测结果已生成，请回到首页导出报表"。

![image-20250622222246183](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222246183.png)

### VR感知

VR感知是本系统的辅助功能，该模块包含了VR漫游和远程协作两个功能，为用户带来了沉浸式感知和人机交互的体验感，增强用户的参与度，激发用户的好奇心。

![image-20250622222301008](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222301008.png)

滚动鼠标手动缩放到地球表面，可以看到三维球体的仿真画面。如下图所示，在山体间，任意确定两个定位点可以计算两点间的水平距离、垂直高度和空间距离。同样也可以随意框选矢量图形，获取所选区域的面积。

![image-20250622222337358](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222337358.png)

### 后台管理

后台管理模块是系统四大子模块之一，该模块主要对系统的后台数据做一些增删查改操作，管理并且维护好后台的用户和数据。
点击首页的"后台管理"按钮，系统跳转至个人中心界面。该界面主要展现了一些系统登录IP地址、操作进程、系统用户的分类和分析等，为运营人员制定拉新和促推方案提供数据依据。

![image-20250622222510931](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222510931.png)

点击后台管理界面左侧的"数据管理"按钮，进入数据管理界面页。该界面展现了用户的详细数据，并可以进行编辑新增、编辑和删除操作。

![image-20250622222518476](https://raw.githubusercontent.com/giserty/rice-yield-prediction/master/images/image-20250622222518476.png)
