<template>
  <div id="hotel" class="row">

    <div class="col-12">
      <Hotel_SearchBar></Hotel_SearchBar>
    </div>

    <div id="infoBlock" class="col-12">
      <div class="shadow">
        
      
        <div id="infoPanel" class="col-12">

        </div>
        
        <div id="progressSearch" class="progress" v-if="progressPerc > 0">
          <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :style="'width: ' + progressPerc +'%'" aria-valuenow="25" aria-valuemin="3" aria-valuemax="100"></div>
        </div>

      </div>
    </div>

    <div id="filterBlock" class="col-md-3 col-lg-3 d-none d-sm-none d-md-block d-lg-block">
      <Hotel_Filter></Hotel_Filter>                

      <!-- <Hotel_Filter v-bind:propertiesFiltr=propertiesFiltr v-on:getExtraFiltr="mainFiltr"></Hotel_Filter>                 -->
    </div>

    <div id="resultsBlock" class="col-12 col-sm-12 col-md-9 col-lg-9">
      <div id="defaultFilter" class="col-12 shadow">
        <div class="row">
          <div class="btn-group btn-group-toggle btn-block scrollmenu" data-toggle="buttons">
            <label class="btn col-4 active" v-on:click="changeRadio($event)">
              <input type="radio" value="0" autocomplete="off" v-model="defaultFiltrData" > 
              Популярный
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="1" autocomplete="off" v-model="defaultFiltrData"> Дешевый
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="2" autocomplete="off" v-model="defaultFiltrData"> Оптимальный
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="3" autocomplete="off" v-model="defaultFiltrData">
              В центре
            </label>
          </div>
        </div>
      </div>
      <div id="hotelItems" class="col-12" >
        <Hotel_Item v-bind:hotel=hotel v-bind:hotelTypes=hotelTypes v-bind:amenities=amenities v-bind:roomTypes=roomTypes  v-for="(hotel, index) in hotels.slice(0, 20)"  :key="index" v-if="hotels.length > 0" ></Hotel_Item>
        <!-- <Hotel_Item v-bind:ticket=ticket v-bind:airlines=airlines v-bind:airports=airports v-bind:airplane=airplane v-bind:sales=sales v-for="(ticket, index) in hotels" v-bind:statTimeOut=statTimeOut :key="index" v-if="hotels.length > 0"></Hotel_Item> -->


        <div id="errorBlock" class="row shadow" v-if="(hotelsNoSort.length == 0 && progressPerc == 100) || hotelsExtraSort.length == 0" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Нет гостиниц на эти даты :(</h3>
            <p class="h6 text-center" v-if="hotelsNoSort.length == 0">Совет: попробуйте изменить дату заезда.</p>
            <p class="h6 text-center" v-if="hotelsExtraSort.length == 0">Совет: попробуйте изменить настройки фильтрации.</p>
          </div>
        </div>
        
        <Loader  v-if="progressPerc < 100" style="margin-bottom: 100px;" :color=color></Loader>

      </div>
    </div>
  </div>
    
    <!-- <Loader  v-if="" style="margin-bottom: 100px;"></Loader> -->

  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';

  import Hotel_SearchBar from './Hotel_SearchBar.vue';
  import Hotel_Item from './Hotel_Item.vue';
  import Hotel_Filter from './Hotel_Filter.vue';
  import Loader from './Loader.vue';

  export default {
    name: 'Hotel',
    components: {
      'Hotel_SearchBar': Hotel_SearchBar,
      'Hotel_Item': Hotel_Item,
      'Hotel_Filter': Hotel_Filter,

      'Loader': Loader,
    },
    http: {
      emulateJSON: true,
      emulateHTTP: true
    },
    props:{},
    data() {
      return {
        // language
        locale: "ru",
        color: "#55B533",

        // data map
        geojson: {},

        // data hotels
        hotelsNoSort: ['0'], 
        hotelsExtraSort: ['0'], 
        hotels: [],

        // dictionary
        hotelTypes: {},
        amenities: {},
        roomTypes: {},

        // stats
        progressPerc: 0,

        // filter parmmetrs
        extraFiltrData: {},
        defaultFiltrData: "0",

        propertiesFiltr: {
          total: [],
          stars: [],
          hotelTypes: [],
          rating: [],
          distance: [],
          amenities: [],
          options: [],
          roomTypes: [],
        }
      }
    },
    computed: {},
    created: function() {
      let self = this;

      //get hotel
      BusEvent.$on('getHotels', function(obj) {
        self.progressPerc = 5;
        self.hotelsNoSort = ['0'];
        self.hotelsExtraSort = ['0'];
        self.hotels = [];
        // load real time data
        self.getHotels(obj);
        // load test data
        // self.getHotelsTest(obj);
      })
    },
    mounted() {
      // get dictionary availible amenities
      // http://engine.hotellook.com/api/v2/static/amenities/ru.json?token=de9e64ff1948b68fbf6ecaab308e9652
      // 
    },
    methods: {

      getPhoto(arr, callback){
        let self = this;
        let hotelIDs = [];
        if(arr.length != 0){
          arr.forEach((x) => {
            if(x.hasOwnProperty('id')){
              hotelIDs.push(x.id);
            }
          });
        }
        console.log(hotelIDs.length)
        this.$http.get('https://yasen.hotellook.com/photos/hotel_photos?id=' + hotelIDs.join(',')).then(function (response) {
          let data = response.body;
          if(data != null){
            arr.forEach((hotel, i) => {
              if(data[hotel.id] != undefined){
                arr[i]['photoIDs'] = data[hotel.id];
              }else{
                arr[i]['photoIDs'] = [];
              }
            })
            return callback(null, arr);
          }else{
            return callback('error', null);
          }
          
        })
      },

      getHotels(obj){
        let self = this;

        this.$http.post('http://127.0.0.1:8081/getHotels', obj).then(function (response) {
          console.log('///////////////')
          console.log('get hotel - loaded');

          document.getElementById("progressSearch").children[0].classList.add('progress-bar-animated');

          let data = response.data;
          if(data != null && !data.hasOwnProperty('errorCode')){
            
            self.hotelTypes = response.data.hotelTypes;
            self.amenities = response.data.amenities;
            self.roomTypes = response.data.roomTypes;
            self.hotelsNoSort = response.data.hotelsNoSort;
            
            console.log(self.hotelsNoSort)
            self.progressPerc = 100;

            self.getPhoto(self.hotelsNoSort.slice(0, 20), function(err, data) {
              self.hotelsNoSort = data;
              self.hotels = data;
            });

            document.getElementById("progressSearch").children[0].classList.remove('progress-bar-animated');
          }else{
            setTimeout(() => {
              if(self.progressPerc <= 100 && data.status == 'error'){
                self.getHotels(obj);
              }
            }, 2500);
          }

          if(this.progressPerc < 80){
            this.progressPerc = this.progressPerc + 15;
          }

        });
      },

      getHotelsTest(obj){
        let self = this;
        this.$http.post('http://127.0.0.1:8081/getHotelsTest', obj).then(function (response) {
            // Success
          console.log('///////////////')
          console.log('get ticket - loaded')

          let data = response.data.hotelsNoSort;

          if(data != null){
            self.hotelTypes = response.data.hotelTypes;
            self.amenities = response.data.amenities;
            self.roomTypes = response.data.roomTypes;
            
            self.progressPerc = 100;

            self.getPhoto(data, function(err, data) {
              self.hotelsNoSort = data;
              self.hotels = data;
            });
          }
        });
      },
    },
    watch: {},
  }
</script>

<style>
  #hotel #resultsBlock .btn{
    -webkit-box-shadow: none;
  }

  #hotel #defaultFilter .col-4{
    text-align: center;
    font-family: 'Comfortaa', sans-serif;
    /*color: #000;*/
    color: #888;
    font-size: 14px;
    line-height: 35px;
    border-right: 1px solid #EBEBEB;
    min-width: 150px;
  }

  #hotel #defaultFilter .col-4:last-child{
    border-right: 0px solid #EBEBEB;
  }

  #hotel #defaultFilter .active{
    background-color: #55B533;
    color: white;
  }

  #hotel #defaultFilter .scrollmenu {
     white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }
  #hotel #defaultFilter .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  

  #hotel #infoBlock{
    margin-top: 20px;
  }
  #hotel #infoPanel{
    width: 100%;
    height: 60px;
  }
  #hotel #infoBlock .progress{
    height: 0.5rem;
    background-color: white;
    border-radius: 0px 0px 3px 3px;
  }
  #hotel #infoBlock .progress .bg-success{
    background-color: #A5DB93 !important;
  }

  #hotel #filterBlock{
    padding-right: 5px;
  }

  #hotel #errorBlock {
    font-family: 'Comfortaa', sans-serif;
    color: #888;
    font-size: 14px;
    padding-top: 25px;
    padding-bottom: 15px;
    margin-top: 20px;
  }
  #hotel #errorBlock p{
    margin-top: 15px;
  }

</style>

