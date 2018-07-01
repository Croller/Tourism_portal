<template>
  
  <div class="row">

    <div class="col-12">
      <Avia_SearchBar v-bind:style="{position: positionSearchBar}" ></Avia_SearchBar>
    </div>
    

    <div id="infoBlock" class="col-12">
      <div class="shadow">
        
      
        <div id="infoPanel" class="col-12">

          <!-- <div class="row" style="background-color:red; width: 100%" >
            <div class="col-12 ">
              {{ progressPerc }}
            </div>
            
          </div> -->
          
          
        </div>
        
        <div id="progressSearch" class="progress" v-if="progressPerc > 0">
          <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :style="'width: ' + progressPerc +'%'" aria-valuenow="25" aria-valuemin="3" aria-valuemax="100"></div>
        </div>

      </div>
    </div>



    <div id="filterBlock" class="col-md-3 col-lg-3 d-none d-sm-none d-md-block d-lg-block">

      <Avia_Filter v-bind:propertiesFiltr=propertiesFiltr v-on:getExtraFiltr="mainFiltr"></Avia_Filter>
                    
    </div>

    <div id="resultsBlock" class="col-12 col-sm-12 col-md-9 col-lg-9">
      <div id="defaultFilter" class="col-12 shadow">
        <div class="row">
          <div class="btn-group btn-group-toggle btn-block scrollmenu" data-toggle="buttons">
            <label class="btn col-4 active" v-on:click="changeRadio($event)">
              <input type="radio" value="0" autocomplete="off" v-model="defaultFiltrData" > Самый дешевый
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="1" autocomplete="off" v-model="defaultFiltrData"> Самый быстрый
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="2" autocomplete="off" v-model="defaultFiltrData"> Оптимальный
            </label>
            <label class="btn col-4" v-on:click="changeRadio($event)">
              <input type="radio" value="3" autocomplete="off" v-model="defaultFiltrData"> Интересный
            </label>
          </div>
        </div>
      </div>
      <div id="aviaItems" class="col-12" >

        <Avia_Item v-bind:ticket=ticket v-bind:airlines=airlines v-bind:airports=airports v-bind:airplane=airplane v-bind:sales=sales v-for="(ticket, index) in tickets" :key="index" v-if="tickets.length > 0"></Avia_Item>


        <div id="errorBlock" class="row shadow" v-if="(ticketsNoSort.length == 0 && progressPerc == 100) || ticketsExtraSort.length == 0">
          <div class="container">
            <h3 class="display-6 text-center">Мы не нашли билетов :(</h3>
            <p class="h6 text-center" v-if="ticketsNoSort.length == 0">Совет: попробуйте изменить даты вылета и/или прилета.</p>
            <p class="h6 text-center" v-if="ticketsExtraSort.length == 0">Совет: попробуйте изменить настройки фильтрации.</p>
          </div>
        </div>
        
        <Loader  v-if="tickets.length == 0"></Loader>

      </div>
    </div>
  </div>

</template>

<script>

  import Avia_SearchBar from './Avia_SearchBar.vue'
  import Avia_Item from './Avia_Item.vue'
  import Avia_Filter from './Avia_Filter.vue'
  import Loader from './Loader.vue'

  import Moment from 'moment';

  import BusEvent from './BusEvent.vue'

  export default {
    name: 'Avia',
    components: {
      'Avia_SearchBar': Avia_SearchBar,
      'Avia_Item': Avia_Item,
      'Avia_Filter': Avia_Filter,
      'Loader': Loader,
    },
    http: {
      emulateJSON: true,
      emulateHTTP: true
    },
    data () {
      return {
        // language
        locale: "ru",

        // data map
        geojson: {},

        // data tickets
        ticketsNoSort: ['0'], 
        ticketsExtraSort: ['0'], 
        tickets: [],

        // dictionary
        airlines: {},
        airports: {},
        airplane: {},
        sales: {},
        segments: [],

        // stats
        positionSearchBar : "static", // set position searchBar
        searchCount: 0,
        progressPerc: 0,
        loadStatus: true,

        // filter parmmetrs
        extraFiltrData: {},
        defaultFiltrData: "0",

        propertiesFiltr: {
          max_stops: [],
          total_duration: [],
          price: [],
          segment_durations: [],
          segments_time: [],
          stop_duration: [],
          sales: [],
          airlines: [],
          stops_airports: [],
          segments: [],
        } // data for avia_filter component
      }
    },
    computed:{

      segment_durationsProps: function(){
        if(this.ticketsNoSort.length != 0){
          let ticketProp = this.ticketsNoSort;
          var arr = [];
          for (var i = 0; i < ticketProp[0].segment.length; i++) {
            arr.push([
              Object.keys(this.groupObjVal(ticketProp, 'segment_durations_'+i))[0],
              Object.keys(this.groupObjVal(ticketProp, 'segment_durations_'+i))[Object.keys(this.groupObjVal(ticketProp, 'segment_durations_'+i)).length - 1],
            ]);
          }
          return arr;
        }
      },
      segments_timeProps: function(){
        if(this.ticketsNoSort.length != 0){
          let ticketProp = this.ticketsNoSort;
          var arr = [];
          for (var i = 0; i < ticketProp[0].segment.length; i++) {
            arr.push([
              Object.keys(this.groupObjVal(ticketProp, 'segments_time_'+i+'_0'))[0],
              Object.keys(this.groupObjVal(ticketProp, 'segments_time_'+i+'_1'))[Object.keys(this.groupObjVal(ticketProp, 'segments_time_'+i+'_1')).length - 1],
            ]);
          
          }
          return arr;
        }
      },
    },
    created: function() {
      let self = this;

      //get avia ticket
      BusEvent.$on('getTicket', function(uuid) {
        // clear data before
        self.progressPerc = 5; 
        self.searchCount = 0;
        self.ticketsNoSort = ['0'];
        // get new data
        self.getAviaTickets({'uuid': uuid});
      })
    },
    mounted () {
      console.log('///////////////')
      console.log('avia - loaded')

      // get data for test
      // this.getAvia({})

      // prototype
      Array.prototype.total = function () {
        var total = 0
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
          total += this[i]
        }
        return total
      }
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
      
      // get data by uuid ------
      getAviaTickets(obj){
        this.$http.post('http://127.0.0.1:8081/getAviaTickets', obj).then(function (response) {
            // Success
            console.log('///////////////')
            console.log('get ticket - loaded')

            document.getElementById("progressSearch").children[0].classList.add('progress-bar-animated');
            
            let data = response.data;
            if(this.searchCount != 40){
              // set to component data  dictionary and tickets
              if(data != null){
                if(this.ticketsNoSort.length == 1) this.ticketsNoSort = [];
                Object.assign(this.airlines, data.airlines);
                Object.assign(this.airports, data.airports);
                Object.assign(this.airplane, data.airplane);
                Object.assign(this.sales, data.sales);
                for (var i = 0; i < data.ticketsNoSort.length; i++) {
                  this.ticketsNoSort.push(data.ticketsNoSort[i]);
                }
                this.segments = data.segments;

                if(data.ticketsNoSort.length > 1){
                  this.setPropertyFilter();
                  this.mainFiltr();
                }

              }else{
                document.getElementById("progressSearch").children[0].classList.remove('progress-bar-animated');
                this.progressPerc = 100;
                return;
              }
              
              // repeat request tickets
              setTimeout(() => {
                this.getAviaTickets(obj);
              }, 2500);

              if(this.progressPerc < 80){
                this.progressPerc = this.progressPerc + 10;
              }
              
              this.searchCount ++;
            }
        });
      },
      // get data from server ------
      getAvia(obj){
        this.$http.post('http://127.0.0.1:8081/getAviaTest', obj).then(function (response) {
            // Success
            console.log('///////////////')
            console.log('get ticket - loaded')
            // console.log(response.data)
            if(response.data != null){
              console.log('ticket found, length = ', response.data.ticketsNoSort.length);
              this.getData(response.data);
              // add watch 
              // first to add data
              this.mainFiltr()

            }else{
              console.log('no ticket found, sorry')
              this.ticketsNoSort = [];
            }
        });
      },

      // get tickets and dictionary -------------
      getData(data){
        this.airlines = data.airlines;
        this.airports = data.airports;
        this.airplane = data.airplane;
        this.sales = data.sales;
        this.segments = data.segments;
        this.ticketsNoSort = data.ticketsNoSort;

        // Object.assign(this.ticketsNoSort, data.ticketsNoSort);
      },


      mainFiltr(filtrObj) {

        var countTickets = 30;
        var groupTicketsArr = [];

        // add comapre extraDataFiltr for filtering speed
        this.extraFiltrData = filtrObj;

        // extra sort tickets ( output tickets without groupping by param )
        if( typeof filtrObj == "object"){
          let tickets = this.ticketsNoSort;
          for (var f = 0; f < Object.keys(filtrObj).length; f++) {
            let key = Object.keys(filtrObj)[f];
            let params = filtrObj[Object.keys(filtrObj)[f]];

            // filtr by value from avia_filter
            switch (key) {
              case "max_stops":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param.length > 0 && param != undefined){
                    tickets = tickets.filter(ticket => ticket[key] != param );
                  }
                }
                break;
              case "segments_time":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                    tickets = tickets.filter(ticket => ticket.segments_time[i][0] >= param[0] && ticket.segments_time[i][1] <= param[1]);
                  }
                }
                break;
              case "price":
                let param = params;
                if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                  tickets = tickets.filter(ticket => ticket.terms[Object.keys(ticket.terms)[0]].price >= param[0] - 1  && ticket.terms[Object.keys(ticket.terms)[0]].price <= param[1] + 1 );
                }
                break;
              case "segment_durations":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                    tickets = tickets.filter(ticket => ticket[key][i] >= param[0] && ticket[key][i] <= param[1]);
                  }
                }
                break;
              case "stops_airports":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i].id;
                  if(param.length > 0 && param != undefined){
                    tickets = tickets.filter(ticket => ticket[key].filter( port => port == param ).length == 0);
                  }
                }
                break;
              case "airlines":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i].id;
                  if(param.length > 0 && param != undefined){
                    tickets = tickets.filter(ticket => ticket['carriers'].filter( carrier => carrier == param ).length == 0);
                  }
                }
                break;
              case "sales":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i].id;
                  if(param.length > 0 && param != undefined){
                    tickets = tickets.filter(ticket => Object.keys(ticket['terms'])[0] != param);
                  }
                }
                break;
            }
          }
          this.ticketsExtraSort = tickets;
        }else{
          this.ticketsExtraSort = this.ticketsNoSort;
        }
        // console.log('extra len = ' + this.ticketsExtraSort.length)
        
        // default sort tickets
        switch (this.defaultFiltrData) {
          case "0":
            groupTicketsArr = this.groupTickets(this.ticketsExtraSort, 'price');
            break;
          case "1":
            groupTicketsArr = this.groupTickets(this.ticketsExtraSort, 'total_duration');
            break;
          case "2":
            groupTicketsArr = this.sortObjVal('price', this.groupTickets(this.ticketsExtraSort, 'total_duration'));
            break;
          case "3":
            groupTicketsArr = this.sortObjVal('total_duration', this.groupTickets(this.ticketsExtraSort, 'price')).reverse();
            break;
        }
        // get first 30 tickets
        groupTicketsArr = groupTicketsArr.slice(0, countTickets);
        this.tickets = groupTicketsArr;
      },
      extraFiltr(val){
        // get extra filtr from Avia_filtr Component by change parametr
        this.extraFiltrData = val;
        console.log(val)
        // run re sorting
        // this.mainFiltr();
      },

      groupTickets(arr, filtr){
        // group by filtr
        let group = this.groupObjVal(arr, filtr)

        // set tickets to group_param which less 
        var results = [];
        var groupK = Object.keys(group);
        for (var i = 0; i < groupK.length; i++) {
          let key = groupK[i];
          if (group[key].length > 1) {
            let obj = group[key][0];
            obj['group_param'] = this.sortObjVal('price', group[key]);
            results.push(obj);
          }else{
            results.push(group[key][0])
          }
        }
        return results;
      },

      setPropertyFilter(){
        this.propertiesFiltr = {
          max_stops: Object.keys(this.groupObjVal(this.ticketsNoSort, 'max_stops')),
          total_duration: [
            Object.keys(this.groupObjVal(this.ticketsNoSort, 'total_duration'))[0],
            Object.keys(this.groupObjVal(this.ticketsNoSort, 'total_duration')).reverse()[0],
          ],
          price: [
            this.sortObjVal('',Object.keys(this.groupObjVal(this.ticketsNoSort, 'price')))[0],
            this.sortObjVal('',Object.keys(this.groupObjVal(this.ticketsNoSort, 'price'))).reverse()[0]
          ],
          segment_durations: this.segment_durationsProps,
          segments_time: this.segments_timeProps,
          stop_duration: [
            Object.keys(this.groupObjVal(this.ticketsNoSort, 'min_stop_duration'))[0],
            Object.keys(this.groupObjVal(this.ticketsNoSort, 'max_stop_duration')).reverse()[0]
          ],
          sales: this.sortObjVal('average_rate', this.reCollectArr(this.sales)).reverse(),
          airlines: this.sortObjVal('lowcost', this.reCollectArr(this.airlines)),
          stops_airports: this.sortObjVal('average_rate', this.reCollectArr(this.airports)).reverse(),
          segments: this.segments,
        }
      },


      // help function ----------

      groupObjVal(arr, filtr){
        return arr.reduce(function(rv, x) {
          if( filtr == 'price'){
            var key = Object.keys(x.terms);
            if(rv[x['terms'][key[0]].price] = rv[x['terms'][key[0]].price] || []){
              rv[x['terms'][key[0]].price].push(x);
            }
          }else if( filtr.indexOf('segments_time') != -1 ){
            var key = 'segments_time';
            var int = filtr.replace(key+'_','').split('_');
            var parent = x[key][parseInt(int[0])];
            var child = parseInt(int[1]);
            if(rv[parent[child]] = rv[parent[child]] || []){
              rv[parent[child]].push(x)
            }
          }else if( filtr.indexOf('segment_durations') != -1 ){
            var key = 'segment_durations';
            var int = parseInt(filtr.replace(key+'_',''));
            if(rv[x[key][int]] = rv[x[key][int]] || []){
              rv[x[key][int]].push(x)
            }
          }else{
            if(rv[x[filtr]] = rv[x[filtr]] || []){
              rv[x[filtr]].push(x)
            }
          }
          return rv;
        }, {});
      },
      
      sortObjVal(key, obj){
        switch (key) {
          case "price":
            obj.sort(function(a,b) {
              var aK = Object.keys(a.terms);
              var bK = Object.keys(b.terms);
              return a['terms'][aK[0]].price - b['terms'][bK[0]].price;
            });
            return obj;
            break;
          case "lowcost":
            obj.sort(function(a,b) {
              return (a.lowcost === b.lowcost)? 0 : a.lowcost? -1 : 1;
            });
            return obj;
            break;
        }

        if( key.length > 0 && key != undefined){
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
          arr[keyArr[i]]['id'] = keyArr[i];
          newArr.push(arr[keyArr[i]])
        }
        return newArr;
      },
      // get val from deep path at object
      getDeepObjVal(obj, path){
        for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
            obj = obj[path[i]];
        };
        return obj;
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
  
  #resultsBlock .btn{
    -webkit-box-shadow: none;
  }

  #avia #defaultFilter .col-4{
    text-align: center;
    font-family: 'Comfortaa', sans-serif;
    color: #000;
    font-size: 14px;
    line-height: 35px;
    border-right: 1px solid #EBEBEB;
  }

  #avia #defaultFilter .col-4:last-child{
    border-right: 0px solid #EBEBEB;
  }

  #avia #defaultFilter .active{
    background-color: #FF9F1C;
    color: white;
  }

  #avia #defaultFilter .scrollmenu {
     white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }
  #avia #defaultFilter .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  

  #avia #infoBlock{
    margin-top: 20px;
  }
  #avia #infoPanel{
    width: 100%;
    height: 60px;
  }
  #avia #infoBlock .progress{
    height: 0.5rem;
    background-color: white;
    border-radius: 0px 0px 3px 3px;
  }
  #avia #infoBlock .progress .bg-success{
    background-color: #A5DB93 !important;
  }

  #avia #filterBlock{
    padding-right: 5px;
  }



  #loadBlock {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  #loadBlock .sk-spinner-double-bounce.sk-spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce1,
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid white;
    background-color: #FF9F1C;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-doubleBounce 2s infinite ease-in-out;
    animation: sk-doubleBounce 2s infinite ease-in-out;
  }
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  @-webkit-keyframes sk-doubleBounce {
    0%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
      transform: scale(1);
      border: 5px solid white;
    }
  }
  @keyframes sk-doubleBounce {
    0%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
      transform: scale(1);
      border: 5px solid white;
    }
  }

  #errorBlock {
    font-family: 'Comfortaa', sans-serif;
    color: #888;
    font-size: 14px;
    padding-top: 25px;
    padding-bottom: 15px;
    margin-top: 20px;
  }
  #errorBlock p{
    margin-top: 15px;
  }

</style>