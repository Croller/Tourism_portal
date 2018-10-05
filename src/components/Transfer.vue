<template>
  
  <div id="transfer" class="row">

    <div class="col-12">
      <Transfer_SearchBar v-bind:style="{position: positionSearchBar}" ></Transfer_SearchBar>
    </div>
    
    <div class="col-12">
      <MultiResultsBar :progressPerc="progressPerc"></MultiResultsBar>
    </div>

    <!-- <div id="infoBlock" class="col-12">
      <div class="shadow">
        
      
        <div id="infoPanel" class="col-12">
          
        </div>
        
        <div id="progressSearch" class="progress" v-if="progressPerc > 0">
          <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :style="'width: ' + progressPerc +'%'" aria-valuenow="25" aria-valuemin="3" aria-valuemax="100"></div>
        </div>

      </div>
    </div> -->



    <div id="filterBlock" class="col-md-3 col-lg-3 d-none d-sm-none d-md-block d-lg-block">
      <Transfer_Filter v-bind:propertiesFiltr=propertiesFiltr :info=info :tarif=tarif v-on:getExtraFiltr="mainFiltr" ></Transfer_Filter>                
    </div>

    <div id="resultsBlock" class="col-12 col-sm-12 col-md-9 col-lg-9">
      <!-- <div id="defaultFilter" class="col-12 shadow" style="display: none;">
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
      </div> -->
      <div id="transferItems" class="col-12" >
        <div class="row">
          <Transfer_Item v-bind:transfer=item v-for="(item, index) in transfer" :key="index" :currency=info.currency v-if="transfer.length > 0"></Transfer_Item>
        </div>


        <div id="errorBlock" class="row shadow" v-if="transfer.length == 0 && progressPerc.transfer == 100" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Мы не нашли такси :(</h3>
            <p class="h6 text-center" v-if="transfer.length == 0">Совет: попробуйте изменить места отправления или прибытия.</p>
            <p class="h6 text-center" v-if="transferExtraSort.length == 0">Совет: попробуйте изменить настройки фильтрации.</p>
          </div>
        </div>
        
        <Loader  v-if="progressPerc.transfer < 100 && progressPerc.transfer > 0" style="margin-bottom: 100px;" :color=color></Loader>

      </div>
    </div>
  </div>

</template>

<script>

  import Transfer_SearchBar from './Transfer_SearchBar.vue'
  import MultiResultsBar from './MultiResultsBar.vue';
  import Transfer_Item from './Transfer_Item.vue'
  import Transfer_Filter from './Transfer_Filter.vue'
  import Loader from './Loader.vue'

  import Moment from 'moment';
  import Toastr from 'toastr';

  import BusEvent from './BusEvent.vue'

  export default {
    name: 'Transfer',
    components: {
      'Transfer_SearchBar': Transfer_SearchBar,
      'MultiResultsBar': MultiResultsBar,
      'Transfer_Item': Transfer_Item,
      'Transfer_Filter': Transfer_Filter,
      'Loader': Loader,
    },
    http: {
      emulateJSON: true,
      emulateHTTP: true
    },
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),

        // language
        locale: "ru",
        color: "#E3C500",

        // data map
        geojson: {},

        // data transfer
        transferNoSort: [], 
        transferExtraSort: [], 
        transfer: [],

        // time out search results
        statTimeOut: false,

        // dictionary
        class: [],
        info: {},
        agency: [],

        // stats
        positionSearchBar : "static",

        progressPerc: {
          avia: 0,
          hotels: 0,
          excurs: 0,
          transfer: 0,
        },

        // filter parmmetrs
        extraFiltrData: {},
        defaultFiltrData: "0",

        propertiesFiltr: {
          class: [],
          price: [],
          min_price: [],
          waiting_time: [],
          agency: [],
        } // data for transfer_filter component
      }
    },
    computed:{
      tarif: function(){
        return this.class;
      }
    },
    created: function() {
      let self = this;

      //get transfer ticket
      BusEvent.$on('getTransfer', function(obj) {
        // clear data before
        self.progressPerc["transfer"] = 10; 
        self.transferNoSort = ['0'];
        self.transferExtraSort = ['0'];
        self.transfer = [];

        this.propertiesFiltr = {
          class: [],
          price: [],
          min_price: [],
          waiting_time: [],
          agency: [],
        }
        // get new data
        self.getTransfer(obj);
        // test data
        // self.getAviaTransferTest({})
      })
    },
    mounted () {
      console.log('///////////////')
      console.log('transfer - loaded')

      // get data for test
      // this.getAvia({})

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
      // check time out transfer results
      timeOutSearch(){
        setTimeout( () => {
          if(!this.statTimeOut && this.transfer.length > 0){
            // this.alertMsg('Время истекло','Результат поиска устарел','warning');
            this.statTimeOut = true;
          }
        },600000);
      },
      
      // get data by uuid ------
      getTransfer(obj){

        this.progressPerc["transfer"] = 25;

        let self = this;
        this.$http.post(self.pathData + '/getTransfer', obj).then(function (response) {
          // Success
          console.log('///////////////')
          console.log('get transfer price - loaded')
          
          let data = response.data;
          if(data != null && data.transferNoSort.length > 0){
            // console.log(data)
            this.transferNoSort = data.transferNoSort;
            this.class = data.class;
            this.info = data.info;
            this.agency = data.agency;

            this.setPropertyFilter();
            this.mainFiltr();
          }else{
            self.transferNoSort = [];
            self.transferExtraSort = [];
            self.transfer = [];
          }
          
          this.progressPerc["transfer"] = 100;
        });
      },


      mainFiltr(filtrObj) {
        let self = this;

        var groupTransferArr = [];
        // console.log(filtrObj)
        // add comapre extraDataFiltr for filtering speed
        this.extraFiltrData = filtrObj;

        // extra sort transfer ( output transfer without groupping by param )
        if( typeof filtrObj == "object"){
          let transfer = this.transferNoSort;
          for (var f = 0; f < Object.keys(filtrObj).length; f++) {
            let key = Object.keys(filtrObj)[f];
            let params = filtrObj[Object.keys(filtrObj)[f]];

            // filtr by value from transfer_filter
            switch (key) {
              case "class":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param.length > 0 && param != undefined){
                    transfer = transfer.filter(transfer => transfer[key+'_name'] != param );
                  }
                }
                break;
              case "price":
                for (var i = 0; i < params.length; i++) {
                  let param = params;
                  if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                    transfer = transfer.filter(transfer => transfer.price >= param[0] && transfer.price <= param[1]);
                  }
                }
                break;
              case "min_price":
                for (var i = 0; i < params.length; i++) {
                  let param = params;
                  if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                    transfer = transfer.filter(transfer => transfer.min_price >= param[0] && transfer.min_price <= param[1]);
                  }
                }
                break;
              case "waiting_time":
                for (var i = 0; i < params.length; i++) {
                  let param = params;
                  if(param.length > 0 && param != undefined && param[0] != undefined && param[1] != undefined){
                    transfer = transfer.filter(transfer => transfer.waiting_time >= param[0] && transfer.waiting_time <= param[1]);
                  }
                }
                break;
              case "agency":
                for (var i = 0; i < params.length; i++) {
                  let param = params[i];
                  if(param != undefined){
                    transfer = transfer.filter(transfer => transfer[key] != param.id );
                  }
                }
                break;
            }
          }
          this.transferExtraSort = transfer;
        }else{
          this.transferExtraSort = self.transferNoSort;
        }
        
        //default sort transfer
        // switch (this.defaultFiltrData) {
        //   case "0":
        // console.log(this.sortObjVal('price', this.transferExtraSort))
            // groupTransferArr = this.sortObjVal('price', this.transferExtraSort);
        //     break;
        //   case "1":
        //     groupTransferArr = this.groupTransfer(this.transferExtraSort, 'total_duration');
        //     break;
        //   case "2":
        //     groupTransferArr = this.sortObjVal('price', this.groupTransfer(this.transferExtraSort, 'total_duration'));
        //     break;
        //   case "3":
        //     groupTransferArr = this.sortObjVal('total_duration', this.groupTransfer(this.transferExtraSort, 'price')).reverse();
        //     break;
        // }
        // console.log(groupTransferArr)
        // get first 30 transfer
        // groupTransferArr = groupTransferArr;
        this.transfer = this.sortObjVal('price', this.transferExtraSort);
      },

      extraFiltr(val){
        this.extraFiltrData = val;
      },

      groupTransfer(arr, filtr){
        // group by filtr
        let group = this.groupObjVal(arr, filtr)

        // set transfer to group_param which less 
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
          class: Object.keys(this.groupObjVal(this.class, 'id')),
          price: [
            Object.keys(this.groupObjVal(this.transferNoSort, 'price'))[0],
            Object.keys(this.groupObjVal(this.transferNoSort, 'price')).reverse()[0]
          ],
          min_price: [
            Object.keys(this.groupObjVal(this.transferNoSort, 'min_price'))[0],
            Object.keys(this.groupObjVal(this.transferNoSort, 'min_price')).reverse()[0]
          ],
          waiting_time: [
            Object.keys(this.groupObjVal(this.sortObjVal('waiting_time', this.transferNoSort), 'waiting_time'))[0],
            Object.keys(this.groupObjVal(this.sortObjVal('waiting_time', this.transferNoSort), 'waiting_time')).reverse()[0]
          ],
          agency: this.agency,
        }
      },


      // help function ----------

      groupObjVal(arr, filtr){
        return arr.reduce(function(rv, x) {
          if (rv[x[filtr]] = rv[x[filtr]] || []){
            rv[x[filtr]].push(x)
          }
          return rv;
        }, {});
      },
      
      sortObjVal(key, obj){
        if( key.length > 0 && key != undefined){
          obj.sort(function(a,b) {
            return a[key] - b[key];
          });
        }else{
          obj.sort(function(a,b) {
            return a - b;
          });
        }
        return obj;
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

      alertMsg(title,str,type, ){
        //type 1.success 2.info 3.warning 4.error
        Toastr.options = {
          "closeButton": true,
          "debug": false,
          "progressBar": true,
          "preventDuplicates": false,
          "positionClass": "toast-top-center",
          "onclick": null,
          "showDuration": "500",
          "hideDuration": "1000",
          "timeOut": "7000",
          "extendedTimeOut": "2500",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        Toastr[type](str,title);
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
  
  #transfer #resultsBlock .btn{
    -webkit-box-shadow: none;
  }

  #transfer #defaultFilter .col-4{
    text-align: center;
    font-family: 'Comfortaa', sans-serif;
    /*color: #000;*/
    color: #888;
    font-size: 14px;
    line-height: 35px;
    border-right: 1px solid #EBEBEB;
    min-width: 150px;
  }

  #transfer #defaultFilter .col-4:last-child{
    border-right: 0px solid #EBEBEB;
  }

  #transfer #defaultFilter .active{
    background-color: #FF9F1C;
    color: white;
  }

  #transfer #defaultFilter .scrollmenu {
     white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }
  #transfer #defaultFilter .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  #transfer #filterBlock{
    padding-right: 5px;
  }

  #transfer #errorBlock {
    font-family: 'Comfortaa', sans-serif;
    color: #888;
    font-size: 14px;
    padding-top: 25px;
    padding-bottom: 15px;
    margin-top: 20px;
  }
  #transfer #errorBlock p{
    margin-top: 15px;
  }

  @media (min-width: 768px){ 
    #transfer #transferItems .row .col-lg-4{
      padding-left: 12px;
    }
    #transfer #transferItems .row .col-lg-4:nth-child(5n-1){
      padding-left: 7px;
    }
    #transfer #transferItems .row .col-lg-4:nth-child(1){
      padding-left: 7px;
    }
/*    #transfer #transferItems .row .col-md-4:nth-child(2n){
      padding-right: 10px;
      padding-left: 10px;
    }*/
  }

</style>