<template>
  
  <div id="excurSearchBar" class="container" >
    <div class="row justify-content-center">
      <div class="form-group col-12 col-sm-12 col-md-10 col-lg-8">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="excur_Place" placeholder="Где прогуляемся?" v-model="excur_Place" autocomplete="off" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <!-- <div class="form-group col-12 col-sm-12 col-md-10 col-lg-3">
        <span class="far fa-calendar-alt"></span>
        <input type="text" data-range="true" data-multiple-dates-separator=" - " class="form-control datepicker-here" id="excurArr_Date" placeholder="Когда" v-model="excurDate" autocomplete="off" data-mask="99-99-9999" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)" ></span>
      </div> -->
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-male"></span>
        <input type="text" class="form-control" placeholder="Гости"  autocomplete="off" v-on:click="focused = true" v-model="totalGuests" readonly="readonly" style="padding-left: 20px;">
        <div id="guestDesc" class="shadow" v-show="focused" v-click-outside="closeMenu">
          <ul class="list-group list-unstyled text-extra-small">
            <li id="adults" class="list-item">
              <a>Взрослые :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="excurAdults" type="text" name="" class="form-control" value="1" v-model="excurAdults" readonly="readonly"> 
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>        
          </ul>
        </div>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <span class="fas fa-search"></span> 
        <!-- <router-link to="/search"> -->
          <!-- <router-link :to="{ name: 'Search', params: this.validObj}"> -->
          <button class="btn btn-primary" v-on:click="excurSubmit">Поиск</button>
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
    name: 'Excursion_SearchBar',
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),
        // language
        locale:         "ru",       //search on language
        excur_IATA:  "",
        excur_CityID: "",
        excur_Place: "",
        excur_ExcursionID:  "",

        excurAdults:    1,

        queryObj:           666,

        focused: false,

      }
    },
    prop:{
      
    },
    computed: {
      // excurDate: function() {
      //   return this.excurArr_Date + " - " + this.excurDep_Date;
      // },
      totalGuests: function() {
        var total = parseInt(this.excurAdults);
        return total + "  " + this.declension(total, ['Персона', 'Персоны', 'Персон']);
      },

    },
    created: function(){

    },
    mounted () {
      console.log('///////////////')
      console.log('excur search bar - loaded')

      let self = this;

      // set data from route params
      // console.log(this.$route.params.objQuery)
      
      if(this.$route.params.hasOwnProperty("excurs") && this.$route.name == 'Search' ){

        if(Object.keys(this.$route.params.excurs).length > 0){
          let rParams = this.$route.params.excurs.searchBar;
          let queryObj = this.$route.params.excurs.queryObj;

          this.locale = rParams.locale;
          this.excur_IATA = rParams.excur_IATA;
          this.excur_CityID = rParams.excur_CityID;
          this.excur_Place = rParams.excur_Place;

          this.excurAdults = rParams.excurAdults;

          BusEvent.$emit('getExcursions', queryObj);
        }
      }else{
        // check cookie
        // BusEvent.$emit('getTicket', uuid);
      }


      //reload data after time out
      BusEvent.$on('reloadExcursions', function() {
        self.excurSubmit();
      });

      $( "#excur_Place" ).autocomplete({
        source: function(request, response) {
          if(request.term.length > 2){
            self.excurLoadAutoComplete (request.term, function(err, data) {
              response(data);
            });
          }
        },
        minLength: 1,
        focus: function( event, ui ) {
          let el = document.getElementById('excur_Place');
          el.value =  ui.item.label;
          return false;
        },
        select: function( event, ui ) {
          let el = document.getElementById('excur_Place');
          // el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.excur_Place = ui.item.label;
          if(ui.item.hasOwnProperty('iata')){
            self.excur_IATA = ui.item.iata;
            self.excur_CityID = parseInt(ui.item.value);
          }else{
            self.excur_CityID = parseInt(ui.item.value);
          }
          if(ui.item.hasOwnProperty('excurId')){
            self.excur_CityID = parseInt(ui.item.locationId);
          }
          //console.log(ui.item)

          let data = {
            "layerName": "excur_Place",
            "geojson": {
              "type": "Feature",
              "properties": {
                "code": ui.item.value,
                "label": ui.item.label,
              },
              "geometry": ui.item.geometry
            }
          };
          BusEvent.$emit('zoomTo',data.geojson);
          return false;
        },
      }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.label + ", <span>" + (item.hasOwnProperty("locationName") ? item.locationName : item.countryName) + "</span></div>" )
          .appendTo( ul );
      };

      // init date picker
      $('#excurArr_Date').datepicker({
        minDate: new Date(),
        position: "bottom left",
        autoClose: true,
        todayButton: true,
        toggleSelected: false,
        range: true,
        offset: 8,
        onShow: function(dp, animationCompleted){
          // if (!animationCompleted) {
            var newWidth = $('#excurArr_Date').css('width');
            newWidth = (parseInt(newWidth.replace('px','')));
            $('#datepickers-container > div').css('width', newWidth);            
          // }
        },
        onSelect: function(formattedDate, date, inst){
          console.log(date)
          // if (date.length > 1) {
          self.excurArr_Date = Moment(inst.minRange).format("DD.MM.YYYY");
          self.excurDep_Date = Moment(inst.maxRange).format("DD.MM.YYYY");
          // if (date.length > 1) {
          //   self.excurArr_Date = Moment(date[0]).format("DD.MM.YYYY");
          //   self.excurDep_Date = Moment(date[1]).format("DD.MM.YYYY");
          // }else{
          //   self.excurArr_Date = Moment(date[0]).format("DD.MM.YYYY");
          // }
        },
      });
      

      // set input mask for date
      // var dateMask = new InputMask("99.99.9999 - 99.99.9999");
      // dateMask.mask(document.getElementById('excurArr_Date'));

      // init vue-click-outside
      this.popupItem = this.$el;

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
            if(list_el[i].id.indexOf('Place') != -1){
              self[id + '_Place'] = "" ;       
              self[id + '_ExcursionID'] = "" ;  
              self[id + '_IATA'] = "" ;  
              self[id + '_CityID'] = "" ;  
            }else{
              self['excurArr_Date'] = "" ;
              self['excurDep_Date'] = "" ;
            }     
          }
        }
      },

      plusOne(event){
        var self = this;
        var el = event.target
        var list_el = event.target.parentNode.children;
        for (var i = 0; i < list_el.length; i++) {
          if (list_el[i].type == 'text') {
            list_el[i].value = parseInt(list_el[i].value) + 1;
            self[list_el[i].id] = parseInt(list_el[i].value);  
            if( list_el[i].id == 'excurChildren' && list_el[i].value > 3){
              self[list_el[i].id] = 3;
            } 
            if( list_el[i].id == 'excurChildren' && list_el[i].value <= 3){
              self.childAgeObj['childAge' + list_el[i].value] = 1;
            }
            if( list_el[i].id.indexOf('childAge') != -1){
              self.childAgeObj[list_el[i].id] = parseInt(list_el[i].value);
            }  
            if( list_el[i].id.indexOf('childAge') != -1 && list_el[i].value > 17) {
              self.childAgeObj[list_el[i].id] = 17;
              list_el[i].value = 17;
            }    
          }
        }
      },

      minusOne(event){
        var self = this;
        var el = event.target
        var list_el = event.target.parentNode.children;
        for (var i = 0; i < list_el.length; i++) {
          if (list_el[i].type == 'text' && parseInt(list_el[i].value) != 0) {
            list_el[i].value = parseInt(list_el[i].value) - 1;
            self[list_el[i].id] = parseInt(list_el[i].value);
            if( list_el[i].id == 'excurAdults' && list_el[i].value == 0){
              self[list_el[i].id] = 1;
            }
            if( list_el[i].id == 'excurChildren' && list_el[i].value <= 3){
              delete self.childAgeObj['childAge' + (parseInt(list_el[i].value) + 1)];
            }
            if( list_el[i].id.indexOf('childAge') != -1){
              self.childAgeObj[list_el[i].id] = parseInt(list_el[i].value);
            }
            if( list_el[i].id.indexOf('childAge') != -1 && list_el[i].value == 0) {
              self.childAgeObj[list_el[i].id] = 1;
              list_el[i].value = 1;
            } 
          }
        }
      },

      closeMenu(){
        this.focused = false;
      },

      excurLoadAutoComplete(str, callback){

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

      excurSubmit(){
        this.mainLogic()
      },

      mainLogic(){
        this.queryObj = {
          "cityIATA": this.excur_IATA,
        };
        
        let searchBarData = {
          "locale": this.locale,
          "excur_ExcursionID": this.excur_ExcursionID,
          "excur_IATA": this.excur_IATA,
          "excur_CityID": this.excur_CityID,
          "excur_Place": this.excur_Place,
          "excurAdults": this.excurAdults
        }
        this.$router.push({ name: 'Search', params: { excurs: {queryObj: this.queryObj, searchBar: searchBarData }, avia: (this.$route.params.hasOwnProperty("avia") ? this.$route.params.avia : {}), hotels: (this.$route.params.hasOwnProperty("hotels") ? this.$route.params.hotels : {}), show: "excursions"}});
        BusEvent.$emit('getExcursions', this.queryObj);

      },
    },

    // init vue-click-outside
    directives: {
      ClickOutside
    },

    watch: {
     
      excur_Place: function (val, oldVal) {
        let self = this;
        var el = document.getElementById('excur_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
        if(val == this.aviaDep_Place && val.length != 0){
          this.alertMsg('Совпадение','Город вылета не может быть и городом прибытия','warning');
        }
      },

      excurArr_Date: function (val, oldVal) {
        // console.log($('#aviaArr_Date').datepicker());
       //  let self = this;
       //  $('#aviaArr_Date').datepicker({
       //    minDate: this.aviaDep_Date.length != 0 ? new Date(Moment.utc(this.aviaDep_Date, "DD.MM.YYYY").valueOf()) : new Date()});
       // // $('#arrDate')datepicker.update('minDate', new Date())
       //  $('#aviaArr_Date').datepicker({
       //    minDate: this.aviaDep_Date.length != 0 ? new Date(Moment.utc(this.aviaDep_Date, "DD.MM.YYYY").valueOf()) : new Date()
       //  })
        var el = document.getElementById('excurArr_Date')
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

  /*#excurSearchBar{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    text-align: center;
    top: 70%;
  }*/

  /*#excurSearchBar.container {
    max-width: 70%;
  }*/

  #excurSearchBar {
    border-radius: 3px;
    /*background-color: white;*/
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #excurSearchBar .row {
    text-align: center;
  }

  #excurSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #excurSearchBar .form-control {
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
  #excurSearchBar > .form-control:last-child{
    padding-left: 25px;
  }
  #excurSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #02A9E0;
  }
  #excurSearchBar  .form-control + span.fa-times-circle{
    display: none;
  }
/*  #excurSearchBar  .form-control:focus + span.fa-times-circle{
    display: block;
  }*/


  #excurSearchBar > div > .form-group > span:first-child {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
  }
  #excurSearchBar > div > .form-group > span:last-child {
    position:absolute;
    right:5px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;
  }
  #excurSearchBar > div > .form-group > span:last-child:hover {
    color: #02A9E0;
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
  body > .ui-menu span {
    color: #888;
    font-size: 10px;
  }
  /*body .ui-menu .ui-menu-item:hover span, .ui-state-hover:hover span, .ui-state-active span {
    color: white;
    font-size: 10px;
  }*/




  /*#excurSearchBar .row .form-group:first-child input{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
*/
  
  #excurSearchBar #guestDesc{
    position:absolute;
    width: 100%;
    right: 0; 
    left:0;
    top: 49px;
    font-size: 16px;
    line-height: 32px;
    /*border-radius: 0px 0px 3px 3px;*/
    background-color: white;
    text-align: center;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1); 
    /*border: 1px solid #EBEBEB;*/
    z-index: 99;
    margin-left: auto; 
    margin-right: auto; 
    font-weight: 700;
  }
  #excurSearchBar #guestDesc .form-control{
    background-color: #FFFFFF;
    background-image: none;
    border: 1px dashed #e5e6e7;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    text-align: center;
    /*font-family: 'Lato', sans-serif;*/
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 14px;
    line-height: 20px;
    /*color: #888;*/
    color: #000;
    letter-spacing: -0.5px;
    font-weight: 700;
  }
  #excurSearchBar #guestDesc li:last-child{
    margin-bottom: 10px;
  }
  #excurSearchBar #guestDesc div span{
    position: absolute;
    font-size: 17px;
    cursor: pointer;
  }
  #excurSearchBar #guestDesc div span:hover{
    color: #02A9E0;
    transition: color 0.15s;
  }
  #excurSearchBar #guestDesc span:first-child{
    left: 10px;
    margin-top: 8px;
  }
  #excurSearchBar #guestDesc span:last-child{
    right: 10px;
    margin-top: -27px;
  }
  #excurSearchBar #guestDesc #tripClass{
    background-color: #02A9E0;
    color: white;
    /*color: #000;*/
    padding-top: 5px;
    padding-bottom: 5px;
    line-height:2;
    font-weight: 500;
    border-radius: 0px 0px 3px 3px;
    border-right: 1px solid #02A9E0;
  }
  #excurSearchBar #guestDesc #tripClass label{
    margin-bottom: 0px;
    cursor: pointer;
  }



  #excurSearchBar .btn {
    width: 100%;
    border: 1px solid #02A9E0;
    /*border: none;*/
    border-radius: 0px;
    background-color: #02A9E0;

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

  #excurSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #02A9E0;
  }

  #excurSearchBar  .btn:hover{
    background-color: #189CC7;
  }
  

  #excurSearchBar .fa-search{
    color: white;
    text-align: center;
  }

 /* #excurSearchBar .errorHelp{
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
 
  #excurSearchBar #datepickers-container {}
  #excurSearchBar #datepickers-container .datepicker--cell.-current- {
    background-color: #02A9E0;
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
    #excurSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #excurSearchBar {
      /*background-color: white;*/
      /*padding: 15px; */
      /*padding-top: 20px;*/
      /*margin-top: 15px; */
      /*margin-bottom: 15px; */
    }

    #excurSearchBar .form-group {
      padding: 0px;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
    }
    #excurSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 3px;
    }


    #excurSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 3px;

    }

    
    
  }

  @media (min-width: 990px){

    #excurSearchBar .row .form-group:first-child input{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: none;
    }

    #excurSearchBar .btn{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

  }

  @media (max-width: 990px){ 
    #excurSearchBar{
      box-shadow: none;
    }
  }

  @media (max-width: 575px){

    #excurSearchBar{
      box-shadow: none;
    }

  }
   
</style>

</script>

<style>


</style>

