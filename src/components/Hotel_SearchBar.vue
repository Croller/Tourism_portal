<template>
  
  <div id="hotelSearchBar" class="container" >
    <div class="row justify-content-center">
      <div class="form-group col-10 col-sm-10 col-md-10 col-lg-4">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="hotelArr_Place" placeholder="Куда" v-model="hotelArr_Place" autocomplete="off" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-5 col-sm-5 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control datepicker-here" id="hotelArr_Date" placeholder="Заезд" v-model="hotelArr_Date" autocomplete="off" data-mask="99-99-9999" data-range="false" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)" ></span>
      </div>
      <div class="form-group col-5 col-sm-5 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control datepicker-here" id="hotelDep_Date" placeholder="Выезд" v-model="hotelDep_Date" autocomplete="off" data-mask="99-99-9999" data-range="false" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      
      <div class="form-group col-10 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-male"></span>
        <input type="text" class="form-control" placeholder="Гости"  autocomplete="off" v-on:click="focused = true" v-model="totalGuests" readonly="readonly" style="padding-left: 20px;">
        <div id="guestDesc" class="shadow" v-show="focused" v-click-outside="closeMenu">
          <ul class="list-group list-unstyled text-extra-small">
            <li id="adults" class="list-item">
              <a>Взрослые :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="hotelAdults" type="text" name="" class="form-control" value="1" v-model="hotelAdults" readonly="readonly"> 
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <li id="children">
              <a>Дети :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="hotelChildren" type="text" name="" class="form-control" value="0" v-model="hotelChildren" readonly="readonly">
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <ul class="list-group list-unstyled text-extra-small" v-if="parseInt(hotelChildren) > 0">
              <li v-for="(n,index) in parseInt(hotelChildren)">
                <a>Возраст :</a>
                <div>
                  <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                  <input :id='"childAge" + n' type="text" name="" class="form-control" value="1" readonly="readonly">
                  <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
                </div>
              </li>
            </ul>         
          </ul>
        </div>
      </div>
      <div class="form-group col-10 col-sm-10 col-md-5 col-lg-2">
        <span class="fas fa-search"></span> 
        <!-- <router-link to="/search"> -->
          <!-- <router-link :to="{ name: 'Search', params: this.validObj}"> -->
          <button class="btn btn-primary" v-on:click="hotelSubmit">Поиск</button>
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
    name: 'Hotel_SearchBar',
    data () {
      return {
        //def
        
        // language
        locale:         "ru",       //search on language
        hotelArr_HotelID:  "",
        hotelArr_IATA:  "",
        hotelArr_CityID: "",
        hotelArr_Place: "",
        hotelArr_Date:  "",
        hotelDep_Date:  "",

        hotelAdults:    1,
        hotelChildren:  0,  // childern count <= 3, age <= 17, default age = 1 
        childAgeObj:    {},

        uuidObj:           666,

        focused: false,

      }
    },
    prop:{
      
    },
    computed: {
      totalGuests: function() {
        var total = parseInt(this.hotelAdults) + (parseInt(this.hotelChildren) <= 3 ? parseInt(this.hotelChildren) : parseInt(this.hotelChildren));
        return total + "  " + this.declension(total, ['Гость', 'Гостя', 'Гостей']);
      },

    },
    created: function(){

    },
    mounted () {
      console.log('///////////////')
      console.log('hotel search bar - loaded')

      let self = this;


      self.hotelArr_IATA  ="";
      self.hotelArr_CityID = 1416741;
      self.hotelArr_Place = "город Обнинск";
      self.hotelArr_Date  ="20.09.2018";
      self.hotelDep_Date  ="29.09.2018";


      //reload data after time out
      // BusEvent.$on('reloadTicket', function() {
      //   self.aviaSubmit();
      // });

      $( "#hotelArr_Place" ).autocomplete({
        source: function(request, response) {
          if(request.term.length > 2){
            self.hotelLoadAutoComplete (request.term, function(err, data) {
              response(data);
            });
          }
        },
        minLength: 1,
        focus: function( event, ui ) {
          let el = document.getElementById('hotelArr_Place');
          el.value =  ui.item.label;
          return false;
        },
        select: function( event, ui ) {
          let el = document.getElementById('hotelArr_Place');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.hotelArr_Place = ui.item.label;
          if(ui.item.hasOwnProperty('iata')){
            self.hotelArr_IATA = ui.item.iata;
            self.hotelArr_CityID = parseInt(ui.item.value);
          }else{
            self.hotelArr_CityID = parseInt(ui.item.value);
          }
          if(ui.hasOwnProperty('hotelId')){
            self.hotelArr_HotelID = parseInt(ui.item.hotelId);
            self.hotelArr_CityID = parseInt(ui.item.locationId);
          }

          let data = {
            "layerName": "hotelArr_Place",
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
      $('#hotelArr_Date').datepicker({
        minDate: new Date(),
        position: "bottom left",
        autoClose: true,
        todayButton: true,
        range: true,
        offset: 8,
        onShow: function(dp, animationCompleted){
          // if (!animationCompleted) {
            var newWidth = $('#hotelArr_Date').css('width');
            newWidth = 2*(parseInt(newWidth.replace('px','')));
            $('#datepickers-container > div').css('width', newWidth);            
          // }
        },
        onSelect: function(formattedDate, date, inst){
          // console.log(date)
          if (date.length > 1) {
            self.hotelArr_Date = Moment(date[1]).format("DD.MM.YYYY");
            self.hotelDep_Date = Moment(date[0]).format("DD.MM.YYYY");
            $('#hotelDep_Date').data('datepicker').minDate =  Moment(date[1], "DD.MM.YYYY").add(1, 'days')._d;

          }else{
            self.hotelArr_Date = Moment(date).format("DD.MM.YYYY");
            // set new date if dep date selected
            $('#hotelDep_Date').data('datepicker').minDate = Moment(date, "DD.MM.YYYY").add(1, 'days')._d;
          }
        },
      });
      $('#hotelDep_Date').datepicker({
        minDate: new Date(),
        position: "bottom right",
        autoClose: true,
        todayButton: true,
        offset: 8,
        onShow: function(dp, animationCompleted){
          if (!animationCompleted) {
            // set style
            var newWidth = $('#hotelArr_Date').css('width');
            var newWidth = $('#hotelArr_Date').css('left', );
            newWidth = 2*(parseInt(newWidth.replace('px','')));
            $('#datepickers-container > div').css('width', newWidth);
          }
        },
        onSelect: function(formattedDate, date, inst){
          self.hotelDep_Date = Moment(date).format("DD.MM.YYYY");
        },
      })

      // set input mask for date
      var dateMask = new InputMask("99.99.9999");
      dateMask.mask(document.getElementById('hotelArr_Date'));
      dateMask.mask(document.getElementById('hotelDep_Date'));

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
              self[id + '_HotelID'] = "" ;  
              self[id + '_IATA'] = "" ;  
              self[id + '_CityID'] = "" ;  
            }else{
              self[id + '_Date'] = "" ; 
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
            if( list_el[i].id == 'hotelChildren' && list_el[i].value > 3){
              self[list_el[i].id] = 3;
            } 
            if( list_el[i].id == 'hotelChildren' && list_el[i].value <= 3){
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
            if( list_el[i].id == 'hotelAdults' && list_el[i].value == 0){
              self[list_el[i].id] = 1;
            }
            if( list_el[i].id == 'hotelChildren' && list_el[i].value <= 3){
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

      hotelLoadAutoComplete(str, callback){

        if(str.length < 3) return {};

        let obj = {
          "query": str,
          "lang": this.locale,
          "lookFor": "both", // city (города и острова), hotel (отели), both (все объекты, значение по умолчанию).
          "limit": 5,
          "convertCase": 1,
        }

        this.$http.post('http://127.0.0.1:8081/getHotelAutoComplete', obj)
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
          "checkIn": Moment(this.hotelArr_Date, "DD.MM.YYYY").format("YYYY-MM-DD"),
          "checkOut": Moment(this.hotelDep_Date, "DD.MM.YYYY").format("YYYY-MM-DD"),
          "adultsCount": this.hotelAdults,
          "childrenCount": this.hotelChildren,
          "lang": this.locale,
          "currency": 'RUB',
          "cityId": this.hotelArr_CityID,
          "waitForResult": 0, // if 1 then results in get UUID if 0 results in get Hotels
        }

        if (this.hotelArr_IATA.length != 0) {
          obj["iata"] = this.hotelArr_IATA;
        }
        if(this.hotelArr_HotelID.length != 0){
          obj["hotelId"] = this.hotelArr_HotelID;
        }
   

        if(this.hotelArr_IATA.length == 0 && this.hotelArr_HotelID.length == 0 && this.hotelArr_CityID.length == 0 ){
          document.getElementById('hotelArr_Place').style.border = '1px solid #FF5C1C';
          this.alertMsg('Город или Отель', 'введен не верно','warning');
          return null;
        }
        
        if(this.hotelArr_Date.length == 0 || this.hotelArr_Date == 'Ivalid date') {
          document.getElementById('hotelArr_Date').style.border = '1px solid #FF5C1C';
          this.alertMsg('Дата заезда','введена не верно','warning');
          return null;
        }

        if(this.hotelDep_Date == this.hotelArr_Date || this.hotelDep_Date.length == 0 || this.hotelDep_Date == 'Ivalid date'){
          document.getElementById('hotelDep_Date').style.border = '1px solid #FF5C1C';
          this.alertMsg('Дата выезда','введена не верно','warning');
          return null;
        }

        for (var i = 0; i < Object.keys(this.childAgeObj).length; i++) {
          let key = Object.keys(this.childAgeObj)[i];
          obj[key] = this.childAgeObj[key];
        }

        return obj;
      },

      hotelSubmit(){
        this.focused = false;
        let queryObj = this.validObj();
        this.hotelUUID(queryObj);
      },

      hotelUUID(obj){
        let self = this;
        this.$http.post('http://127.0.0.1:8081/getHotelUUID', obj).then(function (response) {
          console.log('///////////////')
          console.log('get uuidObj')
          if(response.data != null && !response.data.hasOwnProperty('errorCode')){
            self.mainLogic(response.data)
          }else{
            console.log('query not good:', response.data);
          }
        });
      },

      mainLogic(uuidObj){

        this.uuidObj = uuidObj;
        // this.$router.push({ name: 'Search', params: {uuidObj: this.uuidObj, searchBar: searchBarData }});
        BusEvent.$emit('getHotels', {'uuid': this.uuidObj, 'cityId': this.hotelArr_CityID});

      },
    },

    // init vue-click-outside
    directives: {
      ClickOutside
    },

    watch: {
     
     hotelArr_Place: function (val, oldVal) {
        var el = document.getElementById('hotelArr_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
        if(val == this.aviaDep_Place && val.length != 0){
          this.alertMsg('Совпадение','Город вылета не может быть и городом прибытия','warning');
        }
      },

      hotelArr_Date: function (val, oldVal) {
        let self = this;
        $('#aviaArr_Date').datepicker({
          minDate: this.hotelArr_Date.length != 0 ? new Date(Moment.utc(this.hotelArr_Date, "DD.MM.YYYY").valueOf()) : new Date()});
       // $('#arrDate')datepicker.update('minDate', new Date())
        $('#aviaArr_Date').datepicker({
          minDate: this.hotelArr_Date.length != 0 ? new Date(Moment.utc(this.hotelArr_Date, "DD.MM.YYYY").valueOf()) : new Date()
        })
        var el = document.getElementById('hotelArr_Date')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
      },

      hotelDep_Date: function (val, oldVal) {
        var el = document.getElementById('hotelDep_Date')
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

  /*#hotelSearchBar{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    text-align: center;
    top: 70%;
  }*/

  /*#hotelSearchBar.container {
    max-width: 70%;
  }*/

  #hotelSearchBar {
    border-radius: 3px;
    /*background-color: white;*/
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #hotelSearchBar .row {
    text-align: center;
  }

  #hotelSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #hotelSearchBar .form-control {
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
  #hotelSearchBar > .form-control:last-child{
    padding-left: 25px;
  }
  #hotelSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #55B533;
  }
  #hotelSearchBar  .form-control + span.fa-times-circle{
    display: none;
  }
/*  #hotelSearchBar  .form-control:focus + span.fa-times-circle{
    display: block;
  }*/


  #hotelSearchBar > div > .form-group > span:first-child {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
  }
  #hotelSearchBar > div > .form-group > span:last-child {
    position:absolute;
    right:5px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;
  }
  #hotelSearchBar > div > .form-group > span:last-child:hover {
    color: #55B533;
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
    background-color: #F09A24;
    border: 0.5px solid #F09A24;
    border-radius: 0px 0px 3px 3px;
    color: white;
    font-size: 12px;
    transition: background-color 0.1s, border 0.1s;
  }
  body > .ui-menu .ui-state-default, body > .ui-menu .ui-state-active, .ui-state-hover {
    background-color: #F09A24;
    border: 0.5px solid #F09A24;
    border-radius: 0px 0px 3px 3px;
    color: white;
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




  /*#hotelSearchBar .row .form-group:first-child input{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
*/
  
  #hotelSearchBar #guestDesc{
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
  #hotelSearchBar #guestDesc .form-control{
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
  #hotelSearchBar #guestDesc li:last-child{
    margin-bottom: 10px;
  }
  #hotelSearchBar #guestDesc div span{
    position: absolute;
    font-size: 17px;
    cursor: pointer;
  }
  #hotelSearchBar #guestDesc div span:hover{
    color: #55B533;
    transition: color 0.15s;
  }
  #hotelSearchBar #guestDesc span:first-child{
    left: 10px;
    margin-top: 8px;
  }
  #hotelSearchBar #guestDesc span:last-child{
    right: 10px;
    margin-top: -27px;
  }
  #hotelSearchBar #guestDesc #tripClass{
    background-color: #55B533;
    color: white;
    /*color: #000;*/
    padding-top: 5px;
    padding-bottom: 5px;
    line-height:2;
    font-weight: 500;
    border-radius: 0px 0px 3px 3px;
    border-right: 1px solid #55B533;
  }
  #hotelSearchBar #guestDesc #tripClass label{
    margin-bottom: 0px;
    cursor: pointer;
  }



  #hotelSearchBar .btn {
    width: 100%;
    border: 1px solid #55B533;
    /*border: none;*/
    border-radius: 0px;
    background-color: #55B533;

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

  #hotelSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #55B533;
  }

  #hotelSearchBar  .btn:hover{
    background-color: #53AD32;
  }
  

  #hotelSearchBar .fa-search{
    color: white;
    text-align: center;
  }

 /* #hotelSearchBar .errorHelp{
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
 
  #hotelSearchBar #datepickers-container {}
  #hotelSearchBar #datepickers-container .datepicker--cell.-current- {
    background-color: #55B533;
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
    #hotelSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #hotelSearchBar {
      /*background-color: white;*/
      /*padding: 15px; */
      /*padding-top: 20px;*/
      /*margin-top: 15px; */
      /*margin-bottom: 15px; */
    }

    #hotelSearchBar .form-group {
      padding: 0px;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
    }
    #hotelSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 3px;
    }


    #hotelSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 3px;

    }

    
    
  }

  @media (min-width: 990px){

    #hotelSearchBar .row .form-group:first-child input{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: none;
    }

    #hotelSearchBar .btn{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

  }

  @media (max-width: 990px){ 
    #hotelSearchBar{
      box-shadow: none;
    }
  }

  @media (max-width: 575px){

    #hotelSearchBar{
      box-shadow: none;
    }

  }
   
</style>

</script>

<style>


</style>

