<template>
    <div class="controlArea" @touchstart="touchStart" @touchmove="touchMoveLight">
        <div class="mask" :style="`opacity: ${colorTemp/100};`"></div>
        <div class="controller_block">
            <span class="slider slider-top" v-show="v_s">
                上下滑动调节亮度
                <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
            </span>
            <div class="slider-center">
                <div class="prm">
                    <icon class="i" icon="iconbrightj2" iconColor="#fff" :iconSize="32"/>
                    {{brightnessTemp}}%
                </div>
                <div class="prm">
                    <icon class="i" icon="iconhekriconwendusewen" iconColor="#fff" :iconSize="32"/>
                    {{colorTemp}}%
                </div>
            </div>
            <span class="slider slider-right" v-show="v_s">
                左右滑动调节色温
                <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
            </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {Icon} from 'genie-ui';
import bus from './newvue';

export default {
  name: 'controlArea',
  components: {Icon},
  data() {
    return {
      startPosX: 0,
      startPosY: 0,
      brightnessTemp: 100,
      colorTemp: 50,
      v_s: 1,
      getC: 0,
    };
  },
  computed: {
    ...mapState({
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        console.log(33);
        return attr
      },
    }),
  },
  mounted() {
    this._getDeviceActions();

    bus.$on('getC', (data) => {
      this.getC = data;
    });

    // 监听亮度
    bus.$on('brightness', (data) => {
      this.brightnessTemp = data;
    });

    // 监听色温
    bus.$on('colorTemperature', (data) => {
      this.colorTemp = data;
    });

    // 定时隐藏提示
    let timer = setTimeout(() => {
      this.v_s = 0;
      clearTimeout(timer);
    }, 6000);
  },
  methods: {
    // 获取设备完整信息
    _getDeviceActions() {
      if (!this.getC) {
        AI.getDeviceActions({devId: AI.devId}).then(res => {
          if (res.code !== 'SUCCEED') return false;
          this.brightnessTemp = res.model.attr.brightness;
          this.colorTemp = res.model.attr.colorTemperature;
        });
      }
    },
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
      let _temp = parseInt(this.brightnessTemp);
      _temp = _temp + parseInt(distanceY / 100);

      if (_temp > 100) {
        _temp = 100;
      } else if (_temp < 3) {
        _temp = 3;
      }

      let LPX = Math.ceil(event.touches[0].clientX);
      let distanceX = LPX - this.startPosX;
      let colorTemperature = parseInt(this.colorTemp);
      colorTemperature = colorTemperature + parseInt(distanceX / 100);

      if (colorTemperature > 100) {
        colorTemperature = 100;
      } else if (colorTemperature < 0) {
        colorTemperature = 0;
      }

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.setDeviceStatus('colorTemperature', colorTemperature);
        this.colorTemp = colorTemperature;
      } else {
        this.brightnessTemp = _temp;
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
