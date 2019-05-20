<template>
    <div class="tab_controller_model">
        <!--Tab-title-->
        <div class="tab_title">
            <a
                    href="javascript:;"
                    @click="()=>{tab1=1;tab2=0;}"
                    :style="`color: ${tab1?'#666':'#ccc'};${tab1?'':'border:none;'}`"
            >控制</a>
            <a
                    href="javascript:;"
                    @click="()=>{tab1=0;tab2=1;}"
                    :style="`color: ${tab2?'#666':'#ccc'};${tab2?'':'border:none;'}`"
            >命令</a>
        </div>

        <div class="settingMode" v-show="settingShow">
            <a class="setModeBtn" href="javascript:;" v-show="!setShow" @click="setModeInstruction">设置</a>
            <a class="confirmModeBtn" href="javascript:;" v-show="setShow" @click="customizeMode">确认</a>
            <a class="confirmModeBtn" href="javascript:;" v-show="setShow" @click="cancelMode">取消</a>
        </div>

        <!-- 控制 -->
        <div class="btn_group" v-show="tab1">
            <a
                    class="btn"
                    href="javascript:;"
                    @click="onOpen"
            >
                <icon
                        icon="iconiconset0253"
                        :iconSize="30"
                        :iconColor="deviceStatus.powerstate?'#666':'#ccc'"
                />
                <br>开关
            </a>
            <a
                    class="btn"
                    href="javascript:;"
                    @click="onMusic"
                    @touchend="()=>mode=4"
            >
                <icon
                        icon="iconiconset0163"
                        :iconSize="30"
                        :iconColor="deviceStatus.powerstate?(mode===4?'#ed8926':'#666'):'#ccc'"
                />
                <br>听音乐
            </a>
            <a
                    class="btn"
                    href="javascript:;"
                    @click="onNightLight"
                    @touchend="()=>mode=6"
            >
                <icon
                        icon="iconmoonyueliang"
                        :iconSize="30"
                        :iconColor="deviceStatus.powerstate?(mode===6?'#ed8926':'#666'):'#ccc'"
                />
                <br>小夜灯
            </a>
            <a
                    class="btn"
                    href="javascript:;"
                    @click="onReading"
                    @touchend="()=>mode=3"
            >
                <icon
                        icon="iconshudian"
                        :iconSize="30"
                        :iconColor="deviceStatus.powerstate?(mode===3?'#ed8926':'#666'):'#ccc'"
                />
                <br>看书
            </a>
        </div>

        <!--命令-->
        <div class="product_function_corpus" v-show="tab2">
            <ul v-for="(product, index) in productFunctionCorpus" :key="index">
                <li v-for="(p, k) in product.corpusList" :key="k">
                    天猫精灵，{{p}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {Icon} from 'genie-ui';
import bus from './newvue';

export default {
  name: 'tabControllerModel',
  components: {Icon},
  data() {
    return {
      productFunctionCorpus: {},
      tab1: 1,
      tab2: 0,
      mode: 0,
      settingShow: 0,
      setShow: 0,
    };
  },
  computed: {
    ...mapState({
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        return attr
      },
    }),
  },
  mounted() {
    const _this = this;
    // 获取语料接口
    AI.getProductFunctionCorpus().then((res) => {
      // 返回语料信息
      if (res.code !== 'SUCCEED') return false;
      _this.productFunctionCorpus = res.model
    }).catch((res) => {
      console.log('失败返回', res);
    });
  },
  methods: {
    // 开关灯
    onOpen() {
      this.$store.dispatch('setDeviceStatus', {
        powerstate: this.deviceStatus.powerstate ? 0 : 1
      });

      if (!this.deviceStatus.powerstate) this.settingShow = 0;
    },
    // 听音乐模式
    onMusic() {
      if (!localStorage.getItem('misicMode')) {
        // 储存模式
        localStorage.setItem('misicMode', JSON.stringify({
          brightness: 80,
          colorTemperature: 8.8,
        }));
      }

      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) this.onOpen();

      let _mode = localStorage.getItem('misicMode') || '';
      _mode = JSON.parse(_mode);

      // 设置亮度&色温
      this.$store.dispatch('setDeviceStatus', {
        brightness: _mode.brightness,
        colorTemperature: _mode.colorTemperature,
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', _mode.brightness);
      bus.$emit('colorTemperature', _mode.colorTemperature);

      this.settingShow = 1;
    },
    // 夜灯模式
    onNightLight() {
      if (!localStorage.getItem('nightMode')) {
        // 储存模式
        localStorage.setItem('nightMode', JSON.stringify({
          brightness: 3,
          colorTemperature: 0,
        }));
      }

      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) this.onOpen();

      let _mode = localStorage.getItem('nightMode') || '';
      _mode = JSON.parse(_mode);

      // 设置亮度&色温
      this.$store.dispatch('setDeviceStatus', {
        brightness: _mode.brightness,
        colorTemperature: _mode.colorTemperature,
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', _mode.brightness);
      bus.$emit('colorTemperature', _mode.colorTemperature);

      this.settingShow = 1;
    },
    // 阅读模式
    onReading() {
      if (!localStorage.getItem('readMode')) {
        // 储存模式
        localStorage.setItem('readMode', JSON.stringify({
          brightness: 100,
          colorTemperature: 50,
        }));
      }

      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) this.onOpen();

      let _mode = localStorage.getItem('readMode') || '';
      _mode = JSON.parse(_mode);

      // 设置亮度&色温
      this.$store.dispatch('setDeviceStatus', {
        brightness: _mode.brightness,
        colorTemperature: _mode.colorTemperature,
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', _mode.brightness);
      bus.$emit('colorTemperature', _mode.colorTemperature);

      this.settingShow = 1;
    },
    // 把设置指令传到控制台上
    setModeInstruction() {
      this.setShow = 1;
      bus.$emit('setShow', 1);
    },
    // 自定义模式
    customizeMode() {
      if (this.mode === 4) {
        // 听音乐
        localStorage.setItem('misicMode', JSON.stringify({
          brightness: this.deviceStatus.brightness,
          colorTemperature: this.deviceStatus.colorTemperature,
        }))
      } else if (this.mode === 6) {
        // 小夜灯
        localStorage.setItem('nightMode', JSON.stringify({
          brightness: this.deviceStatus.brightness,
          colorTemperature: this.deviceStatus.colorTemperature,
        }))
      } else if (this.mode === 3) {
        // 看书
        localStorage.setItem('readMode', JSON.stringify({
          brightness: this.deviceStatus.brightness,
          colorTemperature: this.deviceStatus.colorTemperature,
        }));
      }
      this.setShow = 0;
      bus.$emit('setShow', 0);
    },
    cancelMode() {
      this.setShow = 0;
      bus.$emit('setShow', 0);
    },
  },
};
</script>

<style lang="less" scoped>
    @import "./tabControllerModel";
</style>
