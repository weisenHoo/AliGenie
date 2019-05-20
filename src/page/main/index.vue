<template>
    <div class="main">
        <!-- 设备信息 -->
        <controlAreaModel/>
       <!--按钮开关-->
        <tabControllerModel/>
        <!-- 时间设置 -->
        <!--<settingModel/>-->
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {Icon} from 'genie-ui';
// model
import controlAreaModel from '../../model/controlAreaModel';
import tabControllerModel from '../../model/tabControllerModel';
import settingModel from '../../model/settingModel';

export default {
  name: 'Main',
  components: {Icon, controlAreaModel, tabControllerModel, settingModel},
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
        return attr;
      },
    }),
  },
  created() {
    // console.log('this.$route.query：', this.$route.query);
    this.$nextTick(() => {
      this.setNavbar(); // 设置topbar
    });
  },
  beforeDestroy() {
    AI.allListenRemove(); // 页面兼听事件取消
  },
  mounted() {
    // @TODO: mounted
    // 获取设备完整信息
    AI.getDeviceActions({devId: AI.devId}).then((res) => {
      if (res.code !== 'SUCCEED') return false;
      console.log(res);
    }).catch((res) => {
      console.log('失败返回', res);
    });
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

</style>
