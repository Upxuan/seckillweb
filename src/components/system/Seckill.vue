<template>
    <div id="productdetail">
        <el-container>
            <el-header>
                <span>&nbsp;&nbsp;秒杀订单详情</span>
            </el-header>
            <el-main>
                <el-card :body-style="{ padding: '50px 100px' }">
                    <!-- <el-header style="filter:alpha(opacity:20); opacity:0.7;  -moz-opacity:0.7;-khtml-opacity: 0.7;">
                        <span>&nbsp;&nbsp;秒杀订单详情</span>
                    </el-header> -->
                    <div style="border:1px solid #DEDEDE">
                        <div class="row" style="padding:15px;">
                            <div class="col-md-4">
                                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" width="185">
                            </div>
                            <div  class="col-md-8">
                                <p class="goodsName">iphone X</p>
                                <p class="goodDetail">Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机</p>
                                <p class="time">
                                    <span>下单时间：2019-06-02 19:58</span><br>
                                    <span>订单状态：<span style="color:#F56C6C;">已下单</span></span>
                                </p>
                                <p class="price">¥ 0.01</p>
                            </div>
                        </div>
                    </div><br>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" >
                        <!-- <el-form-item label="商品图片：" prop="content">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" width="240">
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="商品名称：" prop="title">
                            
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="订单价格：" prop="date">

                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="下单时间：" prop="date">

                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="订单状态：" prop="date">

                        </el-form-item> -->
                        <el-form-item label="收货人：" prop="date">

                        </el-form-item>
                        <el-form-item label="联系方式：" prop="date">

                        </el-form-item>
                        <el-form-item label="收获地址：" prop="date">

                        </el-form-item>
                        <el-button type="danger" style="width:100%;margin-top:20px;">立即支付</el-button>
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'productdetail',
    data () {
        return {
            ruleForm: {},
            rules: {},
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style scoped>
p{
    margin-bottom:13px;
}

.el-header {
  background-color: #F56C6C;
  color: #FFF;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  font-family: Hiragino Sans GB;
  float: left;
  line-height: 60px;
}

.el-card {
    margin: 5px 300px;
}

.goodsName {
    font-size: 18px;
    font-weight: bold;
}

.goodDetail {
    height: 40px;
    font-size: 14px;
    width: 100%;/*需要配合宽度来使用*/
    display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
    overflow: hidden;
}

.time {
    font-size: 13px;
    color: #999;
}
.price {
    float: right;
    font-size: 18px;
    color:#F56C6C;
    font-weight: bold;
}
</style>
