<template>
	
	<div id="filterPanel" class="col-12 shadow">

    <div id="infoFiltr">
      <div class="headFiltr text-center" style="">
        <a>Поездка</a>
      </div>
      <ul class="list-unstyled text-center">
        <li class="list-inline-item">
          <div class="infoDesc">
            <!-- <span class="far fa-clock"/>  --><span> ~ {{ convertTime(info.time) }}</span>
          </div>
        </li>
        <li class="list-inline-item">
          <div class="infoDesc">
            <!-- <span class="fas fa-road"/>  --><span> ~ {{ convertDist( info.distance ).toLocaleString('ru') }}км </span>
          </div>
        </li>
      </ul>
    </div>
                  
	  <div class="searchFiltrs text-small">
	    <div class="headFiltr" data-toggle="collapse" data-target="#class" aria-expanded="true" aria-controls="class">
	      <span class="fas fa-caret-down"></span>
	      <span class="fas fa-caret-right"></span>
	      <a>Тариф</a>
	    </div>
	    <div id="class" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.class.length != 0">
	      <ul class="list-group list-unstyled">
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="class" :class="'far ' + (userFiltr.class.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.class">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.class" style="display:none">
            &nbsp&nbsp{{ getTarif(item).name }}
          </li>
	      </ul>
	    </div>
	  </div>
    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#price" aria-expanded="true" aria-controls="price">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Цена</a>
      </div>
      <div id="price" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.price.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-credit-card"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="price_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="price_Min">от {{ parseInt(propertiesFiltr.price[0]).toLocaleString('ru') }}</span> <span :class="iconCurr" style="font-size:12px; color: #8C8C8C"></span>
            </div>
            <div class="text-extra-small float-right">
              <span id="price_Max">до {{ parseInt(propertiesFiltr.price[1]).toLocaleString('ru') }}</span> <span :class="iconCurr" style="font-size:12px; color: #8C8C8C"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#min_price" aria-expanded="true" aria-controls="min_price">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Мин. цена</a>
      </div>
      <div id="min_price" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.min_price.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-credit-card"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="min_price_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="min_price_Min">от {{ parseInt(propertiesFiltr.min_price[0]).toLocaleString('ru') }}</span> <span :class="iconCurr" style="font-size:12px; color: #8C8C8C"></span>
            </div>
            <div class="text-extra-small float-right">
              <span id="min_price_Max">до {{ parseInt(propertiesFiltr.min_price[1]).toLocaleString('ru') }}</span> <span :class="iconCurr" style="font-size:12px; color: #8C8C8C"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#waiting_time" aria-expanded="true" aria-controls="waiting_time">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Время подачи</a>
      </div>
      <div id="waiting_time" class="descFiltr collapse show" aria-labelledby="headingThree" data-parent="#accordion" v-if="propertiesFiltr.waiting_time.length != 0">
        <ul class="list-group list-unstyled">
          <li class="list-item">
           
            <div class="titleRange text-center text-extra-small">
              <span class="float-left flex-child">Мин.</span>
              <span class="text-center far fa-clock"></span>
              <span class="float-right flex-child">Макс.</span>
            </div>
            <div id="waiting_time_Range" style="margin-top:3px"></div>
            <div class="text-extra-small float-left">
              <span id="waiting_time_Min">от {{ convertTime(propertiesFiltr.waiting_time[0]) }}</span>
            </div>
            <div class="text-extra-small float-right">
              <span id="waiting_time_Max">до {{ convertTime(propertiesFiltr.waiting_time[1] )}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
	  <div class="searchFiltrs">
      <div class="headFiltr" data-toggle="collapse" data-target="#agency" aria-expanded="false" aria-controls="agency">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Агентства</a>
      </div>
      <div id="agency" class="descFiltr collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <ul class="list-group list-unstyled" >
          <li class="list-item" v-on:click="changeAllSpan($event)">
            <span id="agency_group" :class="'far ' + (userFiltr.agency.length == 0 ? 'fa-check-circle' : 'fa-circle')"></span>&nbsp&nbspВсе
          </li>
          <li class="list-item" v-on:click="changeSpan($event)" v-for="item in propertiesFiltr.agency">
            <span class="far fa-check-circle"></span> 
            <input type="checkbox" :value=item v-model="userFiltr.agency" style="display:none">
            &nbsp&nbsp{{item.name}}
          </li>
        </ul>
      </div>
	  </div> 	 
	</div> 
</template>

<script>

  import Moment from 'moment';

	
  export default {
    name: 'Transfer_Filter',
    components: { },
    props:{
      propertiesFiltr: Object,
      info: Object,
      tarif: Array,
    },
    data () {
      return {
        userFiltr: {
          class: [],
          price: [],
          min_price: [],
          waiting_time: [],
          agency: [],
        },    
        // test:'',
      }
    },

    created: function() {

    },
    mounted () {
      console.log('///////////////')
      console.log('transfer filter - loaded')

      setTimeout(() => {
        this.sliderPrice(this.propertiesFiltr.price);
        this.sliderMinPrice(this.propertiesFiltr.min_price);
        this.sliderWaitingTime(this.propertiesFiltr.waiting_time);
      }, 100);
      
    },
    computed: {
      iconCurr: function(){
        switch(this.info.currency){
          case "RUB":
            return 'fas fa-ruble-sign';
          case "EUR":
            return 'fas fa-euro-sign';
          case "USD":
            return 'fas fa-dollar-sign';
        }
      },
    },
    methods: {
      convertTime(time){
        if(time != undefined && time > 0){
          let hour = Moment.unix(time, "YYYY-MM-DD").utc().format('HH');
          if(hour == '00'){
            return time = Moment.unix(time, "YYYY-MM-DD").utc().format('mm[м]');
          }
          return time = Moment.unix(time, "YYYY-MM-DD").utc().format('HH[ч] mm[м]');
        }else{
          return "00ч00м";
        }
      },
      convertDate(date){
        return date = Moment.unix(date, "YYYY-MM-DD").utc().format('DD.MM.YYYY');
      },
      convertDist(meter){
        if(meter != undefined){
          return (meter / 1000 ).toFixed(1);
        }
        return "00"
      },
      convertDuration(dur){
        return dur = Math.floor(dur/60) + "ч " + (dur%60) + "м";
      },
      getTarif(id){
        return this.tarif.filter( t => t.id == id)[0];
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


      sliderMinPrice(min_price){
        let self = this;
        $("#min_price_Range").slider({
          range: true,
          min: parseInt(min_price[0]) ,
          max:  parseInt(min_price[1]) ,
          values: [ parseInt(min_price[0]) , parseInt(min_price[1])  ],
          slide: function( event, ui ) {
            $("#min_price_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#min_price_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.min_price[0] = ui.values[ 0 ];
            self.userFiltr.min_price[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },
      sliderWaitingTime(waiting_time){
        let self = this;
        $("#waiting_time_Range").slider({
          range: true,
          min: parseInt(waiting_time[0]) ,
          max:  parseInt(waiting_time[1]) ,
          values: [ parseInt(waiting_time[0]) , parseInt(waiting_time[1])  ],
          slide: function( event, ui ) {
            $("#waiting_time_Min").html("от " + ui.values[ 0 ].toLocaleString('ru'));
            $("#waiting_time_Max").html("до " + ui.values[ 1 ].toLocaleString('ru'));
          },
          stop: function ( event, ui ) {
            self.userFiltr.waiting_time[0] = ui.values[ 0 ];
            self.userFiltr.waiting_time[1] = ui.values[ 1 ];
            self.$emit('getExtraFiltr', self.userFiltr);
          }
        });
      },

    },

    watch:{
      propertiesFiltr: function (val, oldVal) {
        if(val != undefined){
          setTimeout(() => {
            this.sliderPrice(val.price);
            this.sliderMinPrice(val.min_price);
            this.sliderWaitingTime(val.waiting_time);
          }, 10);
        }
      },
      'userFiltr.class': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
      'userFiltr.agency': function (val, oldVal){
        this.$emit('getExtraFiltr', this.userFiltr)
      },
    },
  }

</script>

<style>
	
	#transfer #filterPanel{
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
    padding-left: 0px;
    padding-right: 0px;
  }

  #transfer #filterPanel #airlines .list-item, #transfer #filterPanel #sales .list-item{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 175px;
    padding-left: 1px;
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

  #infoFiltr{
    border-bottom: 1px dashed #EBEBEB;
  }

  .infoDesc{
    font-family: 'Comfortaa', sans-serif;
    font-weight: 700;
    color: #5E5E5E;
    font-size: 22px;
    color: #000;
  }
 

  .descFiltr .fa-circle{
    color: #EDCF07;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .descFiltr .fa-check-circle{
    color: #EDCF07;
    font-size:14px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .flex-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
    height: 28px;
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
    border: 1.5px solid #EDCF07;
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