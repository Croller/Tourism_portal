<template>
  
  <div id="wikiSearchBar" class="container" >
    <div class="row justify-content-center">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-10">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="wiki_Query" placeholder="Что ищем?" v-model="wiki_Query" autocomplete="off" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-2">
        <span class="fas fa-search"></span> 
        <!-- <router-link to="/search"> -->
          <!-- <router-link :to="{ name: 'Search', params: this.validObj}"> -->
          <button class="btn btn-primary" v-on:click="wikiSubmit">Поиск</button>
        <!-- </router-link>    -->
      </div>
    </div>
  </div>
  
</template>


<script>

  import BusEvent from './BusEvent.vue';
  import Moment from 'moment';
  import Toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  import InputMask from 'inputmask';
  import ClickOutside from 'vue-click-outside';

  export default {
    name: 'Wiki_SearchBar',
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),

        // language
        locale:         "ru",       //search on language
        // query string from to
        wiki_Query:  "",
        wiki_Coords: "", // if you show up the city to increase it
        
        // -------

        focused: false,
      }
    },
    prop:{},
    computed: {},
    created: function(){},
    mounted () {
      console.log('///////////////')
      console.log('wiki search bar - loaded')

      let self = this;

      // load wiki cities
      // this.wikiLoadCities();

      // set data from route params
      // console.log(this.$route.params.objQuery)

      if(this.$route.params.hasOwnProperty("wiki") && this.$route.name == 'Search'){

        if(Object.keys(this.$route.params.wiki).length > 0){
          let rParams = this.$route.params.wiki.searchBar;
          let obj = this.$route.params.wiki.queryObj;

          this.locale = rParams.locale;
          this.wiki_Query = rParams.wiki_Query;

          BusEvent.$emit('getWiki', obj);
        }
      }else{
        // check cookie
        // BusEvent.$emit('getTicket', uuid);
      }
   
      // init autocomplite for input with cities
      var maxLimit = 5;
      $( "#wiki_Query" ).autocomplete({
        // position: { my: "left bottom", at: "left top", collision: "flip" },
        source: function(request, response) {
          setTimeout(() => {
            if(request.term.length > 2){
              self.wikiLoadAutoComplete (request.term, function(err, data) {
                response(data.slice(0, 5));
              });
            }
          }, 50);
        },
        minLength: 1,
        // focus: function( event, ui ) {
        //   self.wiki_Query = ui.item.label;
        // },
        select: function( event, ui ) {
          let el = document.getElementById('wiki_Query');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.wiki_Query = ui.item.label;
          self.wiki_Coords = ui.item.geometry.coordinates.join(',');
          let data = {
            "layerName": "wiki_Query",
            "geojson": {
              "type": "Feature",
              "properties": {
                "code": ui.item.value,
                "label": ui.item.label,
              },
              "geometry": ui.item.geometry
            }
          };
          //map zoom to data
          BusEvent.$emit('zoomTo',data.geojson);
          //set data at map
          // BusEvent.$emit('createLayer', data);
          // console.log(data)
          return false;
        }
      }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.label + ", <span>" + (item.hasOwnProperty("locationName") ? item.locationName : item.countryName) + "</span></div>" )
          .appendTo( ul );
      };
      
      // set dropdown width like input
      jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
      }
      
      
      // init vue-click-outside
      this.popupItem = this.$el;



    },

    methods: {

      alertMsg(title,str,type){
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
          "timeOut": "3000",
          "extendedTimeOut": "2500",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        Toastr[type](str,title);
      },

      clearSpan(event){
        var self = this;
        var el = event.target
        var list_el = event.target.parentNode.children;
        for (var i = 0; i < list_el.length; i++) {
          if (list_el[i].tagName == 'INPUT') {
            // list_el[i].value = "";
            var id = list_el[i].id.split('_')[0] ;
            if(list_el[i].id.indexOf('Query') != -1){
              self[id + '_Query'] = "" ;       
              self[id + '_Coords'] = "" ;  
            }    
          }
        }
      },

      wikiLoadAutoComplete(str, callback){

        if(str.length < 3) return {};

        let obj = {
          "query": str,
          "lang": this.locale,
          "lookFor": "city", // city (города и острова), excur (отели), both (все объекты, значение по умолчанию).
          "limit": 5,
          "convertCase": 1,
        }
        this.$http.post(this.pathData + "/getAutoComplete", obj)
        .then(response => {
          if(response.status == 200 && response.data != null){
            callback(null, response.data);
          }else{
            callback(response.status, null);
            console.log("Server error: "+ response.status);
          }
        });
      },

      // validation data
      validObj(){
        var obj = {
          'lang': this.locale,
          'wiki_Query': this.wiki_Query
        }
        
        if(this.wiki_Query.length == 0){          
          document.getElementById('wiki_Query').style.border = '1px solid #FF5C1C';
          this.alertMsg('Ошибочка', 'не чего искать','warning');
          return null;
        }
        
        document.getElementById('wiki_Query').style.border = '1px solid #e5e6e7';

        return obj;
      },

      

      // start search
      wikiSubmit() {
        this.focused = false;
        let queryObj = this.validObj();
        if(queryObj != null){
          this.mainLogic(queryObj);
        }
      },

      mainLogic(obj){
        let searchBarData = {
          'locale': this.locale,
          'wiki_Query': this.wiki_Query,
        }
        this.$router.push({ name: 'Search', params: { wiki: { queryObj: obj, searchBar: searchBarData }, avia: (this.$route.params.hasOwnProperty("avia") ? this.$route.params.avia : {}), hotels: (this.$route.params.hasOwnProperty("hotels") ? this.$route.params.hotels : {}), transfer: (this.$route.params.hasOwnProperty("transfer") ? this.$route.params.transfer : {}), excursions: (this.$route.params.hasOwnProperty("excursions") ? this.$route.params.excursions : {}), show: "wiki"}});

        this.$route.params.wiki = { queryObj: obj, searchBar: searchBarData };
        
        BusEvent.$emit('getWiki', obj);
      },

      
    },

    // init vue-click-outside
    directives: {
      ClickOutside
    },

    watch: {
      wiki_Query: function (val, oldVal) {
        let self = this;
        var el = document.getElementById('wiki_Query')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
      },
    },
  }

</script>
  

<style>

  /*#aviaSearchBar{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    text-align: center;
    top: 70%;
  }*/

  /*#aviaSearchBar.container {
    max-width: 70%;
  }*/

  #wikiSearchBar {
    border-radius: 3px;
    /*background-color: white;*/
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #wikiSearchBar .row {
    text-align: center;
  }

  #wikiSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #wikiSearchBar .form-control {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 0.1px;
    display: block;
    padding: 7px 13px;
    padding-left: 30px;
    padding-right: 22px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    text-align: center;
    /*font-family: 'Lato', sans-serif;*/
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 14px;
    line-height: 33px;
    /*color: #888;*/
    color: #000;
    letter-spacing: -0.5px;
    /*font-weight: 700;*/
    box-sizing: border-box;
    outline: none;
  }
  #wikiSearchBar > .form-control:last-child{
    padding-left: 25px;
  }
  #wikiSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #E675B1;
  }
  #wikiSearchBar  .form-control + span.fa-times-circle{
    display: none;
  }
/*  #wikiSearchBar  .form-control:focus + span.fa-times-circle{
    display: block;
  }*/


  #wikiSearchBar > div > .form-group > span:first-child {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
  }
  #wikiSearchBar > div > .form-group > span:last-child {
    position:absolute;
    right:5px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;
  }
  #wikiSearchBar > div > .form-group > span:last-child:hover {
    color: #E675B1;
    transition: color 0.2s;
  }




  body > .ui-menu {
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 12px;
    color: #000;
    font-weight: 400;
  }
  body > .ui-menu .ui-menu-item div{
    border: 0px dashed #EBEBEB;
    padding: 6px 12px;
  }
  body > .ui-menu .ui-menu-item {
    background-color: white;
    border: 0.5px solid #FAFAFA;
    color: #000;
  }
  body > .ui-menu .ui-menu-item:last-child {
    border-radius: 0px 0px 3px 3px;
  }

  body > .ui-menu .ui-state-hover {
    font-family: 'Comfortaa', cursive, sans-serif;
    background-color: #E3E3E3;
    border: 0.5px solid #E3E3E3;
    border-radius: 0px 0px 3px 3px;
    color: #000;
    font-size: 12px;
    transition: background-color 0.1s, border 0.1s;
  }
  body > .ui-menu .ui-state-default, body > .ui-menu .ui-state-active, .ui-state-hover {
    background-color: #E3E3E3;
    border: 0.5px solid #E3E3E3;
    border-radius: 0px 0px 3px 3px;
    color: #000;
    transition: background-color 0.1s, border 0.1s;
  }
  body > .ui-widget.ui-widget-content{
    border: 0.5px solid #EBEBEB;
    border-radius: 0px 0px 3px 3px;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #wikiSearchBar .btn {
    width: 100%;
    border: 1px solid #E675B1;
    /*border: none;*/
    border-radius: 0px;
    background-color: #E675B1;

    /*font-family: 'Lato', sans-serif;*/
    /*line-height: 30px;
    color: white;
    font-weight: 700;*/
    padding: 7px 12px;
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 16px;
    line-height: 33px;
    color: white;
    letter-spacing: -0.5px;
    font-weight: 400;
  }

  #wikiSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #E675B1;
  }

  #wikiSearchBar  .btn:hover{
    background-color: #DE66A6;
  }
  

  #wikiSearchBar .fa-search{
    color: white;
    text-align: center;
  }

 /* #wikiSearchBar .errorHelp{
    position: absolute;
    left:8px;
    top:8px;
    z-index: 990;
  }*/
  

  #toast-container{
    position: fixed;
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 13px;
    line-height: 18px;
    text-align: left;
    color: #FFF;
    padding-right: 0.5em;
    margin: auto 0.5em auto -1.5em;
    margin-top: 10%;
  }
  #toast-container > div {
    -moz-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    opacity: 1;
    -ms-filter: alpha(opacity=90);
    filter: alpha(opacity=90);
  }
 
  #wikiSearchBar #datepickers-container {}
  #wikiSearchBar #datepickers-container .datepicker--cell.-current- {
    background-color: #E675B1;
  }

  .datepicker--nav{
    height: 40px;
  }
  .datepicker--buttons{
    height: 40px;
  }
  .datepicker--cell.datepicker--cell-day{
    height: 23px;
  }
  @media (max-width: 989px){
    #wikiSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #wikiSearchBar {
      /*background-color: white;*/
      /*padding: 15px; */
      /*padding-top: 20px;*/
      /*margin-top: 15px; */
      /*margin-bottom: 15px; */
    }

    #wikiSearchBar .form-group {
      padding: 0px;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
    }
    #wikiSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 3px;
    }


    #wikiSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 3px;

    }

    
    
  }

  @media (min-width: 990px){

    #wikiSearchBar .row .form-group:first-child input{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: none;
    }

    #wikiSearchBar .btn{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

  }

  @media (max-width: 990px){ 
    #wikiSearchBar{
      box-shadow: none;
    }
  }

  @media (max-width: 575px){

    #wikiSearchBar{
      box-shadow: none;
    }

  }
   
</style>




<!-- test bus
   // get Cities from App.vue
      // BusEvent.$on('aviaLoadCities', function(value) {
      //   self.aviaCities = value; -->


