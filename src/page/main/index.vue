<template>
    <div class="main">
        <!-- 设备信息 -->
        <div class="deviceInfo" @touchstart="touchStart" @touchmove="touchMoveLight">
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

        <!--Tab-title-->
        <div class="tab">
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

        <!-- 时间设置 -->
        <div class="setting">
            开：10:00&nbsp;&nbsp;&nbsp;&nbsp;关：12:30
            <icon icon="iconiconset0420"></icon>
        </div>

        <!--测试区-->
        <!--<textarea cols="100" rows="200">{{productInfo}}</textarea>-->
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {PushBar, Icon} from 'genie-ui';

export default {
  name: 'Main',
  components: {PushBar, Icon},
  data() {
    return {
      startPosX: 0,
      startPosY: 0,
      lastPosX: 0,
      lastPosY: 0,
      temp: 0,
      CTV: 50,
      deviceActions: {},
      productFunctionCorpus: {},
      tab1: 1,
      tab2: 0,
    };
  },
  computed: {
    ...mapState({
      // 设备标题
      navBarData: state => state.base.navBarData,
      // 产品信息详情
      productInfo: state => {
        const base = state.base.productInfo;
        return base;
      },
      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        this.temp = state.publicInfo.attr.brightness;
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
    this.getDeviceActions();
    AI.getDeviceActions({devId: AI.devId}).then(res => {
      console.log(res);
    });
  },
  methods: {
    // 设置topbar
    setNavbar() {
      AI.setNavbar({
        title: this.productInfo.title,
      })
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
        console.log(colorTemperature);
      } else {
        this.setDeviceStatus('brightness', _temp);
        console.log(_temp);
      }

      this.setDeviceStatus('brightness', _temp);
    },
    setDeviceStatus(status, value) {
      // 开关：powerstate、亮度：brightness、模式：mode、色温：colorTemperature
      if (status !== 'powerstate' && this.deviceStatus.powerstate === 0) {
        this.$toast({
          text: '先开灯',
          duration: 2500
        });
        return false;
      }
      this.$store.dispatch('setDeviceStatus', {
        [status]: value
      });
    },
    getDeviceActions() {
      const _this = this;

      // 获取设备完整信息
      AI.getDeviceActions({
        devId: AI.devId,
      }).then(res => {
        if (res.code !== 'SUCCEED') return false;
        _this.deviceActions = res.model
      });

      // 获取语料接口
      AI.getProductFunctionCorpus().then((res) => {
        // 返回语料信息
        if (res.code !== 'SUCCEED') return false;
        _this.productFunctionCorpus = res.model
      }).catch((res) => {
        console.log('失败返回', res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .deviceInfo {
        width: 100vw;
        height: 60vh;
        margin-bottom: 10px;
        background-color: #fff;
        background: linear-gradient(135deg, rgb(231, 231, 229), rgb(175, 234, 242));
        // 背景色
        position: relative;

        div.mask {
            opacity: 0.9;
            width: 100vw;
            height: 60vh;
            background: linear-gradient(135deg, rgb(255, 210, 160), rgb(255, 123, 15));
            position: absolute;
            bottom: 0;
            left: 0;
        }

        div.controller_block {
            width: 100vw;
            height: 52vh;
            padding-top: 8vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            position: relative;

            span.slider {
                width: 86vw;
                height: 60px;
                line-height: 60px;
                padding: 0 7vw;
                text-align: center;
                color: #fff;
                opacity: 0.5;
                position: relative;

                .i {
                    position: absolute;
                    right: 20px;
                    bottom: 0px;
                }
            }

            span.slider-top {
                .i {
                    transform: rotate(-90deg);
                    bottom: 16px;
                }
            }

            div.prm {
                color: #fff;
                font-size: 40px;
            }
        }
    }

    div.tab {
        width: 100vw;
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
            display: block;
            padding: 0px 3px;
            padding-bottom: 4px;
            margin: 0 5px;
            color: #000;
            border-bottom: 2px solid #000;
        }
    }

    .btn_group {
        width: 86vw;
        height: 90px;
        padding: 0 7vw;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-around;

        .btn {
            width: 18vw;
            border: 1px solid #f1f1f1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #666;
        }
    }

    .product_function_corpus {
        width: 86vw;
        height: 90px;
        overflow: hidden;
        padding: 0 7vw;
        margin-bottom: 10px;

        li {
            padding-top: 5px;
            color: #666;
            font-size: 12px;
        }
    }

    .setting {
        width: 86vw;
        height: 60px;
        padding: 0 7vw;
        border-top: 15px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
