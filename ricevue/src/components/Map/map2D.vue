<template>
    <div id="container"></div>
</template>
  
<script>
export default {
    data() {
        return {
            map: {},
            controlbar: null,
            loca: {},
            geo: {},
            controlBar: {},
            scale: {},
            district: {},
            mask: [],//掩膜
            opts: {
                subdistrict: 0,
                extensions: 'all',
                level: 'city'
            },
            bounds: [],
            marker1: {},
            marker2: {},
            marker3: {},
            circle: {},
            covers: [],
            infoWindow: {}//信息弹窗对象
        }
    },
    methods: {
        //绘制固定覆盖物
        drawCovers() {
            this.marker1 = new AMap.Marker({
                position: new AMap.LngLat(112.730669, 28.075704),
                offset: new AMap.Pixel(-13, -30),
                contents: '大石坝森林公园'

            })
            this.marker2 = new AMap.Marker({
                position: new AMap.LngLat(113.054079, 28.242182),
                offset: new AMap.Pixel(-13, -30),
                contents: '长沙县农场'
            })
            this.marker3 = new AMap.Marker({
                position: new AMap.LngLat(113.599962, 28.182885),
                offset: new AMap.Pixel(-13, -30),
                contents: '浏阳市农场'
            })
            //#region  暂时不考虑多边形
            // this.circle = new AMap.Circle({
            //     center: new AMap.LngLat("113.328348", "28.396632"), // 圆心位置
            //     radius: 10000,  //半径
            //     strokeColor: "#F33",  //线颜色
            //     strokeOpacity: 1,  //线透明度
            //     strokeWeight: 3,  //线粗细度
            //     fillColor: "#ee2200",  //填充颜色
            //     fillOpacity: 0.35, //填充透明度
            //     contents: '我是大山冲公园'
            // })
            //#endregion
            this.covers = [
                this.marker1,
                this.marker2,
                this.marker3,
            ]
            this.map.add(this.covers)
            // this.map.add(this.circle)
            this.marker1.on('click', e => {
                this.openInfo(e)
            })
            this.marker2.on('click', e => {
                this.openInfo(e)
            })
            this.marker3.on('click', e => {
                this.openInfo(e)
            })
            // this.circle.on('click', e => {
            //     this.openInfo(e)
            // })
        },
        openInfo(e) {
            //构建信息窗体中显示的内容
            let info = [];
            console.log(e);
            info.push(`<p class='input-item'>我是${e.target.w.contents}</p></div></div>`);
            this.infoWindow = new AMap.InfoWindow({
                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
            });
            if (e.target.CLASS_NAME = 'AMap.Marker') {
                this.infoWindow.open(this.map, e.target.getPosition());
            } else {
                this.infoWindow.open(this.map, e.target.w.center);
            }


        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.$map().then(AMap => {
            this.map = new AMap.Map("container", {
                mask: this.mask,
                //设置地图容器id
                viewMode: '3D', //是否为3D地图模式
                zoom: 8.3, //初始化地图级别
                center: [113, 28.26152],//初始化地图中心点位置
                // showLabel: false,
                labelzIndex: 130,
                pitch: 40,
            });
            AMap.plugin(
                [
                    'AMap.MapType',
                    'AMap.ToolBar',
                    'AMap.ControlBar',
                    'AMap.Scale',
                    'AMap.DistrictSearch',
                ],
                () => {
                    this.map.addControl(new AMap.MapType())
                    this.map.addControl(new AMap.ToolBar())
                    this.map.addControl(new AMap.ControlBar())
                    this.map.addControl(new AMap.Scale())
                    this.district = new AMap.DistrictSearch(this.opts)

                    this.district.search('长沙市', (status, result) => {
                        this.bounds = result.districtList[0].boundaries
                        let bs = this.bounds
                        let lengthBs = bs.length
                        for (let i = 0; i < lengthBs; i += 1) {
                            this.mask.push([bs[i]])
                            new AMap.Polyline({
                                path: bs[i],
                                strokeColor: '#2196f3',
                                strokeWeight: 4,
                                map: this.map
                            })
                        }
                    })
                    this.drawCovers()

                });
        });
    },
}
</script>
  
<style>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}

.amap-controlbar {
    right: 10px !important;
    top: 450px !important;
}

.amap-controlbar-zoom {
    display: none;
}

.amap-logo {
    display: none !important;
}

.amap-copyright {
    display: none !important;
}
</style>
  
  