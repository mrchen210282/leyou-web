<template>
      <v-form v-model="valid" ref="CategoryForm">
        <v-text-field v-model="category.name" label="分类名称" required :rules="[v => !!v || '分类名称不能为空']">
        </v-text-field>
        <v-text-field v-model="category.sort" label="排序方式" required :rules="[v => !!v || '排序方式不能为空']">
        </v-text-field>
        <!--<v-layout row>-->
          <!--<v-flex xs4>-->
            <!--<span style="font-size: 20px; color: #444">图片</span>-->
          <!--</v-flex>-->
          <!--<v-flex>-->
            <!--<v-upload ref="image_url"-->
                      <!--v-model="category.image"-->
                      <!--url="/upload/image"-->
                      <!--:multiple="false"-->
                      <!--:pic-width="250"-->
                      <!--:pic-height="90"-->
            <!--/>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
        <v-layout class="pt-3" >
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="clear">清空</v-btn>
          <v-btn color="blue darken-1" flat @click="submit">保存</v-btn>
        </v-layout>
      </v-form>
</template>

<script>
    export default {
        name: "MyCategoryForm",
        data(){
          return {
            valid:false,
            category:{
              name:'',
              sort: '',
              image:'',
            },
          }
        },
      props:{
          oldCategory:{type:Object},
          isEdit:{type: Boolean,default:false}
      },
      watch:{
        oldCategory:{
          deep:true,
          handler(val){
            if(val){
              this.category=Object.deepCopy(val);
            }else{
              this.clear();
            }
          }
        }
      },
      methods:{
          submit(){
            //提交表单
              if(this.$refs.CategoryForm.validate()){

                this.verify().then(() => {
                  this.$http({
                    method:this.isEdit ? 'put' :'get',
                    url:"/item/category/addCategory",
                    params: {
                      id: null,
                      name: this.category.name,
                      parentId: '0',
                      isParent: 'false',
                      sort: this.category.sort,
                      // image: this.category.image
                    },
                  }).then(
                    () =>{
                      //关闭对话框
                      this.$emit('reload');
                      this.$message.success("保存成功！");
                      this.clear();
                    }
                  ).catch(
                    ()=>{
                      this.$message.success("保存失败！");
                    }
                  );
                }).catch(() => {
                  this.$router.push("/login");
                });
              }
          },
        clear(){
            //重置表单
          this.category.name='';
          this.category.sort='';
        }
      }
    }
</script>

<style scoped>

</style>


