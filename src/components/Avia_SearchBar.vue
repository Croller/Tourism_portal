<template>
  
  <div id="aviaSearchBar" class="container" >
    <div class="row justify-content-center">
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2" autocomplete="off">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-compass"></span>
        <input type="text" class="form-control" id="aviaDep_Place" placeholder="Откуда" autofocus v-model="aviaDep_Place" v-on:click="focused = false" focused>
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="aviaArr_Place" placeholder="Куда" v-model="aviaArr_Place" autocomplete="off" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-6 col-sm-6 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control datepicker-here" id="aviaDep_Date" placeholder="Туда" v-model="aviaDep_Date" autocomplete="off" data-mask="99-99-9999" data-range="false" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)"></span>
      </div>
      <div class="form-group col-6 col-sm-6 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control datepicker-here" id="aviaArr_Date" placeholder="Обратно" v-model="aviaArr_Date" autocomplete="off" data-mask="99-99-9999" data-range="false" v-on:click="focused = false">
        <span class="far fa-times-circle" v-on:click="clearSpan($event)" ></span>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-male"></span>
        <input type="text" class="form-control" placeholder="Пассажиры"  autocomplete="off" v-on:click="focused = !focused" v-model="totalPassenger" readonly="readonly" style="padding-left: 20px;">
        <div id="humanDesc" class="shadow" v-show="focused" v-click-outside="closeMenu">
          <ul class="list-group list-unstyled text-extra-small">
            <li id="adults" class="list-item">
              <a>Взрослые :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="aviaAdults" type="text" name="" class="form-control" value="1" v-model="aviaAdults"> 
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <li id="children">
              <a>Дети до 12 лет :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="aviaChildren" type="text" name="" class="form-control" value="0" v-model="aviaChildren">
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <li id="infants">
              <a>Дети до 2 лет :</a>
              <div>
                <span class="far fa-minus-square" v-on:click="minusOne($event)"></span>
                <input id="aviaInfants" type="text" name="" class="form-control" value="0" v-model="aviaInfants"> 
                <span class="far fa-plus-square" v-on:click="plusOne($event)"></span>
              </div>
            </li>
            <li id="tripClass" class="text-small">
              <input type="checkbox" id="statTripClass" v-model="tripClass" style="display: none;"> 
              <label for="statTripClass" v-on:click="changeTripClass('tripClass')">
                <span class="far fa-square"></span>
                Бизнес
              </label>
            </li> 
          </ul>
        </div>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-5 col-lg-2">
        <span class="fas fa-search"></span> 
        <!-- <router-link to="/search"> -->
          <!-- <router-link :to="{ name: 'Search', params: this.validObj}"> -->
          <button class="btn btn-primary" v-on:click="aviaSubmit">Поиск</button>
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
    name: 'Avia_SearchBar',
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),
        
        aviaCities: [],     //cities

        // language
        locale:         "ru",       //search on language
        aviaTripClass:  "Y",    //class air
        // place from to
        aviaDep_Place:  "",
        aviaDep_IATA:   "",
        aviaArr_Place:  "",
        aviaArr_IATA:   "",
        // date from to
        aviaDep_Date:   "",
        aviaArr_Date:   "",
        // passenger by category
        aviaAdults:     1,         // human older 12 years old
        aviaChildren:   0,       // child to 12 years old
        aviaInfants:    0,        // child to 2 years old

        uuid:           "ebe4fa71-bc07-40df-ae4e-4b72116583da",
        // -------

        focused: false,
        tripClass: false,
      }
    },
    prop:{
      
    },
    computed: {
      totalPassenger: function () {
        var total = parseInt(this.aviaAdults) + parseInt(this.aviaChildren) + parseInt(this.aviaInfants);
        var tClass = ''
        if( this.aviaTripClass == "Y"){
          tClass = 'эконом'
        }else{
          tClass = 'бизнес'
        }
        return total + "  " + this.declension(total, ['Пассажир', 'Пассажира', 'Пассажиров']) + ", " + tClass;
      },
    },

    created: function(){

    },
    mounted () {
      console.log('///////////////')
      console.log('avia search bar - loaded')

      let self = this;

      // load avia cities
      // this.aviaLoadCities();

      // set data from route params
      // console.log(this.$route.params.objQuery)

      if(this.$route.params.hasOwnProperty("avia") && this.$route.name == 'Search'){

        if(Object.keys(this.$route.params.avia).length > 0){
          let rParams = this.$route.params.avia.searchBar;
          let uuid = this.$route.params.avia.uuid;
          console.log(uuid);
          this.locale = rParams.locale;
          this.aviaTripClass = rParams.aviaTripClass;
          this.aviaDep_Place = rParams.aviaDep_Place;
          this.aviaDep_IATA = rParams.aviaDep_IATA;
          this.aviaArr_Place = rParams.aviaArr_Place;
          this.aviaArr_IATA = rParams.aviaArr_IATA;
          this.aviaDep_Date = rParams.aviaDep_Date;
          this.aviaArr_Date = rParams.aviaArr_Date;
          this.aviaAdults = rParams.aviaAdults;
          this.aviaChildren = rParams.aviaChildren;
          this.aviaInfants = rParams.aviaInfants;

          BusEvent.$emit('getTicket', uuid);
        }
      }else{
        // check cookie
        // BusEvent.$emit('getTicket', uuid);
      }


      //reload data after time out
      BusEvent.$on('reloadTicket', function() {
        self.aviaSubmit();
      });
      
   
      // init autocomplite for input with cities
      var maxLimit = 5;
      $( "#aviaDep_Place" ).autocomplete({
        // position: { my: "left bottom", at: "left top", collision: "flip" },
        source: function(request, response) {
          if(request.term.length > 2){
            self.aviaLoadAutoComplete (request.term, function(err, data) {
              response(data);
            });
          }
        },
        minLength: 1,
        // source: function(request, response) {
        //   var results = $.ui.autocomplete.filter(self.aviaCities, request.term);
        //   response(results.slice(0, maxLimit));
        //   // let results;
        //   // if(request.term.length > 2){
        //   //   response(self.aviaLoadAutoComplete(request.term));
        //   // }
        // },
        focus: function( event, ui ) {
          self.aviaDep_Place = ui.item.label;
        },
        select: function( event, ui ) {
          let el = document.getElementById('aviaDep_Place');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.aviaDep_Place = ui.item.label;
          self.aviaDep_IATA = ui.item.iata;

          let data = {
            "layerName": "aviaDep_Place",
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
      $( "#aviaArr_Place" ).autocomplete({
        source: function(request, response) {
          if(request.term.length > 2){
            self.aviaLoadAutoComplete (request.term, function(err, data) {
              response(data);
            });
          }
        },
        minLength: 1,
        // source: function(request, response) {
        //   var results = $.ui.autocomplete.filter(self.aviaCities, request.term);
        //   response(results.slice(0, maxLimit));
        // },
        focus: function( event, ui ) {
          self.aviaArr_Place = ui.item.label;
        },
        select: function( event, ui ) {
          let el = document.getElementById('aviaArr_Place');
          el.style.border = '1px solid #e5e6e7';
          el.value =  ui.item.label;
          self.aviaArr_Place = ui.item.label;
          self.aviaArr_IATA = ui.item.iata;

          let data = {
            "layerName": "aviaDep_Place",
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
          .append( "<div>" + item.label + ", <span>" + (item.hasOwnProperty("locationName") ? item.locationName : item.countryName) + "</span></div>" )
          .appendTo( ul );
      };

      // set dropdown width like input
      jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
      }
      
      // init date picker
      $('#aviaDep_Date').datepicker({
        minDate: new Date(),
        position: "bottom left",
        autoClose: true,
        todayButton: true,
        range: true,
        offset: 8,
        onShow: function(dp, animationCompleted){
          // if (!animationCompleted) {
            var newWidth = $('#aviaDep_Date').css('width');
            newWidth = 2*(parseInt(newWidth.replace('px','')));
            $('#datepickers-container > div').css('width', newWidth);            
          // }
        },
        onSelect: function(formattedDate, date, inst){
          // console.log(date)
          if (date.length > 1) {
            self.aviaArr_Date = Moment(date[1]).format("DD.MM.YYYY");
            self.aviaDep_Date = Moment(date[0]).format("DD.MM.YYYY");
            $('#aviaArr_Date').data('datepicker').minDate = date[1];
          }else{
            self.aviaDep_Date = Moment(date).format("DD.MM.YYYY");
            // set new date if dep date selected
            $('#aviaArr_Date').data('datepicker').minDate = date;
          }
        },
      });
      $('#aviaArr_Date').datepicker({
        minDate: new Date(),
        position: "bottom right",
        autoClose: true,
        todayButton: true,
        offset: 8,
        onShow: function(dp, animationCompleted){
          if (!animationCompleted) {
            // set style
            var newWidth = $('#aviaArr_Date').css('width');
            var newWidth = $('#aviaArr_Date').css('left', );
            newWidth = 2*(parseInt(newWidth.replace('px','')));
            $('#datepickers-container > div').css('width', newWidth);
          }
        },
        onSelect: function(formattedDate, date, inst){
          self.aviaArr_Date = Moment(date).format("DD.MM.YYYY");
        },
      })

      // set input mask for date
      var dateMask = new InputMask("99.99.9999");
      dateMask.mask(document.getElementById('aviaDep_Date'));
      dateMask.mask(document.getElementById('aviaArr_Date'));
      
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
              self[id + '_IATA'] = "" ;  
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

      onFocus(){
        this.focused = true;
      },

      closeMenu(){
        this.focused = false;
      },

      changeTripClass(id){
        console.log(id)
        var el = document.getElementById(id)
        if(!this.tripClass){
          this.aviaTripClass = "C";
          el.children[1].children[0].classList.remove('fa-square')
          el.children[1].children[0].classList.add('fa-check-square')
        }else{
          this.aviaTripClass = "Y"
          el.children[1].children[0].classList.remove('fa-check-square')
          el.children[1].children[0].classList.add('fa-square')
        }
      },

      aviaLoadCities() {
        this.$http.get(this.pathData +'/getAviaCities')
        .then(response => {
          if(response.status == 200){
            this.aviaCities = response.data;
            // console.log(response.data)
            // BusEvent.$emit('aviaLoadCities', response.data);
          }else{
            console.log("Server error: "+ response.status);
          }
        });
      },

      aviaLoadAutoComplete(str, callback){

        if(str.length < 3) return {};

        let obj = {
          "query": str,
          "lang": this.locale,
          "lookFor": "city", // city (города и острова), hotel (отели), both (все объекты, значение по умолчанию).
          "limit": 5,
          "convertCase": 1,
        }

        this.$http.post(this.pathData +'/getAutoComplete', obj)
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
          "locale": this.locale,
          "trip_class": this.aviaTripClass,
          "passengers": {
            "adults": this.aviaAdults.toString(),
            "children": this.aviaChildren.toString(),
            "infants": this.aviaInfants.toString(),
          },
          "segments": []
        }
        // console.log(this.aviaDep_IATA)
        if(this.aviaDep_IATA.length == 3){
          if(this.aviaArr_IATA.length == 3){
            if(this.aviaDep_Date.length != 0 && this.aviaDep_Date != 'Ivalid date'){
              obj.segments.push({
                "origin": this.aviaDep_IATA,
                "destination": this.aviaArr_IATA,
                "date": Moment(this.aviaDep_Date, "DD.MM.YYYY").format("YYYY-MM-DD"),
              });
            }else{
              document.getElementById('aviaDep_Date').style.border = '1px solid #FF5C1C';
              this.alertMsg('Дата отправления','введена не верно','warning');
              return null;
            }
          }else{
            document.getElementById('aviaArr_Place').style.border = '1px solid #FF5C1C';
            this.alertMsg('Город прибытия', 'введен не верно','warning');
            return null;
          }
        }else{
          document.getElementById('aviaDep_Place').style.border = '1px solid #FF5C1C';
          this.alertMsg('Город отправления', 'введен не верно','warning');
          return null;
        }

        if(this.aviaDep_IATA.length > 3){
          document.getElementById('aviaDep_Place').style.border = '1px solid #e5e6e7';
          document.getElementById('aviaArr_Place').style.border = '1px solid #e5e6e7';
        }
        
        if(this.aviaArr_Date.length != 0) {
          if(this.aviaArr_Date != 'Ivalid date'){
            obj.segments.push({
              "origin": this.aviaArr_IATA,
              "destination": this.$route.name == 'Search' ? this.aviaDep_IATA : this.aviaDep_Place,
              "date": Moment(this.aviaArr_Date, "DD.MM.YYYY").format("YYYY-MM-DD"),
            })
          }else{
            document.getElementById('aviaArr_Date').style.border = '1px solid #FF5C1C';
            this.alertMsg('Дата обратного билета','введена не верно','warning');
            return null;
          }
        }else{
          document.getElementById('aviaArr_Date').style.border = '1px solid #e5e6e7';
        }

        if(this.aviaDep_IATA == this.aviaArr_IATA){
          this.alertMsg('Совпадение','Город вылета не может быть и городом прибытия','warning');
          return null;
        }
        
        document.getElementById('aviaDep_Date').style.border = '1px solid #e5e6e7';

        return obj;
      },

      

      // start search
      aviaSubmit() {
        this.focused = false;
        let queryObj = this.validObj();
        if(queryObj != null){
          this.aviaUUID(queryObj);
        }
      },

      aviaUUID(obj){
        this.$http.post(this.pathData +'/getAviaUUID', obj).then(function (response) {
            console.log('///////////////')
            console.log('get uuid')
            if(response.data != null){
              this.mainLogic(response.data)
            }else{
              console.log('query not good');
            }
        });
      },

      mainLogic(uuid){
        console.log(uuid)
        let searchBarData = {
          'locale': this.locale,
          'aviaTripClass': this.aviaTripClass,
          'aviaDep_Place': this.aviaDep_Place,
          'aviaDep_IATA': this.aviaDep_IATA,
          'aviaArr_Place': this.aviaArr_Place,
          'aviaArr_IATA': this.aviaArr_IATA,
          'aviaDep_Date': this.aviaDep_Date,
          'aviaArr_Date': this.aviaArr_Date,
          'aviaAdults': this.aviaAdults,
          'aviaChildren': this.aviaChildren,
          'aviaInfants': this.aviaInfants,
        }
        this.uuid = uuid;
        this.$router.push({ name: 'Search', params: { avia:{ uuid: uuid, searchBar: searchBarData }, hotels: (this.$route.params.hasOwnProperty("hotels") ? this.$route.params.hotels : {}), transfer: (this.$route.params.hasOwnProperty("transfer") ? this.$route.params.transfer : {}), excursions: (this.$route.params.hasOwnProperty("excursions") ? this.$route.params.excursions : {}), show: "avia"}});
        // if same route same, need update route
        this.$route.params.avia = { uuid: uuid, searchBar: searchBarData };
        
        BusEvent.$emit('getTicket', this.uuid);
      },

      
    },

    // init vue-click-outside
    directives: {
      ClickOutside
    },

    watch: {
      //clear button active
      aviaDep_Place: function (val, oldVal) {
        var el = document.getElementById('aviaDep_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
      },
      aviaArr_Place: function (val, oldVal) {
        var el = document.getElementById('aviaArr_Place')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
        if(val == this.aviaDep_Place && val.length != 0){
          this.alertMsg('Совпадение','Город вылета не может быть и городом прибытия','warning');
        }
      },

      aviaDep_Date: function (val, oldVal) {
        let self = this;
        $('#aviaArr_Date').datepicker({
          minDate: this.aviaDep_Date.length != 0 ? new Date(Moment.utc(this.aviaDep_Date, "DD.MM.YYYY").valueOf()) : new Date()});
       // $('#arrDate')datepicker.update('minDate', new Date())
        $('#aviaArr_Date').datepicker({
          minDate: this.aviaDep_Date.length != 0 ? new Date(Moment.utc(this.aviaDep_Date, "DD.MM.YYYY").valueOf()) : new Date()
        })
        var el = document.getElementById('aviaDep_Date')
        if(val.length != 0){
          el.parentNode.children[2].style.display = 'block';
        }else{
          el.parentNode.children[2].style.display = 'none';
        }
      },

      aviaArr_Date: function (val, oldVal) {
        var el = document.getElementById('aviaArr_Date')
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

  #aviaSearchBar {
    border-radius: 3px;
    /*background-color: white;*/
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #aviaSearchBar .row {
    text-align: center;
  }

  #aviaSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #aviaSearchBar .form-control {
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
  #aviaSearchBar > .form-control:last-child{
    padding-left: 25px;
  }
  #aviaSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }
  #aviaSearchBar  .form-control + span.fa-times-circle{
    display: none;
  }
/*  #aviaSearchBar  .form-control:focus + span.fa-times-circle{
    display: block;
  }*/


  #aviaSearchBar > div > .form-group > span:first-child {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
  }
  #aviaSearchBar > div > .form-group > span:last-child {
    position:absolute;
    right:5px;
    top:8px;
    font-size: 16px;
    line-height: 32px;
    cursor: pointer;
  }
  #aviaSearchBar > div > .form-group > span:last-child:hover {
    color: #FF9F1C;
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





  /*#aviaSearchBar .row .form-group:first-child input{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
*/
  
  #aviaSearchBar #humanDesc{
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
  #aviaSearchBar #humanDesc .form-control{
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
  #aviaSearchBar #humanDesc div span{
    position: absolute;
    font-size: 20px;
    cursor: pointer;
  }
  #aviaSearchBar #humanDesc div span:hover{
    color: #FF9F1C;
    transition: color 0.15s;
  }
  #aviaSearchBar #humanDesc span:first-child{
    left: 10px;
    margin-top: 7px;
  }
  #aviaSearchBar #humanDesc span:last-child{
    right: 10px;
    margin-top: -27px;
  }
  #aviaSearchBar #humanDesc #tripClass{
    /*background-color: #FF9F1C;*/
    /*color: white;*/
    color: #000;
    padding-top: 5px;
    padding-bottom: 5px;
    line-height:2;
    font-weight: 300;
    border-radius: 0px 0px 3px 3px;
    /*border-right: 1px solid #FF9F1C;*/
  }
  #aviaSearchBar #humanDesc #tripClass label{
    margin-bottom: 0px;
    cursor: pointer;
    font-size: 13px;
  }



  #aviaSearchBar .btn {
    width: 100%;
    border: 1px solid #FF9F1C;
    /*border: none;*/
    border-radius: 0px;
    background-color: #FF9F1C;

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

  #aviaSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }

  #aviaSearchBar  .btn:hover{
    background-color: #F09A24
  }
  

  #aviaSearchBar .fa-search{
    color: white;
    text-align: center;
  }

 /* #aviaSearchBar .errorHelp{
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
 
  #aviaSearchBar #datepickers-container {}
  #aviaSearchBar #datepickers-container .datepicker--cell.-current- {
    background-color: #FF9F1C;
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
    #aviaSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #aviaSearchBar {
      /*background-color: white;*/
      /*padding: 15px; */
      /*padding-top: 20px;*/
      /*margin-top: 15px; */
      /*margin-bottom: 15px; */
    }

    #aviaSearchBar .form-group {
      padding: 0px;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
    }
    #aviaSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 3px;
    }


    #aviaSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 3px;

    }

    
    
  }

  @media (min-width: 990px){

    #aviaSearchBar .row .form-group:first-child input{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      box-shadow: none;
    }

    #aviaSearchBar .btn{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

  }

  @media (max-width: 990px){ 
    #aviaSearchBar{
      box-shadow: none;
    }
  }

  @media (max-width: 575px){

    #aviaSearchBar{
      box-shadow: none;
    }

  }
   
</style>




<!-- test bus
   // get Cities from App.vue
      // BusEvent.$on('aviaLoadCities', function(value) {
      //   self.aviaCities = value; -->


