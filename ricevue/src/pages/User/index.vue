<template>
  <!-- 用户信息卡 -->
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-7-16</span></p>
          <p>上次登录地点:<span>长沙</span></p>
        </div>
      </el-card>
      <!-- 统计表 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <Echart :chartData="echartData.order" style="height: 280px"></Echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <Echart :chartData="echartData.user" style="height: 240px"></Echart>
        </el-card>
        <el-card style="height: 260px">
          <Echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/api/data.js";
// import * as echarts from "echarts";
import Echart from "../../components/Echarts/index.vue";
export default {
  name: "user",
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [
        {
          name: "198.10.20.30",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "天心区",
        },
        {
          name: "198.10.20.30",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "天心区",
        },
        {
          name: "*",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "天心区",
        },
        {
          name: "*",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "天心区",
        },
        {
          name: "172.10.20.30",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "岳麓区",
        },
        {
          name: "172.10.20.30",
          todayBuy: "湖南省",
          monthBuy: "长沙市",
          totalBuy: "岳麓区",
        },
      ],
      tableLabel: {
        name: "IP",
        todayBuy: "省",
        monthBuy: "市",
        totalBuy: "县/区",
      },
      countData: [
        {
          name: "已完成进程",
          value: "统计展示",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "收藏工具",
          value: "动态预测",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "正在处理进程",
          value: "沉浸式漫游",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "已完成进程",
          value: "地图可视化",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "收藏工具",
          value: "数据管理",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "正在处理进程",
          value: "远程协作",
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  components: {
    Echart,
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;

      if (code === 20000) {
        // this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];

        //折线图
        keyArray.forEach((key) => {
          // 配置series
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
      console.log(res);
    });
  },
};
</script>

<style lang='less' scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
