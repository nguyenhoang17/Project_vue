<template>
  <div class="home">
    <div class="container1">
      <draggable class="container">
        <div v-for="(value, index) in directories" :key="index" class="list">
          <el-row>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <h2 class="listTitle">{{ value.title }}</h2>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-light" style="margin-top:-2px">
                <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="el-icon-more more"></i>
                          </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div @click="openDialogEditDerectories(value)">Sửa danh sách</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="handleDeleteList(value.id)">Xoá danh sách</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
          <!--thẻ-->
          <draggable class="list_group" :directories="value.cards" group="people">
            <div class="list__task__content" v-for="listItem in value.cards" :key="listItem.index">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark list__task__content__text"
                       @click="openModalDetailCard(listItem.id)">
                      <h3>{{ listItem.title }}</h3>
                      <span class="list__task__content__edit">
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          <i class="el-icon-edit"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item><div
                              @click="openModalDetailCard(listItem.id)">Xem chi tiết thẻ</div></el-dropdown-item>
                          <el-dropdown-item><div
                              @click="openDialogUpdateCard(listItem)">Sửa thẻ</div></el-dropdown-item>
                          <el-dropdown-item><div
                              @click="handleDeleteCard(listItem.id)">Xoá thẻ</div></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                    <p>
                      <span>
                         <i class="el-icon-time">
                           <span v-if="listItem.deadline">
                            {{listItem.deadline}}
                           </span>
                           <span v-else> Đang cập nhật</span>
                         </i>
                      </span>
                     <span></span>
                    </p>
                  </div>

                </el-col>
              </el-row>
            </div>
          </draggable>
          <div>
            <div class="titletask" v-if="showAddTitleTask===1 && TitleTask_id === value.id">
              <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="Nhập tiêu đề cho thẻ này"
                  v-model="titletask">
              </el-input>
              <span style="color: #ff0000; display: block; margin-bottom:20px;">{{ errorTitletask }}</span>
              <el-button @click="handlecreateCard(value.id, value.cards.length)" type="primary">Thêm thẻ</el-button>
              <span class="close__add__titleTask" @click="closeAddTitle()"><i class="el-icon-close"></i></span>
            </div>
            <div v-else class="addTask">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark addTaskText" @click="showAddTitle(value.id)"><i
                      class="el-icon-plus"></i> Thêm thẻ
                  </div>
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
          <div style="color: red">{{ errorAddList }}</div>

          <el-button type="primary" @click="handleCreateList()">Thêm danh sách</el-button>
          <span class="close__add__List" @click="closeAddList()"><i class="el-icon-close"></i></span>
        </div>
      </div>
    </div>
    <el-dialog
        :title="'Cập nhật ' + updateList"
        :visible.sync="dialogEditDerectories"
        width="30%">
      <div>
        <el-input class="inputTask" placeholder="" v-model="updateList"></el-input>
        <span class="error">{{ errorUpdateList }}</span></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEditDerectories = false">Huỷ</el-button>
    <el-button type="primary" @click="handleUpdateDirectories()">Cập nhật</el-button>
  </span>
    </el-dialog>
    <!--chỉnh sửa thẻ-->
    <el-dialog
        :title="'Chỉnh sửa thẻ ' + titleCard"
        :visible.sync="dialogUpdateCard"
        width="30%"
        :before-close="handleClose">
      <el-row>
        <div class="input-warp">
          <label>Tiêu đề
          </label>
          <el-input v-model="titleCardUpdate"></el-input>
          <div v-if="errorTitleCard !== '' " class="error">
            <span> {{ errorTitleCard }} </span>
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="input-warp">
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
    <!--Modal chi tiết thẻ-->
    <el-dialog :visible.sync="dialogDetailCard"
               :title="'Chi tiết thẻ '+ detailTitleCard">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="icon_detail_card icon">
                    <i class="el-icon-bank-card"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content bg-purple-light" style="text-align: left">
                  <div>
                    <h2 v-if="updateTitleCard===false" @click="updateTitleCard=true">{{ detailTitleCard }}</h2>
                    <div v-else>
                      <el-input placeholder="Nhập tiêu đề" v-model="titleCardUpdate" @blur="updateTitleCard=false"
                                @keydown.enter.native="handleUpdateCard(id_card)"></el-input>
                    </div>
                    <p>Trong danh sách "{{ directory }}"</p>

                  </div>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <p></p>
              </div>
            </el-col>
            <el-col :span="23">
              <div class="grid-content bg-purple " style="margin-left: 11px">
                <div class="container__deadline">
                  <p><b>Ngày hết hạn: </b></p>
                  <el-checkbox @change="updateStatusCard(id_card)" v-model="statusCard">
                    {{ deadline_dt }}
                  </el-checkbox>
                  <span v-if="statusCard ===true " class="success">Đã hoàn thành</span><span v-else class="lastDeadline">Quá hạn</span>
                </div>
              </div>
            </el-col>

          </el-row>
          <el-row>
            <div class="grid-content bg-purple-light">
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="icon_detail_card icon">
                    <i class="el-icon-s-operation"></i>
                  </div>

                </div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content bg-purple-light icon" style="margin-left: 11px">
                  <el-row>
                    <h3>Mô tả</h3>
                    <div>
                      <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="Thêm mô tả chi tết hơn..."
                          v-model="descriptionCard"
                          @keydown.enter.native="updateDescription(id_card)"
                      >
                      </el-input>
                    </div>
                  </el-row>

                </div>
              </el-col>
            </div>
          </el-row>
          <div class="grid-content bg-purple-light" v-for="itemWork in listWork" :key="itemWork.id">
            <el-row>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="icon_detail_card icon">
                    <i class="el-icon-finished"></i>
                  </div>

                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light icon" style="margin-left: 11px">
                  <div v-if="openUpdateWork!==false && work_id === itemWork.id" style="margin-top: 10px">
                    <el-input placeholder="Nhập công việc" v-model="updateWork" @blur="openUpdateWork=false"
                              @keydown.enter.native="handleupdateWork()"></el-input>
                    <span>{{ errorUpdateWork }}</span>
                  </div>
                  <h3 v-else @click="openEditWork(itemWork)">{{ itemWork.title }}</h3>
                  <div>
                  </div>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple-light">
                  <h3>
                    <span class="icon_delete" @click="handleDeleteWork(itemWork.id)"><i
                        class="el-icon-delete"></i></span>
                  </h3>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <div v-for="check_list_child in itemWork.check_list_childs" :key="check_list_child.id">
                <el-col :span="19">
                  <div class="grid-content bg-purple-light icon workChildren">
                    <div v-if="openUpdateWorkChilInput===true && workChil_id === check_list_child.id">
                      <div>
                        <el-input @blur="openUpdateWorkChilInput= false"
                                  @keydown.enter.native="handleUpdateWorkChill()" placeholder="Nhập tên công việc con"
                                  v-model="updateWorkChil"></el-input>
                      </div>
                    </div>
                    <span v-else>
                       <span @click="updateStatusWorkChil(check_list_child)">
                         <i :style="{color: success}" v-if="check_list_child.status === 1" class="el-icon-success"></i>
                         <i v-else class="el-icon-question"></i>
                         <span v-if="check_list_child.status === 1" :style="{color: success}">{{ check_list_child.title }}</span><span v-else>{{ check_list_child.title }}</span>
                       </span>
                    </span>
                    <span style="padding-left: 20px" class="error"
                          v-if='openUpdateWorkChilInput===true && workChil_id === check_list_child.id && errorUpdateWorkChill!==""'>{{ errorUpdateWorkChill }}</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple-light">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <div @click="openUpdateWorkChil(check_list_child)">Sửa</div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div @click="handleDeleteWorkChil(check_list_child.id)">Xoá</div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-col>
              </div>
            </el-row>
            <el-row>
              <div style="text-align: left">
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <div class="icon_detail_card icon">
                    </div>
                  </div>
                </el-col>
                <div style="margin-top: 20px">
                  <el-col :span="19">
                    <div class="grid-content bg-purple">
                      <div v-if="addWorkChil == true && work_id === itemWork.id">
                        <el-input placeholder="Nhập công việc con" v-model="workChil" @blur="addWorkChil = false;"
                                  @keydown.enter.native="handleAddWorkChil()"></el-input>
                        <span class="error">{{ errorWorkChil }}</span>
                      </div>
                      <el-button class="btnWorkChild" v-else type="info" plain @click="openAddWorkChil(itemWork.id)">Thêm mục</el-button>
                    </div>
                  </el-col>
                </div>
              </div>
            </el-row>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="right_container">
                  <p>Thêm vào thẻ</p>
                  <button class="button_add"><span><i class="el-icon-price-tag"></i></span> Nhãn</button>
                  <button class="button_add" @click="openModalAddCheckList()"><span><i
                      class="el-icon-finished"></i></span> Việc cần làm
                  </button>
                  <button class="button_add" @click="openSelectDeadline=true" v-if="openSelectDeadline==false">
                    <div>
                      <span><i class="el-icon-time"></i></span> Ngày
                    </div>
                  </button>
                  <button class="button_add" v-else>
                    <div>
                      <el-date-picker
                          class="deadline"
                          v-model="deadline"
                          type="datetime"
                          placeholder="Select date and time"
                          @blur="handleUpdateDeadline(id_card)">
                      </el-date-picker>
                    </div>
                  </button>
                  <button class="button_add"><span><i class="el-icon-paperclip"></i></span> Đính kèm</button>
                </div>

              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <!--Modal thêm công việc-->

    <el-dialog title="Thêm công việc" :visible.sync="modalCheckList" width="30%">
      <el-input placeholder="Nhập công việc" v-model="checkList"></el-input>
      <span class="error">{{ errorCheckList }}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modalCheckList = false">Huỷ</el-button>
    <el-button type="primary" @click="handleAddCheckList()">Tạo</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import api from "@/api";
import _ from "lodash";
import moment from "moment";

export default {
  name: "HomeView",
  data() {
    return {
      success: "#67C23A",
      checkTrue:true,
      statusCard: false,
      openSelectDeadline: false,
      errorDeadline: '',
      dialogDeadline: false,
      deadline_dt: '',
      deadline: '',
      errorUpdateWorkChill: '',
      checked: false,
      openUpdateWorkChilInput: false,
      workChil_id: '',
      addWorkChil: false,
      updateWorkChil: '',
      workChil: '',
      errorWorkChil: "",
      work_id: '',
      openUpdateWork: false,
      updateWork: '',
      errorUpdateWork: '',
      listWork: [],
      errorCheckList: '',
      checkList: '',
      modalCheckList: false,
      enableDescription: false,
      detailTitleCard: '',
      dialogUpdateCard: false,
      dialogEditDerectories: false,
      addList: "",
      errorAddList: '',
      dialogProfile: false,
      dialogDetailCard: false,
      InputTask_id: '',
      TitleTask_id: '',
      showAddListTitle: 0,
      showList: 1,
      showAddTitleTask: 0,
      updateList: "",
      errorUpdateList: "",
      titletask: '',
      errorTitletask: '',
      directories: [],
      titleCard: '',
      errorTitleCard: "",
      descriptionCard: '',
      id_card: '',
      titleCardUpdate: '',
      updateTitleCard: false,
      directory: ''

    }
  },
  mounted() {
    this.getList();
    this.deadline = moment();
  },
  methods: {
    //Thẻ
    updateStatusCard() {

      let data = {
        status: this.statusCard ? 1 : 0
      }
      api.updateStatusCard(data, this.id_card).then(() => {
        // this.detailCard(this.id_card)
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Cập nhật trạng thái thẻ thành công'
        });
      }).catch(() => {

      })
    },
    handleUpdateDeadline() {
      if (this.deadline) {
        let data = {
          deadline: moment(this.deadline).format('YYYY-MM-DD H:mm:ss')
        }
        api.updateDeadline(data, this.id_card).then(() => {
          this.openSelectDeadline = false;
          this.detailCard(this.id_card)
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Cập nhật thời gian hết hạn thành công'
          });
        })
      } else {
        this.openSelectDeadline = false;
        this.detailCard(this.id_card)
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Ngày hết hạn chưa được cập nhật. Vui lòng chọn thời gian cho thẻ để cập nhật'
        });
      }
    },
    updateStatusWorkChil(check_list_child) {
      let data = {
        status: check_list_child.status ? 0 : 1
      }
      api.updateStatusChil(data, check_list_child.id).then(() => {
        this.detailCard(this.id_card)
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Cập nhật trạng thái công việc con thành công'
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Cập nhật trạng thái công việc con không thành công'
        });
      })
    },
    handleUpdateWorkChill() {
      if (this.updateWorkChil.length === 0) {
        this.errorUpdateWorkChill = "Tiêu đề không được trống!"
      } else {
        let data = {
          title: this.updateWorkChil
        }
        api.updateWorkChil(data, this.workChil_id).then(() => {
          this.openUpdateWorkChilInput = false;
          this.detailCard(this.id_card)
          this.resetForm()
          this.resetError()
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Cập nhật công việc con thành công'
          });
        })
      }
    },
    openUpdateWorkChil(check_list_child) {
      this.errorUpdateWorkChill = '';
      this.openUpdateWorkChilInput = true;
      this.updateWorkChil = check_list_child.title
      this.workChil_id = check_list_child.id
    },
    handleDeleteWorkChil(id) {
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteWorkChil(id).then(() => {
          this.resetForm()
          this.resetError()
          this.detailCard(this.id_card)
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa công việc thành công'
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá công việc thất bại',
          })
        })
      })
    },
    handleAddWorkChil() {
      if (this.workChil.length == 0) {
        this.errorWorkChil = 'Tên công việc con không được trống!'
      } else {
        let data = {
          title: this.workChil,
          check_list_id: this.work_id
        }
        api.createWorkChil(data).then(() => {
          this.addWorkChil = false;
          this.detailCard(this.id_card)
          this.resetError()
          this.resetForm()
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Tạo công việc con thành công'
          });
        })
      }
    },
    openAddWorkChil(id) {
      this.addWorkChil = true;
      this.work_id = id

    },
    handleDeleteWork(id) {
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteWork(id).then(() => {
          this.resetForm()
          this.resetError()
          this.detailCard(this.id_card)
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa công việc thành công'
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá công việc thất bại',
          })
        })
      })
    },
    handleupdateWork() {
      let data = {
        title: this.updateWork,
      }
      api.updateWork(data, this.work_id).then(() => {
        this.detailCard(this.id_card)
        this.openUpdateWork = false
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Cập nhật công việc thẻ thành công'
        });
      })
    },
    openEditWork(itemWork) {
      this.openUpdateWork = true
      this.work_id = itemWork.id
      this.updateWork = itemWork.title
    },
    handleAddCheckList() {
      if (this.checkList.length === 0) {
        this.errorCheckList = 'Tên công việc không được trống'
      } else {
        let data = {
          title: this.checkList,
          card_id: this.id_card
        }
        api.createCheckList(data).then(() => {
          this.detailCard(this.id_card)
          this.resetForm()
          this.resetError()
          this.modalCheckList = false
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Tạo công việc thành công'
          });
        }).catch(error => {
          let errors = _.get(error.response, 'data.errors', {});
          let status = _.get(error, "response.status");
          if (status === 400) {
            if (Object.keys(errors).length > 0) {
              this.errorCheckList = _.get(errors, 'title[0]', "")
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
    openModalAddCheckList() {
      this.modalCheckList = true
      this.resetError()
      this.resetForm()
    },
    updateDescription() {
      let data = {
        title: this.detailTitleCard,
        description: this.descriptionCard
      }
      api.updateCard(data, this.id_card).then(() => {
        this.detailCard(this.id_card)
        this.enableDescription = false
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Cập nhật mô tả thẻ thành công'
        });
      }).catch(() => {
        this.detailCard(this.id_card)
        this.enableDescription = false
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Cập nhật mô tả thẻ thất bại'
        });
      })
    },
    openModalDetailCard(id) {
      this.resetForm()
      this.resetError()
      this.dialogDetailCard = true;
      this.enableDescription = false
      this.detailCard(id)
    },
    detailCard(id) {
      api.detailCard(id).then((res) => {
        this.detailTitleCard = _.get(res, 'data.data.title');
        this.statusCard = _.get(res, 'data.data.status') ? true : false
        this.titleCardUpdate = _.get(res, 'data.data.title');
        this.directory = _.get(res, 'data.data.directory.title');
        this.id_card = _.get(res, 'data.data.id');
        this.descriptionCard = _.get(res, 'data.data.description');
        this.listWork = _.get(res, 'data.data.check_lists');
        this.deadline_dt = _.get(res, 'data.data.deadline') ? _.get(res, 'data.data.deadline') : "Đang cập nhật";
        Object.entries(this.listWork).forEach(([key, value]) => {
          let check_list_childs={
            key: key,
            value : value.check_list_childs
          }
          Object.entries(check_list_childs.value).forEach(([key, value]) => {
            console.log(key, value)
          })
        })
      })

    },
    handleDeleteCard(id) {
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
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá thẻ thất bại',
          })
        })
      })
    },
    handleClose() {
      this.titleCardUpdate = "";
      this.descriptionCard = ""
    },
    handlecreateCard(directory_id, index) {
      if (this.titletask.length === 0) {
        this.errorTitletask = 'Tên thẻ không được trống'
      } else {
        this.showAddTitleTask = 0
        let data = {
          title: this.titletask,
          index: index + 1,
          directory_id: directory_id
        }
        api.createCard(data, directory_id).then(() => {
          this.resetForm()
          this.resetError()
          this.getList()
          this.$message({
            type: 'success',
            message: 'Thêm thẻ thành công',
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Thêm thẻ thất bại',
          })
        })
      }

    },
    handleUpdateCard() {
      if (this.titleCardUpdate.length === 0) {
        this.errorTitleCard = 'Tiêu đề thẻ không được để trống!'
      } else {
        let data = {
          title: this.titleCardUpdate,
          description: this.descriptionCard
        }
        api.updateCard(data, this.id_card).then(() => {
          this.updateTitleCard = false
          this.dialogUpdateCard = false
          this.getList()
          this.detailCard(this.id_card)
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
    getList() {
      api.getList().then((res) => {
        this.directories = res.data.data
      })
    },
    handleCreateList() {
      if (this.addList.length === 0) {
        this.errorAddList = 'Tên danh sach không được để trống';
      } else {
        this.showAddListTitle = 0
        let data = {
          title: this.addList,
          index: this.directories.length + 1
        }
        api.createList(data).then(() => {
          this.resetForm()
          this.resetError()
          this.getList()
          this.$message({
            type: 'success',
            message: 'Thêm dánh sách thành công',
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Thêm dánh sách thất bại',
          })
        })
      }
    },
    handleDeleteList(id) {
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
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá sách thất bại',
          })
        })
      })
    },
    handleUpdateDirectories() {
      if (this.updateList.length === 0) {
        this.errorUpdateList = 'Tên danh sách không được trống !'
      } else {
        let data = {
          title: this.updateList
        }
        api.updateList(data, this.InputTask_id).then(() => {
          this.dialogEditDerectories = false;
          this.resetForm()
          this.resetError()
          this.showList = 1
          this.getList()
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Cập nhật danh sách thành công'
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Cập nhật sách thất bại',
          })
        })
      }
    },
    openDialogEditDerectories(value) {
      this.resetForm();
      this.resetError()
      this.dialogEditDerectories = true
      this.showList = 0
      this.InputTask_id = value.id
      this.updateList = value.title
    },
    showAddTitle(id) {
      this.TitleTask_id = id
      this.showAddTitleTask = 1
    },
    closeAddTitle() {
      this.showAddTitleTask = 0
    },
    showAddList() {
      this.showAddListTitle = 1
    },
    closeAddList() {
      this.showAddListTitle = 0
    },
    openDialogUpdateCard(listItem) {
      this.dialogUpdateCard = true;
      this.titleCardUpdate = listItem.title
      this.id_card = listItem.id
      this.titleCard = listItem.title
      if (listItem.description) {
        this.descriptionCard = listItem.description
      }
    },
    resetForm() {
      this.workChil = "";
      this.addList = "";
      this.InputTask_id = '';
      this.TitleTask_id = '';
      this.updateList = "";
      this.titletask = "";
      this.titleCard = "";
      this.titleCardUpdate = "";
      this.descriptionCard = '';
      this.titleCardUpdate = '';
      this.checkList = '';
      this.updateWork = "";
      this.workChil = "";
      this.updateWorkChil = "";
    },
    resetError() {
      this.errorDeadline = "";
      this.errorWorkChil = "";
      this.errorUpdateWork = '';
      this.errorCheckList = ''
      this.errorAddList = '';
      this.errorUpdateList = "";
      this.errorTitletask = "";
      this.errorTitleCard = ""
      this.errorWorkChil = "";
      this.errorUpdateWorkChill = "";
    }
  },
  components: {
    draggable
  },

}
</script>
<style lang="scss" scoped>

.home {
  display: inline-block;
  padding: 10px;
  width: 100%;
  height: 93.8vh;
  background-image: url(../assets/images/hinh-nen-songoku-7-vien-ngoc-rong-full-hd-4k.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  .container1 {
    max-width: 1883px;
    max-height: 91.8vh;
    height: 91.8vh;
    overflow: auto;
    display: inline-flex;
    text-align: left;

    .container {
      display: -webkit-inline-box;

      .list {
        margin-right: 30px;
        height: max-content;
        width: 380px;
        max-height: 900px;
        overflow: auto;
        padding: 14px 10px;
        background-color: #ebecf0;;
        border-radius: 5px;

        .listTitle {
          text-align: left !important;
          margin: 0 !important;
          padding: 7px 0px 7px 14px;

        }

        .more {
          width: 33px;
          height: 33px;
          line-height: 33px;
          margin: 0 !important;
          text-align: center;
        }

        .more:hover {
          background-color: #091e4214;
        }

        .list__task__content {
          width: 100%;
          min-height: 60px;
          background-color: #ffffff;
          border-radius: 5px;
          border-bottom: 1px solid #ccc;
          margin: 15px 0;
          text-align: left;

          .list__task__content__text {
            position: relative;
            padding-left: 14px;

            .list__task__content__edit {
              position: absolute;
              top: 0;
              right: 0;
              width: 30px;
              height: 30px;
              font-size: 14px;
              text-align: center;
              margin: 5px 10px 5px 0px;
              display: none;
            }
          }

          .list__task__content__text:hover .list__task__content__edit {
            display: inline-block;
          }
        }

        .addTask {
          width: 100%;
          min-height: 60px;
          line-height: 60px;
          margin: 10px 0;
          text-align: left;

          .addTaskText {
            padding-left: 14px;
          }
        }

        .addTask:hover {
          background-color: #091e4214;
          border-radius: 5px;
          border-bottom: 1px solid #ccc;

        }

        .titletask {
          text-align: left;

          .close__add__titleTask {
            font-size: 25px;
          }
        }
      }
    }
  }

  .container1::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .container1::-webkit-scrollbar {
    width: 10px;
  }

  .container1::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(linear,
        left bottom,
        left top,
        color-stop(0.44, rgb(122, 153, 217)),
        color-stop(0.72, rgb(73, 125, 189)),
        color-stop(0.86, rgb(28, 58, 148)));
  }

}

.addListTask {
  width: 380px;
  background-color: #ebecf0;
  opacity: 0.7;
  height: 70px;
  line-height: 70px;
  border-radius: 5px;

  h3 {
    margin: 0px;
    padding: 0 10px;
  }
}

.formAddList {
  width: 380px;
  padding: 5px;
  background-color: #ffffff;
  height: max-content;
  border-radius: 5px;

  input {
    margin-bottom: 10px;
  }

  .close__add__List {
    font-size: 25px;
  }
}

.list_group {
  margin-top: 30px;
}

.error {
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

.icon_detail_card {
  margin: 10px 0px;
  font-size: 30px;
  font-weight: 600;
}

.icon {
  text-align: left;
}

.button_add {
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 5px;
  text-align: left;
  background-color: #dddddd;
  margin: 5px 0px;
}

.right_container {
  padding: 0px 0px 0px 20px;
  text-align: left;
}

.icon_edit {
  color: #67C23A;
  font-size: 16px;
  margin: 0px 10px;
  cursor: pointer;
}

.icon_delete {
  color: #F56C6C;
  font-size: 20px;
  margin: 0px 5px;
  cursor: pointer;
}

.icon_work_chil {
  color: #F56C6C;
  font-size: 17px;
}

.workChildren {
  margin-left: 32px;
  font-size: 20px;
  margin-bottom: 10px;

  span {
    font-size: 16px;
    margin-left: 3px;
  }
}

.deadline::v-deep {
  width: 100% !important;
  border: none;

  .el-input__inner {
    padding-left: 17px;
    background-color: #dddddd !important;
    border: none;
    width: 100%;
    height: 33px;
    color: #000000;
  }

  .el-input__icon {
    color: #000000;
    line-height: 35px;
    width: 0;
    margin-left: -7px;
    margin-right: 15px;
  }
}

.container__deadline {
  text-align: left;
}
.btnWorkChild{
  margin-left: 11px;
}
.success{
  color: #ffffff;
  background-color: #67C23A;
  margin-left: 10px;
}
.lastDeadline{
  color: #ffffff;
  background-color: #ff0000;
  margin-left: 10px;
}
</style>
