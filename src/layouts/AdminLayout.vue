<template>
    <div>
        <div class="header">
            <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="logo">
                        <img width="97%" src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" alt=""/>
                    </div>
                    <div class="block">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                               <span id="hello">Xin chào</span> <el-avatar :size="50" :src="circleUrl"></el-avatar>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><div @click="redirect('user')">Thông tin tài khoản</div></el-dropdown-item>
                                <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
                                <el-dropdown-item>Cấu hình</el-dropdown-item>
                                <el-dropdown-item divided><div @click="redirect('login')">Đăng xuất</div></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
        </div>
        <router-view/>
    </div>
</template>
<script>
export default {
  name: 'AdminLayout',
  data () {
      return {
        circleUrl: "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet-700x695.jpg",
        sizeList: ["large", "medium", "small"]
      }
    },
    methods:{
        redirect(value){
            this.$router.push({ path:`/${value}`})
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
</style>