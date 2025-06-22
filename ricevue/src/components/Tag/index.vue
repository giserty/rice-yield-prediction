<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "CLOSETAG",
    }),
    //点击页面跳转
    changeMenu(item) {
      //修改连续点击报错：this.$router.push().catch(err=>err)
      this.$router.push({ name: item.name }).catch((err) => err);
    },
    //页面关闭，但是这里有个BUG：  Scripts may close only the windows that were opened by them.
    //目前看来可能是浏览器不支持element ui的关闭页面方法
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      // 输出长度
      // console.log(length);
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
