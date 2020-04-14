<template>
  <div>
    <!-- <addlist :item="item"> -->
    <div class="add" @click.stop="chooseAdd(item.id)">
      <div class="info">
        <span class="name">{{item.name}}</span>
        <span class="phone">{{item.phoneNumber}}</span>
        <span v-if="item.defaultStatus" class="isDefault">默认</span>
        <div class="address">{{item.province}} {{item.city}} {{item.region}} {{item.detailAddress}}</div>
      </div>
      <div class="division"></div>
      <div class="operation">
        <div class="addDefault" @click.stop="setDefault(item.id)">
          <div class="setDefault" :style="item.defaultStatus?'background:#e63027':''">
            <div></div>
          </div>默认地址
        </div>
        <div class="right">
          <div @click.stop="toAddEdit(item)">
            <img src="../assets/images/edit.png" alt />
            编辑
          </div>
          <div @click.stop="toAddDelete(item.id)">
            <img src="../assets/images/delete.png" alt />
            删除
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addList",
  data() {
    return {
      isDefault: false,
      global: this.$global,
      showModal: false
    };
  },
  props: {
    item: Object
  },
  methods: {
    toAddEdit(e) {
      //console.log('编辑'+e)
      this.$router.push({ path: "/addDetailEdit", query: { detail: e } });
    },
    toAddDelete(e) {
      //console.log(this.global.globalUrl)
      // this.showModal = true;
      this.$confirm('确认删除该地址？').then(()=>{
        var that = this;
      var params = {
        ids: e,
        timestamp: Date.parse(new Date()) / 1000
      };
      this.$post(
        this.global.globalUrl + "userAddress/deleteUserAddress.do",
        params
      ).then(res => {
        //console.log(res)
        this.$toastMessage({ message: res.msg, time: 500 });
        that.$emit("getAddList");
      });
      }).catch(()=>{
        
      })
    },
   
    hideModal() {
      this.showModal = false;
    },
    setDefault(e) {
      //console.log(e)
      var that = this;
      var params = {
        id: e,
        defaultStatus: "1",
        timestamp: Date.parse(new Date()) / 1000
      };
      this.$post(
        this.global.globalUrl + "userAddress/updateUserAddress.do",
        params
      ).then(res => {
        //console.log(res)
        that.$emit("getAddList");
      });
    },
    chooseAdd(e) {
      //console.log(e)
      if (this.$route.query.from == "order") {
        this.setDefault(e);
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
        //this.global.addressChoose = e
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.add {
  background: #FFFFFF;
  margin-top: 20px;
  border-radius: 10px;
  padding: 30px;
}

.info {
  text-align: left;

  span {
    margin-right: 30px;
  }

  .name {
    font-size: 32px;
  }

  .phone {
    font-size: 22px;
    color: #999;
  }

  .isDefault {
    background: #fe2045;
    color: #fff;
    padding: 0 10px;
    border-radius: 5px;
    font-size: 26px;
  }

  .address {
    color: #333;
    font-size: 28px;
    margin-top: 20px;
  }
}

.modal-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);

  .modal {
    padding: 30px 50px;
    width: 300px;
    height: 200px;
    margin: 0 auto;
    background: #fefefe;
    border-radius: 10px;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    overflow-y: auto;
    overflow: hidden;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    >div {
      border: 1px solid #EEEEEE;
      border-radius: 10px;
      height: 60px;
      padding: 10px 20px;
      line-height: 60px;
      width: 25%;
    }
  }
}

.setDefault {
  position: relative;
  height: 40px;
  width: 40px;
  background: #999;
  border-radius: 50%;
  margin-right: 20px;

  div {
    position: absolute;
    top: 11px;
    left: 11px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
  }
}

.division {
  width: 100%;
  background: #f0f0f0;
  height: 5px;
  margin: 20px 0;
}

.operation {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .addDefault {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      margin-left: 30px;

      img {
        margin-right: 10px;
      }
    }
  }
}
</style>
