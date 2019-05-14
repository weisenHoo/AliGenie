<template>
    <div class="set_time">
        <div class="row start" @click="onPick('startShow')">
            <span class="tit">开灯时间</span>
            <div class="right">
                <span>{{startDef}}</span>
                <icon icon="iconiconset0420"/>
            </div>
        </div>
        <date-time :show.sync="startShow" v-model="startDef" type="time" @confirm="onConfirm"></date-time>
        <div class="row end" @click="onPick('endShow')">
            <span class="tit">关灯时间</span>
            <div class="right">
                <span>{{endDef}}</span>
                <icon icon="iconiconset0420"/>
            </div>
        </div>
        <date-time :show.sync="endShow" v-model="endDef" type="time" @confirm="onConfirm"></date-time>
        <div class="row repeat">
            <span class="tit">重复</span>
            <div class="right">
                <span>{{'执行一次'}}</span>
                <icon icon="iconiconset0420"/>
            </div>
        </div>
        <a class="btn" href="javascript:;" @click="onDelete">删除定时</a>
    </div>
</template>

<script>
import {Icon, DateTime} from 'genie-ui';

export default {
  name: 'settime',
  components: {Icon, DateTime},
  data() {
    return {
      startShow: false,
      endShow: false,
      startDef: '17:00',
      endDef: '23:00',
      date: '',
    };
  },
  computed: {
    // @TODO: weisen
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
    // @TODO: methods
    onPick (vm) {
      this[vm] = true
    },
    onConfirm (v) {
      console.log(v)
    },
    onDelete() {
      // alert('删除定时');
      // 设置定时关闭
      this.$store.dispatch('setDeviceStatus', {
        time: '2019-08-10 01:40:00'
      });
    },
  },
}
</script>

<style lang="less" scoped>
    @import "./time_edit";
</style>
