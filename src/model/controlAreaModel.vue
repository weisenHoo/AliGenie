<template>
    <div class="controlArea" @touchstart="touchStart" @touchmove="touchMoveLight">
        <div class="mask" :style="`opacity: ${CTV/100};`"></div>
        <div class="controller_block">
                <span class="slider slider-top">
                    上下滑动调节亮度
                    <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
                </span>
            <div class="prm">{{temp}}%</div>
            <span class="slider slider-right">
                    左右滑动调节色温
                    <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
                </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {Icon} from 'genie-ui';

export default {
  name: 'controlArea',
  components: {Icon},
  data() {
    return {
      startPosX: 0,
      startPosY: 0,
      temp: 100,
      CTV: 50,
    };
  },
  computed: {
    ...mapState({
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        // @TODO 参数无效
        this.temp = state.publicInfo.attr.brightness;
        return attr
      },
    }),
  },
  methods: {
    touchStart(event) {
      // 获取起始坐标位置x，y
      this.startPosX = Math.ceil(event.touches[0].clientX);
      this.startPosY = Math.ceil(event.touches[0].clientY);
    },
    touchMoveLight(event) {
      // 获取移动坐标位置y
      let LPY = Math.ceil(event.touches[0].clientY);
      // 计算手指在y轴上移动的距离
      let distanceY = this.startPosY - LPY;
      let _temp = parseInt(this.temp);
      _temp = _temp + parseInt(distanceY / 100);

      if (_temp > 100) {
        _temp = 100;
      } else if (_temp < 3) {
        _temp = 3;
      }

      let LPX = Math.ceil(event.touches[0].clientX);
      let distanceX = LPX - this.startPosX;
      let colorTemperature = parseInt(this.CTV);
      colorTemperature = colorTemperature + parseInt(distanceX / 100);

      if (colorTemperature > 100) {
        colorTemperature = 100;
      } else if (colorTemperature < 0) {
        colorTemperature = 0;
      }

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.setDeviceStatus('colorTemperature', colorTemperature);
        this.CTV = colorTemperature;
      } else {
        this.setDeviceStatus('brightness', _temp);
      }

      this.setDeviceStatus('brightness', _temp);
    },
    // 这个方法是可以做成复用的
    setDeviceStatus(status, value) {
      // 开关：powerstate、亮度：brightness、模式：mode、色温：colorTemperature
      this.$store.dispatch('setDeviceStatus', {
        [status]: value
      });
    },
  },
};
</script>

<style lang="less" scoped>
    @import "./controlAreaModel";
</style>
