<template>
  <div class="room row">
    <div class="col-5 col-sm-3 col-md-3 col-lg-3">
      <div class="row">
        <div :id='"roomPhCarousel_" + hotelID + "_" + groupRoom[0].internalTypeId' class="carousel carousel-fade slide" data-ride="carousel" data-interval="false">
          <div class="carousel-inner">
            <div :class='"carousel-item " + (ph == 1 ? "active" : "")' v-for="(ph, index) in photoLen " v-if="photoLen > 1 ">
              <img class="img-fluid rounded" :src='"http://photo.hotellook.com/rooms/limit/h" + hotelID + "_" + groupRoom[0].internalTypeId + "_" + index + "/200/200.auto"' alt="">
            </div>
            <div class="carousel-item active" v-if="photoLen == 1">
              <img class="img-fluid rounded" :src='"http://photo.hotellook.com/rooms/limit/h" + hotelID + "_" + groupRoom[0].internalTypeId + "_0/200/200.auto"' alt="">
            </div>
            <div class="carousel-item active" v-if="photoLen == null">
              <img class="img-fluid rounded" src="https://fakeimg.pl/650x600/?text=img" alt="">
            </div>
          </div>
          <a class="carousel-control-prev" :href='"#roomPhCarousel_" + hotelID + "_" + groupRoom[0].internalTypeId' role="button" data-slide="prev" v-on:click="countHotelPhoto -= 1">
            <span class="fas fa-chevron-circle-left" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" :href='"#roomPhCarousel_" + hotelID + "_" + groupRoom[0].internalTypeId' role="button" data-slide="next" v-on:click="countHotelPhoto += 1">
            <span class="fas fa-chevron-circle-right" aria-hidden="true"></span>
          </a>
          <div class="row justify-content-center">
            <div id="countPhoto" class="" v-if="photoLen != null">
              <span id="currPhoto" > {{ countHotelPhoto }} </span> / <span id="lenPhoto"> {{ ( photoLen == 0 ? 1 : photoLen) }} </span>
            </div>
            <div id="countPhoto" class="" v-if="photoLen == null">
              <span id="currPhoto">Нет фото</span>
            </div>
          </div>
          <!-- <div class="row justify-content-right" v-if="photoLen != null">
            <div id="fullScreenPhoto" @click="fullScreenPhoto()">
              <span class="far fa-images"></span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-7 col-sm-5 col-md-5 col-lg-5">
      <div class="row">
        <div class="roomName col-12 text-center">
          <span> {{ groupRoom[0].desc }} </span>
        </div>
        <div class="roomDesc col-12">
          <ul class="list-unstyled">
            <li class="list-item">Цена за ночь: <span>{{ groupRoom[0].price }} руб</span></li>
            <ul class="options list-inline ">
              <li class="list-inline-item" v-if="groupRoom[0].options.breakfast">
                <span class="far fa-check-circle"></span> Завтрак включен
              </li>
              <li class="list-inline-item" v-if="groupRoom[0].options.freeWifi">
                <span class="far fa-check-circle"></span> WiFi
              </li>
              <li class="list-inline-item" v-if="groupRoom[0].options.refundable">
                <span class="far fa-check-circle"></span> Бесплатная отмена
              </li>
              <li class="list-inline-item" v-if="groupRoom[0].options.deposit">
                <span class="far fa-check-circle"></span> Оплата сейчас
              </li>
              <li class="list-inline-item" v-if="groupRoom[0].options.allInclusive">
                <span class="far fa-check-circle"></span> Все включено
              </li>
              <li class="list-inline-item" v-if="groupRoom[0].options.ultraAllInclusive">
                <span class="far fa-check-circle"></span> Мега Все включено
              </li>
              <!-- <li class="list-inline-item" v-if="groupRoom[0].options.cardRequired">
                <span class="far fa-check-circle"></span> Наличие банковской карты
              </li> -->
              <li class="list-inline-item" v-if="groupRoom[0].options.smoking">
                <span class="far fa-check-circle"></span> Курить в номере
              </li>
            </ul>
          </ul>
        </div>
        <div class="roomAgency col-12">
          <span> Другие агенства:</span>
          <ul class="list-unstyled">
            <li class="list-item" v-for="agency in groupObjVal()"> 
              <a target="_blank" :href='agency[0].fullBookingURL'>
                {{ agency[0].agencyName }}: <span>{{ agency[0].total }} руб</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-4 col-md-4 col-lg-4">
      <div class="row">
        <div class="col-12 text-center">
          <span class="priceDesc" v-if="groupRoom[0].options.hasOwnProperty('available')"> Осталось {{ groupRoom[0].options.available }} {{ declension(countNight(), ['номер','номера','номеров']) }}</span>
          <div id="priceCard" :style='"margin-top:" + 10 + "px"'>
            <span class="text-extra-small" style="color:#595959;">Цена за {{ countNight() }} {{ declension(countNight(), ['ночь','ночи','ночей']) }}:</span>
            <div id="price">
              {{ groupRoom[0].total }} руб.
            </div>
            <span class="priceDesc" v-if="groupRoom[0].options.refundable"> Бесплатная отмена </span>
            <button class="btn btn-primary" @click="submit">
              Бронировать
            </button>

            <button class="btn btn-primary" @click="reloadTicket" v-if="statTimeOut">
              Обновить
            </button>

            <div id="priceAgency">
              <img :src='"http://pics.avs.io/hl_gates/120/30/"+groupRoom[0].agencyId+".png"'>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Moment from 'moment';
  import BusEvent from './BusEvent.vue';

  export default {
    name: 'Hotel_Room_Item',
    components: {},
    props:{
      groupRoom: Array,
      hotelID: Number,
      photoLen: Number,

    },
    data() {
      return {
        countHotelPhoto: 1,

        // time out search results
        statTimeOut: false,
      }
    },
    computed: {},
    created: function() {},
    mounted() {

    },
    methods: {

      fullScreenPhoto(){
        let self = this;
        let arr = [];
        for (var i = 0; i < self.photoLen; i++) {
          arr.push("http://photo.hotellook.com/rooms/limit/h" + self.hotelID + "_" + self.groupRoom[0].internalTypeId + "_" + i + "/710/600.auto)")

        }
        BusEvent.$emit('fullScreenPhoto', arr);
      },

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

      groupObjVal(){
        return this.$parent.$options.methods.groupObjVal(this.groupRoom, 'agencyId')
      },

      countNight(){
        let checkIn = Moment(this.groupRoom[0].fullBookingURL.split('checkIn=')[1].split('&')[0], "YYYY-MM-DD");
        let checkOut = Moment(this.groupRoom[0].fullBookingURL.split('checkOut=')[1].split('&')[0], "YYYY-MM-DD");
        return checkOut.diff(checkIn, 'days')
      },

      // check time out avia results
      timeOutSearch(){
        setTimeout( () => {
          if(!this.statTimeOut){
            // this.alertMsg('Время истекло','Результат поиска устарел','warning');
            this.statTimeOut = true;
          }
        },850000);
      },

      // reload ticket
      reloadTicket(){
        BusEvent.$emit('reloadTicket');
      },

      submit(){
        window.open(this.groupRoom[0].fullBookingURL, '_blank');
      },
    },
    watch: {
      countHotelPhoto: function(nVal, oVal){
        if(nVal != 0 && nVal < this.photoLen - 1){
          this.countHotelPhoto = nVal;
        }
        if(nVal == 0){
          this.countHotelPhoto = this.photoLen - 1;
        }
        if(nVal > this.photoLen){
          this.countHotelPhoto = 1;
        }
      }
    },
  }
</script>

<style>
  .room{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #EBEBEB;
  }
  .room > div:last-child{
    border-left: 1px dashed #EBEBEB;
  }

  .room #countPhoto{
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
  .room #fullScreenPhoto{
    color: white;
    font-size: 18px;
    top: 0;
    right: 2%;
    position: absolute;
    cursor: pointer;
  }

  .room .roomName{
    margin-top: 5px;
    max-width: 100%;
    color: #000;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
  }
  .room .roomDesc, .room .roomAgency{
    color: #000;
    font-size: 13px; 
    font-weight: 300;
    margin-top: 10px;
    line-height: 1.5;
  }
  .room .roomDesc span, .room .roomAgency span{
    color: #000;
    font-weight: 700;
  }
  .room .roomAgency a:hover{
    text-decoration:underline;
  }

  .room .roomDesc .options{
    font-family: 'Comfortaa', cursive, sans-serif;
    color: #53AD32;
    font-weight: 400;
    font-size: 12px;
    margin-top: 10px;
  }
  .room .roomDesc .options span{
    color: #53AD32;
    font-weight: 400;
    font-size: 14px;
  }

  .room .priceDesc{
    font-weight:700; 
    font-size:12px;
    color: #F09A24;
  }
  .room #priceCard #price{
    font-weight:700; 
    font-size:24px; 
    color: #000;
    margin-bottom: 0px;
  }

  .room #priceCard .btn {
    width: 100%;
    border: 1px solid #55B533;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #55B533;


    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: white;
    letter-spacing: -0.5px;
    font-weight: 700;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
-moz-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
box-shadow: 0px 0px 15px 0px rgba(189,189,189,1)
  }

  .room #priceCard .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #55B533;
  }
  .room #priceCard .btn:hover{
    background-color: #53AD32;
  }
  .room #priceCard #priceAgency{
    margin-top: 8px;
  }
</style>

