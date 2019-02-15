<template>
  <!--<v-layout align-center>-->
    <!--<v-flex xs12 sm1 text-xs-center>-->
      <!--<div>-->
        <!--<v-btn depressed small color="primary">添加幻灯片</v-btn>-->
      <!--</div>-->
    <!--</v-flex>-->
  <!--</v-layout>-->

  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: '缩略图',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '产品id', value: 'calories' },
          { text: '操作', value: 'fat' },

        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,

          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,

          },

        ]
      }
    }
  }
</script>
