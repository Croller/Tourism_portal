<template>
	
	<div id="filterPanel" class="col-12 shadow">

                  
	  <div class="searchFiltrs text-small">
	    <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
	      <span class="fas fa-caret-down"></span>
	      <span class="fas fa-caret-right"></span>
	      <a>Пересадки</a>
	    </div>
	    <div id="max_stops_group" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.max_stops.length != 0">
	      <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="max_stops_group" :class="'far ' + (userFiltr.max_stops.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.max_stops">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.max_stops" style="display:none">
            &nbsp&nbsp{{item != "0" ? item : ""}}{{ declension(item, ['пересадка','пересадки','пересадок'])}}
          </li>
	      </ul>
	    </div>
	  </div>
	  <div class="searchFiltrs">
	    <div class="headFiltr" data-toggle="collapse" data-target="#segments_time" aria-expanded="true" aria-controls="segments_time">
	      <span class="fas fa-caret-down"></span>
	      <span class="fas fa-caret-right"></span>
	      <a>Время рейса</a>
	    </div>
	    <div id="segments_time" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.segments_time.length != 0">
	      <ul class="list-group list-unstyled">
	        <li class="list-item" v-for="(time, index) in propertiesFiltr.segments_time" style="margin-bottom:5px;">
	          <div class="titleRange text-center text-extra-small">
	            <span class="float-left flex-child">{{ propertiesFiltr.segments[index].origin }}</span>
	            <span class="text-center fas fa-plane"></span>
	            <span class="float-right flex-child">{{ propertiesFiltr.segments[index].destination }}</span>
	          </div>
	          <div :id="'segments_time_Range_'+index" style="margin-bottom:5px;margin-top:3px"></div>
	          <div class="text-extra-small float-left" style="line-height:1.5;">
              <span :id="'segments_time_Min_'+index">c {{ convertTime(time[0]) }}</span><br>
	            <span :id="'segments_date_Min_'+index">&nbsp{{ convertDate(time[0]) }}</span>
	          </div>
	          <div class="text-extra-small float-right text-right" style="line-height:1.5;">
              <span :id="'segments_time_Max_'+index">до {{ convertTime(time[1]) }}</span><br>
	            <span :id="'segments_date_Max_'+index">&nbsp&nbsp&nbsp{{ convertDate(time[1]) }}</span>
	          </div>
	        </li>
	      </ul>
	    </div>
	  </div>
	  <div class="searchFiltrs">
	    <div class="headFiltr" data-toggle="collapse" data-target="#priceFiltr" aria-expanded="true" aria-controls="priceFiltr">
	      <span class="fas fa-caret-down"></span>
	      <span class="fas fa-caret-right"></span>
	      <a>Цена</a>
	    </div>
	    <div id="priceFiltr" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.price.length != 0">
	      <ul class="list-group list-unstyled">
	        <li class="list-item">
	         
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-credit-card"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
	          <div id="price_Range" style="margin-top:3px"></div>
	          <div class="text-extra-small float-left">
	            <span id="price_Min">от {{ parseInt(propertiesFiltr.price[0]).toLocaleString('ru') }}</span> <span class="fas fa-ruble-sign" style="font-size:12px; color: #8C8C8C"></span>
	          </div>
	          <div class="text-extra-small float-right">
	            <span id="price_Max">до {{ parseInt(propertiesFiltr.price[1]).toLocaleString('ru') }}</span> <span class="fas fa-ruble-sign" style="font-size:12px; color: #8C8C8C"></span>
	          </div>
	        </li>
	      </ul>
	    </div>
	  </div>
	  <div class="searchFiltrs">
	    <div class="headFiltr" data-toggle="collapse" data-target="#segment_durations" aria-expanded="true" aria-controls="segment_durations">
	      <span class="fas fa-caret-down"></span>
	      <span class="fas fa-caret-right"></span>
	      <a>Время в пути</a>
	    </div>
      <div id="segment_durations" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.segment_durations.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item" v-for="(time, index) in propertiesFiltr.segment_durations" style="margin-bottom:5px;">
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">{{ propertiesFiltr.segments[index].origin }}</span>
              <span class="text-center fas fa-plane"></span>
              <span class="float-right flex-child">{{ propertiesFiltr.segments[index].destination }}</span>
            </div>
            <div :id="'segment_durations_Range_'+index" style="margin-bottom:5px;margin-top:3px"></div>
            <div class="text-extra-small float-left" style="line-height:1.5;">
              <span :id="'segment_durations_Min_'+index">c {{ convertDuration(time[0]) }}</span>
            </div>
            <div class="text-extra-small float-right text-right" style="line-height:1.5;">
              <span :id="'segment_durations_Max_'+index">до {{ convertDuration(time[1]) }}</span>
            </div>
          </li>
        </ul>
      </div>
	  </div>
	  <div class="searchFiltrs">
	    <div class="headFiltr" data-toggle="collapse" data-target="#stop_duration" aria-expanded="true" aria-controls="stop_duration">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Время пересадки</a>
	    </div>
      <div id="stop_duration" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.stop_duration.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-clock"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="stop_duration_Range" style="margin-bottom:5px;margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="stop_duration_Min">от {{ convertDuration(propertiesFiltr.stop_duration[0]) }}</span>
            </div>
            <div class="text-extra-small float-right">
              <span id="stop_duration_Max">до {{ convertDuration(propertiesFiltr.stop_duration[1]) }}</span>
            </div>
          </li>
        </ul>
      </div>
	  </div>
	  <div class="searchFiltrs">
	    <div class="headFiltr" data-toggle="collapse" data-target="#airports" aria-expanded="false" aria-controls="airports">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Аэропорты</a>
	    </div>
      <div id="airports" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="airports_group" :class="'far ' + (userFiltr.stops_airports.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.stops_airports">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.stops_airports" style="display:none">
            &nbsp&nbsp{{item.name}}{{item.city != item.name ? ', ' + item.city : ''}}&nbsp&nbsp<span class="badge badge-success" style="line-height: 1.2" v-if="item.average_rate > 0">{{item.average_rate}}</span> 
          </li>
        </ul>
      </div>
	  </div>
	  <div class="searchFiltrs">
      <div class="headFiltr" data-toggle="collapse" data-target="#airlines" aria-expanded="false" aria-controls="airlines">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Авиакомпании</a>
      </div>
      <div id="airlines" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="airlines_group" :class="'far ' + (userFiltr.airlines.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.airlines">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.airlines" style="display:none">
            &nbsp&nbsp{{item.name}}&nbsp&nbsp<span class="badge badge-success" style="line-height: 1.2" v-if="item.lowcost">Low Cost</span>
          </li>
        </ul>
      </div>
	  </div>
	  <div class="searchFiltrs">
      <div class="headFiltr" data-toggle="collapse" data-target="#sales" aria-expanded="false" aria-controls="sales">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Агентства</a>
      </div>
      <div id="sales" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="sales_group" :class="'far ' + (userFiltr.sales.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.sales">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.sales" style="display:none">
            &nbsp&nbsp{{item.label}}&nbsp&nbsp<span class="badge badge-success" style="line-height: 1.2" v-if="item.average_rate > 0">{{item.average_rate}}</span>
          </li>
        </ul>
      </div>
	  </div>
	  <!-- 
    Багаж
    Способы оплаты
    Goods
     -->

    
	 


	</div>  

</template>

<script>

  import Moment from 'moment';

	
  export default {
    name: 'Avia_Filter',
    components: { },
    props:{
      propertiesFiltr: Object,
    },
    data () {
      return {
        userFiltr: {
          max_stops: [],
          total_duration: [],
          price: [],
          segment_durations: [[],[]],
          segments_time: [[],[]],
          segments: [],
          stop_duration: [],
          sales: [],
          airlines: [],
          stops_airports: [],
        },    
        // test:'',
      }
    },

    created: function() {

    },
    mounted () {
      console.log('///////////////')
      console.log('avia filter - loaded')

      setTimeout(() => {
        this.sliderSegmentTime(this.propertiesFiltr.segments_time);
        this.sliderPrice(this.propertiesFiltr.price);
        this.sliderSegmentDurations(this.propertiesFiltr.segment_durations);
        this.sliderStopDuration(this.propertiesFiltr.stop_duration);
      }, 100);
      
    },
    computed: {

    },
    methods: {
      convertTime(time){
        return time = Moment.unix(time, "YYYY-MM-DD").utc().format('HH[ч] mm[м]');
      },
      convertDate(date){
        return date = Moment.unix(date, "YYYY-MM-DD").utc().format('DD.MM.YYYY');
      },
      convertDuration(dur){
        return dur = Math.floor(dur/60) + "ч " + (dur%60) + "м";
      },
      //склонение окончаний
      declension(num, expressions) {
        var result;
        var count = num % 100;
        if(num == 0){
          result = 'Без ' + expressions['2'];
        }else if (count >= 5 && count <= 20) {
            result = ' ' + expressions['2'];
        } else {
            count = count % 10;
            if (count == 1) {
                result =' ' + expressions['0'];
            } else if (count >= 2 && count <= 4) {
                result = ' ' + expressions['1'];
            } else {
                result = ' ' + expressions['2'];
            }
        }
        return result;
      },

      changeAllSpan(event){
        var el = event.target
        // check group filtr
        this.changeSpan(el);
        // check child filtr
        var list_el = [];
        var el_Class = '';
        if(el.children[0] != undefined){
          var list_el = event.target.parentNode.children;
          var el_Class = el.children[0].classList[1];
        }else{
          var list_el = event.target.parentNode.parentNode.children;
          var el_Class = el.parentNode.children[0].classList[1];
        }

        for (var i = 1; i < list_el.length; i++) {
          var list_el_Class = list_el[i].children[0].classList[1];
          if(el_Class != list_el_Class){
            this.changeSpan(list_el[i]);
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

      sliderSegmentTime(time){
        let self = this;
        for (var i = 0; i < time.length; i++) {
          $("#segments_time_Range_"+i).slider({
            range: true,
            min: parseInt(time[i][0]) ,
            max:  parseInt(time[i][1]) ,
            // step: 30,
            values: [ parseInt(time[i][0]) , parseInt(time[i][1])  ],
            slide: function( event, ui ) {
              var i = event.target.id.split('_').reverse()[0];
              var id = event.target.id;
              $("#segments_time_Min_" + i ).html("с " + self.convertTime(ui.values[ 0 ]));
              $("#segments_time_Max_" + i).html("до " + self.convertTime(ui.values[ 1 ]));
              $("#segments_date_Min_" + i ).html(self.convertDate(ui.values[ 0 ]));
              $("#segments_date_Max_" + i).html(self.convertDate(ui.values[ 1 ]));
            },
            stop: function ( event, ui ) {
              var i = event.target.id.split('_').reverse()[0];
              var id = event.target.id;
              self.userFiltr.segments_time[i][0] = ui.values[ 0 ];
              self.userFiltr.segments_time[i][1] = ui.values[ 1 ];
              self.$emit('getExtraFiltr', self.userFiltr);
            }
          });
        }
      },

      sliderPrice(price){
        let self = this;
        $("#price_Range").slider({
          range: true,
          min: parseInt(price[0]) ,
          max:  parseInt(price[1]) ,
          values: [ parseInt(price[0]) , parseInt(price[1])  ],
          slide: function( event, ui ) {
            $("#price_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#price_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.price[0] = ui.values[ 0 ];
            self.userFiltr.price[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },

      sliderSegmentDurations(time){
        let self = this;
        for (var i = 0; i < time.length; i++) {
          $("#segment_durations_Range_"+i).slider({
            range: true,
            min: parseInt(time[i][0]) ,
            max:  parseInt(time[i][1]) ,
            // step: 30,
            values: [ parseInt(time[i][0]) , parseInt(time[i][1])  ],
            slide: function( event, ui ) {
              var i = event.target.id.split('_').reverse()[0];
              var id = event.target.id;
              $("#segment_durations_Min_" + i ).html("с " + self.convertDuration(ui.values[ 0 ]));
              $("#segment_durations_Max_" + i).html("до "  + self.convertDuration(ui.values[ 1 ]));
            },
            stop: function ( event, ui ) {
              var i = event.target.id.split('_').reverse()[0];
              var id = event.target.id;
              self.userFiltr.segment_durations[i][0] = ui.values[ 0 ];
              self.userFiltr.segment_durations[i][1] = ui.values[ 1 ];
              self.$emit('getExtraFiltr', self.userFiltr);
            }
          });
        }
      },

      sliderStopDuration(time){
        let self = this;
        $("#stop_duration_Range").slider({
          range: true,
          min: parseInt(time[0]) ,
          max:  parseInt(time[1]) ,
          values: [ parseInt(time[0]) , parseInt(time[1])  ],
          slide: function( event, ui ) {
            $("#stop_duration_Min").html("от " + self.convertDuration(ui.values[ 0 ]));
            $("#stop_duration_Max").html("до " + self.convertDuration(ui.values[ 1 ]));
          },
          stop: function ( event, ui ) {
            self.userFiltr.stop_duration[0] = ui.values[ 0 ];
            self.userFiltr.stop_duration[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },

    },

    watch:{
      propertiesFiltr: function (val, oldVal) {
        if(val != undefined){
          setTimeout(() => {
            this.sliderSegmentTime(val.segments_time);
            this.sliderPrice(val.price);
            this.sliderSegmentDurations(val.segment_durations);
            this.sliderStopDuration(val.stop_duration);
          }, 10);
        }
      },
      'userFiltr.max_stops': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.stops_airports': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.airlines': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.sales': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
    },
  }

</script>

<style>
	
	#avia #filterPanel{
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
    padding-left: 0px;
    padding-right: 0px;
  }


  .headFiltr{
    font-family: 'Comfortaa', sans-serif;
    color: #000;
    font-size: 13px;
    padding: 10px;
    padding-left: 15px;
    line-height: 1.2;
    cursor: pointer;
    font-weight: 700;
    min-width: 170px;
  }

  .headFiltr:hover{
    background-color: #FAFAFA
  }

  .headFiltr a{
    margin-left: 5px;
  }

  div.headFiltr[aria-expanded=true] a {
    margin-left: 1.5px;
  }

  div.headFiltr[aria-expanded=false] a {
    margin-left: 5px;
  }

  div.headFiltr[aria-expanded=true] .fa-caret-right {
    display: none;
  }

  div.headFiltr[aria-expanded=false] .fa-caret-down {
    display: none;
  }

 

  .headFiltr span{
    color: #ccc;
  }

  .descFiltr{
    font-family: 'Comfortaa', sans-serif;
    color: #5E5E5E;
    font-size: 12px;
    padding-left: 25px;
    padding-right: 25px;
    /*padding: 10px 25px;*/
    background-color: #FAFAFA;
  }
  .descFiltr ul{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .descFiltr li{
    cursor: pointer;
    line-height: 2;
  }
  .descFiltr ul li .fa-check-circle:hover, .descFiltr ul li .fa-circle:hover{
    color: #FF6200;
  }
 

  .descFiltr .fa-circle{
    color: #EE9935;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .descFiltr .fa-check-circle{
    color: #EE9935;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .descFiltr .titleRange{
    max-height: 28px;
  }
  .descFiltr .timeRange{
    margin-top: 10px;
  }
  .descFiltr .ui-slider{
  }
  .descFiltr .ui-slider-handle{
    background-color: white;
    border: 1.5px solid #EE9935;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .descFiltr .ui-slider-handle:active{
    background-color: #FF9F1C;
  }
  .descFiltr .ui-slider-handle:focus{
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }
  .descFiltr .ui-slider-range{
    background-color: white;
  }
  .descFiltr .ui-slider{
    background-color: #e9e9e9;
  }

</style>