<template>
    <div>
        <div class="header">
            <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="logo">
                        <img width="97%" src="../assets/images/logo.png" alt=""/>
                    </div>
                    <div class="block">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                               <el-avatar :size="50" :src="circleUrl"></el-avatar>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><div @click="openModalProfile()">Thông tin tài khoản</div></el-dropdown-item>
                                <el-dropdown-item><div @click="redirect('me')">Đổi thông tin tài khoản</div></el-dropdown-item>
                                <el-dropdown-item divided><div @click="handleLogout()">Đăng xuất</div></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
        </div>
      <div>
        <el-dialog
            title="Thông tin tài khoản"
            :visible.sync="dialogProfile"
            width="20%">
          <div class="inputWarp">
            <p><span class="info">Họ tên: </span>{{info_name}}</p>
            <p><span class="info">Email: </span>{{info_email}}</p>
            <p><span class="info">Số điện thoại: </span>{{ìnfo_phone}}</p>
          </div>
        </el-dialog>

      </div>
        <router-view/>
    </div>
</template>
<script>
import { mapMutations, mapState} from 'vuex'
import api from '@/api';
import _ from "lodash";
export default {
    
  name: 'AdminLayout',
  data () {
      return {
        circleUrl: "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet-700x695.jpg",
        sizeList: ["large", "medium", "small"],
        dialogProfile:false,
        info_name:"",
        info_email:"",
        ìnfo_phone:"",
      }
    },
  mounted() {
    this.getAuthUser();
  },
    methods:{
        ...mapState('auth', [
            'authUser'
        ]),
      ...mapMutations('auth', ['updateAccessToken', 'updateLoginStatus', 'updateAuthUser']),
      getAuthUser() {
        api.getAuthUser().then((res) => {
          this.updateAuthUser(_.get(res, 'data'))
          this.info_name = _.get(res, 'data.name', '')
          this.info_email = _.get(res, 'data.email', '')
          this.ìnfo_phone = _.get(res, 'data.phone', '')
        })
      },
      openModalProfile(){
        this.dialogProfile=true;
      },
        redirect(value){
            this.$router.push({ path:`/${value}`})
        },
        handleLogout() {
            api.logout().then(()=>{
              this.updateAccessToken("");
              this.updateLoginStatus(false);
          this.$message({
            type: 'success',
            message: 'Đăng xuất thành công thành công',
          })
          this.$router.push({ name: "login" });
        })
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
  #hello,
  .el-icon-arrow-down {
    font-size: 18px;
  }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .grid-content{
        height: 60px;
        background-color:#EEE9E9;
        position: relative;
    }
    .logo{
        width: 100px;
        height: 60px;
        border-radius: 20px;
        margin-left: 1%;
        img{
            border-radius: 10px;
            height: 60px;
        }
    }
    .block{
        float: right;
        position: absolute;
        top: 4px;
        right: 20px;
        
    }
    .info{
      font-weight: bold;
    }
    .inputWarp{
      p{
        text-align: left;
        font-size: 17px;
        margin-bottom: 10px;
      }
    }
</style>