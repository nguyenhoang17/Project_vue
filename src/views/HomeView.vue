<template>
  <div class="home">
    <div class="container1">
      <draggable class="container" :list="directories" :move="moveDirectory">
        <div v-for="(value, index) in directories" :key="index" class="list" >
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
          <div :id="value.id">
            <draggable class="list_group" :directories="value.cards" group="people" :list="value.cards" :move="moveCard">
              <div class="list__task__content" v-for="listItem in value.cards" :key="listItem.index"  >
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark list__task__content__text"
                         @click="openModalDetailCard(listItem.id)">
                      <el-row>
                        <el-col :span="24">
                          <div class="grid-content bg-purple-dark itemTagContainer"
                               v-for="itemTag in listItem.labels" :key="itemTag.id">
                            <div class="itemTag" :style="{'background-color':itemTag.color}"></div>
                          </div>
                        </el-col>
                      </el-row>
                      <h3 style="margin: 5px 0px">{{ listItem.title }}</h3>
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
                      <p class="infoDeadline">
                      <span>
                         <i class="el-icon-time">
                           <span v-if="listItem.deadline">
                            {{listItem.deadline}}
                           </span>
                           <span v-else> Đang cập nhật</span>
                         </i>
                      </span>
                        <span>
                       <span></span>
                     </span>
                      </p>
                    </div>

                  </el-col>
                </el-row>
              </div>
            </draggable>
          </div>

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
                    <i class="el-icon-postcard"></i>
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
          <el-row v-if="listTagCard.length!==0">
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <p></p>
              </div>
            </el-col>
            <el-col :span="23">
              <div class="grid-content bg-purple " style="margin-left: 11px">
                <div class="container__deadline">
                  <p><b>Nhãn: </b></p>
                  <div class="listCard">
                    <div v-for="tagCard in listTagCard" :key="tagCard.id" class="tagContainer">
                      <div class="itemCard"
                           :style="{'background-color':tagCard.color}" @click="actionTag(tagCard)">{{tagCard.name}}</div>
                    </div>
                    <el-button type="info" plain icon="el-icon-plus" size="mini" @click="openSelectTag()"></el-button>
                  </div>
                </div>
              </div>
            </el-col>

          </el-row>
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
                  <span v-if="statusCard ===true " class="success">Đã hoàn thành</span>
                  <span v-if="checkDeadline === true && statusCard !== true" class="lastDeadline">Quá hạn</span>
                </div>
              </div>
            </el-col>

          </el-row>
          <el-row>
            <div class="grid-content bg-purple-light">
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="icon_detail_card icon">
                    <i class="el-icon-tickets"></i>
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
          <el-row v-if="this.fileList.length !== 0">
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <div class="icon_detail_card icon">
                  <i class="el-icon-paperclip"></i>
                </div>

              </div>
            </el-col>
            <el-col :span="23">
              <div class="grid-content bg-purple-light icon" style="margin-left: 11px">
                <el-row>
                  <h3>Các tệp tin đính kèm</h3>
                  <div v-for="file in fileList" :key="file.id" class="listFile">
                    <div class="imageFile">
                      <img v-if="file.path.includes('.jpg') ||
                      file.path.includes('.png') ||
                      file.path.includes('.jpeg')"
                           width="100px"
                           height="100px"
                           :src="'http://vuecourse.zent.edu.vn/storage/'+ file.path" alt="">
                      <div class="img-file not-img" v-else-if="file.path.includes('.xlsx') ||
                      file.path.includes('.docx') || file.path.includes('.doc') ||
                      file.path.includes('.txt') || file.path.includes('.doc') ||
                      file.path.includes('.xls') || file.path.includes('.pdf') ||
                      file.path.includes('.video/mp4')">
                        {{ file.path.slice(file.path.indexOf('.')) }}
                      </div>
                    </div>
                    <div class="fileInfo">
                      <p><b>{{file.name}}</b></p>
                      <p>Đã thêm vào lúc {{formatDateFile(file.created_at)}} -
                        <span class="actionFile" @click="openModalUpdateNameFile(file)">Chỉnh sửa</span>
                        - <span class="actionFile" @click="handleDeleteFileCard(file.id)">Xoá</span></p>
                    </div>
                  </div>

                </el-row>

              </div>
            </el-col>
          </el-row>
          <div class="grid-content bg-purple-light" v-for="itemWork in listWork" :key="itemWork.id">
            <el-row>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="icon_detail_card icon">
                    <i class="el-icon-suitcase"></i>
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
<!--            <el-row>-->
<!--              <el-progress :percentage="percenTage"></el-progress>-->
<!--            </el-row>-->

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
                         <span v-if="check_list_child.status === 1"
                               :style="{color: success}">{{ check_list_child.title }}</span>
                         <span v-else>{{ check_list_child.title }}</span>
                       </span>
                    </span>
                    <span style="padding-left: 20px" class="error"
                          v-if='openUpdateWorkChilInput===true && workChil_id === check_list_child.id && errorUpdateWorkChill!==""'>
                      {{ errorUpdateWorkChill }}
                    </span>
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
                      <el-button class="btnWorkChild" v-else type="info" plain
                                 @click="openAddWorkChil(itemWork.id)">Thêm mục</el-button>
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
                  <button class="button_add" @click="openSelectTag()">
                    <span><i class="el-icon-price-tag"></i></span> Nhãn</button>
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
                  <button class="button_add"  @click="clickUploadFile">
                    <span>
                      <i class="el-icon-paperclip"></i>
                    </span>
                    Đính kèm
                  </button>
                  <input name="fileImport" ref="file" type="file" id="inputUploadFile"
                         style="visibility: hidden; height: 0; display: none"
                         class="" @change="onChangeFile"/>
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
    <!--Modal sửa tên file-->

    <el-dialog title="Sửa tên file" :visible.sync="modalUpdateNameFile" width="30%">
      <el-input placeholder="Nhập tên file" v-model="updateNameFile"></el-input>
      <span class="error">{{errorNameFile}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modalUpdateNameFile = false">Huỷ</el-button>
    <el-button type="primary" @click="handleUpdateFileName()">Lưu</el-button>
  </span>
    </el-dialog>

    <!--Danh sách nhãn và chọn nhãn-->
    <el-dialog
        title="Nhãn"
        :visible.sync="dialogSelectTag"
        width="20%">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-input placeholder="Nhập tên tag để tìm kiếm"
                    v-model="searchTag"
                    @clear="handleClear"
                    @keydown.enter.native="handleSearch"
                    clearable>
          </el-input>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left">
         <p><b>Nhãn</b></p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"
        v-for="tag in tags" :key="tag.id">
          <el-row>
            <div class="listTagContainer" >
              <el-col :span="20"><div class="grid-content bg-purple-light listTag"
                                      :style="{'background-color': tag.color}"
                                      @click="actionTag(tag)">
                <span style="float: left; margin-left: 10px"
                      v-if="tag.checkTag === true"><i class="el-icon-check"></i></span>{{tag.name}}</div></el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple" style="text-align: right">
                  <span class="icon_edit"
                        @click="openDialogUpdateTag(tag)">
                    <i class="el-icon-edit-outline"></i>
                  </span>
                  <span class="icon_delete"
                        @click="handleDeleteTag(tag.id)">
                    <i class="el-icon-delete"></i>
                  </span>
                </div>
              </el-col>
            </div>

          </el-row>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-button @click="openDialogAddTag()">Tạo nhãn mới</el-button>
        </div></el-col>
      </el-row>
    </el-dialog>
    <!--Tạo nhãn mới-->
    <el-dialog
        title="Tạo nhãn mới"
        :visible.sync="dialogAddTag"
        width="20%">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left">
          <p><b>Tiêu đề</b></p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark ">
          <el-input placeholder="Nhập tiêu đề" v-model="contentTag"></el-input>
          <p class="error">{{ errorContentTag}}</p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left">
          <p><b>Chọn màu</b></p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark colorTag">
          <el-color-picker v-model="colorTag"></el-color-picker>
          <p class="error">{{errorColorTag}}</p>
        </div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialogAddTag()">Huỷ</el-button>
    <el-button type="primary" @click="handleAddAssignTag()">Tạo</el-button>
  </span>
    </el-dialog>

    <!--Cập nhật nhãn-->
    <el-dialog
        title="Chỉnh sửa nhãn"
        :visible.sync="dialogUpdateTag"
        width="20%">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left">
          <p><b>Tiêu đề</b></p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark ">
          <el-input placeholder="Nhập tiêu đề" v-model="contentTag"></el-input>
          <p class="error">{{ errorContentTag}}</p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left">
          <p><b>Chọn màu</b></p>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark colorTag">
          <el-color-picker v-model="colorTag"></el-color-picker>
          <p class="error">{{errorColorTag}}</p>
        </div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialogUpdateTag()">Huỷ</el-button>
    <el-button type="primary" @click="handleUpdateTag()">Cập nhật</el-button>
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
      checkDeadline:false,
      listTagCard:[],
      id_tag:'',
      dialogUpdateTag:false,
      tags:[],
      tagName:'',
      tagColor:'',
      cardItem:'',
      contentTag:'',
      errorContentTag:'',
      colorTag:'',
      errorColorTag:'',
      dialogAddTag:false,
      searchTag:"",
      dialogSelectTag:false,
      id_file:"",
      modalUpdateNameFile:false,
      errorNameFile:"",
      updateNameFile:'',
      fileList:[],
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
      directory: '',
      percenTage:0,
    }
  },
  mounted() {
    this.getList();
    this.deadline = moment();
  },
  methods: {
    //Thẻ
    // handleProgressBar(id){
    //   let complete = 0;
    //   let target = 0;
    //   api.detailCard(id)
    //       .then((res) => {
    //         res.data.data.check_lists[this.index].check_list_childs.forEach(
    //             (li) => {
    //               if (li.status == 1) {
    //                 complete += 1;
    //               }
    //               target += 1;
    //               this.percenTage = Math.ceil((complete / target) * 100);
    //             }
    //         );
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    // },
    actionTag(tag){
      if(tag.checkTag === false){
        let data = {
          label_id : tag.id
        }
        api.attachTag(this.id_card, data).then(()=>{
          this.$message({
            type: 'success',
            message: 'Gán nhãn thành công'
          })
          this.getTag()
        })
      }
      if(tag.checkTag !== false){
        let data = {
          label_id : tag.id
        }
        api.detachTag(this.id_card, data).then(()=>{
          this.$message({
            type: 'success',
            message: 'Gỡ nhãn thành công'
          })
          this.getTag()
        })
      }
      this.getTag()
      this.detailCard(this.id_card)
      this.getList()

    },
    moveCard(item) {
      console.log(item)
      let cardId = item.draggedContext.element.id
      let index = item.draggedContext.futureIndex
      let directoryId = item.to.parentElement.getAttribute('id')
      api.moveCards({
        index : index,
        directory_id : directoryId
      }, cardId).then(()=>{

      })
    },
    moveDirectory(item) {
      api.moveDirectories(item.draggedContext.element.id, item.draggedContext.futureIndex).then(() => {
      })
    },
    formatDateFile(datetime){
      if(datetime){
        return moment(datetime).format('YYYY-MM-DD H:mm:ss')
      }
    },
    closeDialogAddTag(){
      this.dialogAddTag = false
      this.resetError()
      this.resetForm()
    },
    closeDialogUpdateTag(){
      this.dialogUpdateTag = false
      this.resetError()
      this.resetForm()
    },
    handleUpdateTag(){
      if(!this.contentTag){
        this.errorContentTag = "Tên nhãn không được trống"
      }
      if(!this.colorTag){
        this.errorColorTag = "Màu nhãn không được trống"
      }
      if(this.contentTag.length !== 0 && this.colorTag.length !== 0){
        let data = {
          name: this.contentTag,
          color: this.colorTag
        }
        api.updateTag(this.id_tag, data).then(()=>{
          this.dialogSelectTag = true
          this.dialogUpdateTag= false
          this.detailCard(this.id_card)
          this.getTag()
          this.getList()
          this.resetError()
          this.resetForm()
          this.$message({
            type: 'success',
            message: 'Chnh sửa nhãn thành công'
          })
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Chnh sửa nhãn thất bại'
          })
          this.dialogSelectTag = true
          this.dialogUpdateTag= false
          this.detailCard(this.id_card)
          this.getTag()
          this.getList()
          this.resetError()
          this.resetForm()
        })
      }
    },
    openDialogUpdateTag(tag){
      this.dialogSelectTag = false
      this.dialogUpdateTag= true
      this.id_tag = tag.id
      this.contentTag = tag.name
      this.colorTag = tag.color
    },
    handleDeleteTag(id){
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteTag(id).then(()=>{
          this.$message({
            type: 'success',
            message: 'Xoá nhãn thành công'
          })
          this.getTag()
          this.detailCard(this.id_card)
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá nhãn thất bại',
          })
        })
      })
    },
    handleClear(){
      this.searchKey ='';
      this.getTag();
    },
    handleSearch(){
      let payload = {
        q: this.searchTag
      }
      this.getTag(payload)
    },
    getTag(params = {}){
      api.getTag(params).then((res) => {
        this.tags = _.get(res, 'data.data')
        this.detailCard(this.id_card)
        let data = [];
        this.tags.forEach(value => {
          data.push({
            name: value.name,
            color: value.color,
            id: value.id,
            checkTag: false
          })
        })
        this.listTagCard.forEach(value => {
          data.forEach(val => {
            if (value.id === val.id){
              val.checkTag = true;
            }
          })
        })
        this.tags = data;
      })
    },
    handleAddAssignTag(){
      if(!this.contentTag){
        this.errorContentTag = "Tên nhãn không được trống"
      }
      if(!this.colorTag){
        this.errorColorTag = "Màu nhãn không được trống"
      }
      if(this.contentTag.length !== 0 && this.colorTag.length !== 0){
        let data = {
          name: this.contentTag,
          color: this.colorTag
        }
       api.createAssignTag(this.id_card, data).then(()=>{
         this.$message({
           type: 'success',
           message: 'Tạo và gán nhãn thành công'
         })
         this.dialogSelectTag = true
         this.dialogAddTag= false
         this.getTag()
         this.getList()
         this.detailCard(this.id_card)
         this.resetError()
         this.resetForm()
       }).catch(()=>{
         this.$message({
           type: 'success',
           message: 'Chnh sửa nhãn không thành công'
         })
         this.dialogSelectTag = true
         this.dialogAddTag= false
         this.detailCard(this.id_card)
         this.getTag()
         this.getList()
         this.resetError()
         this.resetForm()
       })
      }
      this.getTag()
    },
    openDialogAddTag() {
      this.dialogSelectTag = false
      this.dialogAddTag= true
    },
    openSelectTag() {
      this.dialogSelectTag = true
      this.getTag()
    },
    handleDeleteFileCard(id){
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteFileCard(id).then(()=>{
          this.$message({
            type: 'success',
            message: 'Xoá file lên thành công'
          })
          this.detailCard(this.id_card)
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Xoá file thất bại',
          })
        })
      })
    },
    handleUpdateFileName(){
      if(this.updateNameFile.length ===0){
        this.errorNameFile = 'Tên file không được để trống'
      }else{
        let data= {
          name : this.updateNameFile
        }
        api.updateNameFile(this.id_file, data).then(()=>{
          this.$message({
            type: 'success',
            message: 'Sửa tên file lên thành công'
          })
          this.modalUpdateNameFile=false
          this.detailCard(this.id_card)
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Sửa tên file không thành công. Xem lại định dạng file!'
          })
        })
        this.detailCard(this.id_card)
      }
    },
    openModalUpdateNameFile(file){
      this.modalUpdateNameFile=true
      this.id_file = file.id
      this.updateNameFile = file.name
    },
    onChangeFile() {
      this.fileImport = this.$refs.file.files[0];
      const data = new FormData();
      data.append('file', this.fileImport);
      api.addFilesCard(this.id_card, data).then(() => {
        this.$message({
          type: 'success',
          message: 'Tải file lên thành công'
        })
        this.detailCard(this.id_card)
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: 'Tải file lên không thành công. Xem lại định dạng file!'
        })
      })
      this.detailCard(this.id_card)
    },
    clickUploadFile(){
      this.$refs.file.value = null;
      document.getElementById('inputUploadFile').click();
    },
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
      this.checkDeadline = false
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
        this.fileList = _.get(res, 'data.data.files');
        this.listTagCard =_.get(res, 'data.data.labels')
        if(_.get(res, 'data.data.deadline')){
          if(moment(_.get(res, 'data.data.deadline')).format('X') < moment().format('X')){
            this.checkDeadline = true
            console.log( this.checkDeadline )
          }
        }
        // this.handleProgressBar(this.id_card)
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
      this.searchTag ="";
      this.colorTag="";
      this.contentTag = '';
      this.updateNameFile="";
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
      this.errorContentTag ="";
      this.errorColorTag='';
      this.errorNameFile = '';
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
  watch:{
    colorTag(){
      this.errorColorTag = ""
    },
    contentTag(){
      this.errorContentTag =""
    },
    updateNameFile(){
      this.errorNameFile = ""
    },
    workChil(){
      this.errorWorkChil=""
    },
    addList(){
      this.errorAddList =""
    },
    updateList(){
      this.errorUpdateList = ""
    },
    titletask(){
      this.errorTitletask =""
    },
    titleCard(){
      this.errorTitleCard=""
    },
    titleCardUpdate(){
      this.errorTitleCard=""
    },
    checkList(){
      this.errorCheckList =""
    },
    updateWork(){
      this.errorUpdateWork=""
    },
    updateWorkChil(){
      this.errorUpdateWorkChill=""
    }


  }

}
</script>
<style lang="scss" scoped>
@import "src/assets/styles/home.scss";
</style>
