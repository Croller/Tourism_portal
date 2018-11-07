<template>
  <div class="instItem">

    <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div id="logo">
            <i class="fab fa-instagram"></i>
          </div>
          <a target="_blank" :href=pos.link>
            <img class="img-fluid rounded" :src=pos.img >
          </a>
          <div id="info">
            <div id="like">
              <span class="fas fa-heart"></span>&nbsp;&nbsp;<span class="text-extra-small">{{ pos.like }}</span>
            </div>
            <div id="comment">
              <span class="fas fa-comment"></span>&nbsp;&nbsp;<span class="text-extra-small">{{ pos.comment }}</span>
            </div>
          </div>
        </div>
        <div class="back">
          <!-- <div style="width: 240px;">
          {{ pos.text.toString() }} -->
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="logo">
      <i class="fab fa-instagram"></i>
    </div>
    <a target="_blank" :href=pos.link>
      <img class="img-fluid rounded" :src=pos.img >
    </a>
    <div id="info">
      <div id="like">
        <span class="fas fa-heart"></span>&nbsp;&nbsp;<span class="text-extra-small">{{ pos.like }}</span>
      </div>
      <div id="comment">
        <span class="fas fa-comment"></span>&nbsp;&nbsp;<span class="text-extra-small">{{ pos.comment }}</span>
      </div>
    </div> -->
    <!-- <span id="desc">
      {{ pos.text}}
    </span> -->
  </div>
</template>

<script>

  import Moment from 'moment';

  import Loader from './Loader.vue';

  export default {
    name: 'Wiki_Instagram_Item',
    components: {
      'Loader': Loader,
    },
    props:{
      pos: Object,
    },
    data() {
      return {
      }
    },
    computed: {
    },
    created: function() {
    },
    mounted() {
        // console.log('///////////////');
        // console.log('get instagram item - loaded');
    },
    methods: {
    },
    watch: {
    },
  }
</script>

<style>
  .instItem{
    display: inline-block;
    text-align: center;
    margin-right: 10px;
  }
  .instItem:hover{
    cursor: pointer;
  }
  .instItem #logo{
    text-align: left;
    position: relative;
    padding-left: 10px;
    margin-bottom: -40px;
    margin-top: 8px;
    /*z-index: 100;*/
    /*left: 5px;*/
    color: #fff;
    font-size: 22px;
  }
  .instItem #info{
    margin-top: -50px;
    margin-bottom: 15px;
    color: white;
    font-size: 18px;
  }

  .instItem #info #like, .instItem #info #comment, .instItem #info #desc{
    display: inline-block;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    border-radius: 3px;
    /*border: 1px solid white;
    /*line-height: 20px;*/
  }

  .instItem #like{
    margin-right: 15px;
  }

 /*flip card */
/*.flip-container {
  perspective: 1000px;
}
.flip-container:hover .flipper, .flip-container.hover .flipper {
    transform: rotateY(180deg);
  }

.flip-container, .front, .back {
  width: 240px;
  height: 240px;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

.front, .back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}

.front {
  z-index: 2;
  transform: rotateY(0deg);
}

.back {
  border-radius: 7px;
  border: 1px solid #e5e6e7;
  white-space:nowrap;
  word-break: break-word;
  text-align: left;
  overflow-wrap: break-word;
  padding: 5px;
  transform: rotateY(180deg);
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
}*/
</style>

