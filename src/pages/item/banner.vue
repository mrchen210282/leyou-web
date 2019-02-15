<template>
<v-card>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn color="success" @click="addBrand">添加</v-btn>
      </v-flex>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <!--<td class="text-xs-left">{{ props.item.name }}</td>-->
            <td class="text-xs-left">
              <v-img :src="props.item.name" style="width: 100px;height: 50px;">
              </v-img>
            </td>
            <td class="text-xs-left">{{ props.item.calories }}</td>
            <td class="text-xs-left">
              <v-btn color="info">修改</v-btn>
              <v-btn color="info">删除</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>

  <v-dialog v-model="show" scrollable persistent max-width="500px">
    <v-card color="blue lighten-4" class="white--text">
      <v-card-title>
        <span class="headline">{{isEdit?'修改':'新增'}}幻灯片</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="px-5">
        <my-banner-form @reload="reload" v-bind:isEdit="isEdit" v-bind:oldBrand="oldBrand"></my-banner-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</v-card>
</template>
<script>
  import MyBannerForm from './MyBannerForm'
  export default {
    data () {
      return {
        show:false,  //控制对话框的显示
        oldBrand:{}, //回显要修改的数据
        isEdit:false, //是否编辑
        headers: [
          {
            text: '幻灯片图片',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '幻灯片ID', value: 'calories' },
          { text: '操作', value: 'fat' },

        ],
        desserts: [
          {
            name: 'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png',
            calories: 159,
            fat: 6.0,

          },
          {
            name: 'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png',
            calories: 237,
            fat: 9.0,

          },

        ]
      }
    },
    // created(){
    //   this.verify().then(() => {
    //     this.getDataFromServer();
    //   }).catch(() => {
    //     this.$router.push("/login");
    //   });
    // },
    methods:{
      reload(){
        //关闭对话框
        this.show=false;
        //刷新页面
        // this.getDataFromServer();
      },
      addBrand(){
        this.verify().then(() => {
          this.isEdit=false;
          this.show=true;
          this.oldBrand = null;
        }).catch(() => {
          this.$router.push("/login");
        });
      },
    },
    components:{
      MyBannerForm
    }
  }
</script>
