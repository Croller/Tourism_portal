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
              <input type="radio" value="0" autocomplete="off" v-model="defaultFiltrData" > Самый дешевый
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="1" autocomplete="off" v-model="defaultFiltrData"> Самый удобный
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="2" autocomplete="off" v-model="defaultFiltrData"> Оптимальный
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="3" autocomplete="off" v-model="defaultFiltrData">
              У центра
            </label>
          </div>
        </div>
      </div>
      <div id="aviaItems" class="col-12" >
        <Hotel_Item v-bind:hotel=hotel v-for="(hotel, index) in hotelsNoSort.slice(0, 20)"  :key="index"></Hotel_Item>
        <!-- <Hotel_Item v-bind:ticket=ticket v-bind:airlines=airlines v-bind:airports=airports v-bind:airplane=airplane v-bind:sales=sales v-for="(ticket, index) in hotels" v-bind:statTimeOut=statTimeOut :key="index" v-if="hotels.length > 0"></Hotel_Item> -->


        <div id="errorBlock" class="row shadow" v-if="(hotelsNoSort.length == 0 && progressPerc == 100) || hotelsExtraSort.length == 0" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Мы не нашли билетов :(</h3>
            <p class="h6 text-center" v-if="hotelsNoSort.length == 0">Совет: попробуйте изменить даты вылета и/или прилета.</p>
            <p class="h6 text-center" v-if="hotelsExtraSort.length == 0">Совет: попробуйте изменить настройки фильтрации.</p>
          </div>
        </div>
        
        <Loader  v-if="progressPerc < 100" style="margin-bottom: 100px;"></Loader>

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

        // data map
        geojson: {},

        // data hotels
        hotelsNoSort: ['0'], 
        hotelsExtraSort: ['0'], 
        hotels: [],

        // time out search results
        statTimeOut: false,

        // stats
        progressPerc: 0,

        // filter parmmetrs
        extraFiltrData: {},
        defaultFiltrData: "0"
      }
    },
    computed: {},
    created: function() {
      let self = this;

      //get hotel
      BusEvent.$on('getHotels', function(obj) {
        self.progressPerc = 5; 
        // load real time data
        // self.getHotels(obj);
        // load test data
        self.getHotelsTest({});
      })
    },
    mounted() {},
    methods: {

      // check time out avia results
      timeOutSearch(){
        setTimeout( () => {
          if(!this.statTimeOut && this.hotelsNoSort.length > 0){
            // this.alertMsg('Время истекло','Результат поиска устарел','warning');
            this.statTimeOut = true;
          }
        },10000);
      },

      getHotels(obj){
        let self = this;

        this.$http.post('http://127.0.0.1:8081/getHotels', obj).then(function (response) {
          console.log('///////////////')
          console.log('get hotel - loaded');
          let data = response.data;          
          if(data != null && data.status != 'error' && data.hasOwnProperty('result')){
            console.log(data)
            this.progressPerc = 100;
            self.hotelsNoSort = data.result
          }else{
            if(data.errorCode == 4 || data.message == 'Login Required'){
              setTimeout(() => {
                if(self.progressPerc <= 100 && data != null){
                  self.getHotels(obj);
                }
              }, 2500);
            }
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

          let data = response.data;
          if(data != null){
            
            this.progressPerc = 100;
            self.hotelsNoSort = data.result
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

