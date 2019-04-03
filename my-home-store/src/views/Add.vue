<template>
  <div id="add">
    <h1>Add your new products here</h1>
    <div class="step">
      <p>Step 1: Upload your product image</p>
      <p class="inputWrap">
        <input type="file"
        @change="changeImage" 
        ref="descImg"
        accept="image/*"/>
        <span class="errWarning" v-if="errWarning.img.err">{{errWarning.img.msg}}</span>
      </p>
    </div>
    <div class="step">
      <p>Step 2: Add title as simple description</p>
      <p class="inputWrap">
        <input v-model="productObj.title"/>
        <span class="errWarning" v-if="errWarning.title.err">{{errWarning.title.msg}}</span>
      </p>
    </div>
    <div class="step">
      <p>Step 3: Select your product type</p>
      <p class="inputWrap">
        <select v-model="productObj.type" placeholder="请选择">
          <option value="0">衣服</option>
          <option value="1">鞋子</option>
          <option value="2">饰品</option>
          <option value="3">BJD</option>
        </select>
        <span class="errWarning" v-if="errWarning.type.err">{{errWarning.type.msg}}</span>
      </p>
    </div>
    <div class="step">
      <p>Step 4: Add tags for your products</p>
      <p class="inputWrap">
        <input type="text" v-model="tag"/>
        <button class="addBtn" @click="addTag">Add</button>
        <span class="errWarning" v-if="errWarning.tags.err">{{errWarning.tags.msg}}</span>
      </p>
      <p class="tagWrapper">
        <Tag
        v-for="(item, index) in tagList"
        :key="index"
        :tagName="item"
        :tagIndex="index"
        isAdd="true"
        @deleteTag="deleteTag"/>
      </p>
    </div>
    <div class="confirmWrapper">
      <button @click="confirmAdd">确认提交</button>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag.vue';

export default {
  name: 'Add',
  components: {
    Tag,
  },
  data() {
    return {
      fileList: [],
      currentFile: '',
      tagList: [],
      tag: '',
      productObj: {
        title: '',
        tags: '',
        type: '',
        img: '',
      },
      errWarning: {
        title: {
          err: false,
          msg: '',
        },
        type: {
          err: false,
          msg: '',
        },
        tags: {
          err: false,
          msg: '',
        },
        img: {
          err: false,
          msg: '',
        },
      }
    };
  },
  mounted() {
    this.tags = [];
  },
  methods: {
    changeImage() {
      this.fileList = this.$refs.descImg.files;
      this.currentFile = this.fileList[0];
      const size = this.currentFile.size / 1024000;
      if(size > 5) {
        this.fileList = [];
        this.currentFile = '';
      }
    },
    addTag() {
      if (!this.tag) {
        this.$Alert({
          msg: '不能添加空tag!'
        });
        return false;
      }
      if (this.tagList.length > 8) {
        this.$Alert({
          msg: 'tag数量不能超过9个!'
        });
        this.tag = '';
        return false;
      }
      // simple without distinct
      this.tagList.push(this.tag);
      this.tag = '';
    },
    deleteTag(index) {
      // remove current element
      this.tagList.splice(index, 1);
    },
    addProducts(product) {
      this.$axios
        .post(Inter.addProduct, product)
        .then((res) => {
          if (res.data.code = '0000_0') {
            this.productObj = {
              title: '',
              tags: '',
              type: '',
              img: '',
            };
          }
        })
        .catch((err) => {
          this.$Alert({
            msg: '新增失败'
          });
        });
    },
    confirmAdd() {
      // upload image first
      if (this.fileList.length) {
        const formData = new FormData();
        formData.append('file', this.currentFile);
        this.$axios
          .post(Inter.uploadImg, formData)
          .then((res) => {
            if (res.data) {
              this.productObj.img = res.data.result;
              this.productObj.tags = this.tagList.join(',');
              // next add the product
              this.addProducts(this.productObj);
            }
          })
          .catch((err) => {
            this.$Alert({
              msg: '上传图片失败'
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../less/common.less");
#add {
  width: 100%;
  height: 100%;
  h1 {
    text-align: center;
  }
  .step {
    padding: 20px 10px;
    input {
      display: inline-flex;
      align-items: center;
      outline: none;
      width: 180px;
      height: 30px;
      border: 1px solid #444444;
      padding: 0 5px;
      &:focus {
        border: 1px solid #333333;
        box-shadow: 0px 0px 1px 0px #333333;
        transition: all 0.5s;
      }
    }
    select {
      outline: none;
      width: 180px;
      height: 30px;
    }
    .inputWrap {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .uploadBtn {
        .btn-common(#444444, #333333);
        height: 30px;
        padding: 0 10px;
        margin-left: 10px;
      }
      .addBtn {
        .btn-common(#444444, #333333);
        height: 30px;
        padding: 0 10px;
        margin-left: 10px;
      }
    }
  }
  .tagWrapper {
    display: flex;
  }
  .confirmWrapper {
    text-align: center;
    button {
      .btn-common(#444444, #333333);
      height: 30px;
      padding: 0 10px;
      margin-left: 10px;
    }
  }
  .errWarning {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #CC3333;
  }
}
</style>
