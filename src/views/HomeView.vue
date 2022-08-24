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
                            <div class="grid-content bg-purple-dark list__task__content__text" @click="dialogTableVisible = true">
                              <span>{{listItem.title}}</span>
                              <span class="list__task__content__edit">
                                <el-dropdown>
                                  <span class="el-dropdown-link">
                                    <i class="el-icon-edit"></i>
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><div @click="openDialogUpdateCard(listItem)">Sửa thẻ</div></el-dropdown-item>
                                    <el-dropdown-item><div @click="handleDeleteCard(listItem.id)">Xoá thẻ</div></el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>

                              </span>
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
                        v-model="titletask">
                      </el-input>
                      <span style="color: #ff0000; display: block; margin-bottom:20px;">{{errorTitletask}}</span>
                      <el-button @click="handlecreateCard(value.id, value.cards.length)" type="primary">Thêm thẻ</el-button> <span class="close__add__titleTask" @click="closeAddTitle()"><i class="el-icon-close"></i></span>
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

    <el-dialog
        :title="'Chỉnh sửa thẻ ' + titleCard"
        :visible.sync="dialogUpdateCard"
        width="30%"
        :before-close="handleClose">
      <el-row>
        <div class="input-warp" >
          <label>Tiêu đề
          </label>
          <el-input v-model="titleCardUpdate"></el-input>
          <div v-if="errorTitleCard !== '' " class="error">
            <span> {{ errorTitleCard }} </span>
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="input-warp" >
          <label>Mô tả
          </label>
          <el-input
              type="textarea"
              :rows="2"
              placeholder="Nhập mô tả"
              v-model="descriptionCard">
          </el-input>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdateCard = false">Huỷ</el-button>
    <el-button type="primary" @click="handleUpdateCard()">Cập nhật</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import api from "@/api";
import _ from "lodash";
export default {
    name: "HomeView",
    data(){
       return{
         dialogUpdateCard:false,
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
        errorTitletask:'',
        directories: [],
        titleCard:'',
         errorTitleCard:"",
         descriptionCard:'',
         id_card:'',
         titleCardUpdate:''

       } 
    },
  mounted() {
      this.getList()
  },
  methods:{
      //Thẻ
    handleDeleteCard(id){
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteCard(id).then(() => {
          this.resetForm()
          this.resetError()
          this.getList()
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa thẻ thành công'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Xoá sách thất bại',
          })
        })
      })
    },
    handleClose(){
      this.titleCardUpdate="";
      this.descriptionCard=""
    },
      handlecreateCard(directory_id, index){
        if(this.titletask.length===0){
          this.errorTitletask= 'Tên thẻ không được trống'
        }else{
          this.showAddTitleTask= 0
          let data ={
            title: this.titletask,
            index: index + 1,
            directory_id:directory_id
          }
          api.createCard(data, directory_id).then(()=>{
            this.resetForm()
            this.resetError()
            this.getList()
            this.$message({
              type: 'success',
              message: 'Thêm  thành công',
            })
          }).catch(()=>{
            this.$message({
              type: 'error',
              message: 'Thêm thẻ thất bại',
            })
          })
        }

      },
    handleUpdateCard(){
        if(this.titleCardUpdate.length===0){
          this.errorTitleCard = 'Tiêu đề thẻ không được để trống!'
        }else {
          let data ={
            title: this.titleCardUpdate,
            description: this.descriptionCard
          }
          api.updateCard(data, this.id_card).then(()=>{
            this.dialogUpdateCard=false
            this.getList()
            this.$message({
              type: 'success',
              message: 'Cập nhật thẻ thành công',
            })
          }).catch(error => {
            let errors = _.get(error.response, 'data.errors', {});
            let status = _.get(error, "response.status");
            if (status === 400) {
              if (Object.keys(errors).length > 0) {
                this.errorTitleCard = _.get(errors, 'title[0]', "")
              }
            } else {
              if (Object.keys(errors).length === 0) {
                this.$message.error({
                  type: 'error',
                  message: "Có lỗi xảy ra, vui lòng thử lại sau."
                })
              }
            }
          })
        }
    },
      //list
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
      showAddList(){
        this.showAddListTitle = 1
      },
       closeAddList(){
        this.showAddListTitle = 0
      },
    openDialogUpdateCard(listItem) {
      this.dialogUpdateCard= true;
      this.titleCardUpdate = listItem.title
      this.id_card = listItem.id
      this.titleCard = listItem.title
      if(listItem.description) {
        this.descriptionCard = listItem.description
      }
    },
    resetForm() {
      this.addList ="";
      this.InputTask_id='';
      this.TitleTask_id= '';
      this.updateList="";
      this.titletask="";
      this.titleCard="";
      this.titleCardUpdate=""
    },
    resetError(){
        this. errorAddList='';
        this.errorUpdateList="";
        this.errorTitletask="";
        this.errorTitleCard=""
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
  .input-warp {
    margin-bottom: 10px;
    text-align: left;
    label {
      font-weight: 600;
      color: #3f6079;;
      display: block;
      margin-bottom: 5px;
    }
  }
</style>
