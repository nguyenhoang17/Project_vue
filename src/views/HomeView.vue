<template>
  <div class="home">
    <div class="container1">
      <draggable class="container">
             <div v-for="(arrayTask, index) in arrayTasks" :key="index" class="list">
                  <el-row>
                      <el-col :span="21">
                          <div class="grid-content bg-purple">
                              <h2 v-if="showList==1" @click="showInputTask()" class="listTitle">{{arrayTask.name}}</h2>
                              <el-input class="inputTask" v-else placeholder="Please input" v-model="inputList"></el-input>
                          </div>
                      </el-col>
                      <el-col :span="3"><div class="grid-content bg-purple-light" style="margin-top:-2px"><i class="el-icon-more more"></i></div></el-col>
                  </el-row>
                  <draggable draggable=".list__task__content" :list="arrayTaskItem1">
                      <div class="list__task__content" v-for="(arrayTaskItem, index) in arrayTaskItem1" :key="index">
                      <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark list__task__content__text">{{arrayTaskItem.name}}<span class="list__task__content__edit"><i class="el-icon-edit"></i></span></div>
                          </el-col>
                      </el-row>
                  </div>
                  </draggable>
              </div>
      </draggable>
</div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    name: "HomeView",
    methods:{
        showInputTask(){
            this.showList = 0
        }
    },
    components: {
        draggable
    },
    data(){
       return{
        showList:1,
        inputList:"",
        arrayTasks:[
          {name:'Danh sách 1'},
          {name:'Danh sách 2'},
          {name:'Danh sách 3'},
          {name:'Danh sách 4'},
          {name:'Danh sách 5'},
          {name:'Danh sách 6'},
        ],
        arrayTaskItem1:[
          {name:'alo1'},
          {name:'alo2'},
          {name:'alo3'},
          {name:'alo4'},
          {name:'alo5'}
        ],
        arrayTaskItem2:[
          {name:'kalo1'},
          {name:'kalo2'},
          {name:'kalo3'},
          {name:'kalo4'},
          {name:'kalo5'}
        ]

       } 
    },
}
</script>
<style lang="scss" scoped>

  .home{
    display: inline-block;
    padding: 10px;
    width: 100%;
    height: 93.8vh;
    background-image: url(../assets/images/hinh-nen-songoku-7-vien-ngoc-rong-full-hd-4k.jpg);
    background-repeat: no-repeat; 
    background-size: cover;
    .container1{
      display: block;
          .container{
              display: -webkit-inline-box;
              width: 1883px;
              max-height: 92.8vh;
              height: 92.8vh;
              overflow: auto;
              .list{
                  margin-right: 10px;
                  height: max-content;
                  width: 380px;
                  max-height: 900px;
                  overflow: auto;
                  padding: 14px 5px;
                  background-color: #ebecf0;;
                  border-radius: 10px;
                  .listTitle{
                      text-align: left !important;
                      margin: 0 !important;
                      padding: 7px 0px 7px 14px;

                  }
                  .more{
                      width: 33px;
                      height: 33px;
                      line-height: 33px;
                      margin:0 !important;
                  }
                  .more:hover{
                      background-color: #091e4214;
                  }
                  .list__task__content{
                    width: 100%;
                    height: 40px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    border-bottom:1px solid #ccc ;
                    line-height: 40px;
                    margin: 10px 0;
                    text-align: left;
                    .list__task__content__text{
                      padding-left: 14px;
                      .list__task__content__edit{
                        float: right;
                        width: 30px;
                        height: 30px;
                        background-color: #091e4214;
                        font-size: 14px;
                        text-align: center;
                        margin: 5px 10px 5px 0px;
                        line-height: 30px;
                        display: none;
                      }
                    }
                    .list__task__content__text:hover .list__task__content__edit{
                      display: inline-block;
                    }
                  }
              }
          }
           .container::-webkit-scrollbar
              {
                width: 0 !important;
                display: none; 
              }
    }

  }

  
</style>
