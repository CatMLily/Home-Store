<template>
  <div id='list'>
    <div class='search'>
      <input class='searchInput' v-model='searchObj.keyword'/>
      <select class='searchSelect' v-model='searchObj.searchType'>
        <option value='title'>title</option>
        <option value='tag'>tag</option>
      </select>
      <button class='searchBtn' @click='confirmSearch'>搜索</button>
    </div>
    <div class='carContainer'>
      <div class='column'>
        <div class='cardItem'
          v-for='(item, index) in columnList1'
          :key='index'>
          <Card
          :itemImg='item.img'
          :itemTitle='item.title'
          :itemTags='item.tags'/>
        </div>
      </div>
      <div class='column'>
        <div class='cardItem'
          v-for='(item, index) in columnList2'
          :key='index'>
          <Card
          :itemImg='item.img'
          :itemTitle='item.title'
          :itemTags='item.tags'/>
        </div>
      </div>
      <div class='column'>
        <div class='cardItem'
          v-for='(item, index) in columnList3'
          :key='index'>
          <Card
          :itemImg='item.img'
          :itemTitle='item.title'
          :itemTags='item.tags'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'List',
  components: {
    Card
  },
  watch: {
    '$route.name': function(value) {
      this.type = this.routerMap[this.$route.name];
      this.searchObj.type = this.routerMap[this.$route.name];
      this.getProductsByType(this.type);
    }
  },
  data() {
    return {
      cardList: [
        {
          img: '../images/test.png',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test1.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号', '天边外', 'bjd', '樊楼']
        },
        {
          img: '../images/test2.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test3.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test4.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test5.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test6.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号', '戳戳']
        },
        {
          img: '../images/test7.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号', '戳戳', '珊珊', '九枝灯1号']
        },
        {
          img: '../images/test8.jpg',
          title: '测试一号',
          tags: ['戳戳', '珊珊', '九枝灯1号']
        }
      ],
      columnList1: [],
      columnList2: [],
      columnList3: [],
      type: '',
      routerMap: {
        clothes: 0,
        shoes: 1,
        decorations: 2,
        bjd: 3
      },
      searchObj: {
        type: '',
        keyword: '',
        searchType: 'title'
      }
    };
  },
  mounted() {
    this.type = this.routerMap[this.$route.name];
    this.searchObj.type = this.routerMap[this.$route.name];
    this.getProductsByType(this.type);
  },
  methods: {
    getProductsByType(type) {
      this.$axios
        .get(Inter.getProductsByType + '?type=' + type)
        .then(res => {
          this.columnList1 = [];
          this.columnList2 = [];
          this.columnList3 = [];
          this.cardList = res.data.result;
          this.cardList.forEach((item, index) => {
            item.tags = item.tags.split(',');
            switch (index % 3) {
              case 0:
                this.columnList1.push(item);
                break;
              case 1:
                this.columnList2.push(item);
                break;
              case 2:
                this.columnList3.push(item);
                break;
              default:
                break;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmSearch() {
      this.$axios
        .post(Inter.searchProducts, this.searchObj)
        .then(res => {
          this.searchObj.keyword = '';
          this.columnList1 = [];
          this.columnList2 = [];
          this.columnList3 = [];
          this.cardList = res.data.result;
          this.cardList.forEach((item, index) => {
            item.tags = item.tags.split(',');
            switch (index % 3) {
              case 0:
                this.columnList1.push(item);
                break;
              case 1:
                this.columnList2.push(item);
                break;
              case 2:
                this.columnList3.push(item);
                break;
              default:
                break;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='less' scoped>
@import url('../less/common.less');
.commonInput {
  height: 30px;
  outline: none;
  border-radius: 4px;
  border: 1px solid @minor-color;
}
#list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .search {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .searchInput {
      &:extend(.commonInput);
      margin-right: 10px;
      padding-left: 5px; 
      &:focus {
        transition: all 0.5s;
        box-shadow: 2px 2px 2px -2px#333333, -2px -2px 2px -2px #333333;
      }
    }
    .searchSelect {
      &:extend(.commonInput);
      margin-right: 10px;
    }
    .searchBtn {
      &:extend(.commonInput);
      .btn-common(#444444, #44403b);
      padding: 0 20px;
    }
  }
  .carContainer {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: auto;
    .column {
      display: flex;
      flex-flow: column;
      width: calc(100% / 3);
      height: 100%;
    }
    .cardItem {
      padding: 10px;
    }
  }
}
</style>
