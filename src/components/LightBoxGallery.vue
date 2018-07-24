<template>
  <div id="lightBoxGallery" class="galleryModal" style="display: block;" v-if="linkPhoto.length != 0">
    <span class="close cursor" @click="closeModal()">&times;</span>
    <div class="galleryModal-content">

      <div class="slider" v-for=" (link, index) in linkPhoto" v-if="linkPhoto.length != 0">
        <div class="numbertext"> {{ index + 1 }} / {{ linkPhoto.length }}</div>
        <img class="rounded" :src='link'>
      </div>

      <!-- <div class="slide" v-if="linkPhoto.length == 0">
        <div class="numbertext">0 / 0</div>
        <img src="https://fakeimg.pl/650x600/?text=img2">
      </div>

      <div class="slide">
        <div class="numbertext">3 / 4</div>
        <img src="https://fakeimg.pl/650x600/?text=img3">
      </div>

      <div class="slide">
        <div class="numbertext">4 / 4</div>
        <img src="https://fakeimg.pl/650x600/?text=img4">
      </div> -->

      <!-- Next/previous controls -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>

      <!-- Caption text -->
      <div class="caption-container">
        <p id="caption"></p>
      </div>

      <!-- Thumbnail image controls -->
      <div class=" justify-content-center">
        <div class="column" v-for=" (link, index) in linkPhoto" v-if="linkPhoto.length != 0">
          <img class="demo rounded" :src='link' @click="currentSlide(index + 1)">
        </div>

        <!-- <div class="column">
          <img class="demo" src="https://fakeimg.pl/650x600/?text=img2" @click="currentSlide(2)">
        </div>

        <div class="column">
          <img class="demo" src="https://fakeimg.pl/650x600/?text=img3" @click="currentSlide(3)">
        </div>

        <div class="column">
          <img class="demo" src="https://fakeimg.pl/650x600/?text=img4" @click="currentSlide(4)">
        </div> -->
      </div>
      
    </div>
  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';

  export default {
    name: 'LightBoxGallery',
    components: {},
    props:{},
    data() {
      return {
        slideIndex: 1,
        linkPhoto: [],
      }
    },
    computed: {},
    created: function() {},
    mounted() {
      let self = this;
      
      document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        const keyCode = event.keyCode;
        if(keyCode == 27){
          document.getElementById('lightBoxGallery').style.display = "none";
        }
      });

      BusEvent.$on('fullScreenPhoto', function(arr) {
        self.linkPhoto = arr;
        setTimeout(() => {
          self.showSlides(self.slideIndex);
          document.getElementById('lightBoxGallery').style.display = "block";
        }, 100)
       
      });
    },
    methods: {
      // Close the Modal
      closeModal() {
        document.getElementById('lightBoxGallery').style.display = "none";
      },


      // Next/previous controls
      plusSlides(n) {
        this.showSlides(this.slideIndex += n);
      },

      // Thumbnail image controls
      currentSlide(n) {
        this.showSlides(this.slideIndex = n);
      },

      showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slider");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";
        dots[this.slideIndex-1].className += " active";
        captionText.innerHTML = dots[this.slideIndex-1].alt;
      },
    },
    watch: {},
  }
</script>

<style>



  /* Create four equal columns that floats next to eachother */
  #lightBoxGallery .column {
    float: left;
    width: 5%;
    height: 10%;
    text-align: center;
    cursor: pointer;
  }
  #lightBoxGallery .column img{
    width: 100%;
    height: 10%;
    padding: 5px 5px;
  }

  /* The Modal (background) */
  #lightBoxGallery.galleryModal {
    display: none;
    position: fixed;
    z-index: 10000;
    padding-top: 10%;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, .7);
  }

  /* Modal Content */
  #lightBoxGallery .galleryModal-content {
    position: relative;
    /*background-color: rgba(0, 0, 0, .7);*/
    margin: auto;
    padding: 0;
    width: 90%;
    height: 80%;
    /*max-width: 1200px;*/
  }

  /* The Close Button */
  #lightBoxGallery .close {
    color: white;
    position: absolute;
    top: 10px;
    right: 25px;
    font-size: 35px;
    font-weight: bold;
  }

  #lightBoxGallery .close:hover,
  #lightBoxGallery .close:focus {
    color: #999;
    text-decoration: none;
    cursor: pointer;
  }

  /* Hide the slides by default */
  #lightBoxGallery .slider{
    height: 80%;
    text-align: center;
  }
  #lightBoxGallery .slider img{
    height: 100%;
  }

  /* Next & previous buttons */
  #lightBoxGallery .prev,
  #lightBoxGallery .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -50px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Position the "next button" to the right */
  #lightBoxGallery .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  #lightBoxGallery .prev:hover,
  #lightBoxGallery .next:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  /* Number text (1/3 etc) */
  #lightBoxGallery .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
    border-radius: 3px;
    border: 1px solid #fff;
  }

  /* Caption text */
  #lightBoxGallery .caption-container {
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    padding: 2px 16px;
    color: white;
    margin-bottom: 1%;
  }

  #lightBoxGallery img.demo {
    opacity: 0.6;
  }

  #lightBoxGallery .active,
  #lightBoxGallery .demo:hover {
    opacity: 1;
  }

  #lightBoxGallery img.hover-shadow {
    transition: 0.3s;
  }

  #lightBoxGallery .hover-shadow:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

</style>

