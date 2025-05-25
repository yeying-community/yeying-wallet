<template>
  <div>
    <!-- <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div> -->
    <!-- <p>例子</p> -->
    <div class="test-button">
      <!-- <button @click="changeImg" class="btn">changeImg</button> -->
      <el-avatar :size="80" :src="previews" />
      <div>
        <label class="btn" for="uploads">上传头像</label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)">
      </div>
    </div>
    <div class="cut">
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber"
        :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
        :auto-crop="option.autoCrop" :auto-crop-width="200" :auto-crop-height="200" :center-box="option.centerBox"
				@real-time="realTime" :high="option.high"
          @img-load="imgLoad" mode="contain" :max-img-size="option.max" @crop-moving="cropMoving"></vue-cropper>
    </div>
     <!-- <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px',zoom:0.5}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div> -->
    
    <!-- <div class="test-button">
      <button @click="changeImg" class="btn">changeImg</button>
      <label class="btn" for="uploads">upload</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)">
      <button @click="startCrop" v-if="!crap" class="btn">start</button>
      <button @click="stopCrop" v-else class="btn">stop</button>
      <button @click="clearCrop" class="btn">clear</button>
      <button @click="refreshCrop" class="btn">refresh</button>
      <button @click="changeScale(1)" class="btn">+</button>
      <button @click="changeScale(-1)" class="btn">-</button>
      <button @click="rotateLeft" class="btn">rotateLeft</button>
      <button @click="rotateRight" class="btn">rotateRight</button>
      <button @click="finish('base64')" class="btn">preview(base64)</button>
      <button @click="finish('blob')" class="btn">preview(blob)</button>
      <a @click="down('base64')" class="btn">download(base64)</a>
      <a @click="down('blob')" class="btn">download(blob)</a>
         <a @click="() => option.img = ''" class="btn">清除图片</a>
      <div style="display:block; width: 100%;">
        <label class="c-item">
          <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
          <input type="checkbox" v-model="option.original">
          <span>original: {{ option.original}}</span>
        </label>
        <label class="c-item">
          <span>能否拖动图片</span>
          <input type="checkbox" v-model="option.canMove">
        </label>
        <label class="c-item">
          <span>能否拖动截图框</span>
          <input type="checkbox" v-model="option.canMoveBox">
          <span>canMoveBox: {{ option.canMoveBox}}</span>
        </label>
        <label class="c-item">
          <span>截图框固定大小</span>
          <input type="checkbox" v-model="option.fixedBox">
          <span>fixedBox: {{ option.fixedBox}}</span>
        </label>
        <label class="c-item">
          <span>是否输出原图比例的截图</span>
          <input type="checkbox" v-model="option.full">
          <span>full: {{ option.full}}</span>
        </label>
        <label class="c-item">
          <span>是否自动生成截图框</span>
          <input type="checkbox" v-model="option.autoCrop">
          <span>autoCrop: {{ option.autoCrop}}</span>
        </label>
        <label class="c-item">
          <span>是否根据dpr生成适合屏幕的高清图片</span>
          <input type="checkbox" v-model="option.high">
          <span>high: {{ option.high}}</span>
        </label>
        <label class="c-item">
          <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
          <input type="checkbox" v-model="option.centerBox">
          <span>centerBox: {{ option.centerBox}}</span>
        </label>
        <label class="c-item">
          <p>输出图片格式</p>
          <label>jpg
            <input type="radio" name="type" value="jpeg" v-model="option.outputType">
          </label>
          <label>png
            <input type="radio" name="type" value="png" v-model="option.outputType">
          </label>
          <label>webp
            <input type="radio" name="type" value="webp" v-model="option.outputType">
          </label>
        </label>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";
import { ref, onMounted, watch, nextTick } from 'vue'
import $account from '@/plugins/account'
const props = defineProps(["curImg"])
const model = ref(false)
const modelSrc = ref('')
const crap = ref(false)
const previews = ref()
const cropper = ref()
const lists = ref([
      {
        img: props.curImg,
      },
    ])
const option = ref({
  img: props.curImg,
  size: 1,
  full: false,
  outputType: 'png',
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 200,
  autoCropHeight: 200,
  centerBox: true,
  high: true,
  max: 99999,
})
const show = ref(true)
const fixed = ref(true)
const fixedNumber = ref([1, 1])
const changeImg = () => {
  option.value.img = lists.value[~~(Math.random() * lists.value.length)].img;
}
const startCrop = () => {
  // start
  crap.value = true;
  cropper.value.startCrop();
}
const stopCrop = () => {
  //  stop
  crap.value = false;
  cropper.value.stopCrop();
}
const clearCrop = () => {
  // clear
  cropper.value.clearCrop();
}
const refreshCrop = () => {
  // clear
  cropper.value.refresh();
}
const changeScale = (num) => {
  num = num || 1;
  cropper.value.changeScale(num);
}
const rotateLeft = () => {
  cropper.value.rotateLeft();
}
const rotateRight = () => {
  cropper.value.rotateRight();
}
const finish = (type) => {
  // 输出
  // var test = window.open('about:blank')
  // test.document.body.innerHTML = '图片生成中..'
  return new Promise((resolve, reject) => {
    try{
      cropper.value.getCropData((data) => {
        // model.value = true;
        resolve(data)
        // console.log('outimg base64-->',data)
        // modelSrc.value = data;
      });
    }catch(e){
      reject(e)
    }
  })
}
// 实时预览函数
const realTime = async (data) => {
  const img = await finish()
  previews.value = img
  // previews.value = {
  //   ...data,
    // div: {
    //   ...data.div,
    //   width: '100px',
    //   height: '100px',
    // },
    // img: {
    //   ...data.img,
    //   width: '200px',
    //   height: '200px',
    //   'transform-origin': '0 0', // 确保缩放从左上角计算
    //   'object-fit': 'contain', // 保持比例，填充但不拉伸
    // },
  // };
  console.log(data);
}
const down = (type) => {
  // event.preventDefault()
  var aLink = document.createElement('a');
  aLink.download = 'demo';
  // 输出
  if (type === 'blob') {
    cropper.value.getCropBlob((data) => {
      downImg.value = window.URL.createObjectURL(data);
      aLink.href = window.URL.createObjectURL(data);
      aLink.click();
    });
  } else {
    cropper.value.getCropData((data) => {
      downImg.value = data;
      aLink.href = data;
      aLink.click();
    });
  }
}

const uploadImg = (e, num) => {
  //上传图片
  // this.option.img
  var file = e.target.files[0];
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
    return false;
  }
  var reader = new FileReader();
  reader.onload = (e) => {
    let data;
    if (typeof e.target.result === 'object') {
      // 把Array Buffer转化为blob 如果是base64不需要
      data = window.URL.createObjectURL(new Blob([e.target.result]));
    } else {
      data = e.target.result;
    }
    if (num === 1) {
      option.value.img = data;
    } else if (num === 2) {
      example2.value.img = data;
    }
  };
  // 转化为base64
  // reader.readAsDataURL(file)
  // 转化为blob
  reader.readAsArrayBuffer(file);
}
const imgLoad = (msg) => {
  console.log(msg);
}
const cropMoving = (data) => {
  console.log(data, '截图框当前坐标');
}
defineExpose({ finish });
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.cut {
  width: 210px;
  height: 210px;
  margin: 30px auto;
}

.c-item {
  max-width: 800px;
  margin: 10px auto;
  margin-top: 20px;
}

.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all .2s ease;
  text-decoration: none;
  user-select: none;
}

.des {
  line-height: 30px;
}

code.language-html {
  padding: 10px 20px;
  margin: 10px 0px;
  display: block;
  background-color: #333;
  color: #fff;
  overflow-x: auto;
  font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
  border-radius: 5px;
  white-space: pre;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
  color: black;
}*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.test {
  height: 500px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 50vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  user-select: none;
}

@keyframes slide {
  0%  {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

</style>