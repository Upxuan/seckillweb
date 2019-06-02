<template>
    <div id="productdetail">
        <el-container>
            <el-header>
                <span>&nbsp;&nbsp;秒杀商品详情</span>
            </el-header>
            <el-main>
                <el-card>
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" width="300">
                        </div>
                        <div class="col-md-8" style="padding: 16px;">
                            <p class="goodsName">{{ product.goods.goodsName }}</p>
                            <p class="goodDetail">{{ product.goods.goodsDetail }}</p>
                            <div class="bottom clearfix">
                                <!-- <time class="time">{{ currentDate }}</time> -->
                                <p>
                                    <span class="miaoshaPrice">¥ {{ product.goods.miaoshaPrice }} </span>
                                    <span class="goodsPrice">¥ {{ product.goods.goodsPrice }}</span>
                                </p>
                                <p><span class="card-subtitle">秒杀说明：每个用户只能购买一件同类商品</span></p>
                                <p>库存：<span>{{ product.goods.goodsStock }}</span>件</p>
                                <div class="row" style="margin-top:40px;">
                                    <div class="col-md-7">
                                        <p>秒杀开始时间：<span style="color:#F56C6C">{{ product.goods.startDate }}</span></p>
                                        <p>秒杀状态：
                                            <span style="color:#F56C6C">
                                                <span v-if="product.miaoshaStatus > 0">未开始</span>
                                                <span v-else-if="product.miaoshaStatus === 0">已开始</span>
                                                <span v-else>已结束</span>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="col-md-5">
                                        <el-button type="danger" size="small" style="margin-top:13px;" @click="handleSeckill(product.id)">立即秒杀</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            id: '',
            product: {},
        }
    },
    created() {
        var _this = this;
        _this.id = this.$route.query.id;
        // console.log(_this.id);
        var Params = {
            goodsId: _this.id,
            mobile: this.$userInfo.mobile
        }
        this.$ajax({
            url: '/api/goods/mydetail/' + _this.id,
            method: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: Params
        }).then( res => {
            console.log(res);
            if(res.data.code == 0) {
                this.product = res.data.data[0]
                console.log(_this.product.goods.startDate)
                _this.product.goods.startDate = this.$moment(_this.product.goods.startDate).format("YYYY-DD-MM HH:mm:ss")
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
        // console.log(this.$moment(1557040680000).format("YYYY-DD-MM HH:mm:ss"))

        // $.ajax({
        //     url: '/api/goods/mydetail/' + _this.id,
        //     type: "POST",
        //     data: Params,
        //     success(data) {
        //         console.log(data)
        //         if(data.code == 0){
        //             _this.product = data.data[0]
        //             console.log(_this.product)
        //             _this.product.goods.startDate = this.$moment(_this.product.goods.startDate).format("YYYY-DD-MM HH:mm:ss")
        //         }else if(data.code == 500214){
        //             _this.$message.error("手机号不存在");
        //         }else if(data.code == 500215){
        //             _this.$message.error("密码错误");
        //         }else if(data.code == 500100){
        //             _this.$message.error("服务端异常");
        //         }else if(data.code == 500101){
        //             _this.$message.error("参数校验异常");
        //         }else if(data.code == 500102){
        //             _this.$message.error("请求非法");
        //         }else if(data.code == 500104){
        //             _this.$message.error("访问太频繁");
        //         }
        //     },
        //     error() {
        //         // _this.logining = false;
        //         // this.$notify.error({ title: 'ERROR', message: '出错！请联系管理员' });
        //     }
        // });


        // console.log(_this.product.goods.goodsName);
    },
    // mounted () {
    //     // console.log(this.nowInDateBefore(1557040680000));
    //     // console.log(this.nowInDateBetwen(1557040680000, 1581573618000));
    //     // console.log(this.nowInDateAfter(1557040680000));

    //     // var interval = setInterval(() => {
    //     //     if(this.nowInDateBefore(1557040680000)){
    //     //         //flag变化
    //     //         clearInterval(interval);
    //     //     }
    //     // },1000)

    //     var _this = this;
    //     // console.log(this.product)
    //     // _this.product.goods.startDate = this.$moment(_this.product.goods.startDate).format("YYYY-DD-MM HH:mm:ss")

    //     // this.countdown()
    //     // this.getRunTime(_this.product.goods.endDate - _this.product.goods.startDate + 1);
    //     // this.getRunTime(_this.product.goods.startDate, _this.product.goods.endDate)
    // },
    methods: {
        //判断当前时间是否在d之间
        nowInDateBefore(d) {
            var dateNow = new Date();//获取当前时间

            var beginDiff = dateNow.getTime() - d;//时间差的毫秒数       
            var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数
            if (beginDayDiff < 0) { //没到开始时间
                return true;
            }
            return false;
        },
        //判断当前时间是否在d1 d2之间
        nowInDateBetwen (d1, d2) {
            //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
            // var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
            // var dateEnd = new Date(d2.replace(/-/g, "/"));//将-转化为/，使用new Date
            // var dateBegin = new Date(d1);//将-转化为/，使用new Date
            // var dateEnd = new Date(d2);//将-转化为/，使用new Date
            var dateNow = new Date();//获取当前时间

            var beginDiff = dateNow.getTime() - d1;//时间差的毫秒数       
            var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数

            var endDiff = d2 - dateNow.getTime();//时间差的毫秒数
            var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数       
            if (endDayDiff < 0) {//已过期
                return false
            }
            if (beginDayDiff < 0) {//没到开始时间
                return false;
            }
            return true;
        },
        //判断当前时间是否在d之后
        nowInDateAfter(d) {
            var dateNow = new Date();//获取当前时间
            var endDiff = d - dateNow.getTime();//时间差的毫秒数
            var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数       
            if (endDayDiff < 0) {//已过期
                return true
            }
            return false;
        },

        // countdown() {
        //     const end = Date.parse(new Date('2018-06-01'))
        //     const now = Date.parse(new Date())
        //     const msec = end - now
        //     let day = parseInt(msec / 1000 / 60 / 60 / 24)
        //     let hr = parseInt(msec / 1000 / 60 / 60 % 24)
        //     let min = parseInt(msec / 1000 / 60 % 60)
        //     let sec = parseInt(msec / 1000 % 60)
        //     this.day = day
        //     this.hr = hr > 9 ? hr : '0' + hr
        //     this.min = min > 9 ? min : '0' + min
        //     this.sec = sec > 9 ? sec : '0' + sec
        //     const that = this
        //     setTimeout(function () {
        //         that.countdown()
        //     }, 1000)
        // },
        //获取任务运行时间，规定每1秒刷新一次
        getRunTime(startDate, endDate) {
            setInterval(() => {
                var seconds = endDate-startDate;
                //$set方法实时动态刷新
                this.dowmTime.runtime=(this.timeDifference(seconds))
                // this.$set(this.dowmTime, "runtime", this.timeDifference(seconds))
            },1000)
        },
        //计算时间差方法
        timeDifference(date)
        {
            //计算出相差天数
            var days=Math.floor(date/(24*3600*1000))
            //计算出小时数
            var leave1=date%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))
            //计算相差分钟数
            var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000)
            if(days==0)
                return hours+"h"+minutes+"m"+seconds+"s"
            else if(days==1)
                return days+"day"+hours+"h"+minutes+"m"+seconds+"s"
            else
                return days+"days"+hours+"h"+minutes+"m"+seconds+"s"
        },
        handleSeckill(id) {
            console.log(this.product)
            this.$router.push({ name: 'Seckill' });
        }
    }
}
</script>

<style scoped>
#productdetail {
    font-size: 15px; 
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
    margin: 5px 200px;
}

.card-subtitle {
    background-color: #E6A23C;
    color: #FFF;
    font-size: 8px;
    padding: 2px;
    border-radius: 5px;
}

.goodsName {
    font-size: 22px;
    font-weight: bold;
}

.goodDetail {
    height: 40px;
    font-size: 14px;
    width: 100%;
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
