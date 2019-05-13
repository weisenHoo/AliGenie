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
    },
    // 听音乐模式
    onMusic() {
      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) {
        this.$store.dispatch('setDeviceStatus', {
          powerstate: 1
        });
      }

      // 设置亮度
      this.$store.dispatch('setDeviceStatus', {
        brightness: 80
      });

      // 设置色温
      this.$store.dispatch('setDeviceStatus', {
        colorTemperature: 8.8
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', 80);
      bus.$emit('colorTemperature', 8.8);
    },
    // 夜灯模式
    onNightLight() {
      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) {
        this.$store.dispatch('setDeviceStatus', {
          powerstate: 1
        });
      }

      // 设置亮度
      this.$store.dispatch('setDeviceStatus', {
        brightness: 3
      });

      // 设置色温
      this.$store.dispatch('setDeviceStatus', {
        colorTemperature: 0
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', 3);
      bus.$emit('colorTemperature', 0);
    },
    // 阅读模式
    onReading() {
      // 判断灯是否已经开启
      if (!this.deviceStatus.powerstate) {
        this.$store.dispatch('setDeviceStatus', {
          powerstate: 1
        });
      }

      // 设置亮度
      this.$store.dispatch('setDeviceStatus', {
        brightness: 100
      });

      // 设置色温
      this.$store.dispatch('setDeviceStatus', {
        colorTemperature: 50
      });

      // 改变控制面板的数值
      bus.$emit('grtC', 1);
      bus.$emit('brightness', 100);
      bus.$emit('colorTemperature', 50);
    },
  },
};
</script>

<style lang="less" scoped>
    @import "./tabControllerModel";
</style>
