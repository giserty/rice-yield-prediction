<template>
    <div class="otherContain">
        <!-- 预测界面 -->
        <div id="container"></div>
        <!-- 动态预测模型选择 -->
        <div class="input-card modeUI">
            <h4>动态预测模型选择</h4>
            <div class="input-item">
                <input id="clearcover" type="button" class="btn clearbtn" value="预测模型一" @click="moduleSelect('预测模型一')"/>
                <input id="clearcover" type="button" class="btn clearbtn" value="预测模型二" @click="moduleSelect('预测模型二')" />
            </div>
        </div>
        <!-- 下属行政区查询 -->
        <div class="input-card queryUI">
            <h4>下属行政区查询</h4>
            <div class="input-item">
                <div class="input-item-prepend">
                  <span class="input-item-text">区县</span>
                </div>
                <select id='district' style="width:100px" @change="search(this, $event)">

                </select>
            </div>
            <div class="input-item">
                <div class="input-item-prepend">
                  <span class="input-item-text">街道</span>
                </div>
                <select id='street' style="width:100px" @change="search(this, $event)">

                </select>
            </div>
            <div class="input-item">
                <input id="clearcover" type="button" class="btn clearbtn" value="清除查询覆盖物" @click="clearCover" />
            </div>
        </div>
        <!-- 选择绘制覆盖物 -->
        <div class="input-card selectUI">
            <div class="input-item">
                <input class="radios" type="radio" name="func" checked='' value="marker" @input="draw($event)" /><span
                    class="input-text">画点</span>
                <input class="radios" type="radio" name="func" value="polyline" @input="draw($event)" /><span
                    class="input-text">画折线</span>
                <input class="radios" type="radio" name="func" value="polygon" @input="draw($event)" /><span
                    class="input-text" style="width: 5rem">画多边形</span>
            </div>
            <div class="input-item">
                <input class="radios" type="radio" name="func" value="rectangle" @input="draw($event)" /><span
                    class="input-text">画矩形</span>
                <input class="radios" type="radio" name="func" value="circle" @input="draw($event)" /><span
                    class="input-text">画圆</span>
            </div>
            <div class="input-item">
                <input type="button" class="btn" value="清除" @click="clearOverlays()" />
                <input id="close" type="button" class="btn" value="关闭绘图" @click="closeDraw($event)" />
            </div>
        </div>
        <!-- 回到首页 -->
        <div class="input-card gohomeUI">
            <div class="input-item">
                <input id="clearcover" type="button" class="btn clearbtn" value="回到首页" @click="gohome"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Forecast',
    data() {
        return {
            map: {},//接收地图对象
            mouseTool: {},
            overlays: [],
            checked: false,
            marker: [],
            marker1: {},//点对象
            marker2: {},
            marker3: {},
            marker4: {},
            marker5: {},
            marker6: {},
            marker7: {},
            icon: {},//点图标
            bounds: {},//边界
            allMarkers: [],//marker合集
            overlayPath: [],//覆盖物路径
            isPointInRing: {},//是否在内部
            district: {},//地区对象
            districtSelect: {},//地区查询对象
            streetSelect: {},//街道查询对象
            boundPolygon: [],//地区边界多边形对象
        }
    },
    methods: {
        // 多边形绘制
        draw(e) {
            switch (e.target.value) {
                case "marker": {
                    this.mouseTool.marker({
                        //同Marker的Option设置
                    });
                    break;
                }
                case "polyline": {
                    this.mouseTool.polyline({
                        strokeColor: "#80d8ff",
                        //同Polyline的Option设置
                    });
                    break;
                }
                case "polygon": {
                    this.mouseTool.polygon({
                        fillColor: "#00b0ff",
                        strokeColor: "#80d8ff",
                        //同Polygon的Option设置
                    });
                    break;
                }
                case "rectangle": {
                    this.mouseTool.rectangle({
                        fillColor: "#00b0ff",
                        strokeColor: "#80d8ff",
                        //同Polygon的Option设置
                    });
                    break;
                }
                case "circle": {
                    this.mouseTool.circle({
                        fillColor: "#00b0ff",
                        strokeColor: "#80d8ff",
                        //同Circle的Option设置
                    });
                    break;
                }
            }
        },
        //添加绘制覆盖物数据
        addOverlays(overlays) {
            console.log('监听外的this.marker', this.marker);
            console.log('监听外的this.map', this.map);
            let allmk = this.marker//所有固定点数据
            let overp = this.overlayPath//所有绘制物数据
            let icons = this.icon //被选中后的图标
            this.mouseTool.on("draw", function (e) {//监听mouseTool.on事件
                overlays.push(e.obj);
                this.bounds = e.obj.getBounds();

                if (e.obj.CLASS_NAME == "AMap.Marker") {
                    // overp.push(e.obj.getPosition());
                    return;
                } else {
                    let southWest = this.bounds.getSouthWest();
                    let northEast = this.bounds.getNorthEast();
                    if (southWest.equals(northEast)) {
                        return;
                    }
                    overp = e.obj.getPath();
                }
                // console.log('add里的this.marker', this.marker);
                allmk.forEach(function (thisMarker) {
                    let point = thisMarker.w.position;
                    console.log(thisMarker.getExtData());
                    let isPointInRing = AMap.GeometryUtil.isPointInRing(point, overp);
                    // 选中添加标题
                    thisMarker.setTitle(isPointInRing ? '在框选内部' : '在框选外部');
                    //选中更换图标
                    if (isPointInRing) {
                        thisMarker.setIcon(icons)
                    }
                })
                console.log(overlays[overlays.length - 1]);
                console.log(overlays[overlays.length - 1].w.path);//输出多边形的点坐标
            });
        },
        //删除绘制覆盖物
        clearOverlays() {
            console.log(this.overlays);
            this.map.remove(this.overlays);
            this.overlays.length = 0;
            console.log(this.overlays);
        },
        //关闭绘制覆盖物
        closeDraw() {
            this.mouseTool.close(true);
            // this.$el.getElementsByName('func').checked = false;//暂时不考虑关闭绘制功能
            this.$el.querySelector('.radios').checked = false
        },
        //绘制固定点标记
        markers() {
            this.icon = new AMap.Icon({
                size: new AMap.Size(40, 50),    // 图标尺寸
                image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',  // Icon的图像
                imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
                // imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
            });
            this.marker1 = new AMap.Marker({
                position: new AMap.LngLat(112.833643, 28.351426),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker2 = new AMap.Marker({
                position: new AMap.LngLat(112.831619, 28.320252),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker3 = new AMap.Marker({
                position: new AMap.LngLat(112.831619, 28.320252),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker4 = new AMap.Marker({
                position: new AMap.LngLat(113.068417, 28.243612),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker5 = new AMap.Marker({
                position: new AMap.LngLat(113.082585, 28.221323),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker6 = new AMap.Marker({
                position: new AMap.LngLat(112.975317, 28.163349),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker7 = new AMap.Marker({
                position: new AMap.LngLat(112.983413, 28.209731),
                offset: new AMap.Pixel(-13, -30)
            })
            this.marker = [
                this.marker1,//点对象
                this.marker2,
                this.marker3,
                this.marker4,
                this.marker5,
                this.marker6,
                this.marker7,
            ]
            this.map.add(this.marker)
            console.log('marker里的this.marker', this.marker)
        },
        //行政区查询
        drawDistrict() {
            this.districtSelect = this.$el.querySelector('#district')
            this.streetSelect = this.$el.querySelector('#street')
            let opts = {
                subdistrict: 1, //返回下一级行政区
                showbiz: false, //最后一级返回街道信息
            }
            this.district = new AMap.DistrictSearch(opts)
            this.district.search('长沙市', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0]);
                }
            })
        },
        //行政区查询获取数据
        getData(data, level) {
            let bounds = data.boundaries;
            if (bounds) {
                for (let i = 0, length = bounds.length; i < length; i++) {
                    let polygon = new AMap.Polygon({
                        map: this.map,
                        strokeWeight: 1,
                        strokeColor: "#0091ea",
                        fillColor: "orange",
                        fillOpacity: 0.5,
                        path: bounds[i],
                    })
                    this.boundPolygon.push(polygon)
                }
                this.map.setFitView();//地图自适应
            }
            if (level === 'district') {
                this.streetSelect.innerHTML = ''
            } else if (level === 'street') {
                return;
            }
            let subList = data.districtList;
            if (subList != null) {
                let contentSub = new Option("--请选择--");
                let curlevel = subList[0].level;
                let curList = this.$el.querySelector("#" + curlevel);
                if (curList != null) {
                    for (let i = 0, l = subList.length; i < l; i++) {
                        let name = subList[i].name;
                        let levelSub = subList[i].level;
                        let cityCode = subList[i].citycode;
                        contentSub = new Option(name);
                        contentSub.setAttribute("value", levelSub);
                        contentSub.center = subList[i].center;
                        contentSub.adcode = subList[i].adcode;
                        curList.add(contentSub);
                    }
                }
            }
        },
        search(obj, e) {
            // 清除地图上所有覆盖物
            for (let i = 0, l = this.boundPolygon.length; i < l; i++) {
                this.boundPolygon[i].setMap(null);
            }
            let option = e.target[e.target.selectedIndex];
            let keyword = option.text; //关键字
            let adcode = option.adcode;
            this.district.setLevel(option.value); //行政区级别
            this.district.setExtensions("all");
            let that = this;
            //行政区查询
            //按照adcode进行查询可以保证数据返回的唯一性
            this.district.search(adcode, function (status, result) {
                if (status === "complete") {
                    that.getData(result.districtList[0], e.target.value);
                }
            });
        },
        //清除覆盖物
        clearCover() {
            // 清除地图上所有覆盖物
            for (let i = 0, l = this.boundPolygon.length; i < l; i++) {
                this.boundPolygon[i].setMap(null);
            }
            console.log(this.districtSelect);
        },
        //视角移动
        setCenter(e) {
            this.map.setCenter(e.target[e.target.selectedIndex].center);
        },
        // 动态预测模型选择
        moduleSelect(mode){
            alert(`${mode}预测结果已生成，请回到首页导出报表`)
        },
        gohome(){
            this.$router.push('/home')
        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.$map().then(AMap => {
            this.map = new AMap.Map("container", {
                //设置地图容器id
                viewMode: '3D', //是否为3D地图模式
                zoom: 10, //初始化地图级别
                center: [112.939398, 28.227467] //初始化地图中心点位置
            });

            AMap.plugin([
                'AMap.MapType',
                'AMap.ToolBar',
                'AMap.MouseTool',
                'AMap.DistrictSearch',
            ], () => {
                this.map.addControl(new AMap.MapType())
                this.map.addControl(new AMap.ToolBar())
                this.mouseTool = new AMap.MouseTool(this.map); //加载鼠标工具
                this.markers();//加载固定点数据
                this.addOverlays(this.overlays);//加载添加覆盖物方法
                this.drawDistrict();
            });
            console.log(this.map);
        });
    },
}
</script>

<style>
.otherContain {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.input-item {
    height: 2.2rem;
}

.btn {
    width: 6rem;
    margin: 0 1rem 0 2rem;
}

.input-text {
    width: 4rem;
    margin-right: 1rem;
}

.queryUI {
    width: 24rem;
    bottom: 15rem !important;
}

.selectUI {
    width: 24rem;
    bottom: 5rem !important;
}
.modeUI{
    width: 24rem;
    bottom:25rem !important
}
.gohomeUI{
    width: 24rem;
}

.clearbtn {
    width: 10rem !important;
    margin: 8px auto;
}
</style>