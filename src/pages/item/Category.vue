<template>
  <v-card>
    <v-card-title>
      <v-btn dark color="indigo" @click="addCategory">添加一级分类</v-btn>
      <!--<v-btn fab dark color="error">-->
        <!--<v-icon class="pt-3" dark>delete</v-icon>-->
      <!--</v-btn>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-text-field label="搜索" class="flex sm3"  append-icon="search" v-model="search"></v-text-field>-->
    </v-card-title>
      <v-flex xs12 sm10>
        <v-tree ref="tree"  url="/item/category/list"
                :isEdit="isEdit"
                @handleAdd="handleAdd"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleClick="handleClick"
        />
      </v-flex>
    <v-dialog v-model="show" scrollable persistent max-width="500px">
      <v-card color="blue lighten-4" class="white--text">
        <v-card-title>
          <span class="headline">{{isEdit?'修改':'新增'}}分类</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-5">
          <my-category-form @reload="reload" v-bind:isEdit="isEdit" v-bind:oldCategory="oldCategory"></my-category-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import MyCategoryForm from './MyCategoryForm'
  export default {
    name: "category",
    data() {
      return {
        //treeData: treeData,
        isEdit:true,
        leafNode:[],
        show:false,  //控制对话框的显示
        oldCategory:{}, //回显要修改的数据
      }
    },
    methods: {
      addCategory(){
        this.verify().then(() => {
          this.isEdit=false;
          this.show=true;
        }).catch(() => {
          this.$router.push("/login");
        });
      },
      handleAdd(node) {
        if (node.parentId !== 0) {
          this.verify().then(() => {
            this.$http({
              method: 'post',
              url: '/item/category',
              data: this.$qs.stringify(node)
            }).then(() => {
              this.reload(node.id);
            }).catch();
          }).catch(() => {
            this.$router.push("/login");
          });
        }else {
          this.$message.error("刷新后重试！");
        }
      },
      handleEdit(id,name) {
        const node={
          id:id,
          name:name
        };
        this.verify().then(() => {
          this.$http({
            method: 'put',
            url: '/item/category',
            data: this.$qs.stringify(node)
          }).then(() => {
            this.$message.info("修改成功！");
          }).catch(() => {
            this.$message.info("修改失败！");
          });
        }).catch(() => {
          this.$router.push("/login");
        });
      },
      handleDelete(id) {
        this.verify().then(() => {
          this.$http.delete("/item/category/cid/" + id).then(() => {
            this.$message.info("删除成功！");
          }).catch(() => {
            this.$message.info("删除失败！");
          })
        }).catch(() => {
          this.$router.push("/login");
        });
      },
      handleClick(node) {
        //console.log(node)
      },
      reload(id){
        //操作完成后刷新数据
        //关闭对话框
        this.show=false;
        this.$http.get("/item/category/list?pid="+id).then().catch();
      }
    },
    components:{
      MyCategoryForm
    }
  };
</script>

<style scoped>

</style>
