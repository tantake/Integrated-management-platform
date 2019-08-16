var web_config_setting = {
    website_setting_menu_data: {
        name: "综合治理菜单",
        icon: "settings",
        groups: [{
                name: "辖区管理",
                icon: "ios-analytics",
                children: [{
                        name: '小区管理',
                        index: '1-1',
                        route: ''
                    },
                    {
                        name: '社区服务',
                        index: '1-2',
                        route: ''
                    },
                    {
                        name: '报警',
                        index: '1-3',
                        route: ''
                    },
                    {
                        name: '人员/车辆管理',
                        index: '1-4',
                        route: ''
                    }

                ]
            },
            {
                name: "档案库",
                icon: "ios-filing",
                children: [{
                        name: '一人一档',
                        index: '2-1',
                        route: ''
                    },
                    {
                        name: '基础信息',
                        index: '2-2',
                        route: ''
                    }
                ]
            },
            {
                name: "社区管理",
                icon: "ios-cog",
                children: [{
                        name: '社区关怀',
                        index: '3-1',
                        route: ''
                    },
                    {
                        name: '管控人员',
                        index: '3-2',
                        route: ''
                    }
                ]
            }
        ]
    },
    website_setting_order_data: [
        "订单编号", "收货人", "总金额", "应付金额", "订单状态",
        "支付状态", "发货状态", "支付方式", "配送方式", "下单时间"
    ],
    website_setting_goods_data: [
        "商品型号", "商品分类", "商品名", "本店价", "商品出厂价", "基础拿货价", "上架"
    ],
    website_setting_catalog_data: [
        "分类ID", "分类名", "归属分类", "是否已废弃"
    ],
    website_setting_brand_data: [
        "品牌ID", "品牌名", "是否已废弃"
    ],

}

export default web_config_setting;