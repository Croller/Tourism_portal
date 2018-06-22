<template>
  <!-- <form id="map-search-form" class="openSeachForm col-xs-12 col-sm-4 col-md-3 col-lg-2"> -->
  <form id="map-search-form" class="openSeachForm" style="width:250px;">
    <div id="tabs-search-block" class="row">
      <div class="col-xs-12 tabs-icons">
        <ul id="tabs-list" class="nav nav-tabs">
          <li class="active" role="presentation" data-toggle="tooltip" data-placement="right" title="Билеты на самолет">
            <a href="#planes" id="plane-tab" role="tab" data-toggle="tab" aria-controls="plane">
              <i class="fa fa-plane"></i>
            </a>
          </li>
          <li role="presentation" data-toggle="tooltip" data-placement="top" title="Отели">
            <a href="#hotels" id="hotels-tab" role="tab" data-toggle="tab" aria-controls="hotels">
              <i class="fa fa-home"></i>
            </a>
          </li>
          <li role="presentation" data-toggle="tooltip" data-placement="top" title="Экскурсии">
            <a href="#excursions" id="excursions-tab" role="tab" data-toggle="tab" aria-controls="excursions">
              <i class="fa fa-tree"></i>
            </a>
          </li>
        </ul>
      </div>
      <div id="search-form-hide" class="showIcon" v-on:click="hideShowForm()">
        <a href="#">
          <i class="glyphicon glyphicon-chevron-down"></i>
        </a>
      </div>
    </div>

    <div id="tabpanels-search-block" class="row tab-content">

      <div role="tabpanel" class="col-xs-12 tab-pane fade in active" id="planes">
        <div class="row">

          <div class="col-xs-12">
            <label class="font-normal">Откуда:</label>
            <div class="form-group">
              <input type="text" id="from_cities_planes" class="form-control" autocomplete="off" v-model="from_cities_planes" placeholder="Москва #MOW">
              <!-- <span ref="earse" class="clearInput fa fa-times-circle" v-on:click="clearInput"></span> -->
            </div>
          </div>

          <div class="col-xs-12">
            <label class="font-normal">Куда:</label>
            <div class="form-group">
              <input type="text" id="to_cities_planes" class="form-control" autocomplete="off" v-model="to_cities_planes" placeholder="Гоа #GOI">
            </div>
          </div>

          <div class="col-xs-12">
            <label class="font-normal">Туда:</label>
            <div class="form-group">
              <input type="text" id="from_date_planes" class="form-control dPicker" data-provide="datepicker" autocomplete="off" placeholder="08.02.2018" v-model="from_date_planes">
            </div>
          </div>

          <div class="col-xs-12">
            <label class="font-normal">Обратно:</label>
            <div class="form-group">
              <input type="text" id="to_date_planes" class="form-control dPicker" data-provide="datepicker" autocomplete="off" placeholder="15.02.2018" v-model="to_date_planes">
            </div>
            <!-- @input="addEvent" -->
            <!-- @change="addEvent" -->
          </div>

          <div class="col-xs-12">
            <label class="font-normal">Количество билетов:</label>
            <div class="form-group">
              <input type="text" id="numPas_planes" class="form-control" autocomplete="off" value="2" v-model="numPas_planes" >
              <span id="clearInput" class="fa fa-times-square"></span>
            </div>
          </div>
              
        </div>
      </div>

      <div role="tabpanel" class="col-xs-12 tab-pane fade" id="hotels">
      </div>
      <div role="tabpanel" class="col-xs-12 tab-pane fade" id="excursions">

      </div>

    </div>
    <div id="botton-search-block" class="row">
      
      <div id="search-button-run" class="col-xs-12" v-on:click="submitMapSearchFrom()">
        <a href="#" class="button-primary pull-right">
          <i class="fa fa-search"></i>
          <!-- <span>Поиск</span> -->
        </a>
      </div>
    </div>
  </form>
</template>



<script>

import BusEvent from './BusEvent.vue'

export default {
  name: 'MapSearchFilter',

  // components: { 'BusEvent': BusEvent },

  props:{
    citiesTrP:{},
    userLocation:{},
  },

  data () {
    return {
      from_cities_planes: '',
      to_cities_planes: '',

      from_date_planes: '',
      to_date_planes: '',

      numPas_planes: '2',
    }
  },
  mounted () {

      // console.log($('.clearInput'))


    var vm = this;

    this.from_date_planes = moment().format("DD.MM.YYYY");
    this.to_date_planes = moment(moment().format("DD.MM.YYYY"), "DD.MM.YYYY").add(7, 'days').format("DD.MM.YYYY");

    // $.fn.datepicker.dates
    // $('.dPicker').datepicker({
    //   keyboardNavigation: false,
    //   forceParse: false,
    //   autoclose: true,
    //   timePicker: true,
    //   todayHighlight: true,
    //   toggleActive: true,
    //   timePicker24Hour: true,
    //   format: "dd.mm.yyyy",
    //   language: 'ru',
    //   locale: {
    //     format: 'dd.mm.yyyy HH:mm'
    //   }
    // });

    $('#from_date_planes').datepicker({
      minDate: new Date(),
      position: "bottom left",
      autoClose: true,
      odayButton: true,
      offset: 8,

      onSelect: function(formattedDate, date, inst){
        vm['from_date_planes']=moment(date).format("DD.MM.YYYY");
      },
    })

    $('#to_date_planes').datepicker({
      minDate: new Date(),
      position: "bottom left",
      autoClose: true,
      todayButton: true,
      offset: 8,
      onShow: function(dp, animationCompleted){
        if (!animationCompleted) {
          $('.datepickers').css({
            'width': $('#from_date_planes').width() + 22 + 'px',
          })
        }
      },
      onSelect: function(formattedDate, date, inst){
        vm['to_date_planes']=moment(date).format("DD.MM.YYYY");
      },
    })

    $('.datepicker, .table-condensed').css({
      'z-index': 150,  
    })


      $('[data-toggle="tooltip"]').tooltip()

  },
  methods: {

    clearInput(){
      var span = $(this.$refs.earse).attr('class')
      $('.'+span.replace(/[ ]/g,".")).closest('div.form-group').find('input').val("")
    },
    
    hideShowForm(){
      if ( $("#map-search-form").hasClass("openSeachForm")) {
        $("#map-search-form").removeClass("openSeachForm");
        $("#map-search-form").addClass("closeSeachForm");    

        $("#search-form-hide").removeClass("showIcon");
        $("#search-form-hide").addClass("hideIcon");             
      }else{
        $("#map-search-form").addClass("openSeachForm");
        $("#map-search-form").removeClass("closeSeachForm"); 

        $("#search-form-hide").addClass("showIcon");
        $("#search-form-hide").removeClass("hideIcon"); 
      }
    },

    submitMapSearchFrom(){
      // this.from_cities_planes = $("#from_cities_planes").val();
      // this.to_cities_planes = $("#to_cities_planes").val();
      // this.from_date_planes = $("#from_date_planes").val();
      // this.to_date_planes = $("#to_date_planes").val();
      // this.numPas_planes = $("#numPas_planes").val();

      if (this.from_cities_planes == this.to_cities_planes) {
        console.log("duplicates city error")
      }

      if(this.from_cities_planes.length == 0 || this.to_cities_planes.length == 0 ){
        console.log("no city error")
      }

      if(this.from_date_planes > this.to_date_planes){
        console.log("date error")
      }


      // send weather layer name
      BusEvent.$emit('changeWeatherTile', 'temp_new');


    },



  },
  watch: {
    citiesTrP: function (val, oldVal) {
        

        $("#from_cities_planes, #to_cities_planes").autocompleter({
          source: val,
          limit: 5,
          empty: true,
          cache: true,
          customLabel: 'name',
          highlightMatches: true,
          // customValue: '{{ name }} - {{ code }}',
          template: '<span>{{ name }} &nbsp;&nbsp; #{{ code }}</span>',
          callback: function (value, index, selected) {
            if (selected) {
              $(this).closest('div.form-group').find('input').val(selected.name + ' #'+ selected.code );
              var id = $(this).closest('div.form-group').find('input').attr('id')
              vm[id]=selected.name + ' #'+ selected.code
            }
          }
        });

        $("#map-search-form .autocompleter").css("width", $("#from_cities_planes").width() + 22);
    },

    userLocation: function(val, oldVal){
      $("#from_cities_planes").val(val.name + ' #'+ val.iata)
    }



  },
  created: function () {

  }
}




</script>

<style>


@import url('https://fonts.googleapis.com/css?family=Exo+2:300,400,700,800|Montserrat+Alternates:200,300,400,700|Open+Sans+Condensed:300,700|Roboto+Condensed:300,400,700');



#map-search-form {
  
  position: absolute;
  z-index: 150;
  
  

  /*opacity: 0.7;*/
  -webkit-transition: all .5s ease-in-out; 
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}

#map-search-form:hover{
  opacity: 1;
  -webkit-transition: all .5s ease-in-out; 
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}

.openSeachForm{
  top: 25%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%); 
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%); 

  left: 15%;
  -ms-transform: translateX(-50%);
  -webkit-transform: translateX(-50%); 
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%); 
}

.closeSeachForm{
  top: 20%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%); 
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%); 

  left: 10px;
  -ms-transform: translateX(-100%);
  -webkit-transform: translateX(-100%); 
  -moz-transform: translateX(-100%);
  -o-transform: translateX(-100%);
  transform: translateX(-100%); 
}

/* ------------------------------------------- */

#tabs-list {
  border-bottom: none;
}

#tabs-list li{
  background-color: #f8f8f8
}

#tabs-list li a{
  border: none !important;
  border-radius: 0 !important;
  margin-right: 0;
  display: block;
  height: 58px;
  width: 53px;
  position: relative;
  text-align: center;
  line-height: 50px;
  outline: none;
  color: #979797;
  padding: 7px 10px 7px 10px; 
}

#tabs-list li.active a{
  background: #dd6037 !important;
  color: #fff
}

#tabs-list li.hover a{
  background: #eee;
}

#tabs-list li.active::after, #tabs-list li:hover::after{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  content: "";
  bottom: 0;
  left: 50%;
  position: absolute;
  z-index: 11;
  margin-left: -10px;
  background: transparent url(../assets/MapSearchFilter/menu-carret.png) no-repeat bottom center;
  border-color: transparent transparent #f8f8f8 transparent;
}

#tabs-list li a i{
  font-size: 2em;
}

.tooltip.top .tooltip-inner {
    background-color: #3797dd;
}
.tooltip.top .tooltip-arrow {
      border-top-color: #3797dd;
}

#search-form-hide{
  background: #dd6037;
  
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 56px;
  /*padding-top: 3px;*/
  display: block;
  text-decoration: none;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  position: absolute;
  left: 100%;
  top: 68px;
  margin-left: -20px;
}

#search-form-hide a i{
  color: #ffffff;
  font-weight: 700;
   
}

.showIcon a i{
  transform: rotate(90deg) scale(1) skew(1deg) translate(0px);
  -webkit-transform: rotate(90deg) scale(1) skew(1deg) translate(0px);
  -moz-transform: rotate(90deg) scale(1) skew(1deg) translate(0px);
  -o-transform: rotate(90deg) scale(1) skew(1deg) translate(0px);
  -ms-transform: rotate(90deg) scale(1) skew(1deg) translate(0px);
}

.hideIcon a i{
  padding-top: 3px;
  transform: rotate(-90deg) scale(1) skew(1deg) translate(0px);
  -webkit-transform: rotate(-90deg) scale(1) skew(1deg) translate(0px);
  -moz-transform: rotate(-90deg) scale(1) skew(1deg) translate(0px);
  -o-transform: rotate(-90deg) scale(1) skew(1deg) translate(0px);
  -ms-transform: rotate(-90deg) scale(1) skew(1deg) translate(0px);
}


/* ------------------------------------------- */


.tab-content{
  padding-left: 0px;
  padding-right: 0px;
  background: #f8f8f8;
  margin: 0px;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 15;
  
  /*height: 150px;*/
}

#search-form-hide{
  cursor: pointer;
}
#search-button-run a{
  width: 100%;
  background: #dd6037;
  height: 50px;
  line-height: 50px;
  padding: 0 30px 0 30px;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;  
  text-decoration: none;
  font-size: 1.08em;
  letter-spacing: 1px;
  overflow: hidden;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  white-space: nowrap;
  float: right;
  position: relative;
  border-radius: 0 0 5px 5px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;

  font-size: 20px;
}

#search-button-run a i{
  color: #ffffff;
}

/* ------------------------------------------- */

#tabpanels-search-block .row{
  padding-top: 10px;
}

#tabpanels-search-block label {
  color: #979797;
  /*font-weight: 200;*/
  font-size: 14px;
  font-family: 'Montserrat Alternates', sans-serif;
  width: 100%;
  text-align: center;
  letter-spacing: 0.5px;
}

/*#map-search-form div:first-child {
  margin-top: 10px;
}*/

#tabpanels-search-block input {
  color: #5d5d5d;
  font-weight: 400;
  font-size: 18px;
  font-family: 'Exo 2', sans-serif;
  /*letter-spacing: 1px;*/
  border-radius: 0px;
  border: 0.5px solid #ebebeb;
  /*border-color: #ccc;*/
  height: 35px;
  /*padding: 10px;*/
  text-align: center;
  /*margin-bottom: 5px;*/

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.datepicker--day-name{
  color: #3797dd;
}

.clearInput {
    position: absolute;
    right: 22px;
    top: 0;
    bottom: 0;
    height: 40px;
    margin: auto;
    font-size: 1.48em;
    cursor: pointer;
    color: #ccc;
    line-height: 53px;
}

#tabpanels-search-block .autocompleter{
  /*top: 100px;*/
  border-radius: 0;
  border: 1px solid #ccc;
  position: absolute;
  z-index: 250;
}

#tabpanels-search-block .autocompleter li{
  height: 45px;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  font-family: 'Exo 2', sans-serif;
  border-bottom: 1px dashed #ccc;
}

#tabpanels-search-block .autocompleter li:last-child{
  border-bottom: 0px dashed #ccc;
}

#tabpanels-search-block .autocompleter li:hover{

  background: #eee;
  color: #3797dd;
}

@media screen and (max-width: 425px){
  .openSeachForm{
    left: 0%;
    -ms-transform: translateX(0%);
    -webkit-transform: translateX(0%); 
    -moz-transform: translateX(0%);
    -o-transform: translateX(0%);
    transform: translateX(0%);
  }

  #search-form-hide{
    display: none;
  }

}


</style>
