<template>
  <transition name="slide">
    <v-touch
      @panstart="onPanStart"
      @panend="onPanEnd"
      @pan="onPan"
      tag="div"
      id="edit-msg"
      class="touchpan"
    >
      <header-bar :newBack="newBack" @back="back">
        <div slot="title-name">{{title}}</div>
        <span v-show="isSave" class="save" slot="right-area" @click="save">保存</span>
      </header-bar>
      <component :is="componentShow" :config="config"></component>
    </v-touch>
  </transition>
</template>

<script type="text/ecmascript-6">
import {editTitle} from 'common/js/const'
import HeaderBar from 'common/components/headerBar'
import cFiled from 'managerCommon/components/cFiled'
import cEditPhoto from 'managerCommon/components/cEditPhoto'
import cEditClass from 'managerCommon/components/cEditClass'
import sCourse from 'managerHome/student/components/sEdit/sCourse'
import sEditGrade from 'managerHome/student/components/sEdit/sEditGrade'
import sEditSchool from 'managerHome/student/components/sEdit/sEditSchool'
import sEditScore from 'managerHome/student/components/sEdit/sEditScore'
import sEditGuardian from 'managerHome/student/components/sEdit/sEditGuardian'
import tSubject from 'managerHome/teacher/components/tEdit/tSubject'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import student from 'managerHome/student/api/student'
import teacher from 'managerHome/teacher/api/teacher'
import stroage from '@/store/stroage.js'
import {Mpan} from 'common/js/mixins'

export default {
  name: 'editMsg',
  mixins: [Mpan],
  data () {
    return {
      componentShow: '',
      title: '',
      isSave: '',
      config: '',
      route: this.$route.name,
      clickflag: true
    }
  },
  created () {
    this._initConfig()
  },
  computed: {
    ...mapGetters({
      imgShow: 'managerCommon/imgShow',
      IsSave: 'managerCommon/isSave',
      EditMsg: 'managerCommon/editMsg',
      EditMsgKey: 'managerCommon/editMsgKey',
      schoolId: 'managerCommon/schoolId',
      filePath: 'managerCommon/filePath',
      fileUrl: 'managerCommon/fileUrl',
      studentId: 'managerStudent/userId',
      studentClassLists: 'managerStudent/classLists',
      copy_studentClassLists:'managerStudent/copy_classLists',
      studentScore: 'managerStudent/score',
      studentGuardian: 'managerStudent/saveGuardian',
      studentGrade: 'managerStudent/grade',
      studentClassName: 'managerStudent/className',
      teacherUserInfo: 'managerTeacher/userInfo',
      tTitle: 'managerTeacher/title',
      teacherId: 'managerTeacher/userId',
      teacherClassLists: 'managerTeacher/classLists',
      teacherProfile: 'managerTeacher/profile',
      teacherClassName: 'managerTeacher/teacherClassName'
    })
  },
  methods: {
    save () {
      if (!this.IsSave) { //  正则校验失败
        return false
      } else {
        if (!this.clickflag) return
        this.clickflag = false
        let key = this.EditMsgKey
        if (this.route === 'sEditMsg') {
          if (key === 'school') {
            stroage['persistent'].set('mStudent.id', this.studentId)
            let arr = stroage['persistent'].get('mStudent.localSchoolHistory') ? stroage['persistent'].get('mStudent.localSchoolHistory') : []
            arr.push(this.EditMsg)
            stroage['persistent'].set('mStudent.localSchoolHistory', arr)
          }
          if (key === 'sEditClass') {
          	if(this.copy_studentClassLists == this.studentClassLists){
          		 this._refreshDeatils()
          	}else{
          		student.saveStudentClassInfo({
	              schoolId: this.schoolId,
	              userId: this.studentId,
	              classList: this.studentClassLists
	            }).then(r => {
	              this.setStudentIsCache(true)
	              this._refreshDeatils()
	            })
          	}
          } else if (key === 'guardian') {
            student.saveStudentParentInfo({
              studentUserId: this.studentId,
              mobile: this.studentGuardian.mobile,
              relationship: this.studentGuardian.guardian,
              id: this.studentGuardian.id
            }).then(r => {
              this._refreshDeatils()
            })
          } else if (key === 'photo') {
            this.uploadAvatar(this.studentId, student.updateInfo, key, 'student')
          } else {
            let json = {}
            if (key === 'name') this.setStudentIsCache(true)
            if (key === 'score') {
              json = this.studentScore
            } else if (key === 'grade') {
              json = {
                grade: this.studentGrade,
                className: this.studentClassName
              }
            } else {
              json = {[key]: this.EditMsg}
            }
            let params = Object.assign({}, {userId: this.studentId}, json)
            student.updateInfo(params).then(r => {
              this._refreshDeatils()
            })
          }
        }
        if (this.route === 'tEditMsg') {
          if (!this.$route.params.query) {
            if (key === 'tEditClass') {
              teacher.saveTeacherClassInfo({
                schoolId: this.schoolId,
                userId: this.teacherId,
                classList: this.teacherClassLists
              }).then(r => {
                this.setTeacherIsCache(true)
                this._refreshDeatils()
              })
            } else if (key === 'photo' || key === 'teacherQc') {
              this.uploadAvatar(this.teacherId, teacher.updateInfo, key, 'teacher')
            } else {
              let json = {}
              if (key === 'name') this.setTeacherIsCache(true)
              if (key === 'teach') {
                json = {[key]: this.tTitle + this.EditMsg}
              } else if (key === 'profile') {
                json = {[key]: this.teacherProfile}
              } else {
                json = {[key]: this.EditMsg}
              }
              let params = Object.assign({}, {userId: this.teacherId}, json)
              teacher.updateInfo(params).then(r => {
                this._refreshDeatils()
              })
            }
          } else {
            if (key === 'teach') {
              this.setAddTeacher({[key]: this.tTitle + this.EditMsg})
            } else if (key === 'tEditClass') {
              this.setAddTeacher({classNameList: this.teacherClassName, classList: this.teacherClassLists})
            } else if (key === 'photo' || key === 'teacherQc') {
              this.setAddTeacher({[key]: this.filePath, [key + 'Url']: this.fileUrl})
            } else {
              this.setAddTeacher({[key]: this.EditMsg})
            }
            this.back()
          }
        }
        if (this.route === 'cEditMsg') {
          this.setSaveClass({[key]: this.EditMsg})
          this.back()
        }
      }
    },
    uploadAvatar (id, api, key, type) {
      if (this.imgShow && this.filePath !== '') {
        let params = Object.assign({}, {userId: id}, {[key]: this.filePath})
        api(params).then(r => {
          if (type === 'student') {
            this.setStudentIsCache(true)
          } else if (type === 'teacher') {
            if (key === 'photo') this.setTeacherIsCache(true)
          }
          this._refreshDeatils()
        })
      } else {
        this.back()
      }
    },
    _refreshDeatils () {
      if (this.route === 'sEditMsg') {
        this.getStudentDetails().then(r => {
          this.back()
        })
      }
      if (this.route === 'tEditMsg') {
        this.getTeacherDetails().then(r => {
          this.back()
        })
      }
      setTimeout(() => {
        this.clickflag = true
      }, 300)
    },
    _initConfig () {
      let route = this.$route.params
      this.isSave = route.isSave
      this.config = route.config
      for (const key in editTitle) {
        if (key === route.component) {
          if (route.component === 'cFiled') {
            this.title = editTitle[key][this.config.key]
          } else {
            this.title = editTitle[key]
          }
        }
      }
      if (route.component === 'sEditClass' || route.component === 'tEditClass') {
        this.componentShow = 'cEditClass'
      } else {
        this.componentShow = route.component
      }
    },
    ...mapMutations({
      setAddTeacher: 'managerTeacher/SET_ADDTEACHER',
      setSaveClass: 'managerClass/SET_SAVECLASS',
      setStudentIsCache: 'managerStudent/SET_ISCACHE',
      setTeacherIsCache: 'managerTeacher/SET_ISCACHE'
    }),
    ...mapActions({
      getStudentDetails: 'managerStudent/getStudentDetails',
      getTeacherDetails: 'managerTeacher/getTeacherDetails'
    })
  },
  components: {
    HeaderBar,
    cFiled,
    cEditPhoto,
    sCourse,
    cEditClass,
    sEditGrade,
    sEditSchool,
    sEditScore,
    sEditGuardian,
    tSubject
  }
}
</script>

<style scoped lang="scss">
  @import "@/style/variable.scss";

  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  #edit-msg {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    .save {
      margin-right: calc(20px / 2);
      font-size: calc(34px / 2);
    }
  }
</style>
