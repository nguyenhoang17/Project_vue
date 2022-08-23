<template>
  <div class="container">
    <div>
      <h2>Đổi thông tin cá nhân</h2>
      <div class="infor">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img id="img_user" :src="circleUrl" alt="">
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">

            <el-form :label-position="labelPosition" label-width="100px" >
              <el-form-item label="Họ và tên">
                <el-input placeholder="Nhập họ tên"></el-input>
              </el-form-item>
              <el-form-item label="Số điện thoại">
                <el-input placeholder="Nhập số điện thoại"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input placeholder="Nhập email"></el-input>
              </el-form-item>
              <el-form-item label="Địa chỉ">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="Nhập địa chỉ">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="redirect('')">Huỷ</el-button>
                <el-button type="primary" @click="redirect('')">Lưu</el-button>
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
              <spann class="error">{{errorPassConfirm}}</spann>
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
export default {

  name: 'UpdateUserView',
  data () {
      return {
        circleUrl: "https://i.pinimg.com/originals/29/50/31/2950311cf38601374b17b1561ed5163c.jpg",
        labelPosition: 'left',
        newPass:'',
        errorNewPass:'',
        newPassConfirm:'',
        errorPassConfirm:""
      }
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
        this.errorNewPass="";
        this.errorPassConfirm=""
      }
    }
}
</script>
<style lang="scss" scoped>
    .container{
       .infor{
        width: 80%;
        margin: 80px auto 0 auto;
       }
       #img_user{
        width: 400px;
        height: 500px;
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
