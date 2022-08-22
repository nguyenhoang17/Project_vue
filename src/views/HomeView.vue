<template>
  <div class="home">
    <div class="container1">
      <draggable class="container">
             <div v-for="(value, index) in list" :key="index" class="list">
                  <el-row>
                      <el-col :span="21">
                          <div class="grid-content bg-purple">
                            <el-input class="inputTask" v-if="showList!==1 && InputTask_id===value.id" placeholder="" v-model="inputList"></el-input>
                              <h2 v-else @click="showInputTask(value.id)" class="listTitle">{{value.name}}</h2>
                          </div>
                      </el-col>
                      <el-col :span="3"><div class="grid-content bg-purple-light" style="margin-top:-2px">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="el-icon-more more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>Sửa danh sách</el-dropdown-item>
                            <el-dropdown-item>Xoá danh sách</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div></el-col>
                  </el-row>
                  <draggable class="list_group" :list="value.cards" group="people" >
                      <div class="list__task__content" v-for="listItem in value.cards" :key="listItem.id">
                      <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark list__task__content__text" >
                              <span >{{listItem.name}}</span>
                              <span class="list__task__content__edit" @click="dialogTableVisible = true"><i class="el-icon-edit"></i></span>
                            </div>
                          </el-col>
                      </el-row>
                  </div>
                  </draggable>
                  <div >
                    <div class="titletask" v-if="showAddTitleTask===1 && TitleTask_id === value.id">
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="Nhập tiêu đề cho thẻ này"
                        v-model="titletask" style="margin-bottom:20px;">
                      </el-input>
                      <el-button @click="handleAddTitleTask()" type="primary">Thêm thẻ</el-button> <span class="close__add__titleTask" @click="closeAddTitle()"><i class="el-icon-close"></i></span>
                    </div>
                      <div v-else class="addTask">
                      <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark addTaskText"  @click="showAddTitle(value.id)"><i class="el-icon-plus"></i> Thêm thẻ</div>
                          </el-col>
                      </el-row>
                    </div>
                  </div>
              </div>
              <div class="addListTask" v-if="showAddListTitle === 0" @click="showAddList()">
                <h3>
                  <i class="el-icon-plus"></i>
                  Thêm danh sách khác
                </h3>
              </div>
              <div class="formAddList" v-else>
                <el-input placeholder="Nhập tiêu để danh sách..." style="margin-bottom: 10px;"></el-input>
                <el-button type="primary">Thêm thẻ</el-button> <span class="close__add__List" @click="closeAddList()"><i class="el-icon-close"></i></span>
              </div>
      </draggable>
    </div>
    <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
  aaaaaaaaaaaaaaaaa
  </el-dialog>

<!--    <el-dialog title="Shipping address" :visible.sync="dialogChangeInfo">-->
<!--      <el-form :model="form">-->
<!--        <el-form-item label="Promotion name" :label-width="formLabelWidth">-->
<!--          <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Zones" :label-width="formLabelWidth">-->
<!--          <el-select v-model="form.region" placeholder="Please select a zone">-->
<!--            <el-option label="Zone No.1" value="shanghai"></el-option>-->
<!--            <el-option label="Zone No.2" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogChangeInfo = false">Cancel</el-button>-->
<!--    <el-button type="primary" @click="dialogChangeInfo = false">Confirm</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    name: "HomeView",
    data(){
       return{
         dialogChangeInfo:false,
        editTaskContent:'',
        dialogTableVisible:false,
        InputTask_id:'',
        TitleTask_id: '',
        showAddListTitle : 0,
        showList:1,
        showAddTitleTask: 0,
        inputList:"",
        titletask:'',
        list: [{
                    "id": 1,
                    "name": "group 1",
                    "user_id": 110,
                    "index": 1,
                    "created_at": "2022-08-03T11:14:27.000000Z",
                    "updated_at": "2022-08-03T11:14:27.000000Z",
                    "cards": [{
                            "id": 822,
                            "name": "task 1",
                            "description": null,
                            "status": null,
                            "directory_id": 649,
                            "index": 0,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T11:14:41.000000Z",
                            "updated_at": "2022-08-03T11:14:43.000000Z",
                            "labels": []
                        },
                        {
                            "id": 823,
                            "name": "task 2",
                            "description": null,
                            "status": null,
                            "directory_id": 649,
                            "index": 1,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:35.000000Z",
                            "updated_at": "2022-08-03T12:22:35.000000Z",
                            "labels": []
                        },
                        {
                            "id": 824,
                            "name": "task 3",
                            "description": null,
                            "status": null,
                            "directory_id": 649,
                            "index": 2,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:37.000000Z",
                            "updated_at": "2022-08-03T12:22:37.000000Z",
                            "labels": []
                        },
                        {
                            "id": 825,
                            "name": "task 4",
                            "description": null,
                            "status": null,
                            "directory_id": 649,
                            "index": 3,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:39.000000Z",
                            "updated_at": "2022-08-03T12:22:39.000000Z",
                            "labels": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "group 2",
                    "user_id": 110,
                    "index": 1,
                    "created_at": "2022-08-03T11:14:29.000000Z",
                    "updated_at": "2022-08-03T11:14:29.000000Z",
                    "cards": [{
                            "id": 821,
                            "name": "task 5",
                            "description": null,
                            "status": null,
                            "directory_id": 650,
                            "index": 0,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T11:14:39.000000Z",
                            "updated_at": "2022-08-03T11:14:43.000000Z",
                            "labels": []
                        },
                        {
                            "id": 826,
                            "name": "task 6 Một cầu thủ bóng đá (bóng đá) sinh ra Arg netine hiện đang chơi cho FC Barcelona, (cùng với Ronaldinho). Nghi ngờ trong tâm trí tôi sẽ là Pele / Maradona tiếp theo.",
                            "description": null,
                            "status": null,
                            "directory_id": 650,
                            "index": 1,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:43.000000Z",
                            "updated_at": "2022-08-03T12:22:43.000000Z",
                            "labels": []
                        },
                        {
                            "id": 827,
                            "name": "task 7",
                            "description": null,
                            "status": null,
                            "directory_id": 650,
                            "index": 2,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:45.000000Z",
                            "updated_at": "2022-08-03T12:22:45.000000Z",
                            "labels": []
                        },
                        {
                            "id": 828,
                            "name": "task 8",
                            "description": null,
                            "status": null,
                            "directory_id": 650,
                            "index": 3,
                            "deadline": null,
                            "user_id": 110,
                            "created_at": "2022-08-03T12:22:47.000000Z",
                            "updated_at": "2022-08-03T12:22:47.000000Z",
                            "labels": []
                        }
                    ]
                }
            ],

       } 
    },
    methods:{
      
      showInputTask(id){
          this.showList = 0
          this.InputTask_id = id
      },
      showAddTitle(id){
        this.TitleTask_id = id
        this.showAddTitleTask= 1
      },
      closeAddTitle(){
        this.showAddTitleTask= 0
      },
      handleAddTitleTask(){
        this.showAddTitleTask= 0
      },
      showAddList(){
        this.showAddListTitle = 1
      },
       closeAddList(){
        this.showAddListTitle = 0
      }
    },
    components: {
        draggable
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
      text-align: left;
          .container{
              display: -webkit-inline-box;
              max-width: 1883px;
              max-height: 92.8vh;
              height: 92.8vh;
              overflow: auto;
              .list{
                  margin-right: 30px;
                  height: max-content;
                  width: 380px;
                  max-height: 900px;
                  overflow: auto;
                  padding: 14px 5px;
                  background-color: #ebecf0;;
                  border-radius: 5px;
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
                      text-align: center;
                  }
                  .more:hover{
                      background-color: #091e4214;
                  }
                  .list__task__content{
                    width: 100%;
                    min-height: 60px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    border-bottom:1px solid #ccc ;
                    line-height: 60px;
                    margin: 15px 0;
                    text-align: left;
                    .list__task__content__text{
                      position: relative;
                      padding-left: 14px;
                      .list__task__content__edit{
                        position: absolute;
                        top:0;
                        right: 0;
                        width: 30px;
                        height: 30px;
                        background-color: #ccc;
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
                  .addTask{
                    width: 100%;
                    min-height: 60px;
                    line-height: 60px;
                    margin: 10px 0;
                    text-align: left;
                    .addTaskText{
                      padding-left: 14px;
                    }
                  }
                  .addTask:hover{
                    background-color: #091e4214;
                    border-radius: 5px;
                    border-bottom:1px solid #ccc ;
                    
                  }
                  .titletask{
                    text-align: left;
                    .close__add__titleTask{
                      font-size: 25px;
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
  .addListTask{
    width: 380px;
    background-color: #ebecf0; opacity: 0.7;
    height: 70px;
    line-height: 35px;
    border-radius: 5px;
    h3{
      padding: 0 10px;
    }
  }
  .formAddList{
    padding: 5px;
    background-color: #ffffff;
    height: max-content;
    border-radius: 5px;
    input{
      margin-bottom: 10px;
    }
    .close__add__List{
      font-size: 25px;
    }
  }
  .list_group{
    margin-top: 30px;
  }

  
</style>
