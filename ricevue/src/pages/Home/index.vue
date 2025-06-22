<template>
  <div class="home_content">
    <!--顶部-->
    <header class="header left">
      <div class="left nav">
        <ul>
          <li class="nav_active" @click="goHome"><i class="nav_1"></i><a>二维可视化</a> </li>
          <li @click="goForecast"><i class="nav_2"></i><a>产量预测</a> </li>
        </ul>
      </div>
      <div class="header_center left">
        <h2><strong>水稻产量预测系统</strong></h2>
        <p class="color_font"><small>Rice yield prediction system</small></p>
      </div>
      <div class="right nav text_right">
        <ul>
          <li @click="goStatistics"><i class="nav_7"></i><a>VR漫游</a> </li>
          <li @click="goUser"><i class="nav_8"></i><a>后台管理</a> </li>
        </ul>
      </div>
    </header>
    <!--内容部分-->
    <div class="con left">
      <div class="select_time">
        <div class="static_top left_span" @click="Report('我是预测结果')">
          <i></i><span>动态预测报表</span>
        </div>
        <div class="static_top right_span" @click="Report('我是统计结果')">
          <i></i><span>统计分析报表</span>
        </div>
      </div>
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title"><img src="./img/title_1.png">
              室外环境监测
            </div>
            <img src="./img/室外环境监测.png" class="viewimg">
          </div>
          <div class="div_any_child">
            <div class="div_any_title"><img src="./img/title_2.png">
              种植面积
            </div>
            <!-- <img src="./img/产能信息.png" class="viewimg"> -->
            <div id="main" :style="{ width: '380px', height: '270px' }"></div>
          </div>
        </div>
        <div class="div_any02 left ">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width"><img src="./img/title_3.png">水稻地图</div>
            <div id="map_div" style="width:100% height:100%">
              <!-- Map地图组件出口 -->
              <Map></Map>
            </div>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title"><img src="./img/title_4.png">水稻产量</div>
            <!-- <img src="./img/产值占比.png" class="viewimg"> -->
            <div id="yield" :style="{ width:'350px',height:'280px',top:'-8%',left:'5%' }">
            </div>
          </div>
          <div class="div_any_child">
            <div class="div_any_title"><img src="./img/title_5.png">产值占比</div>
            <!-- <img src="./img/产量.png" class="viewimg"> -->
            <div id="output" :style="{ width: '350px', height: '280px', top: '-8%' }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../../components/Map/map2D.vue'
import * as echarts from 'echarts';
export default {
  name: 'Home',
  data() {
    return {
      map_div: null,
      year: [],
      areaData: [],
      yieldData: [],
      yuelu: [],
      wangcheng: [],
      changsha: [],
      liuyang: [],
      ningxiang: []
    }
  },
  components: {
    Map
  },
  mounted() {
    this.$axios.get(this.$url + '/area').then((res) => {
      let area = res.data
      let year = []
      let areaData = []
      for (let i = 0; i < area.length; i++) {
        // var d = {year:'',furong:0,tianxin:0,yuelu:0,kaifu:0,yuhua:0,wangcheng:0,changsha:0,liuyang:0,ningxiang:0}
        let y = {}
        let a = {}
        y = area[i].year
        a = area[i].liuyang
        // d.furong = area[i].furong
        // d.tianxin = area[i].tianxin
        // d.yuelu = area[i].yuelu
        // d.kaifu = area[i].kaifu
        // d.yuhua = area[i].yuhua
        // d.wangcheng = area[i].wangcheng
        // d.changsha = area[i].changsha
        // d.ningxiang = area[i].ningxiang
        year.push(y)
        areaData.push(a)
      }
      this.year = year
      this.areaData = areaData
      this.Draw()
      console.log(this.year)
      console.log(res.data[0].year)
    }).catch((err) => {
      console.log(err)
      alert('请求失败！请检查后端接口！！！！')
    });

    this.$axios.get(this.$url + '/yield').then((res) => {
      let yieldData = res.data
      let yieldDataList = []
      for (let i = 0; i < yieldData.length; i++) {
        let yD = { name: '', value: 0 }
        yD.name = yieldData[i].year
        // 浏阳市
        yD.value = yieldData[i].liuyang
        // 
        yieldDataList.push(yD)
      }
      this.yieldData = yieldDataList
      this.Draw2();
    }).catch((err) => {
      console.log(err)
      alert('请求失败！请检查后端接口！！！！')
    });

    this.$axios.get(this.$url + '/output').then((res) => {
      let outputData = res.data
      let yueluList = []
      let wangchengList = []
      let changshaList = []
      let liuyangList = []
      let ningxiangList = []
      for (let i = 0; i < outputData.length; i++) {
        let yuelu = outputData[i].yuelu
        let wangcheng = outputData[i].wangcheng
        let changsha = outputData[i].changsha
        let liuyang = outputData[i].liuyang
        let ningxiang = outputData[i].ningxiang
        // 
        yueluList.push(yuelu)
        wangchengList.push(wangcheng)
        changshaList.push(changsha)
        liuyangList.push(liuyang)
        ningxiangList.push(ningxiang)

      }
      this.yuelu = yueluList
      this.wangcheng = wangchengList
      this.changsha = changshaList
      this.liuyang = liuyangList
      this.ningxiang = ningxiangList
      this.Draw3();
      console.log(this.ningxiang)
    }).catch((err) => {
      console.log(err)
      alert('请求失败！请检查后端接口！！！！')
    });

  },
  methods: {
    Draw() {
      let myChart = this.$echarts.init(document.getElementById("main"));

      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.year
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.areaData,
            type: 'bar'
          }
        ]
      })

    },
    Draw2() {
      let myChart = this.$echarts.init(document.getElementById("yield"));

      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '82%',
          left: 'center',
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['0%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#f0f0f0',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: this.yieldData
          }
        ]
      })
    },
    Draw3() {
      let myChart = this.$echarts.init(document.getElementById("output"));

      myChart.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['开福区', '岳麓区', '望城区', '浏阳市', '宁乡市']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.yuelu
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.wangcheng
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.changsha
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.liuyang
          },
          {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.ningxiang
          }
        ]
      })
    },
    // 路由跳转
    goHome() {
      this.$router.push('/home')
    },
    goUser() {
      this.$router.push('/user')
    },
    goForecast() {
      this.$router.push('/forecast')
    },
    goStatistics() {
      this.$router.push('/statistics')
    },
    //导出报表
    Report(result) {
      if (result === '') {
        alert('没有结果报表')
        return;
      }
      const blob = new Blob([result], {
        type: "text/plain;charest=utf-8"
      })
      const objectURL = URL.createObjectURL(blob)
      // 创建一个 a 标签Tag
      const aTag = document.createElement('a')
      // 设置文件的下载地址
      aTag.href = objectURL
      // 设置保存后的文件名称
      aTag.download = "结果报表.txt"
      // 给 a 标签添加点击事件
      aTag.click()
      alert('导出成功');
    }
  }
}
</script>

<style src="./css/base.css" scoped>

</style>