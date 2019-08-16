<template>
   <div class="layui-fluid">
            <div class="layui-row">
                <form class="layui-form">
                    <div class="layui-form-item">
                        <label for="username" class="layui-form-label">
                            <span class="x-red">*</span>用户名</label>
                        <div class="layui-input-inline">
                            <input type="text" id="username" name="username" required="" lay-verify="required" autocomplete="off" class="layui-input"></div>
                    </div>
                    <div class="layui-form-item">
                        <label for="username" class="layui-form-label">
                            <span class="x-red">*</span>收货人</label>
                        <div class="layui-input-inline">
                            <input type="text" id="username" name="username" required="" lay-verify="required" autocomplete="off" class="layui-input"></div>
                    </div>
                    <div class="layui-form-item">
                        <label for="phone" class="layui-form-label">
                            <span class="x-red">*</span>手机</label>
                        <div class="layui-input-inline">
                            <input type="text" id="phone" name="phone" required="" lay-verify="phone" autocomplete="off" class="layui-input"></div>
                    </div>
                    <div class="layui-form-item">
                        <label for="username" class="layui-form-label">
                            <span class="x-red">*</span>收货地址</label>
                        <div class="layui-input-inline">
                            <input type="text" id="username" name="username" required="" lay-verify="required" autocomplete="off" class="layui-input"></div>
                    </div>
                    <div class="layui-form-item">
                        <label for="username" class="layui-form-label">
                            <span class="x-red">*</span>配送物流</label>
                        <div class="layui-input-inline">
                            <select id="shipping" name="shipping" class="valid">
                                <option value="shentong">申通物流</option>
                                <option value="shunfeng">顺丰物流</option></select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label for="username" class="layui-form-label">
                            <span class="x-red">*</span>支付方式</label>
                        <div class="layui-input-inline">
                            <select name="contrller">
                                <option>支付方式</option>
                                <option>支付宝</option>
                                <option>微信</option>
                                <option>货到付款</option></select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label for="L_email" class="layui-form-label">
                            <span class="x-red">*</span>发票抬头</label>
                        <div class="layui-input-inline">
                            <input type="text" id="L_email" name="email" required="" lay-verify="email" autocomplete="off" class="layui-input"></div>
                        <div class="layui-form-mid layui-word-aux">
                            <span class="x-red">*</span></div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <label for="desc" class="layui-form-label">商品增加</label>
                        <div class="layui-input-block">
                            <table class="layui-table">
                                <tbody>
                                    <tr>
                                        <td>haier海尔 BC-93TMPF 93升单门冰箱</td>
                        <td>0.01</td>
                    <td>984</td>
            <td>1</td>
            <td>删除</td></tr>
            <tr>
                <td>haier海尔 BC-93TMPF 93升单门冰箱</td>
        <td>0.01</td>
        <td>984</td>
        <td>1</td>
        <td>删除</td></tr>
        </tbody>
        </table>
        </div>
        </div>
        <div class="layui-form-item layui-form-text">
            <label for="desc" class="layui-form-label">描述</label>
            <div class="layui-input-block">
                <textarea placeholder="请输入内容" id="desc" name="desc" class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label"></label>
            <button class="layui-btn" lay-filter="add" lay-submit="">增加</button></div>
        </form>
        </div>
        </div>  
</template>
<script>
export default {
    
}
</script>

