<template>
  <div id="excurfilterPanel" class="col-12 shadow">

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#price" aria-expanded="true" aria-controls="price">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Рейтинг</a>
      </div>
      <div id="price" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.price.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center fas fa-chart-bar"></span>
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
      <div class="headFiltr" data-toggle="collapse" data-target="#stars" aria-expanded="true" aria-controls="stars">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Категории</a>
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
        <a>Цена</a>
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
      <div class="headFiltr" data-toggle="collapse" data-target="#propertyType" aria-expanded="true" aria-controls="propertyType">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>По времени</a>
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
      <div class="headFiltr" data-toggle="collapse" data-target="#distance" aria-expanded="true" aria-controls="distance">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Кол-во отзывов</a>
      </div>
      <div id="distance" class="descFiltr collapsed" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.distance.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center fas fa-pencil-alt"></span>
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

    
    
  </div>
</template>

<script>

  import Moment from 'moment';


  export default {
    name: 'Excursion_Filter',
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
      console.log('excur filter - loaded')

      setTimeout(() => {
        this.sliderPrice(this.propertiesFiltr.price);
        this.sliderDistance(this.propertiesFiltr.distance);
        this.sliderGuestScore(this.propertiesFiltr.guestScore);
        this.sliderPopularity(this.propertiesFiltr.popularity);


      }, 1500);
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
          }, 10);
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


  #excur #excurfilterPanel{
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
    padding-left: 0px;
    padding-right: 0px;
  }

  #excur .headFiltr{
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

  #excur .headFiltr:hover{
    background-color: #FAFAFA
  }

  #excur .headFiltr a{
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

 

  #excur .headFiltr span{
    color: #ccc;
  }

  #excur .descFiltr{
    font-family: 'Comfortaa', sans-serif;
    color: #5E5E5E;
    font-size: 12px;
    padding-left: 25px;
    padding-right: 25px;
    /*padding: 10px 25px;*/
    background-color: #FAFAFA;
  }
  #excur .descFiltr ul{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #excur .descFiltr li{
    cursor: pointer;
    line-height: 2;
  }
  #excur .descFiltr ul li .fa-check-circle:hover, #excur.descFiltr ul li .fa-circle:hover{
    color: #FF6200;
  }
 

  #excur .descFiltr .fa-circle{
    color: #02A9E0;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  #excur .descFiltr .fa-check-circle{
    color: #02A9E0;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #excur .flex-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
    height: 28px;
  }

  #excur .descFiltr .titleRange{
    max-height: 28px;
  }
  #excur .descFiltr .timeRange{
    margin-top: 10px;
  }
  #excur .descFiltr .ui-slider{
  }
  #excur .descFiltr .ui-slider-handle{
    background-color: white;
    border: 1.5px solid #02A9E0;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  #excur .descFiltr .ui-slider-handle:active{
    background-color: #02A9E0;
  }
  #excur .descFiltr .ui-slider-handle:focus{
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }
  #excur .descFiltr .ui-slider-range{
    background-color: white;
  }
  #excur .descFiltr .ui-slider{
    background-color: #e9e9e9;
  }
</style>

