import Vue from 'vue'
import Confirm from '@/components/confirm.vue'

let ConfirmConstrustor = Vue.extend(Confirm)

let confirm = (content) =>{
    return new Promise((resolve,reject)=>{
        let confirmDom = new ConfirmConstrustor ({
            el: document.createElement('div')
        })
        document.body.appendChild(confirmDom.$el)
        confirmDom.content = content||'确认删除？'
        confirmDom.confirmChoice = function(){
            confirmDom.isShow = false
            resolve()
            
        }
        confirmDom.cancel = function() {
            confirmDom.isShow = false
            reject()
            
            
        }
    })
   
}
export default confirm;

//使用方法

// this.$confirm('提示语').then(()=>{}).then(()=>{})
//