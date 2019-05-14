<template>
    <div class="setting_btn" @click="onSetting">
        开：{{'10:00'}}&nbsp;&nbsp;&nbsp;&nbsp;关：{{'12:30'}}
        <icon icon="iconiconset0420"></icon>
    </div>
</template>

<script type="text/ecmascript-6">
import {Icon} from 'genie-ui';

export default {
  name: 'settingModel',
  components: {Icon},
  data() {
    return {
      routePrm: '',
    };
  },
  computed: {
    // @TODO: computed
  },
  mounted() {
    // @TODO: mounted
    AI.getDeviceActions().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    // 获取路由参数
    this.routePrm = window.location.hash.split('?')[1] || '';
  },
  methods: {
    // @TODO: methods
    onSetting() {
      window.location.hash = `/timeedit?${window.location.hash.split('?')[1]}`;
    },
  },
};
</script>

<style lang="less" scoped>
    @import "./settingModel";
</style>
