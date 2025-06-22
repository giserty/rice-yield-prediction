<template>
  <div id="app">
    <sm-viewer>
      <sm3d-measure></sm3d-measure>
    </sm-viewer>
    <div class="gohome">
      <input id="clearcover" type="button" class="btn clearbtn" value="回到首页" @click="gohome" />
    </div>
  </div>
  <!-- <div class="other">
    <div id="cesiumContainer"></div>
    <div class="gohome">
      <input
        id="clearcover"
        type="button"
        class="btn clearbtn"
        value="回到首页"
        @click="gohome"
      />
    </div>
  </div> -->
</template>

<script>
import $ from 'jquery'

export default {
  methods: {
    gohome() {
      this.$router.push("/home");
    },
    
  },
  mounted() {
    // var viewer = new Cesium.Viewer("cesiumContainer");
    
  },
};
</script>

<style scoped>
.other {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
/* .gohome{
  width: 24rem;
} */
.gohome{
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    /* background-color: #fff; */
    background-clip: border-box;
    border-radius: .25rem;
    width: 10rem;
    border-width: 0;
    border-radius: 0.4rem;
    /* box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%); */
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    /* padding: 0.75rem 1.25rem; */
}
</style>
