<template>
  <div id="excur" class="row">

    <div class="col-12">
      <Excursion_SearchBar></Excursion_SearchBar>
    </div>

    <div class="col-12">
      <MultiResultsBar :progressPerc="progressPerc"></MultiResultsBar>
    </div>

    <div id="filterBlock" class="col-md-3 col-lg-3 d-none d-sm-none d-md-block d-lg-block">
      <Excursion_Filter v-bind:propertiesFiltr=propertiesFiltr v-on:getExtraFiltr="mainFiltr"></Excursion_Filter>                
    </div>

    <div id="resultsBlock" class="col-12 col-sm-12 col-md-9 col-lg-9">
      <div id="defaultFilter" class="col-12 shadow">
        <div class="row">
          <div class="btn-group btn-group-toggle btn-block scrollmenu" data-toggle="buttons">
            <label class="btn col-4 active" v-on:click="changeRadio($event)">
              <input type="radio" value="0" autocomplete="off" v-model="defaultFiltrData" > 
              Дешевые
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="1" autocomplete="off" v-model="defaultFiltrData"> Популярные
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="2" autocomplete="off" v-model="defaultFiltrData"> Необычные
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="3" autocomplete="off" v-model="defaultFiltrData">
              Интересные
            </label>
          </div>
        </div>
      </div>
      <div id="excurItems" class="col-12" >
        <div class="row">
          <Excursion_Item v-bind:excur=excur v-bind:currency="currency" v-for="(excur, index) in excurs" :key="index"></Excursion_Item>
        </div>

        <div id="errorBlock" class="row shadow" v-if="(excurNoSort.length == 0 && progressPerc.excurs == 100) || exrucExtraSort.length == 0" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Здесь пока нет экскурсий :(</h3>
            <p class="h6 text-center" v-if="excurNoSort.length == 0">Совет: попробуйте изменить город.</p>
            <p class="h6 text-center" v-if="exrucExtraSort.length == 0">Совет: попробуйте изменить настройки фильтрации.</p>
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

  import Excursion_SearchBar from './Excursion_SearchBar.vue';
  import MultiResultsBar from './MultiResultsBar.vue';
  import Excursion_Item from './Excursion_Item.vue';
  import Excursion_Filter from './Excursion_Filter.vue';
  import Loader from './Loader.vue';

  export default {
    name: 'Excursion',
    components: {
      'Excursion_SearchBar': Excursion_SearchBar,
      'MultiResultsBar': MultiResultsBar,
      'Excursion_Item': Excursion_Item,
      'Excursion_Filter': Excursion_Filter,

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
        color: "#02A9E0",

        // data map
        geojson: {},

        // data excur
        excurNoSort: ['0'], 
        exrucExtraSort: ['0'], 
        excurs: [],

        currency: 'RUB',
        // time out search results
        statTimeOut: false,


        // stats
        progressPerc: {
          avia: 0,
          hotels: 0,
          excurs: 0,
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
      BusEvent.$on('getExcursions', function(obj) {
        self.progressPerc["excurs"] = 5;
        self.excurNoSort = ['0'];
        self.exrucExtraSort = ['0'];
        self.excurs = [];
        self.statTimeOut = false;

        setTimeout(() => {
          self.getExcursions(obj);
        }, 600)
        
        
        // load test data
        // self.getHotelsTest(obj);
      })
    },
    mounted() {
      
      window.addEventListener('scroll', this.loadMore)
    },
    methods: {

      // change radio in label defaul filtr
      changeRadio(event){
        let el = event.target;
        if(el.children[0] != undefined){
          // el.children[0].click();
          this.defaultFiltrData = el.children[0].value;
        }
      },

      getExcursions(obj){
        let self = this;
        self.queryObj = obj;

        this.$http.post(self.pathData + '/getExcursions', obj).then(function (response) {
          console.log('///////////////')
          console.log('get excursion - loaded');

          let data = response.data;
          if(data != null){
            self.excurNoSort = data.experiences;
            self.excurs = data.experiences;
            self.currency = data.currency;
          }else{
            self.excurNoSort = [];
            self.excurs = [];

          }

          self.progressPerc["excurs"] = 100;
        });
      },



      mainFiltr(filtrObj, offset = 0) {
        
      },

      extraFiltr(val){
        // get extra filtr from Avia_filtr Component by change parametr
        this.extraFiltrData = val;
        console.log(val)
        // run re sorting
        // this.mainFiltr();
      },

      setPropertyFilter(){
        
        
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
  #excur #resultsBlock .btn{
    -webkit-box-shadow: none;
  }

  #excur #defaultFilter .col-4{
    text-align: center;
    font-family: 'Comfortaa', sans-serif;
    /*color: #000;*/
    color: #888;
    font-size: 14px;
    line-height: 35px;
    border-right: 1px solid #EBEBEB;
    min-width: 150px;
  }

  #excur #defaultFilter .col-4:last-child{
    border-right: 0px solid #EBEBEB;
  }

  #excur #defaultFilter .active{
    background-color: #02A9E0;
    color: white;
  }

  #excur #defaultFilter .scrollmenu {
     white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }
  #excur #defaultFilter .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  #excur #filterBlock{
    padding-right: 5px;
  }

  #excur #errorBlock {
    font-family: 'Comfortaa', sans-serif;
    color: #888;
    font-size: 14px;
    padding-top: 25px;
    padding-bottom: 15px;
    /*margin-top: 20px;*/
  }
  #excur #errorBlock p{
    margin-top: 15px;
  }

  @media (min-width: 768px){ 
    #excur #excurItems .row .col-lg-6{
      padding-top: 0px;
    }
    #excur #excurItems .row .col-lg-6:nth-child(2n+1){
      padding-left: 0px;
      padding-right: 10px;
    }
    #excur #excurItems .row .col-lg-6:nth-child(2n){
      padding-left: 10px;
      padding-right: 0px;
    }
    #excur #excurItems .row .col-md-6{
      padding-top: 0px;
    }
    #excur #excurItems .row .col-md-6:nth-child(2n+1){
      padding-left: 0px;
    }
    #excur #excurItems .row .col-md-6:nth-child(2n){
      padding-right: 0px;
    }
  }

</style>

