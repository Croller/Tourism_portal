<template>
  <div id="hotel" class="row">

    <div class="col-12">
      <Hotel_SearchBar></Hotel_SearchBar>
    </div>

    <div class="col-12">
      <MultiResultsBar :progressPerc="progressPerc"></MultiResultsBar>
    </div>

    <div id="filterBlock" class="col-md-3 col-lg-3 d-none d-sm-none d-md-block d-lg-block">
      <Hotel_Filter v-bind:propertiesFiltr=propertiesFiltr v-on:getExtraFiltr="mainFiltr"></Hotel_Filter>                
    </div>

    <div id="resultsBlock" class="col-12 col-sm-12 col-md-9 col-lg-9">
      <div id="defaultFilter" class="col-12 shadow">
        <div class="row">
          <div class="btn-group btn-group-toggle btn-block scrollmenu" data-toggle="buttons">
            <label class="btn col-4 active" v-on:click="changeRadio($event)">
              <input type="radio" value="0" autocomplete="off" v-model="defaultFiltrData" > 
              Дешевый
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="1" autocomplete="off" v-model="defaultFiltrData"> Популярный
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
        <Hotel_Item v-bind:hotel=hotel v-bind:hotelTypes=hotelTypes v-bind:amenities=amenities v-bind:roomTypes=roomTypes  v-for="(hotel, index) in hotels" v-bind:statTimeOut=statTimeOut :key="index" v-if="hotels.length > 0" ></Hotel_Item>
        <!-- <Hotel_Item v-bind:hotel=hotel v-bind:airlines=airlines v-bind:airports=airports v-bind:airplane=airplane v-bind:sales=sales v-for="(hotel, index) in hotels" v-bind:statTimeOut=statTimeOut :key="index" v-if="hotels.length > 0"></Hotel_Item> -->


        <div id="errorBlock" class="row shadow" v-if="(hotelsNoSort.length == 0 && progressPerc.hotels == 100) || hotelsExtraSort.length == 0" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Нет гостиниц :(</h3>
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
  import MultiResultsBar from './MultiResultsBar.vue';
  import Hotel_Item from './Hotel_Item.vue';
  import Hotel_Filter from './Hotel_Filter.vue';
  import Loader from './Loader.vue';

  export default {
    name: 'Hotel',
    components: {
      'Hotel_SearchBar': Hotel_SearchBar,
      'MultiResultsBar': MultiResultsBar,
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
        // ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),
        // language
        locale: "ru",
        color: "#55B533",

        // data map
        geojson: {},
        pois: [],

        // data hotels
        hotelsNoSort: ['0'], 
        hotelsExtraSort: ['0'], 
        hotels: [],

        // time out search results
        statTimeOut: false,

        // dictionary
        hotelTypes: {},
        amenities: {},
        roomTypes: {},

        // stats
        progressPerc: {
          avia: 0,
          hotels: 0,
        },

        // filter parmmetrs
        extraFiltrData: {},
        defaultFiltrData: "0",

        propertiesFiltr: {
          stars: [],
          propertyType: [],
          price: [],
          guestScore: [],
          distance: [],
          popularity: [],
          amenities: [],
        },

        queryObj: {},
      }
    },
    computed: {},
    created: function() {
      let self = this;

      //get hotel
      BusEvent.$on('getHotels', function(obj) {
        self.progressPerc["hotels"] = 5;
        self.hotelsNoSort = ['0'];
        self.hotelsExtraSort = ['0'];
        self.hotels = [];
        self.statTimeOut = false;

        self.propertiesFiltr= {
          stars: [],
          propertyType: [],
          price: [],
          guestScore: [],
          distance: [],
          popularity: [],
          amenities: [],
        }

        setTimeout(() => {
          self.getHotelsInfo(obj);
        }, 600)
        
        
        // load test data
        // self.getHotelsTest(obj);
      })
    },
    mounted() {
      
      window.addEventListener('scroll', this.loadMore)
    },
    methods: {
      loadMore(event){
        // setTimeout(() => {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.hotels.length > 0 && this.hotelsNoSort.length >  this.hotels.length) {
            this.mainFiltr("", this.hotels.length);
          }
        // }, 1500)
        
      },

      // change radio in label defaul filtr
      changeRadio(event){
        let el = event.target;
        if(el.children[0] != undefined){
          // el.children[0].click();
          this.defaultFiltrData = el.children[0].value;
        }
      },
      // check time out avia results
      timeOutSearch(){
        setTimeout( () => {
          if(!this.statTimeOut && this.hotelsNoSort.length > 0){
            // this.alertMsg('Время истекло','Результат поиска устарел','warning');
            this.statTimeOut = true;
          }
        },600000);
      },

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
        // console.log(hotelIDs.length)
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

      getHotelsInfo(obj){
        let self = this;
        let cityId = obj.cityId;

  

        self.progressPerc["hotels"] = 20;

        // document.getElementById("progressSearch").children[0].classList.add('progress-bar-animated');

        this.$http.post(self.pathData + '/getHotelsInfo', obj).then(function (response) {
          console.log('///////////////')
          console.log('get hotel info - loaded');

          // console.log(response.data)
          let data = response.data;
          if(data != null && !data.hasOwnProperty('errorCode')){
            self.pois = response.data.pois;
            self.hotelTypes = response.data.hotelTypes;
            self.hotelsNoSort = response.data.hotelsNoSort;
            self.progressPerc["hotels"] = 40;
            self.getPhoto(self.hotelsNoSort.slice(0, 20), function(err, data) {
              // self.hotelsNoSort = data;
              self.hotels = data;
              self.progressPerc["hotels"] = 50;
            // get price
              self.getHotels(obj)
            });
            
          }else{
            self.hotelsNoSort = [];
            self.progressPerc["hotels"] = 100;
          }
        });
      },

      getHotels(obj){
        let self = this;
        self.queryObj = obj;

        this.$http.post(self.pathData + '/getHotels', obj).then(function (response) {
          console.log('///////////////')
          console.log('get hotel price - loaded');

          let data = response.data;
          if(data != null && !data.hasOwnProperty('errorCode')){

            self.amenities = data.amenities;
            self.hotelTypes = data.hotelTypes;
            self.roomTypes = data.roomTypes;
            self.pois = data.pois;

            self.progressPerc["hotels"] = 60;
            if(data.hotelsNoSort.length > 0){

              // load all hotel
              if(data.hotelsNoSort.length == 50){

                self.hotelsNoSort = data.hotelsNoSort;

                self.progressPerc["hotels"] = 80;
                self.queryObj.queryObj["limit"] = 0;
                self.queryObj.queryObj["offset"] = 50;
                self.getHotels(self.queryObj);

              }else{
                self.hotelsNoSort = data.hotelsNoSort;
                self.progressPerc["hotels"] = 100;
                this.timeOutSearch();
              }
              self.mainFiltr();
              self.setPropertyFilter();

            }
            
          }

          setTimeout(() => {
            if(data.hasOwnProperty('errorCode')){
              self.progressPerc["hotels"] = self.progressPerc["hotels"] + 5;
              self.getHotels(self.queryObj);
            }
          }, 3000);
          
          
        });
      },

      getHotelsTest(obj){
        let self = this;
        this.$http.post(self.pathData + '/getHotelsTest', obj).then(function (response) {
            // Success
          console.log('///////////////')
          console.log('get hotel - loaded')

          let data = response.data.hotelsNoSort;

          if(data != null){
            self.hotelTypes = response.data.hotelTypes;
            self.amenities = response.data.amenities;
            self.roomTypes = response.data.roomTypes;
            
            self.progressPerc["hotels"] = 100;

            self.getPhoto(data, function(err, data) {
              self.hotelsNoSort = data;
              self.hotels = data;
            });
          }
        });
      },

      mainFiltr(filtrObj, offset = 0) {
        let self = this;
        var countHotels = 15;
        var groupHotelsArr = [];


        // add comapre extraDataFiltr for filtering speed
        this.extraFiltrData = filtrObj;

        // extra sort hotels ( output hotels without groupping by param )
        if( typeof filtrObj == "object"){
          let hotels = self.hotelsNoSort;
          for (var f = 0; f < Object.keys(filtrObj).length; f++) {
            let key = Object.keys(filtrObj)[f];
            let params = filtrObj[Object.keys(filtrObj)[f]];

            // filtr by value from avia_filter
            switch (key) {
              case "stars":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param.length > 0 && param != undefined){
                    hotels = hotels.filter(hotel => hotel[key] != param );
                  }
                }
                break;
              case "propertyType":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param != undefined){
                    hotels = hotels.filter(hotel => hotel[key] != param.id );
                  }
                }
                break;
              case "amenities":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param != undefined){
                    hotels = hotels.filter(hotel => hotel.amenities.filter( ame => ame == param.id).length == 0 );
                  }
                }
                break;
              default:
                if(params.length > 0 && params != undefined && params[0] != undefined && params[1] != undefined){
                  hotels = hotels.filter(hotel => hotel[key] >= params[0] && hotel[key] <= params[1]);
                }
                break;
            }
          }
          this.hotelsExtraSort = hotels;
        }else{
          this.hotelsExtraSort = self.hotelsNoSort;
        }

        // this.hotelsExtraSort = this.hotelsNoSort;
        // default sort hotels
        switch (this.defaultFiltrData) {
          case "0":
            groupHotelsArr = this.sortObjVal( 'minPriceTotal', this.hotelsExtraSort );
            break;
          case "1":
            groupHotelsArr = this.sortObjVal( 'guestScore', this.hotelsExtraSort ).reverse();
            break;
          case "2":
            groupHotelsArr = this.sortObjVal( 'rating', this.hotelsExtraSort ).reverse();
            break;
          case "3":
            groupHotelsArr = this.sortObjVal('distance', this.hotelsExtraSort);
            break;
        }

        // groupHotelsArr = groupHotelsArr.slice(0, countHotels);

        if(groupHotelsArr.length > 0){
          this.getPhoto(groupHotelsArr.slice(offset, countHotels + offset), function(err, data) {
          // self.hotelsNoSort = data;
            if(offset != 0){
              data = self.hotels.concat(data)
            }
            self.hotels = data;
          });
        }else{
            self.hotels = [];
        }
        
        // load all hotel
        // if(self.hotelsNoSort.length == 50){
        //   self.progressPerc["hotels"] = 80;
        //   self.queryObj.queryObj["limit"] = 0;
        //   self.queryObj.queryObj["offset"] = 50;
        //   self.getHotels(self.queryObj);
        // }
      },
      extraFiltr(val){
        // get extra filtr from Avia_filtr Component by change parametr
        this.extraFiltrData = val;
        console.log(val)
        // run re sorting
        // this.mainFiltr();
      },

      setPropertyFilter(){
        this.propertiesFiltr = {
          stars: Object.keys(this.groupObjVal(this.hotelsNoSort, 'stars')),
          propertyType: this.reCollectArr(this.hotelTypes).reverse(),
          amenities: this.reCollectArr(this.amenities),
          price: [
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'price'))[0],
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'price')).reverse()[0]
          ],
          guestScore: [
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'guestScore'))[0],
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'guestScore')).reverse()[0],
          ],
          distance: [
            Object.keys(this.groupObjVal(this.sortObjVal( 'distance', this.hotelsNoSort), 'distance'))[0],
            Object.keys(this.groupObjVal(this.sortObjVal( 'distance', this.hotelsNoSort), 'distance')).reverse()[0],
          ],
          popularity: [
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'popularity'))[0],
            Object.keys(this.groupObjVal(this.hotelsNoSort, 'popularity')).reverse()[0],
          ],
          // yearOpened: [
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'yearOpened'))[0],
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'yearOpened')).reverse()[0],
          // ],
          // checkInOut: [
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'checkIn'))[0],
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'checkOut')).reverse()[0],
          // ],
          // cntFloors: [
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntFloors'))[0],
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntFloors')).reverse()[0],
          // ],
          // cntRooms: [
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntRooms'))[0],
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntRooms')).reverse()[0],
          // ],
          // cntSuites: [
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntSuites'))[0],
          //   Object.keys(this.groupObjVal(this.hotelsNoSort, 'cntSuites')).reverse()[0],
          // ]
        }
      },


      // help function ----------

      groupObjVal(arr, filtr){
        return arr.reduce(function(rv, x) {
          if(rv[x[filtr]] = rv[x[filtr]] || []){
            rv[x[filtr]].push(x)
          }
          return rv;
        }, {});
      },
      
      sortObjVal(key = 0 , obj){
        if( obj.length > 0 && key != 0){
          obj.sort(function(a,b) {
            return a[key] - b[key];
          });
          return obj;
        }else{
          obj.sort(function(a,b) {
            return a - b;
          });
          return obj;
        }
      },
      // obj to arr, key of obj to id in self obj
      reCollectArr(arr){
        let newArr = [];
        let keyArr = Object.keys(arr);
        for (var i = 0; i < keyArr.length; i++) {
          newArr.push({
            'id': keyArr[i],
            'name': arr[keyArr[i]]
          })
        }
        return newArr;
      },
    },
    watch: {
      defaultFiltrData: function(val, oldVal){
        if (val != undefined) {
          this.mainFiltr(this.extraFiltrData);
        }
      },

    },
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

