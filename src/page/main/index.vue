<template>
    <div class="main">
        <!-- 设备信息 -->
        <div class="deviceInfo">
            <div class="title">
                <icon class="i" icon="iconfanhui"></icon>
                {{navBarData.title}}
            </div>
            <div class="controller_block" @touchmove="touchstart">
                <a class="slider slider-top" href="javascript:;">
                    上下滑动调节亮度
                    <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
                </a>
                <div class="prm"><!--5000k 50%--> {{lastPosX}} {{lastPosY}}</div>
                <a class="slider slider-right" href="javascript:;">
                    左右滑动调节色温
                    <icon class="i" icon="iconsanjiantou" iconColor="#fff" :iconSize="50"/>
                </a>
            </div>
        </div>

        <!-- 控制按钮 -->
        <div class="btn_group">
            <a class="btn" href="javascript:;">
                <icon icon="iconiconset0253" :iconSize="30" iconColor="#ccc"/>
                <br>
                开关
            </a>
            <a class="btn" href="javascript:;">
                <icon icon="iconiconset0163" :iconSize="30" iconColor="#ccc"/>
                <br>
                听音乐
            </a>
            <a class="btn" href="javascript:;">
                <icon icon="iconmoonyueliang" :iconSize="30" iconColor="#ccc"/>
                <br>
                小夜灯
            </a>
            <a class="btn" href="javascript:;">
                <icon icon="iconshudian" :iconSize="30" iconColor="#ccc"></icon>
                <br>
                看书
            </a>
        </div>

        <!-- 时间设置 -->
        <div class="setting">
            开：10:00&nbsp;&nbsp;&nbsp;&nbsp;关：12:30
            <icon icon="iconiconset0420"></icon>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import {PushBar, Icon} from 'genie-ui';

export default {
  name: 'Main',
  components: {
    PushBar,
    Icon
  },
  data() {
    return {
      lastPosX: 0,
      lastPosY: 0,
    };
  },
  computed: {
    ...mapState({
      // 设备标题
      navBarData: state => state.base.navBarData,

      // 产品信息详情
      productInfo: state => {
        return state.base.productInfo;
      },

      // 设备status
      deviceStatus(state) {
        const attr = state.publicInfo.attr;
        const onlinestate = attr.onlinestate === 'online' ? '在线' : '离线';
        const powerstate = attr.powerstate === 1;
        return [{
          text: '设备状态',
          descColor: '#4a4a4a',
          desc: onlinestate
        }, {
          check: powerstate,
          text: '开关状态',
          type: 'switch',
          clickBack: (val) => {
            this.$store.dispatch('setDeviceStatus', {
              powerstate: val.check ? 0 : 1
            });
          }
        }]
      },

      // 在线状态
      onlinestate: state => {
        const onlinestate = state.publicInfo.attr.onlinestate;
        return onlinestate === 'online' ? '在线' : '离线';
      },

      // 开关状态
      powerstate: state => {
        const powerstate = state.publicInfo.attr.powerstate;
        return powerstate === 1;
      },
    }),
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    // 设置topbar
    setNavbar() {
      AI.setNavbar({
        title: this.productInfo.title,
      })
    },
    touchstart(event) {
      // 获取起始坐标位置x
      this.lastPosX = event.touches[0].clientX
      this.lastPosY = event.touches[0].clientY
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .deviceInfo {
        display: flex;
        height: 60vh;
        margin-bottom: 10px;
        background-color: #fff;
        flex-direction: column;
        // 背景色
        background: linear-gradient(135deg, rgb(255, 210, 160), rgb(235, 123, 15)); /* 标准的语法 */

        div.title {
            width: 100vw;
            height: 44px;
            margin-top: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .i {
                width: 44px;
                height: 44px;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        div.controller_block {
            width: 100vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            position: relative;

            a.slider {
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

            a.slider-top {
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
