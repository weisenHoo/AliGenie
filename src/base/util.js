export default {
  getDeviceActions: (obj) => {
    const _this = obj;

    // 获取设备完整信息
    AI.getDeviceActions({
      devId: AI.devId,
    }).then(res => {
      if (res.code !== 'SUCCEED') return false;
      // _this.deviceActions = res.model
      console.log(res.model);
    });
  },
}
