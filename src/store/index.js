import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    select:"",
    routePath:"",
    colseVideo:false,
    scrollTop:0,
    scrollTopFloow:0,
    oldRoomId:"",
    nowRoomId:"",
    nowRouteName:''
  },
  mutations: {
    chaneSelect(state,now){
      return state.select=now
    },
    chaneRoutePath(state,now){
      return state.routePath=now
    },
    chaneColseVideo(state,now){
      return state.colseVideo=now
    },
    chaneScrollTop(state,now){
      return state.scrollTop=now
    },
    chaneScrollTopFloow(state,now){
      return state.scrollTopFloow=now
    },
    chaneOldRoomId(state,now){
      return state.oldRoomId=now
    },
    chaneNowRoomId(state,now){
      return state.nowRoomId=now
    },
    changeNowRoute(state,now) {
     
      return state.nowRouteName = now
    }

  },
  actions: {
    chaneSelectASY(context,data){
      context.commit('chaneSelect',data)
    },
    chaneRoutePathASY(context,data){
      context.commit('chaneRoutePath',data)
    },
    chaneColseVideoASY(context,data){
      context.commit('chaneColseVideo',data)
    },
    chaneScrollTopASY(context,data){
      context.commit('chaneScrollTop',data)
    },
    chaneScrollTopFloowASY(context,data){
      context.commit('chaneScrollTopFloow',data)
    },
    chaneOldRoomIdASY(context,data){
      context.commit('chaneOldRoomId',data)
    },
    chaneNowRoomIdASY(context,data){
      context.commit('chaneNowRoomId',data)
    },
    chaneNowRouteIdASY(context,data){
      if(data==""||data==undefined){
        let nowRouteName = localStorage.getItem('nowRouteName')
        context.commit('changeNowRoute',nowRouteName)
      }else {
        context.commit('changeNowRoute',data)
      }
     
    }
  },
  modules: {
  }
})
