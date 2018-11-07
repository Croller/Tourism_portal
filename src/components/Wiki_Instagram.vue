<template>
  <div id="wikiInst" class="shadow">
    <div id="slider">
      <slick
      ref="slick"
      :options="slickOptions">

      <Wiki_Instagram_Item v-bind:pos=pos v-for="(pos, index) in post" :key="index"></Wiki_Instagram_Item>
      
      <!--   <a>
          <img class="img-fluid rounded float-left" src="https://scontent-arn2-1.cdninstagram.com/vp/410576d9032a3e62a3b6148a53001dd9/5C608A14/t51.2885-15/e35/c6.0.628.628/s240x240/42569015_252624465603982_8165287516132343808_n.jpg" >
        </a>
        <a>
          <img class="img-fluid rounded float-left" src="https://scontent-arn2-1.cdninstagram.com/vp/6b9cd8532f38bc7f99152ca8eeb00645/5C59BCCD/t51.2885-15/e35/c0.134.1080.1080/s240x240/43402919_257122981658115_3725009679315274079_n.jpg" >
        </a>
        <a>
          <img class="img-fluid rounded float-left" src="https://scontent-arn2-1.cdninstagram.com/vp/c3f9909d22def9105d508dab27a31a1d/5C5ABAF6/t51.2885-15/e35/c256.0.568.568/s240x240/43817933_1041301926051981_4340858705006354945_n.jpg" >
        </a>

        <a>
          <img class="img-fluid rounded float-left" src="https://scontent-arn2-1.cdninstagram.com/vp/028130e2582dff1fbfca4e5e97923bee/5C56A96F/t51.2885-15/e35/s240x240/42530468_555879841501079_668048035606051045_n.jpg" >
        </a>
        <a>
          <img class="img-fluid rounded float-left" src="https://scontent-arn2-1.cdninstagram.com/vp/6cbcf83a0d7132ab61dbd1fe617f35aa/5C5C81BE/t51.2885-15/e35/c185.0.710.710/s240x240/42186750_188623748702841_8434307666869399842_n.jpg" >
        </a> -->
      </slick>
      <a id="slickPrev" v-on:click="prev">
        <span class="fas fa-chevron-circle-left" ></span>
      </a>
      <a id="slickNext" v-on:click="next">
        <span class="fas fa-chevron-circle-right"></span>
      </a> 
    </div>
  </div>
</template>

<script>
  import Wiki_Instagram_Item from './Wiki_Instagram_Item.vue';
  // import Slick from 'vue-slick';
  import '../../node_modules/slick-carousel/slick/slick.css';

  export default {
    name: 'Wiki_Instagram',
    components: { 
      // "Slick": Slick,
      "Wiki_Instagram_Item": Wiki_Instagram_Item,
    },
    prop:{
      post: Object,
    },
    data() {
      return {
        slickOptions: {
          infinite: true,
          accessibility: true,
          adaptiveHeight: true,
          arrows: false,
          draggable: true,
          swipe: true,
          clazyLoad: 'ondemand',
          slidesToShow: (!this.detectmob() ? 4 : 2),
          slidesToScroll: 1,
          centerMode: true,
          focusOnSelect: true
        } 
      }
    },
    computed: {},
    created: function() {},
    mounted() {
      console.log('///////////////');
      console.log('wiki instagram - loaded');

      
    },
    methods: {
      next() {
        this.$refs.slick.next()
      },
      prev() {
        this.$refs.slick.prev()
      },
      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$refs.slick.reSlick()
      },

      detectmob() { 
        if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ){
          return true;
        }
        else {
          return false;
        }
      },
    },
    watch: {},
  }
</script>

<style>
  #wikiInst{
    padding: 10px;
  }
  #wikiInst #slider{
    position: relative;
  }

  #wikiInst #slickPrev, #wikiInst #slickNext{
    position: absolute;
    top: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 10%;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  #wikiInst #slickPrev{
    left: 0;
  }
  #wikiInst #slickNext{
    right: 0;
  }
  #wikiInst #slickPrev:hover{
    background: rgba(230,230,230,1);
    background: -moz-linear-gradient(left, rgba(230,230,230,1) 0%, rgba(255,255,255,0.21) 79%, rgba(255,255,255,0) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(230,230,230,1)), color-stop(79%, rgba(255,255,255,0.21)), color-stop(100%, rgba(255,255,255,0)));
    background: -webkit-linear-gradient(left, rgba(230,230,230,1) 0%, rgba(255,255,255,0.21) 79%, rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(left, rgba(230,230,230,1) 0%, rgba(255,255,255,0.21) 79%, rgba(255,255,255,0) 100%);
    background: -ms-linear-gradient(left, rgba(230,230,230,1) 0%, rgba(255,255,255,0.21) 79%, rgba(255,255,255,0) 100%);
    background: linear-gradient(to right, rgba(230,230,230,1) 0%, rgba(255,255,255,0.21) 79%, rgba(255,255,255,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6e6e6', endColorstr='#ffffff', GradientType=1 );
  }
  #wikiInst #slickNext:hover{
    background: rgba(255,255,255,0);
    background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 21%, rgba(230,230,230,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(21%, rgba(255,255,255,0.21)), color-stop(100%, rgba(230,230,230,1)));
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 21%, rgba(230,230,230,1) 100%);
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 21%, rgba(230,230,230,1) 100%);
    background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 21%, rgba(230,230,230,1) 100%);
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 21%, rgba(230,230,230,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e6e6e6', GradientType=1 );
  }
</style>

