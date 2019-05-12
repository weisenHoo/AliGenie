<template>
    <div class="main">
        <!-- 设备信息 -->
        <controlAreaModel></controlAreaModel>
       <!--按钮开关-->
        <tabControllerModel></tabControllerModel>
        <!-- 时间设置 -->
        <div class="setting">
            开：10:00&nbsp;&nbsp;&nbsp;&nbsp;关：12:30
            <icon icon="iconiconset0420"></icon>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {Icon} from 'genie-ui';
// model
import controlAreaModel from '../../model/controlAreaModel';
import tabControllerModel from '../../model/tabControllerModel'

export default {
  name: 'Main',
  components: {Icon, controlAreaModel, tabControllerModel},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // 产品信息详情
      productInfo: state => {
        const base = state.base.productInfo;
        return base;
      },
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        return attr
      },
    }),
  },
  created() {
    console.log('this.$route.query：', this.$route.query);
    this.$nextTick(() => {
      this.setNavbar(); // 设置topbar
    });
  },
  beforeDestroy() {
    AI.allListenRemove(); // 页面兼听事件取消
  },
  mounted() {
    // null
  },
  methods: {
    // 设置topbar
    setNavbar() {
      AI.setNavbar({
        title: this.productInfo.title,
      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import './index';
</style>
