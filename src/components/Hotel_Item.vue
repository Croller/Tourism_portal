<template>
  <div id="hotelItem" class="row shadow">
    <div id="photoInfo" class="col-12 col-sm-4 col-md-4 col-lg-4">
      <div class="row">
        <div :id='"photoCarousel_"+ hotel.id' class="carousel carousel-fade slide" data-ride="carousel" data-interval="false">
          <div class="carousel-inner">
            <div :class='"carousel-item " + (index == 0 ? "active" : "")' v-for="(id, index) in hotel.photoIDs" v-if="hotel.photoIDs.length > 0">
              <img class="img-fluid rounded" :src='"https://photo.hotellook.com/image_v2/limit/"+ ( id.length != 0 ? id : "h1743427074_31_110") +"/710/600.auto"' alt="">
            </div>
            <div class="carousel-item active" v-if="hotel.photoIDs.length == 0">
              <img class="img-fluid rounded" src="https://fakeimg.pl/650x600/?text=Image" alt="">
            </div>
          </div>
          <a class="carousel-control-prev" :href='"#photoCarousel_"+hotel.id' role="button" data-slide="prev" v-on:click="countHotelPhoto -= 1">
            <span class="fas fa-chevron-circle-left" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" :href='"#photoCarousel_"+hotel.id' role="button" data-slide="next" v-on:click="countHotelPhoto += 1">
            <span class="fas fa-chevron-circle-right" aria-hidden="true"></span>
          </a>
          <div class="row justify-content-center">
            <div id="countPhoto" class="" v-if="hotel.photoIDs.length > 0">
              <span id="currPhoto" > {{ countHotelPhoto }} </span> / <span id="lenPhoto"> {{ hotel.photoIDs.length }} </span>
            </div>
            <div id="countPhoto" class="" v-if="hotel.photoIDs.length == 0">
              <span id="currPhoto"> Нет фото</span>
            </div>
          </div>
          <div class="row justify-content-right" v-if="hotel.photoIDs.length != 0">
            <div id="fullScreenPhoto" @click="fullScreenPhoto()">
              <span class="far fa-images"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="hotelInfo" class="col-12 col-sm-4 col-md-4 col-lg-4">
      <div class="row">
        <div class="hotelRate col-12 text-center">
          <div class="row">
            <div class="col-8">
              <span class="fas fa-star float-left" v-for="star in hotel.stars" v-if="hotel.stars != 0"></span>
              <span class="fas fa-star float-left" style="color: #888" v-if="hotel.stars == 0"></span>
            </div>
            <div class="col-4">
              <span class="badge badge-success float-right"> {{ hotel.rating }}</span>
            </div>
          </div>
        </div>
        <div class="hotelName col-12 text-center" v-if="hotel.name.length <= 60">
          <span  class="text-small"> {{ hotel.name }} </span>
        </div>
        <div class="hotelName col-12 text-center" v-if="hotel.name.length > 60" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          <span  class="text-small"> {{ hotel.name }} </span>
        </div>
        
        <div class="hotelDesc col-12">
          <ul class="list-unstyled">
            <li class="list-item">Адрес: <span>{{ hotel.address }}</span></li>
            <li class="list-item">Цена: <span>{{ hotel.minPriceTotal }} </span> - <span>{{ hotel.maxPrice }} руб</span></li>
            <li class="list-item">Центр: <span>{{ hotel.distance }} км</span></li>
            

            <ul class="options list-inline">
              <li class="list-inline-item">
                <i class="fas fa-snowflake"></i>
              </li>
              <li class="list-inline-item">
                <i class="fas fa-taxi"></i>
              </li>
              <li class="list-inline-item">
                <i class="fas fa-bath"></i>
              </li>
              <li class="list-inline-item">
                <i class="fas fa-smoking"></i>
              </li>
              <li class="list-inline-item">
                <i class="fas fa-parking"></i>
              </li>
              <li class="list-inline-item">
                <i class="fas fa-broom"></i>
              </li>
            </ul>
          </ul>
        </div>
      </div>

      <div id="descShow" class="col-12 text-center collapsed" data-toggle="collapse" :data-target="'.handl_' + hotel.id" aria-expanded="false" :aria-controls="'handl_' + hotel.id">
        <span class="fas fa-chevron-circle-up" @click="hide=true"></span>
        <span class="fas fa-chevron-circle-down" @click="hide=false"></span>
      </div>
    </div>

    <div id="priceInfo" class="col-12 col-sm-4 col-md-4 col-lg-4 order-2 order-sm-2 order-md-2 order-lg-1">
      <div class="row">
        <div class="col-12 text-center">
          <!-- <p class="text-center text-extra-small">
            осталось 5 билетов
          </p> -->
          <div id="priceCard" :style='"margin-top:" + 10 + "%"'>
            <span class="text-extra-small" style="color:#595959;">Цена за {{ countNight() }} ночей:</span>
            <div id="price">
              {{ hotel.minPriceTotal }} руб.
            </div>
            <button class="btn btn-primary collapsed" data-toggle="collapse" :data-target="'.handl_' + hotel.id" aria-expanded="false" :aria-controls="'handl_' + hotel.id" ref="collapseBtn" @click="(hide == true ? hide = false : hide = true)" v-if="hide">
              Подробнее...
            </button>
          </div>
          
          <div id="priceAgency" style="margin-top: 10px;">
            <img :src='"http://pics.avs.io/hl_gates/120/30/"+hotel.rooms[0].agencyId+".png"'>
          </div>
          <!-- <a class="text-center text-extra-small" target="_blank" :href=salesInfo(ticket.terms).site> {{ salesInfo(ticket.terms).name }} </a> -->
        </div>

      </div>
    </div>

    <div id="roomList" class="col-12 order-1 order-sm-1 order-md-1 order-lg-2 collapse" :class="'handl_'+ hotel.id" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="groupRoom" v-for="groupRoom in sortObjList(groupObjVal(this.hotel.rooms, 'internalTypeId'), 'total')"> 
        <Hotel_Room_Item :groupRoom="groupRoom" :hotelID="hotel.id" :photoLen="photoLen(groupRoom)" ></Hotel_Room_Item>
      </div> 
      <div id="descShowRoom" class="col-12 text-center" data-toggle="collapse" :data-target="'.handl_' + hotel.id" aria-expanded="false" :aria-controls="'handl_' + hotel.id" >
        <span class="fas fa-chevron-circle-up" @click="hide=true"></span>
        <span class="fas fa-chevron-circle-down" @click="hide=false"></span>
      </div>
    </div>
      
  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';
  import Moment from 'moment';
  import Toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';

  import Hotel_Room_Item from './Hotel_Room_Item.vue';


  export default {
    name: 'Hotel_Item',
    components: {
      'Hotel_Room_Item': Hotel_Room_Item,
    },
    props:{
      hotel: Object,

    },
    data() {
      return {
        countHotelPhoto: 1,
        hide: true,
      }
    },
    computed: {
    },
    created: function() {

    },
    mounted() {

      // get photo hotels
      // https://yasen.hotellook.com/photos/hotel_photos?id=1898372396,1249981778
      // get single photo for hotel
      // https://photo.hotellook.com/image_v2/limit/8230374267/800/520.auto
      // get room photo
      // http://photo.hotellook.com/rooms/limit/h1743427074_31_0/200/200.auto
      // get sprite photo
      // http://photo.hotellook.com/rooms/sprite/h1743427074_31/100/3/50.auto

      // console.log(this.sortObjList(this.groupObjVal(this.hotel.rooms, 'internalTypeId'), 'total'));
      // console.log(this.sortObjVal(this.groupObjVal(this.hotel.rooms, 'internalTypeId'), 'total'))

    },
    methods: {
      // declension(num, expressions) {
      //   var result;
      //   var count = num % 100;
      //   if (count >= 5 && count <= 20) {
      //       result = expressions['2'];
      //   } else {
      //       count = count % 10;
      //       if (count == 1) {
      //           result = expressions['0'];
      //       } else if (count >= 2 && count <= 4) {
      //           result = expressions['1'];
      //       } else {
      //           result = expressions['2'];
      //       }
      //   }
      //   return result;
      // },
      fullScreenPhoto(){
        let self = this;
        let arr = [];
        for (var i = 0; i < self.hotel.photoIDs.length; i++) {
          arr.push("https://photo.hotellook.com/image_v2/limit/"+ self.hotel.photoIDs[i] +"/810/700.auto");
        }
        BusEvent.$emit('fullScreenPhoto', arr);
      },

      hideBtn(){
        console.log(this.$refs.collapseBtn)
      },

      photoLen(groupRoom){
        if(groupRoom[0].internalTypeId != null){
          return this.hotel.photosByRoomType[groupRoom[0].internalTypeId];
        }else{
          return null;
        }
      },

      sortObjList(arr, filtr){
        let newArr = {}
        for(var key in arr) {
          newArr[arr[key][0].total] = arr[key]
        }
        return newArr;
      },

      groupObjVal(arr, filtr){
        return arr.reduce(function(rv, x) {
          if(rv[x[filtr]] = rv[x[filtr]] || []){
            rv[x[filtr]].push(x)
          }
          return rv;
        }, {});
      },

      countNight(){
        let checkIn = Moment(this.hotel.rooms[0].fullBookingURL.split('checkIn=')[1].split('&')[0], "YYYY-MM-DD");
        let checkOut = Moment(this.hotel.rooms[0].fullBookingURL.split('checkOut=')[1].split('&')[0], "YYYY-MM-DD");
        return checkOut.diff(checkIn, 'days')
      },

      plusPhoto(){
        let count = 1;

        return count
      },

      sum(arr) {
        return Array.prototype.reduce.call(arr, function(a, b) {
          return a + b;
        }, 0);
      },
      a() { alert(this); } 
    },
    watch: {

      countHotelPhoto: function(nVal, oVal){
        if(nVal != 0 && nVal <= this.hotel.photoIDs.length){
          this.countHotelPhoto = nVal;
        }
        if(nVal == 0){
          this.countHotelPhoto = this.hotel.photoIDs.length;
        }
        if(nVal > this.hotel.photoIDs.length){
          this.countHotelPhoto = 1;
        }
      }
    },
  }
</script>

<style>
  #hotelItem{
    padding: 10px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }

  #hotelItem > #photoInfo > .row{
    /*margin-left: -30px;*/
    /*margin-right: -0px;*/
  }


  #hotelItem .carousel-control-prev, #hotelItem .carousel-control-next{
    opacity: 1;
  }
  #hotelItem #photoInfo #countPhoto{
    color: white;
    font-size: 10px;
    bottom: 5%;
    position: absolute;
    text-align: center;
    border-radius: 3px;
    border: 1px solid white;
    padding: 4px 10px 3px 10px;
    line-height: 1;
  }
  #hotelItem #photoInfo #fullScreenPhoto{
    color: white;
    font-size: 18px;
    top: 0;
    right: 2%;
    position: absolute;
    cursor: pointer;
  }


  #hotelItem #hotelInfo{
    /*border-left: 1px dashed #EBEBEB;*/
    border-right: 1px dashed #EBEBEB;
  }
  #hotelItem #hotelInfo .hotelRate{
    font-size: 14px;
  }
  #hotelItem #hotelInfo .hotelRate .fas.fa-star{
    padding-top: 2px;
    color: #FF9F1C;
  }
   #hotelItem #hotelInfo .hotelRate .badge-success{
    padding-top: 5px;
  }

  #hotelItem #hotelInfo .hotelName{
    margin-top: 10px;
/*    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;*/
    max-width: 100%;
    color: #000;
  }
  #hotelItem #hotelInfo .hotelName span{
    font-weight:700; 
    font-size: 16px; 
    color: #000;
    cursor: pointer;
  }
  #hotelItem #hotelInfo .hotelName span:hover{
    text-decoration:underline;
  }
  #hotelItem #hotelInfo .hotelDesc{
    color: #000;
    font-size: 12px; 
    font-weight: 300;
    margin-top: 10px;
    line-height: 1.5;
  }
  #hotelItem #hotelInfo .hotelDesc span{
    color: #000;
    font-weight: 700;
  }
  #hotelItem #hotelInfo .hotelDesc .options{
    font-family: 'Comfortaa', cursive, sans-serif;
    color: #53AD32;
    font-weight: 300;
    margin-top: 10px;
    font-size: 16px;
  }

  #hotelItem #descShow, #hotelItem #descShowRoom{
    position: absolute;
    left: 0px;
    bottom: -10px;
    color: #55B533;
    cursor: pointer;
  }
  #hotelItem #descShowRoom{
    position: relative;
    margin-bottom: 5px;
  }
  #hotelItem #descShow, #hotelItem #descShowRoom{
    cursor: pointer;
  }
  #hotelItem #descShow:hover .fas.fa-chevron-circle-up, #hotelItem #descShow:hover .fas.fa-chevron-circle-down, #hotelItem #descShowRoom:hover .fas.fa-chevron-circle-up, #hotelItem #descShowRoom:hover .fas.fa-chevron-circle-down{
    transition: font-size 0.1s;
    font-size: 20px;
  }
  #hotelItem #descShow[aria-expanded=true] .fa-chevron-circle-down, #hotelItem #descShowRoom[aria-expanded=true] .fa-chevron-circle-down {
    display: none;
  }
  #hotelItem #descShow[aria-expanded=false] .fa-chevron-circle-up, #hotelItem #descShowRoom[aria-expanded=false] .fa-chevron-circle-up {
    display: none;
  }

  #hotelItem #price{
    font-weight:700; 
    font-size:24px; 
    color: #000;
    margin-bottom: 15px;
  }

  



  #hotelItem .btn {
    width: 100%;
    border: 1px solid #55B533;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #55B533;


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

  #hotelItem .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #55B533;
  }
  #hotelItem .btn:hover{
    background-color: #53AD32;
  }

  #roomList {
    margin-top: 10px;
    border-top: 1px dashed #EBEBEB;
  }

  /* Tool-tip */
  .tool-tip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .tool-tip .tool-tiptext {
    display: none;
    min-width: 160px;
    max-width: 260px;
    opacity: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    line-height: 1.4;
    position: absolute;
    z-index: 1;
    bottom: 115%;
    left: 50%;
    margin-left: -80px;
  }
  .tool-tip .tool-tiptext-info {
    display: none;
    min-width: 160px;
    max-width: 300px;
    opacity: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    line-height: 1.5;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -150px;
  }
  .tool-tip-top::after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(0, 0, 0, 0);
    border-top-color: #000000;
    border-width: 6px;
    margin-left: -6px;
  }
  .tool-tip:hover .tool-tiptext, .tool-tip:hover .tool-tiptext-info{
      display: block;
      opacity: 0.8;
      /*bottom: 125%;*/
      transition: opacity 0.5s bottom 0.45s;
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
  @media (max-width: 575px){

    #hotelItem #hotelInfo{
      margin-top: 10px;
      border: none;
    }

    #hotelItem #priceCard{
      margin-top: 10px;
    }

  }

</style>

