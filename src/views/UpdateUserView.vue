<template>
  <div class="container">
    <div>
      <h2>Đổi thông tin cá nhân</h2>
      <div class="infor">
        <el-row>
          <el-col :span="12">
            <p>Ảnh</p>
            <div class="grid-content bg-purple" @click="onclickUploadAvatar()">
              <img v-if="avatar==='Đang cập nhật'" id="img_user" src="../assets/images/avatar-facebook-mac-dinh-nam.jpeg" alt="">
              <img v-else id="img_user" :src="'http://vuecourse.zent.edu.vn/storage/users/'+ avatar" alt="">
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">

            <el-form :label-position="labelPosition" label-width="100px" >
              <el-form-item label="Họ và tên">
                <el-input placeholder="Nhập họ tên" v-model="name"></el-input>
                <span style="color: red">{{errorName}}</span>
              </el-form-item>
              <input name="fileImport" ref="file" type="file" id="inputUploadAvatar"
                     style="visibility: hidden; height: 0; display: none"
                     class="" @change="onChangeFile"/>
              <el-form-item>
                <el-button @click="redirect('')">Huỷ</el-button>
                <el-button type="primary" @click="handleChangeInfo()">Lưu</el-button>
              </el-form-item>
            </el-form>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <div class="changepass">
      <h2>Thay đổi mật khẩu</h2>
      <el-col :span="12">
        <div><h2>Nhập mật khẩu và mật khẩu xác nhận</h2></div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <el-form :label-position="labelPosition" label-width="100px" >
          <div style="text-align: left">
            <el-form-item label="Mật khẩu mới">
              <el-input placeholder="Nhập mật khẩu" v-model="newPass" show-password></el-input>
              <span class="error">{{errorNewPass}}</span>
            </el-form-item>
          </div>
          <div style="text-align: left">
            <el-form-item label="Xác nhận">
              <el-input placeholder="Nhập mật khẩu xác nhận" v-model="newPassConfirm" show-password></el-input>
              <span class="error">{{errorPassConfirm}}</span>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button @click="redirect('')">Huỷ</el-button>
            <el-button type="primary" @click="handleChangePass()">Thay đổi</el-button>
          </el-form-item>
        </el-form>
      </div>
      </el-col>
    </div>

  </div>
</template>

<script>
import api from '@/api';
import {mapActions,mapState, mapMutations} from "vuex";
import _ from "lodash";
export default {

  name: 'UpdateUserView',
  data () {
      return {
        avatar:'',
        labelPosition: 'left',
        newPass:'',
        errorNewPass:'',
        newPassConfirm:'',
        errorPassConfirm:"",
        file:'',
        name:"",
        errorName:''

      }
    },
  created() {
    this.getAuthUser();
  },
  computed: {
    ...mapState('auth', [
      'authUser'
    ])
  },
  methods:{
    ...mapMutations('auth', [
      'updateAuthUser'
    ]),
    ...mapActions('auth', ['logout']),
      redirect(value){
        this.resetForm();
        this.resetError();
        this.$router.push({ path:`/${value}`})
      },
    onclickUploadAvatar(){
      this.$refs.file.value = null;
      document.getElementById('inputUploadAvatar').click();
    },
    onChangeFile() {
      this.file = this.$refs.file.files[0];
      const data = new FormData();
      data.append('avatar', this.file);
      data.append('name', this.name)
      api.changInfo(data).then(()=>{
        this.resetForm()
        this.resetError()
        this.getAuthUser()
        this.$message({
          type: 'success',
          message: 'Cập nhật thành công',
        })
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: 'Cập nhật thất bại',
        })
        this.resetForm()
        this.resetError()
        this.getAuthUser()
      })

    },
    getAuthUser() {
      api.getAuthUser().then((res) => {
        this.updateAuthUser(_.get(res, 'data'))
        this.name = _.get(res, 'data.name', '')
        this.avatar = _.get(res, 'data.avatar', '')?_.get(res, 'data.avatar', ''):'Đang cập nhật'
      })
    },
    handleChangePass(){
      if(this.validatePass()){
        let data ={
          password: this.newPass,
          password_confirmation: this.newPassConfirm
          }
        api.changePass(data).then(()=>{
          this.logout();
          this.$message({
            type: "success",
            message: "Cập nhật thành công"
          })
        }).catch(()=>{
          this.$message({
            type: "error",
            message: "Cập nhật thất bại"
          })
        })
      }
    },
    handleChangeInfo(){
      if(this.name.length ===0 || this.name.length < 2 ){
        this.errorName = "Tên phải lớn hơn hoặc bằng 2 ký tự"
      }else{
        let data = new FormData();
        data.append('name', this.name)
        if(this.file.length !== 0){
          data.append('avatar', this.file)
          console.log(this.file)
        }
        api.changInfo(data).then(()=>{
          this.resetForm()
          this.resetError()
          this.getAuthUser()
          this.$message({
            type: 'success',
            message: 'Cập nhật thành công',
          })
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Cập nhật thất bại',
          })
          this.resetForm()
          this.resetError()
          this.getAuthUser()
        })
      }

    },
    validatePass(){
      let error = false;
      if(this.newPass.length===0){
        this.errorNewPass="Mật khẩu không được để trống!"
        error = true;
      }
      if(this.newPassConfirm.length===0){
        this.errorPassConfirm="Mật khẩu xác nhận không được để trống!"
        error = true;
      }
      if(this.newPassConfirm !== this.newPass){
        this.errorPassConfirm="Mật khẩu xác nhận phải giống mật khẩu!"
        error = true;
      }
      return !error;
    },
    resetForm(){
      this.newPass='';
      this.newPassConfirm='';
    },
    resetError() {
      this.errorName=""
      this.errorNewPass="";
      this.errorPassConfirm=""
    }
  },
  watch:{
    newPass(){
      this.errorNewPass = ""
    },
    newPassConfirm(){
      this.errorPassConfirm = ""
    },
    name(){
      this.errorName =""
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-file-upload {
  border-radius: 5px;
  color: #ffffff;
  background-color: #409EFF;
  display: inline-block;
  padding: 0px 12px;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
    .container{
       .infor{
        width: 80%;
        margin: 80px auto 0 auto;
       }
       #img_user{
        width: 400px;
        height: 400px;
        border-radius: 50%;
         border: 1px solid #ccc;
       }
    }
    .changepass{
      width: 80%;
      margin: 80px auto 0 auto;
    }
    .error{
      color: red;
    }
</style>
