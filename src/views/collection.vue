<template>
  <div class="collBd">
    <div class="top">
      <div class="backBtn">
        <img src="../assets/images/backNoBg.png" alt @click="$router.go(-1)" />
      </div>
      <p>收藏夹</p>
      <div class="headRight" @click="editColl">
        <span v-show="!isCollEdit" style="color: #fff">管理</span>
        <span v-show="isCollEdit" style="color: #fff">完成</span>
      </div>
    </div>

    <div v-if="list.length <= 0" class="noData">
      <div>
        <img src="@/assets/images/noCollect.png" alt class="no-data-pic" />
      </div>
      <div class="desc">收藏夹内还是空空的哦</div>
      <div class="desc-sm">快去选点宝贝吧</div>
    </div>
    <div v-else>
      <div class="title" v-if="isCollEdit">
        <div class="selectAll">
          <div class="selectIcon" @click="chooseAll">
            <div v-if="allSelected">
              <img src="../assets/images/sure.png" />
            </div>
            <div v-else>
              <img src="../assets/images/unsure.png" />
            </div>

            <span>全选</span>
          </div>
        </div>
        <div class="delete" @click="showDeleteModal">删除</div>
      </div>

      <div class="proList">
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
            @click.stop="goshop(item.id,item.liveRoomId)"
          >
            <div class="liIcon" @click="changeItem(item)" v-if="isCollEdit">
              <img src="../assets/images/sure.png" v-if="goodsArr.indexOf(item.id) > -1" />
              <img src="../assets/images/unsure.png" v-else />
            </div>
            <div class="liContent">
              <div class="clip" @click="changeItem(item)">
                <img :src="item.pic" />
              </div>
              <div class="txt">
                <p class="name">{{item.name}}</p>
                <p class="price">￥{{item.price}}</p>
                <p class="stock">库存：{{item.stock}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="confirm-modal" v-if="showModal">
      <transition name="scale">
        <div v-if="showModal" class="confirm-box">
          <div>
            <p style="padding: 28px">确认删除收藏的商品吗</p>
            <div class="buttons">
              <div @click="hideModal">取消</div>
              <div @click="cancelConfig">确认</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="showLoading" v-if="showLoading">
      <img src="@/assets/images/loadHttp.gif" alt class="showLoading-icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "collection",
  data() {
    return {
      isCollEdit: false,
      start: 0,
      end: 1000,
      list: [],
      allSelected: false,
      goodsArr: [],
      showModal: false,
      showLoading: false,
    };
  },

  mounted() {
    //收藏列表
    this.getCollData();
  },

  methods: {
    //管理/完成
    goshop(id, liveRoomId) {
      if (!this.isCollEdit) {
        this.$router.push({
          path: "/shop",
          query: {
            goodId: id,
            RoomId: liveRoomId,
            minVideoHide:true
          }
        });
        //console.log(id);
      }
    },
    editColl() {
      this.isCollEdit = !this.isCollEdit;
      if (this.isCollEdit) {
        this.goodsArr = [];
      }
    },

    //选择/取消
    changeItem(row) {
      let idIndex = this.goodsArr.indexOf(row.id);
      if (idIndex >= 0) {
        // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
        this.goodsArr.splice(idIndex, 1);
      } else {
        // 选中该checkbox
        this.goodsArr.push(row.id);
      }
    },

    //全选
    chooseAll() {
      this.allSelected = !this.allSelected;
      if (this.allSelected) {
        this.goodsArr = [];
        this.list.forEach(item => {
          this.goodsArr.push(item.id);
        });
      } else {
        this.goodsArr = [];
      }
    },

    //删除
    deletePro() {
      var that = this;
      if (this.goodsArr.length == 0) {
        that.hideModal();
        this.$toastMessage({ message: "至少选择一条", time: 2000 });
      } else {
        var params = {
          ids: this.goodsArr.join(",")
        };
        this.showLoading = true;
        this.$post(this.$global.globalUrl + "collect/delete.do", params).then(
          res => {
            if (res.code == "0") {
              this.getCollData();
            } else {
              this.showLoading = false;
            }
            that.hideModal();
            this.$toastMessage({ message: res.msg, time: 2000 });
          }
        );
      }
    },

    //获取列表
    getCollData() {
      var params = {
        start: this.start,
        end: this.end
      };
      this.$post(this.$global.globalUrl + "collect/list.do", params).then(
        res => {
          this.showLoading = false;
          if (res.code == "0") {
            this.list = [];
            var tempList = res.data;
            tempList.forEach(item => {
              this.list.push(item);
            });
          } else {
            this.$toastMessage({ message: res.msg, time: 2000 });
          }
        }
      );
    },
    hideModal() {
      this.showModal = false;
    },
    showDeleteModal() {
      this.showModal = true;
    },
    cancelConfig() {
      var that = this;
      this.showModal = false;
      this.$delayFun(() => {
        that.deletePro();
      }, 500);
    }
  }
};
</script>


<style scoped lang="stylus">
  @import "../assets/css/main.css"
.position_center {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.img_bg {
  top: 396px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background: -webkit-linear-gradient(top, #eb9e61 0%, #e4774b 100%);
}

.noData {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);

  .no-data-pic {
    width: 150px;
    margin: 0 auto;
  }

  .desc {
    margin-top: 40px;
  }

  .desc-sm {
    color: #929292;
    font-size: 24px;
    margin-top: 25px;
  }
}

.collBd {
  max-width: 750px;
  margin: 0 auto;
  background: #eee;
  height: auto;
  min-height: 100%;
}

.top {
  height: 100px;
  line-height: 100px;
  background: #fe2045;
  overflow: hidden;

  p {
    color: #fff;
  }

  .backBtn {
    position: absolute;
    left: 24px;
    top: 32px;

    img {
      display: block;
    }
  }

  .headRight {
    position: absolute;
    right: 24px;
    top: 24px;
    display: inline-block;
    width: 70px;
    height: 52px;
    font-size: 30px;
    line-height: 52px;
  }

  p {
    text-align: center;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;

  .selectAll {
    .selectIcon {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }
}

.proList {
  margin-top: 20px;
  height: calc(100% - 330px);
  overflow-y: scroll;

  ul {
    padding-bottom: 101px;

    li {
      background: #FFFFFF;
      padding: 20px;
      display: flex;
      align-items: center;

      .liIcon {
        min-width: 50px;
      }

      .liContent {
        display: flex;
        align-items: center;
        flex: 1;
        height: 200px;

        .clip {
          width: 200px;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-width: 200px;

          img {
            width: 100%;
          }
        }

        .txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          height: 200px;
          min-width: 260px;
          margin: 0 10px;

          .name {
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .price {
            font-size: 30px;
            color: #f65b09;
          }

          .stock {
            color: #666666;
            font-size: 30px;
          }
        }

        .btn {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 10px;

          >div {
            width: 50px;
            height: 50px;
            line-height: 50px;

            &.delBtn {
              font-size: 36px;
            }
          }

          .buyNum {
            border-left: 1px solid #999999;
            border-right: 1px solid #999999;
            overflow: hidden;

            .liNum {
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              border: none;
              font-size: 26px;
              outline: none;
            }
          }
        }
      }
    }

    li~li {
      margin-top: 20px;
    }
  }
}
</style>
