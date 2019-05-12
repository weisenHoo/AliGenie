<template>
    <div class="tab_controller_model">
        <!--Tab-title-->
        <div class="tab_title">
            <a href="javascript:;" @click="()=>{tab1=1;tab2=0;}" :style="`color: ${tab1?'#666':'#ccc'};${tab1?'':'border:none;'}`">控制</a>
            <a href="javascript:;" @click="()=>{tab1=0;tab2=1;}" :style="`color: ${tab2?'#666':'#ccc'};${tab2?'':'border:none;'}`">命令</a>
        </div>

        <!-- 控制 -->
        <div class="btn_group" v-show="tab1">
            <a class="btn" href="javascript:;" @click="setDeviceStatus('powerstate',deviceStatus.powerstate ? 0 : 1)">
                <icon icon="iconiconset0253" :iconSize="30" :iconColor="deviceStatus.powerstate?'#666':'#ccc'"/>
                <br>开关
            </a>
            <a class="btn" href="javascript:;" @click="setDeviceStatus('mode',4)">
                <icon icon="iconiconset0163" :iconSize="30" :iconColor="deviceStatus.powerstate?'#666':'#ccc'"/>
                <br>听音乐
            </a>
            <a class="btn" href="javascript:;" @click="setDeviceStatus('mode',6)">
                <icon icon="iconmoonyueliang" :iconSize="30" :iconColor="deviceStatus.powerstate?'#666':'#ccc'"/>
                <br>小夜灯
            </a>
            <a class="btn" href="javascript:;" @click="setDeviceStatus('mode',3)">
                <icon icon="iconshudian" :iconSize="30" :iconColor="deviceStatus.powerstate?'#666':'#ccc'"/>
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

export default {
  name: 'tabControllerModel',
  components: {Icon},
  data() {
    return {
      productFunctionCorpus: {},
      tab1: 1,
      tab2: 0,
    };
  },
  computed: {
    ...mapState({
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        this.temp = state.publicInfo.attr.brightness;
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
    @import "./tabControllerModel";
</style>
