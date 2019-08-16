<template>
    <Menu active-name="1-1" :open-names="['1-1']" @on-select="on_select">
        <Submenu  v-for="(group,i) in web_menu_setting.groups" :name="i">
            <template slot="title">
           <Icon :type="group.icon"></Icon>
           {{group.name}}
            </template>
           <MenuItem v-for="(item,j) in group.children" :name="item.index">{{item.name}}
           </MenuItem>
        </Submenu>
    </Menu>
</template>
<script>
import web_config_setting from "../class/setting"
    export default {
    data:()=>{
        return {
            web_menu_setting:web_config_setting.website_setting_menu_data
        }
    },
    methods: {
        on_select(index)
        {
          this.$emit('input',0)
          this.$router.push({path:index})

        }
    }
    }
</script>