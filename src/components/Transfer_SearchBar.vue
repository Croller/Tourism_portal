<template>
  
  <div id="transfSearchBar" class="container" >
    <div class="row justify-content-center">
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-3" autocomplete="off">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-compass"></span>
        <input type="text" class="form-control" id="transfDep_Place" placeholder="Откуда" autofocus v-model="transfDep_Place" v-on:click="focused = false, focusedFac = false" focused>
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-3">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="transfArr_Place" placeholder="Куда" v-model="transfArr_Place" autocomplete="off" v-on:click="focused = false, focusedFac = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-male"></span>
        <input type="text" class="form-control" placeholder="Пассажиры"  autocomplete="off" v-on:click="focused = !focused, focusedFac = false" v-model="totalPassenger" readonly="readonly" style="padding-left: 20px;">
        <div id="humanDesc" class="shadow" v-show="focused" v-click-outside="closeMenu">
          <ul class="list-group list-unstyled text-extra-small">
            <li id="adults" class="list-item">
              <a>Взрослые :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="transfAdults" type="text" name="" class="form-control" value="1" v-model="transfAdults"> 
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <li id="children">
              <a>Дети до 12 лет :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="transfChildren" type="text" name="" class="form-control" value="0" v-model="transfChildren">
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-list-ul"></span>
        <input type="text" class="form-control" ref="facInput" placeholder="Пожелания"  autocomplete="off" v-on:click="focusedFac = !focusedFac, focused = false" v-model="totalFacilities" readonly="readonly" style="padding-left: 20px;">
        <div id="facDesc" class="shadow" v-show="focusedFac" v-click-outside="closeMenu">
          <ul class="list-group list-unstyled" >
            <li class="list-item" v-on:click="changeSpan($event)" v-for="fac in dicFacilities">
              <span class="far fa-circle"></span> 
              <input type="checkbox" :value=fac v-model="transfFacilities" style="display:none">
              &nbsp&nbsp{{fac.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <span class="fas fa-search"></span> 
        <!-- <router-link to="/search"> -->
          <!-- <router-link :to="{ name: 'Search', params: this.validObj}"> -->
          <button class="btn btn-primary" v-on:click="transfSubmit">Поиск</button>
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
    name: 'Transfer_SearchBar',
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),

        // language
        locale:         "ru",       //search on language
        // place from to
        transfDep_Place:  "",
        transfDep_Coords:   "",
        transfArr_Place:  "",
        transfArr_Coords:   "",
        // passenger by category
        transfAdults:     1,         // human older 12 years old
        transfChildren:   0,       // child to 12 years old
        // facilities
        dicFacilities: [
          { "id": "yellowcarnumber", "name": "Желтые номера"},
          { "id": "nosmoking", "name": "Некурить"},
          { "id": "childchair", "name": "Детское кресло"},
          { "id": "bicycle", "name": "Велосипед"},
          { "id": "conditioner", "name": "Кондиционер"},
          { "id": "animaltransport", "name": "Животные"},
          { "id": "universal", "name": "Машина-универсал"},
          { "id": "check", "name": "Квитанция"},
          { "id": "ski", "name": "Лыжи/Сноуборд"},
          // { "id": "waiting_in_transit", "name": "ожидание в пути."},
          // { "id": "meeting_arriving", "name": "встреча с табличкой."},
          // { "id": "luggage", "name": "платная перевозка багажа."},
        ],
        transfFacilities: [],

        // -------

        focused: false,
        focusedFac: false,
      }
    },
    prop:{
      
    },
    computed: {
      totalPassenger: function () {
        var total = parseInt(this.transfAdults) + parseInt(this.transfChildren);
        return total + "  " + this.declension(total, ['Пассажир', 'Пассажира', 'Пассажиров'])
      },
      totalFacilities: function () {
        var total = this.transfFacilities.length;
        return total + "  " + this.declension(total, ['Пожелание', 'Пожелания', 'Пожеланий'])
      },
    },

    created: function(){

    },
    mounted () {
      console.log('///////////////')
      console.log('transfer search bar - loaded')

      let self = this;

      // load transf cities
      // this.transfLoadCities();

      // set data from route params
      // console.log(this.$route.params.objQuery)

      if(this.$route.params.hasOwnProperty("transfer") && this.$route.name == 'Search'){

        if(Object.keys(this.$route.params.transfer).length > 0){
          let rParams = this.$route.params.transfer.searchBar;
          let obj = this.$route.params.transfer.queryObj;

          this.locale = rParams.locale;
          this.transfDep_Place = rParams.transfDep_Place;
          this.transfDep_Coords = rParams.transfDep_Coords;
          this.transfArr_Place = rParams.transfArr_Place;
          this.transfArr_Coords = rParams.transfArr_Coords;
          this.transfAdults = rParams.transfAdults;
          this.transfChildren = rParams.transfChildren;
          this.transfFacilities = rParams.transfFacilities;

          BusEvent.$emit('getTransfer', obj);
        }
      }else{
        // check cookie
        // BusEvent.$emit('getTicket', uuid);
      }

      //reload data after time out
      BusEvent.$on('reloadTicket', function() {
        self.transfSubmit();
      });
      
   
      // init autocomplite for input with cities
      var maxLimit = 5;
      $( "#transfDep_Place" ).autocomplete({
        // position: { my: "left bottom", at: "left top", collision: "flip" },
        source: function(request, response) {
          setTimeout(() => {
            if(request.term.length > 2){
              self.transferAddressToCoords (request.term, function(err, data) {
                response(data.slice(0, 5));
              });
            }
          }, 50);
        },
        minLength: 1,
        focus: function( event, ui ) {
          self.transfDep_Place = ui.item.label;
        },
        select: function( event, ui ) {
          let el = document.getElementById('transfDep_Place');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.transfDep_Place = ui.item.label;
          self.transfDep_Coords = ui.item.geometry.coordinates.join(',');
          let data = {
            "layerName": "transfDep_Place",
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
          .append( "<div>" + item.label + "</div>" )
          .appendTo( ul );
      };
      $( "#transfArr_Place" ).autocomplete({
        source: function(request, response) {
          setTimeout(() => {
            if(request.term.length > 2){
              self.transferAddressToCoords (request.term, function(err, data) {
                response(data.slice(0, 5));
              });
            }
          }, 50);
        },
        minLength: 1,
        // source: function(request, response) {
        //   var results = $.ui.autocomplete.filter(self.aviaCities, request.term);
        //   response(results.slice(0, maxLimit));
        // },
        focus: function( event, ui ) {
          self.transfArr_Place = ui.item.label;
        },
        select: function( event, ui ) {
          let el = document.getElementById('transfArr_Place');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.transfArr_Place = ui.item.label;
          self.transfArr_Coords = ui.item.geometry.coordinates.join(',');
          let data = {
            "layerName": "transfArr_Place",
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
          return false;
        }
      }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.label + "</div>" )
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
              self[id + '_Coords'] = "" ;  
            }    
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

      plusOne(event){
        var self = this;
        var el = event.target
        var list_el = event.target.parentNode.children;
        for (var i = 0; i < list_el.length; i++) {
          if (list_el[i].type == 'text') {
            list_el[i].value = parseInt(list_el[i].value) + 1;
            self[list_el[i].id] = list_el[i].value;             
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
            self[list_el[i].id] = list_el[i].value;
            if( list_el[i].id == 'aviaAdults' && list_el[i].value == 0){
              self[list_el[i].id] = 1;
            }
          }
        }
      },

      closeMenu(){
        this.focused = false;
        this.focusedFac = false;
      },

      transferAddressToCoords(str, callback){
        if(str.length < 3) return {};
        let obj = {
          "str": str,
        }

        this.$http.post(this.pathData +'/transferAddressToCoords', obj)
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
          'start_coords': this.transfDep_Coords,
          'end_coords': this.transfArr_Coords,
          'class': "econom,business,comfortplus,minivan,vip"
        }
        if(this.transfFacilities.length > 0){
          let str = "";
          this.transfFacilities.forEach((item) => {
            str = str +","+ item.id;
          })
          obj['req'] = str.substring(1, str.length);
        }
        
        if(this.transfDep_Coords.length == 0){          
          document.getElementById('transfDep_Place').style.border = '1px solid #FF5C1C';
          this.alertMsg('Место отправки', ' координаты не определены','warning');
          return null;
        }

        if(this.transfArr_Coords.length == 0){          
          document.getElementById('transfArr_Place').style.border = '1px solid #FF5C1C';
          this.alertMsg('Место прибытия', ' координаты не определены','warning');
          return null;
        }
        
        document.getElementById('transfDep_Place').style.border = '1px solid #e5e6e7';
        document.getElementById('transfArr_Place').style.border = '1px solid #e5e6e7';

        return obj;
      },

      

      // start search
      transfSubmit() {
        this.focused = false;
        this.focusedFac = false;
        let queryObj = this.validObj();
        if(queryObj != null){
          this.mainLogic(queryObj);
        }
      },

      mainLogic(obj){
        let searchBarData = {
          'locale': this.locale,
          'transfDep_Place': this.transfDep_Place,
          'transfDep_Coords': this.transfDep_Coords,
          'transfArr_Place': this.transfArr_Place,
          'transfArr_Coords': this.transfArr_Coords,
          'transfAdults': this.transfAdults,
          'transfChildren': this.transfChildren,
          'transfFacilities': this.transfFacilities,
        }
        this.$router.push({ name: 'Search', params: { transfer:{ queryObj: obj, searchBar: searchBarData }, hotels: (this.$route.params.hasOwnProperty("hotels") ? this.$route.params.hotels : {}), avia: (this.$route.params.hasOwnProperty("avia") ? this.$route.params.avia : {}), show: "transfer"}});

        this.$route.params.transfer = { queryObj: obj, searchBar: searchBarData };
        
        BusEvent.$emit('getTransfer', obj);
      },

      
    },

    // init vue-click-outside
    directives: {
      ClickOutside
    },

    watch: {
      //clear button active
      transfDep_Place: function (val, oldVal) {
        var el = document.getElementById('transfDep_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
      },
      transfArr_Place: function (val, oldVal) {
        var el = document.getElementById('transfArr_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
        if(val == this.transfDep_Place && val.length != 0){
          this.alertMsg('Совпадение','Место отправления не может быть местом прибытия','warning');
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

  #transfSearchBar {
    border-radius: 3px;
    /*background-color: white;*/
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #transfSearchBar .row {
    text-align: center;
  }

  #transfSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #transfSearchBar .form-control {
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
  #transfSearchBar > .form-control:last-child{
    padding-left: 25px;
  }
  #transfSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #EDCF07;
  }
  #transfSearchBar  .form-control + span.fa-times-circle{
    display: none;
  }
/*  #transfSearchBar  .form-control:focus + span.fa-times-circle{
    display: block;
  }*/


  #transfSearchBar > div > .form-group > span:first-child {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
  }
  #transfSearchBar > div > .form-group > span:last-child {
    position:absolute;
    right:5px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;
  }
  #transfSearchBar > div > .form-group > span:last-child:hover {
    color: #EDCF07;
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





  /*#transfSearchBar .row .form-group:first-child input{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
*/
  
  #transfSearchBar #humanDesc{
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
    padding-bottom: 17px; 
  }
  #transfSearchBar #humanDesc .form-control{
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
  #transfSearchBar #humanDesc div span{
    position: absolute;
    font-size: 20px;
    cursor: pointer;
  }
  #transfSearchBar #humanDesc div span:hover{
    color: #EDCF07;
    transition: color 0.15s;
  }
  #transfSearchBar #humanDesc span:first-child{
    left: 10px;
    margin-top: 7px;
  }
  #transfSearchBar #humanDesc span:last-child{
    right: 10px;
    margin-top: -27px;
  }



  #transfSearchBar #facDesc{
    background-color: #FFFFFF;
    background-image: none;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
    display: block;
    font-family: 'Comfortaa', sans-serif;
    color: black;
    font-size: 12px;
    text-align: left;
    position:absolute;
    width: 100%;
    right: 0; 
    left:0;
    top: 49px;
    z-index: 99;
    /*padding: 10px 25px;*/
    /*background-color: #FAFAFA;*/
  }
  #transfSearchBar #facDesc ul{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #transfSearchBar #facDesc li{
    cursor: pointer;
    line-height: 2.5;
    padding-left: 10px;
    padding-right: 10px;
  }
  #transfSearchBar #facDesc li:hover{
    background-color: #FAFAFA;
  }
  #transfSearchBar #facDesc ul li .fa-check-circle:hover, #transfSearchBar #facDesc ul li .fa-circle:hover{
    color: #FF6200;
  }
 

  #transfSearchBar #facDesc .fa-circle{
    color: #E8CC10;
    font-size: 16px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  #transfSearchBar #facDesc .fa-check-circle{
    color: #E8CC10;
    font-size: 16px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }







  #transfSearchBar .btn {
    width: 100%;
    border: 1px solid #EDCF07;
    /*border: none;*/
    border-radius: 0px;
    background-color: #EDCF07;

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

  #transfSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #EDCF07;
  }

  #transfSearchBar  .btn:hover{
    background-color: #DEC209
  }
  

  #transfSearchBar .fa-search{
    color: white;
    text-align: center;
  }

 /* #transfSearchBar .errorHelp{
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
 
  #transfSearchBar #datepickers-container {}
  #transfSearchBar #datepickers-container .datepicker--cell.-current- {
    background-color: #EDCF07;
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
    #transfSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #transfSearchBar {
      /*background-color: white;*/
      /*padding: 15px; */
      /*padding-top: 20px;*/
      /*margin-top: 15px; */
      /*margin-bottom: 15px; */
    }

    #transfSearchBar .form-group {
      padding: 0px;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
    }
    #transfSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 3px;
    }


    #transfSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 3px;

    }

    
    
  }

  @media (min-width: 990px){

    #transfSearchBar .row .form-group:first-child input{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: none;
    }

    #transfSearchBar .btn{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

  }

  @media (max-width: 990px){ 
    #transfSearchBar{
      box-shadow: none;
    }
  }

  @media (max-width: 575px){

    #transfSearchBar{
      box-shadow: none;
    }

  }
   
</style>




<!-- test bus
   // get Cities from App.vue
      // BusEvent.$on('aviaLoadCities', function(value) {
      //   self.aviaCities = value; -->


