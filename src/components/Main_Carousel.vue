<template>
  
  <div id="mainCarousel" class="carousel slide carousel-fade" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#mainCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#mainCarousel" data-slide-to="1"></li>
      <li data-target="#mainCarousel" data-slide-to="2"></li>
    </ol>

    <video playsinline="false" autoplay="true" muted="true" loop="true" >
      <source src="@/assets/video/330149744.mp4">
    </video>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <!-- <img class="d-block w-100" alt="First slide"> -->
        <div class="carousel-caption d-none d-md-block">
          <h5>Header</h5>
          <p>paragraph</p>
        </div>
      </div>
      <div class="carousel-item">
        <!-- <img class="d-block w-100" alt="Second slide"> -->
        <div class="carousel-caption d-none d-md-block">
          <h1>Header</h1>
          <p>paragraph</p>
        </div>
      </div>
      <div class="carousel-item">
        <!-- <img class="d-block w-100" alt="Third slide"> -->
        <div class="carousel-caption d-none d-md-block">
          <h3>Header</h3>
          <p>paragraph</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'Main_Carousel',
    data () {
      return {
        windowWidth: document.documentElement.innerWidth,
        windowHeight: document.documentElement.innerHeight,
      }
    },
    mounted () {
      console.log('///////////////')
      console.log('main carousel - loaded')

      $('body').css('overflow-y','hidden');

      this.initCarousel();

      window.addEventListener('resize', this.onResizeWin)

    },
    methods: {

      onResizeWin(event) {
        // console.log('window has been resized', event) 
        this.windowWidth = event.currentTarget.innerWidth;
        this.windowHeight = event.currentTarget.innerHeight;
      },

      initCarousel() {

        $('.carousel').carousel({
          interval: 7000
        })

        var imgWidth = window.innerWidth;
        var imgHeight = window.innerHeight;

        $('.carousel-item').css({
          'width': imgWidth,
          'height': imgHeight,
        })

      }

    },
  }

</script>



<style>

  .carousel-caption{
    position: absolute;
    top: 40%;
    left: -30%;
    font-family: 'Comfortaa', cursive, sans-serif;
  }

  .carousel-indicators li{
    width: 5px;
    border-radius: 50%;
    border: 8px solid white;
    cursor: pointer;
  }

  .carousel-indicators li.active{
    border: 8px solid #FF9F1C;
  }

  /*.carousel-control-next-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid white;
    background-color: white;
    background-image: 
  }*/

  /*.carousel-control-next-icon:before {
    content: "\f0a8"; 
    font-family: FontAwesome;
    color:white;
    font-size: 200px;
  }*/

  .carousel-item {
    background-color: rgb(0, 0, 0, 0.4);
  }
  /*fade effect*/
  .carousel-fade .carousel-item {
    opacity: 0;
    transition-duration: .6s;
    transition-property: opacity;
  }

  .carousel-fade  .carousel-item.active,
  .carousel-fade  .carousel-item-next.carousel-item-left,
  .carousel-fade  .carousel-item-prev.carousel-item-right {
    opacity: 1;
  }

  .carousel-fade .active.carousel-item-left,
  .carousel-fade  .active.carousel-item-right {
    opacity: 0;
  }

  .carousel-fade  .carousel-item-next,
  .carousel-fade .carousel-item-prev,
  .carousel-fade .carousel-item.active,
  .carousel-fade .active.carousel-item-left,
  .carousel-fade  .active.carousel-item-prev {
    transform: translateX(0);
    transform: translate3d(0, 0, 0);
  }

  video {
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    /*max-height: 100%;*/
    /*max-width: 99.9%;*/
    width: auto;
    height: auto;
    z-index: -100;
  }
</style>






