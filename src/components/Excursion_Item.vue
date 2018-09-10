<template>
  <div id="excurItem" class="col-12 col-sm-12 col-md-6 col-lg-6">

    <div class="shadow">
      <div id="photoInfo">
          <div id="excurRate">
            <span class="fas fa-star" style="    color: #FF9F1C;" v-for="(rate, index) in parseInt(excur.rating)"></span>
          </div>
          <div id="excurReview" class="rounded">
            <span class="fas fa-pencil-alt"></span>
            <span> {{excur.review_count}} {{ declension(excur.review_count, ['отзыв','отзыва','отзывов'])}} </span>
          </div>
          <div id="excurDuration" class="rounded">
            <span class="far fa-clock"></span>
            <span> {{excur.duration}} {{ declension(excur.duration, ['час','часа','часов'])}} </span>
          </div>
          <img class="img-fluid rounded" :src="excur.photo_url" alt="">
      </div>

      <div class="container">
        <div class="row">
          <div class="excurHead col-12">
            <h5>{{ excur.title }}</h5>
          </div>
          <div class="excurGuide col-3 text-center">
            <img class="excurGuidePhoto rounded-circle" style="width: 50px" :src="excur.guide_avatar_url" alt="">
            <span class="excurGuideName">{{ excur.guide_first_name }}</span>
          </div>
          <div class="excurShortDesc col-9">
            {{ excur.tagline }}

            <ul class="options list-inline" style="margin-top: 10px; ">
              <li class="list-inline-item" v-for="(tag, index) in excur.tags">
                <span class="far fa-check-circle"></span> {{ tag }}
              </li>
            </ul>

            <div class="excurPrice">
              <span class="far fa-credit-card"></span><span class="price"> {{ excur.full_price_local }}</span>  <span :class="iconCurr" style="color: #000; font-size: 18px;"></span> / {{ excur.price_for.substring(0, 6) }}.
            </div>
          </div>
          <div class="excurDesc col-12 collapse" :class="'excur_' + excur.url.split('/')[4]" aria-labelledby="headingThree" data-parent="#accordion">
            <span style="color: #000;">Описание:  </span> {{ excur.description }}
          </div>
        </div>
        
        
      </div>

      <div class="excurRedirect" data-toggle="collapse" :data-target="'.excur_' + excur.url.split('/')[4]" aria-expanded="false" :aria-controls="'excur_' + excur.url.split('/')[4]" @click="hide=false" v-if="hide">
        <button class="btn text-center">Подробнее</button>
      </div>
      <div class="excurRedirect" v-if="!hide">
        <button class="btn text-center" @click="submit" >Бронировать</button>
      </div>
    </div>
      
  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';
  import Moment from 'moment';
  import Toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';

  import Loader from './Loader.vue';



  export default {
    name: 'Excursion_Item',
    components: {
      'Loader': Loader,
    },
    props:{
      excur: Object,
      currency: String,
    },
    data() {
      return {
        hide: true,

        color: "#02A9E0",

      }
    },
    computed: {
      iconCurr: function(){
        switch(this.currency){
          case "RUB":
            return 'fas fa-ruble-sign';
          case "EUR":
            return 'fas fa-euro-sign';
          case "USD":
            return 'fas fa-dollar-sign';
        }
      }
    },
    created: function() {

    },
    mounted() {
    },
    methods: {
      declension(num, expressions) {
        var result;
        var count = num % 100;
        if (count >= 5 && count <= 20) {
            result = expressions['2'];
        } else {
            count = count % 10;
            if (count == 1) {
                result = expressions['0'];
            } else if (count >= 2 && count <= 4) {
                result = expressions['1'];
            } else {
                result = expressions['2'];
            }
        }
        return result;
      },

      // reload hotels
      reloadHotels(){
        BusEvent.$emit('reloadHotels');
      },

      fullScreenPhoto(){
        let self = this;
        let arr = [];
        for (var i = 0; i < self.hotel.photoIDs.length; i++) {
          arr.push("https://photo.hotellook.com/image_v2/limit/"+ self.hotel.photoIDs[i] +"/810/700.auto");
        }
        BusEvent.$emit('fullScreenPhoto', arr);
      },

      submit(){
        window.open(this.excur.url + "?exp_partner=vk23&utm_source=vk23&utm_medium=landing&utm_campaign=affiliates", '_blank');
      },
      
    },
    watch: {
    },
  }
</script>

<style>
  #excurItem{
    padding: 0px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }

  #excurItem > div{
    /*height: 400px;*/
  }

  #excurItem #photoInfo{
    position: relative;
  }
  #excurItem #excurRate{
    position: absolute;
    top: 5px;
    left: 10px;
  }


  #excurItem #excurDuration{
    position: absolute; 
    right: 15px; 
    bottom: 10px;
    background-color: #F5F5F5;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    font-size: 12px;
  }
  #excurItem #excurReview {
    position: absolute; 
    left: 15px; 
    bottom: 10px;
    background-color: #F5F5F5;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    font-size: 12px;

  }

  .excurHead{
    color: #000;
    font-size: 20px;
    padding-top: 12px;
    /*padding-bottom: 4px;*/
    margin-bottom: 10px;
    letter-spacing: -1px;
    border-bottom: 1px dashed #EBEBEB;

    /*text-align: center;*/
  }

  #excurItem .excurShortDesc .options{
    font-family: 'Comfortaa', cursive, sans-serif;
    color: #02A9E0;
    font-weight: 300;
    /*margin-top: 10px;*/
    font-size: 12px;
    /*white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;*/
  }
  #excurItem .excurShortDesc .options span{
    color: #02A9E0;
    font-weight: 400;
    font-size: 12px;
  }

  .excurShortDesc{
    font-size: 12px;
  }
  .excurDesc{
    border-top: 1px dashed #EBEBEB;
    padding-top: 12px;
    margin-top: 7px;
    margin-bottom: 7px;
    font-size: 12px;
  }

  .excurGuidePhoto{
    margin-top: 5px;
  }
  .excurGuideName{
    line-height: 0.3;
    text-align: center;
    font-size: 12px;

  }

  .excurPrice{
    float: right;
    font-size: 16px;

  }

  .excurPrice .price{
    color: #000;
    font-size: 28px;
  }

  .excurRedirect{
    margin-top: 7px;
    background-color: #02A9E0; 
    border-bottom-left-radius: 4.5px;
    border-bottom-right-radius: 4.5px;
  }

  #excurItem .btn {
    width: 100%;
    border: 1px solid #02A9E0;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #02A9E0;


    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 16px;
    line-height: 33px;
    color: white;
    letter-spacing: -0.5px;
    font-weight: 700;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
-moz-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
box-shadow: 0px 0px 15px 0px rgba(189,189,189,1)
  }

  #excurItem .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #02A9E0;
  }
  #excurItem .btn:hover{
    background-color: #189CC7;
  }


  @media (max-width: 575px){

    #excurItem #hotelInfo{
      margin-top: 10px;
      border: none;
    }

    #excurItem #priceCard{
      margin-top: 10px;
    }

    #excurItem #hotelInfo .hotelDesc .options{

      max-width: 555px;
    }

  }

</style>

