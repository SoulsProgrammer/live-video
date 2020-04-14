<template>
  <div class="modal" v-if="isShow">
    <div class="confirm-wrapper">
      <div class="main-content">{{content}}</div>
      <div class="button-group">
        <div class="cancel" @click="cancel">取消</div>
        <div class="confirm" @click="confirmChoice">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm",
  data() {
    return {
      isShow: true,
      content: "确认删除该项？"
    };
  },
  methods: {
    confirmChoice() {},
    cancel() {}
  }
};
</script>

<style lang="stylus" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}

.confirm-wrapper {
  padding: 30px 50px;
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background: #fefefe;
  border-radius: 10px;
  border: 1px solid #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow-y: auto;
  overflow: hidden;
  color: #5d5d5d;
  font-size: 32px;

  .main-content {
    padding: 28px;
    text-align: center;
  }

  .button-group {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .confirm, .cancel {
      border: 1px solid #5d5d5d;
      border-radius: 10px;
      height: 50px;
      padding: 10px 20px;
      line-height: 50px;
      width: 25%;
      text-align: center;
    }
  }
}
</style>