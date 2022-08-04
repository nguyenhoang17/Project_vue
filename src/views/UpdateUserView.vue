<template>
  <div class="container">
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
</template>

<script>
export default {
  name: 'UpdateUserView',
  data () {
      return {
        circleUrl: "https://i.pinimg.com/originals/29/50/31/2950311cf38601374b17b1561ed5163c.jpg",
        labelPosition: 'left'
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
</style>
