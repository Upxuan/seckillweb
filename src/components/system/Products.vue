<template>
    <div id="products">
        <el-container>
            <el-header>
                <span>&nbsp;&nbsp;秒杀商品列表</span>
            </el-header>
            <el-main>
                <div class="row">
                    <div class="col-md-3 col-sm-4" v-for="(item, index) in this.productslist" :key="index">
                        <el-card>
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                            <div style="padding: 14px 5px 0 14px;">
                                <p class="goodsName">{{ item.goodsName }}</p>
                                <!-- <span>{{ item.goodsName }}</span> -->
                                <p class="goodDetail">{{ item.goodsDetail }}</p>
                                <div class="bottom clearfix">
                                    <!-- <time class="time">{{ currentDate }}</time> -->
                                    <p>
                                        <span class="miaoshaPrice">¥ {{ item.miaoshaPrice }} </span>
                                        <span class="goodsPrice">¥ {{ item.goodsPrice }}</span>
                                    </p>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <p><span class="card-subtitle">年度历史最低价</span></p>
                                            <p>剩余<span>{{ item.goodsStock }}</span>件</p>
                                        </div>
                                        <div class="col-md-5">
                                            <el-button type="danger" size="small" style="margin-top:13px;" @click="handleSeckill(item.id)">立即秒杀</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'products',
    data () {
        return {
            list:[
                {q:"a"},
                {q:"b"}
            ],
            productslist: [],
            currentDate: new Date()
        }
    },
    mounted() {
        this.$ajax({
          url: '/api/goods/list',
          method: 'post',
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        }).then( res => {
            // console.log(res);
            if(res.data.code == 0) {
                this.productslist = res.data.data;
            }else if(res.data.code == 500100){
                _this.$message.error("服务端异常");
            }else if(res.data.code == 500101){
                _this.$message.error("参数校验异常");
            }else if(res.data.code == 500102){
                _this.$message.error("请求非法");
            }else if(res.data.code == 500104){
                _this.$message.error("访问太频繁");
            }
        }).catch( error => {
          this.$notify.error({ title: 'ERROR', message: '出错！请联系管理员' });
        });
    },
    methods: {
        handleSeckill(id) {
            // console.log(id);
            // console.log(this.$userInfo.mobile);
            this.$router.push({ 
                name: 'ProductDetail',
                query: { id: id }
            });
        }

    }
}
</script>

<style scoped>
.el-header {
  background-color: #F56C6C;
  /* background-color: rgb(79,184,238); */
  color: #FFF;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  font-family: Hiragino Sans GB;
  float: left;
  line-height: 60px;
  /* min-width: 1200px; */
}

.el-main {
    padding: 30px 80px;
}

.el-card {
    margin: 5px;
}

.card-subtitle {
    background-color: #E6A23C;
    color: #FFF;
    font-size: 8px;
    padding: 2px;
    border-radius: 5px;
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

.goodsPrice {
    text-decoration: line-through;
    font-size: 14px;
}

.miaoshaPrice {
    font-size: 18px;
    color:#F56C6C;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.el-button {
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

</style>
