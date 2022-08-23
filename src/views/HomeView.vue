<template>
  <div class="home">
    <div class="container1">
      <draggable class="container">
             <div v-for="(value, index) in directories" :key="index" class="list">
                  <el-row>
                      <el-col :span="21">
                          <div class="grid-content bg-purple">
                              <h2 class="listTitle">{{value.title}}</h2>
                          </div>
                      </el-col>
                      <el-col :span="3"><div class="grid-content bg-purple-light" style="margin-top:-2px">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="el-icon-more more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><div @click="openDialogEditDerectories(value)">Sửa danh sách</div></el-dropdown-item>
                            <el-dropdown-item><div @click="handleDeleteList(value.id)">Xoá danh sách</div></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div></el-col>
                  </el-row>
                  <draggable class="list_group" :directories="value.cards" group="people" >
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

      </draggable>
      <div>
        <div class="addListTask" v-if="showAddListTitle === 0" @click="showAddList()">
          <h3>
            <i class="el-icon-plus"></i>
            Thêm danh sách khác
          </h3>
        </div>
        <div class="formAddList" v-else>
          <el-input placeholder="Nhập tiêu để danh sách..." style="margin-bottom: 10px;" v-model="addList"></el-input>
          <div style="color: red">{{errorAddList}}</div>

          <el-button type="primary" @click="handleCreateList()">Thêm danh sách</el-button> <span class="close__add__List" @click="closeAddList()"><i class="el-icon-close"></i></span>
        </div>
      </div>
    </div>
    <el-dialog
        :title="'Cập nhật ' + updateList"
        :visible.sync="dialogEditDerectories"
        width="30%">
      <div>
        <el-input class="inputTask"  placeholder="" v-model="updateList"></el-input>
        <span class="error">{{errorUpdateList}}</span></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEditDerectories = false">Huỷ</el-button>
    <el-button type="primary" @click="handleUpdateDirectories()">Cập nhật</el-button>
  </span>
    </el-dialog>
    <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
  aaaaaaaaaaaaaaaaa
  </el-dialog>

<!--    <el-dialog title="Shipping address" :visible.sync="dialogProfile">-->

<!--    </el-dialog>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import api from "@/api";
export default {
    name: "HomeView",
    data(){
       return{
        dialogEditDerectories: false,
        addList:"",
        errorAddList:'',
        dialogProfile:false,
        dialogTableVisible:false,
        InputTask_id:'',
        TitleTask_id: '',
        showAddListTitle : 0,
        showList:1,
        showAddTitleTask: 0,
        updateList:"",
        errorUpdateList:"",
        titletask:'',
        directories: [{
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
  mounted() {
      this.getList()
  },
  methods:{
      getList(){
        api.getList().then((res)=> {
          this.directories = res.data.data
        })
      },
      handleCreateList(){
        if(this.addList.length===0){
          this.errorAddList='Tên danh sach không được để trống';
        }else{
          this.showAddListTitle=0
          let data= {
            title: this.addList,
            index: this.directories.length+1
          }
          api.createList(data).then(()=>{
            this.resetForm()
            this.resetError()
            this.getList()
            this.$message({
              type: 'success',
              message: 'Thêm dánh sách thành công',
            })
          }).catch(()=>{
            this.$message({
              type: 'error',
              message: 'Thêm dánh sách thất bại',
            })
          })
        }
      },
    handleDeleteList(id){
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteList(id).then(() => {
          this.resetForm()
          this.resetError()
          this.getList()
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa danh sách thành công'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Xoá sách thất bại',
          })
        })
      })
    },
    handleUpdateDirectories(){
        if(this.updateList.length===0){
          this.errorUpdateList = 'Tên danh sách không được trống !'
        }else{
          let data ={
            title: this.updateList
          }
          api.updateList(data, this.InputTask_id).then(()=>{
            this.dialogEditDerectories= false;
            this.resetForm()
            this.resetError()
            this.showList = 1
            this.getList()
            this.$message({
              showClose: true,
              type: 'success',
              message: 'Cập nhật danh sách thành công'
            });
          }).catch(()=>{
            this.$message({
              type: 'error',
              message: 'Cập nhật sách thất bại',
            })
          })
        }
    },
    openDialogEditDerectories(value){
      this.resetForm();
      this.resetError()
      this.dialogEditDerectories=true
      this.showList = 0
      this.InputTask_id = value.id
      this.updateList = value.title
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
      },
    resetForm() {
      this.addList ="";
      this.InputTask_id='';
      this.TitleTask_id= '';
      this.updateList="";
      this.titletask="";
    },
    resetError(){
        this. errorAddList='';
        this.errorUpdateList="";
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
      max-width: 1883px;
      max-height: 91.8vh;
      height: 91.8vh;
      overflow: auto;
      display: inline-flex;
      text-align: left;
          .container{
              display: -webkit-inline-box;
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
    }

    .container1::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
    }

    .container1::-webkit-scrollbar
    {
      width: 10px;
    }

    .container1::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-image: -webkit-gradient(linear,
          left bottom,
          left top,
          color-stop(0.44, rgb(122,153,217)),
          color-stop(0.72, rgb(73,125,189)),
          color-stop(0.86, rgb(28,58,148)));
    }

  }
  .addListTask{
    width: 380px;
    background-color: #ebecf0; opacity: 0.7;
    height: 70px;
    line-height: 70px;
    border-radius: 5px;
    h3{
      margin: 0px;
      padding: 0 10px;
    }
  }
  .formAddList{
    width: 380px;
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
  .error{
    text-align: left;
    color: red;
  }

  
</style>
