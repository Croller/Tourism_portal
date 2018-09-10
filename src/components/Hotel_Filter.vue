<template>
  <div id="hotelfilterPanel" class="col-12 shadow">

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#stars" aria-expanded="true" aria-controls="stars">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Кол-во звезд</a>
      </div>
      <div id="stars" class="descFiltr collapsed" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.stars.length != 0">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="stars_group" :class="'far ' + (userFiltr.stars.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.stars">
            <span class="far fa-check-circle"></span>
            <input type="checkbox" :value=item v-model="userFiltr.stars" style="display:none">
            &nbsp
            <span class="fas fa-star" v-if="parseInt(item) == 0"></span>
            <span class="fas fa-star" style="color: #FF9F1C;" v-for="star in parseInt(item)" v-if="parseInt(item) > 0"></span>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#propertyType" aria-expanded="true" aria-controls="propertyType">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Тип размещения</a>
      </div>
      <div id="propertyType" class="descFiltr collapsed" aria-labelledby="headingThree" data-parent="#accordion"  v-if="propertiesFiltr.propertyType.length != 0">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="stars_group" :class="'far ' + (userFiltr.propertyType.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.propertyType">
            <span class="far fa-check-circle"></span>
            <input type="checkbox" :value=item v-model="userFiltr.propertyType" style="display:none">
            &nbsp&nbsp{{item.name}}
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#price" aria-expanded="true" aria-controls="price">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Цена за ночь</a>
      </div>
      <div id="price" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.price.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-credit-card"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="price_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="price_Min">от {{ parseInt(propertiesFiltr.price[0]).toLocaleString('ru') }}</span> <span class="fas fa-ruble-sign" style="font-size:12px; color: #8C8C8C"></span>
            </div>
            <div class="text-extra-small float-right">
              <span id="price_Max">до {{ parseInt(propertiesFiltr.price[1]).toLocaleString('ru') }}</span> <span class="fas fa-ruble-sign" style="font-size:12px; color: #8C8C8C"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#distance" aria-expanded="true" aria-controls="distance">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Расстояние от центра</a>
      </div>
      <div id="distance" class="descFiltr collapsed" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.distance.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center fas fa-map"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="distance_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="distance_Min">от {{ parseInt(propertiesFiltr.distance[0]).toLocaleString('ru') }}</span> км</span>
            </div>
            <div class="text-extra-small float-right">
              <span id="distance_Max">до {{ parseInt(propertiesFiltr.distance[1]).toLocaleString('ru') }}</span> км</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#guestScore" aria-expanded="false" aria-controls="guestScore">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Рейтинг гостей</a>
      </div>
      <div id="guestScore" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.guestScore.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center fas fa-chart-bar"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="guestScore_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="guestScore_Min">от {{ parseInt(propertiesFiltr.guestScore[0]).toLocaleString('ru') }}</span></span>
            </div>
            <div class="text-extra-small float-right">
              <span id="guestScore_Max">до {{ parseInt(propertiesFiltr.guestScore[1]).toLocaleString('ru') }}</span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#popularity" aria-expanded="false" aria-controls="popularity">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Популярность</a>
      </div>
      <div id="popularity" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.popularity.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center fas fa-chart-bar"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="popularity_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="popularity_Min">от {{ parseInt(propertiesFiltr.popularity[0]).toLocaleString('ru') }}</span></span>
            </div>
            <div class="text-extra-small float-right">
              <span id="popularity_Max">до {{ parseInt(propertiesFiltr.popularity[1]).toLocaleString('ru') }}</span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#amenities" aria-expanded="false" aria-controls="amenities">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Удобства в отеле</a>
      </div>
      <div id="amenities" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.amenities.length != 0">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="amenities_group" :class="'far ' + (userFiltr.amenities.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.amenities">
            <span class="far fa-check-circle"></span>
            <input type="checkbox" :value=item v-model="userFiltr.amenities" style="display:none">
            &nbsp {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Всего комнат</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Год постройки</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Время заезда и выезда</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Кол-во этажей</a>
      </div>

    </div> -->
    
  </div>
</template>

<script>

  import Moment from 'moment';


  export default {
    name: 'Hotel_Filter',
    components: {},
    props:{
      propertiesFiltr: Object,
    },
    data() {
      return {
        userFiltr: {
          stars: [],
          propertyType: [],
          price: [],
          distance: [],
          guestScore: [],
          popularity: [],
          amenities: [],
        }, 
      }
    },
    computed: {},
    created: function() {},
    mounted() {
      console.log('///////////////')
      console.log('hotel filter - loaded')

      setTimeout(() => {
        this.sliderPrice(this.propertiesFiltr.price);
        this.sliderDistance(this.propertiesFiltr.distance);
        this.sliderGuestScore(this.propertiesFiltr.guestScore);
        this.sliderPopularity(this.propertiesFiltr.popularity);
      }, 100);
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

      changeAllSpan(event){
        var el = event.target
        // check group filtr
        this.changeSpan(el);
        // check child filtr
        var list_el = [];
        var el_Class = '';
        if(el.children[0] != undefined){
          var list_el = event.target.parentNode.children;
          var el_Class = el.children[0].classList[1];
        }else{
          var list_el = event.target.parentNode.parentNode.children;
          var el_Class = el.parentNode.children[0].classList[1];
        }

        for (var i = 1; i < list_el.length; i++) {
          var list_el_Class = list_el[i].children[0].classList[1];
          if(el_Class != list_el_Class){
            this.changeSpan(list_el[i]);
          }
        }
      },

      changeSpan(event){
        var el;
        if(event.target != undefined){
          el = event.target;
        }else{
          el = event;
        }
        // if click on li item
        if(el.children[0] != undefined){
          if(el.children[0].classList.contains('fa-check-circle')){
            el.children[0].classList.remove('fa-check-circle');
            el.children[0].classList.add('fa-circle');
          }else{
            el.children[0].classList.remove('fa-circle');
            el.children[0].classList.add('fa-check-circle');
          }
          if(el.children[1] != undefined){
            el.children[1].click();
          }
        }
        // if click on span
        if(el != undefined && el.children[0] == undefined && el.classList.contains('far')){
          if(el.classList.contains('fa-check-circle')){
            el.classList.remove('fa-check-circle');
            el.classList.add('fa-circle');
          }else{
            el.classList.remove('fa-circle');
            el.classList.add('fa-check-circle');
          }
          if(el.closest('li').children[1] != undefined){
            el.closest('li').children[1].click();
          }
        }
      },

      sliderPrice(price){
        let self = this;
        $("#hotel #price_Range").slider({
          range: true,
          min: parseInt(price[0]) ,
          max:  parseInt(price[1]) ,
          values: [ parseInt(price[0]) , parseInt(price[1])  ],
          slide: function( event, ui ) {
            $("#hotel #price_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#hotel #price_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.price[0] = ui.values[ 0 ];
            self.userFiltr.price[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },
      sliderDistance(distance){
        let self = this;
        $("#hotel #distance_Range").slider({
          range: true,
          min: parseInt(distance[0]) ,
          max:  parseInt(distance[1]) ,
          values: [ parseInt(distance[0]) , parseInt(distance[1])  ],
          slide: function( event, ui ) {
            $("#hotel #distance_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#hotel #distance_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.distance[0] = ui.values[ 0 ];
            self.userFiltr.distance[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },
      sliderGuestScore(guestScore){
        let self = this;
        $("#hotel #guestScore_Range").slider({
          range: true,
          min: parseInt(guestScore[0]) ,
          max:  parseInt(guestScore[1]) ,
          values: [ parseInt(guestScore[0]) , parseInt(guestScore[1])  ],
          slide: function( event, ui ) {
            $("#hotel #guestScore_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#hotel #guestScore_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.guestScore[0] = ui.values[ 0 ];
            self.userFiltr.guestScore[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },
      sliderPopularity(popularity){
        let self = this;
        $("#hotel #popularity_Range").slider({
          range: true,
          min: parseInt(popularity[0]) ,
          max:  parseInt(popularity[1]) ,
          values: [ parseInt(popularity[0]) , parseInt(popularity[1])  ],
          slide: function( event, ui ) {
            $("#hotel #popularity_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#hotel #popularity_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.popularity[0] = ui.values[ 0 ];
            self.userFiltr.popularity[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },
    },
    watch: {
      propertiesFiltr: function (val, oldVal) {
        if(val != undefined){
          setTimeout(() => {
            this.sliderPrice(val.price);
            this.sliderDistance(val.distance);
            this.sliderGuestScore(val.guestScore);
            this.sliderPopularity(val.popularity);
          }, 100);
        }
      },
      'userFiltr.stars': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.propertyType': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.amenities': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
    },
  }
</script>

<style>


  #hotel #hotelfilterPanel{
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
    padding-left: 0px;
    padding-right: 0px;
  }

  #hotel #filterPanel #airlines .list-item, #hotel #filterPanel #sales .list-item{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 175px;
    padding-left: 1px;
  }

  .headFiltr{
    font-family: 'Comfortaa', sans-serif;
    color: #000;
    font-size: 13px;
    padding: 10px;
    padding-left: 15px;
    line-height: 1.2;
    cursor: pointer;
    font-weight: 700;
    min-width: 170px;
  }

  #hotel .headFiltr:hover{
    background-color: #FAFAFA
  }

  #hotel .headFiltr a{
    margin-left: 5px;
  }

  div.headFiltr[aria-expanded=true] a {
    margin-left: 1.5px;
  }

  div.headFiltr[aria-expanded=false] a {
    margin-left: 5px;
  }

  div.headFiltr[aria-expanded=true] .fa-caret-right {
    display: none;
  }

  div.headFiltr[aria-expanded=false] .fa-caret-down {
    display: none;
  }

 

  #hotel .headFiltr span{
    color: #ccc;
  }

  #hotel .descFiltr{
    font-family: 'Comfortaa', sans-serif;
    color: #5E5E5E;
    font-size: 12px;
    padding-left: 25px;
    padding-right: 25px;
    /*padding: 10px 25px;*/
    background-color: #FAFAFA;
  }
  #hotel .descFiltr ul{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #hotel .descFiltr li{
    cursor: pointer;
    line-height: 2;
  }
  #hotel .descFiltr ul li .fa-check-circle:hover, #hotel.descFiltr ul li .fa-circle:hover{
    color: #FF6200;
  }
 

  #hotel .descFiltr .fa-circle{
    color: #5EC23A;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  #hotel .descFiltr .fa-check-circle{
    color: #5EC23A;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #hotel .flex-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
    height: 28px;
  }

  #hotel .descFiltr .titleRange{
    max-height: 28px;
  }
  #hotel .descFiltr .timeRange{
    margin-top: 10px;
  }
  #hotel .descFiltr .ui-slider{
  }
  #hotel .descFiltr .ui-slider-handle{
    background-color: white;
    border: 1.5px solid #5EC23A;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  #hotel .descFiltr .ui-slider-handle:active{
    background-color: #5EC23A;
  }
  #hotel .descFiltr .ui-slider-handle:focus{
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }
  #hotel .descFiltr .ui-slider-range{
    background-color: white;
  }
  #hotel .descFiltr .ui-slider{
    background-color: #e9e9e9;
  }
</style>

