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
            <td class="text-xs-left" style="width:100px; height: 50px">
              <v-img :src="props.item.name" style="width: 100%;height: 100%;">
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
            name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550229051347&di=3ab85a8b4493f0b8010032993b412646&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F23%2F20150423H5512_hxUim.jpeg',
            calories: 159,
            fat: 6.0,

          },
          {
            name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550229051347&di=3ab85a8b4493f0b8010032993b412646&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F23%2F20150423H5512_hxUim.jpeg',
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
