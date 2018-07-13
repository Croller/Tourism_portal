<template>
	<div id="aviaItem" class="row shadow">
    <div class="col-12 col-sm-8 col-md-8 col-lg-8">
      <div class="shortDesc row">
        <div class="airlineDesc col-4 border-0">
          <ul class="list-inline text-center" :style='"margin-top:" + (ticket.carriers.length > 2 ? 0 : 5 ) + "%"'>
            <li class="list-inline-item tool-tip" v-for="carrier in ticket.carriers">
              <img class="airCompLogo" :src="'http://pics.avs.io/50/20/'+ carrier+'.png'" alt="" >
              <div class="tool-tiptext tool-tip-top">
                <span class="fas fa-plane"></span> 
                <span class="text-extra-small">Авиалинии:</span>
                <div>{{ airlines[carrier].name  }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="baggageDesc col-4 border-0">
          <ul class="list-inline text-center " :style='"margin-top:" + (ticket.carriers.length > 2 ? 13 : 5 ) + "%"'>
            <li class="list-inline-item tool-tip">
              <span class="fas fa-shopping-bag"></span>
              <div class="tool-tiptext tool-tip-top">
                <span class="fas fa-shopping-bag"></span> 
                <span class="text-extra-small">Ручная кладь:</span>
                <div>{{flights_handbags}}</div>
              </div> 
            </li>
            <li class="list-inline-item tool-tip">
              <span class="fas fa-suitcase"></span> 
              <div class="tool-tiptext tool-tip-top">
                <span class="fas fa-suitcase"></span> 
                <span class="text-extra-small">Багаж:</span>
                <div>{{flights_baggage}}</div>
              </div>    
            </li>
          </ul>
        </div>
        <div class="goodsDesc col-4 border-0">
          <ul class="list-inline text-center" :style='"margin-top:" + (ticket.carriers.length > 2 ? 13 : 5 ) + "%"'>
            <li class="list-inline-item tool-tip" v-if="bad_summary('waiting_time', ticket.rating_summary)">
              <span class="far fa-clock" style="color:red;"></span>
              <div class="tool-tiptext tool-tip-top">
                <div>Длительная пересадка</div>
              </div>
            </li>
            <li class="list-inline-item tool-tip" v-if="good_summary('wifi', ticket.rating_summary)">
              <span class="fas fa-wifi" style="color:green;"></span>
              <div class="tool-tiptext tool-tip-top">
                <div>Интернет Wi-Fi</div>
              </div>
            </li>
           <!--  <li class="list-inline-item tool-tip" v-if="good_summary('wifi', ticket.rating_summary)">
              <span class="fas fa-utensils" style="color:green;"></span>
              <div class="tool-tiptext tool-tip-top">
                <div>Еда</div>
              </div>
            </li> -->
            <li class="list-inline-item tool-tip" v-if="good_summary('wifi', ticket.rating_summary)">
              <span class="fas fa-plug" style="color:green;"></span>
              <div class="tool-tiptext tool-tip-top">
                <div>Зарядка эл.устройств</div>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
      

      <div class="row" v-for="flight in flights">
        <div class="col-12 border-top-dashed">
          <div class="dataBasic row">
            <div class="col-12 text-center collapse" :class="'handl_'+ url" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="titleData row btn">
                <div class="col-12">
                  Билет # {{ flight.part }}
                </div>
              </div>
            </div>
            <div class="col-4 text-center border-0">
              <div class="timeData">
                {{flight.segment.flight[0].departure_time}}
              </div>
              <div class="dateData text-small">
                {{convertDate(flight.segment.flight[0].departure_date)}}
              </div>
              <div class="cityData text-extra-small">
                {{nameAirPorts(flight.segment.flight[0].departure)}}
              </div>
            </div>
            <div class="col-4 text-center border-0" style="padding: 0px;">
              <div class="text-extra-small">
                  <span>
                    <span class="tool-tip">
                      {{flight.segment.flight[0].departure}}
                      <div class="tool-tiptext tool-tip-top">
                        <span class="fas fa-plane"></span> 
                        <span class="text-extra-small">Аэропорт:</span>
                        <div>{{nameAirPorts(flight.segment.flight[0].departure)}}</div>
                      </div>
                    </span>
                  </span>
                  <span v-for="dest in flight.segment.flight" >
                    <span class="fas fa-long-arrow-alt-right"></span>
                    <span class="tool-tip"> 
                      {{ dest.arrival }}
                      <div class="tool-tiptext tool-tip-top">
                        <span class="fas fa-plane"></span> 
                        <span class="text-extra-small">Аэропорт:</span>
                        <div>{{nameAirPorts(dest.arrival)}}</div>
                      </div>
                    </span>
                  </span>
              </div>
              <div class="text-extra-small">
                <div v-if="flight.segment.flight.length == 1">
                  <span style="color:#000;">{{ stops(flight.segment.flight) }}</span>
                </div>
                <div v-if="flight.segment.flight.length > 1">
                  <span>{{ stops(flight.segment.flight) }}</span>
                </div>
              </div>
              <div class="text-extra-small" style="color:#000; margin-bottom:20px;">
                В пути: {{ duration(flight.segment.flight) }}
              </div>

              
            </div>
            <div class="col-4 text-center" style="border:none;">
              <div class="timeData">
                {{flight.segment.flight[flight.segment.flight.length - 1].arrival_time}}
              </div>
              <div class="dateData text-small">
                {{convertDate(flight.segment.flight[flight.segment.flight.length - 1].arrival_date)}}
              </div>
              <div class="cityData text-extra-small">
                {{nameAirPorts(flight.segment.flight[flight.segment.flight.length - 1].arrival)}}
              </div>
            </div>
          </div>
        </div>
        

        <div id="flightDesc" class="col-12 collapse" :class="'handl_'+ url" aria-labelledby="headingThree" data-parent="#accordion" v-for="flightDesc in flight.segment.flight">

          <div class="delayDesc row" v-if="flightDesc.delay > 0">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="row text-center text-extra-small">
                    <div class="col-2 justify-content-center align-self-center">
                      <span class="fas fa-exchange-alt airCompLogo"></span>
                    </div>
                    <div class="col-8">
                      <a>Пересадка</a>
                    </div>
                    <div class="col-2 justify-content-center align-self-center">
                      <span>{{ durationDesc(flightDesc.delay) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="baggDesc row">
            <div class="col-12 text-center text-extra-small">
              <div class="row">
            
                <div class="col-6">
                  <span class="fas fa-shopping-bag"></span>
                  <a>Ручная кладь: </a> <br>
                  <a>{{ flightDesc.handbags != undefined ? flightDesc.handbags.split("PC")[0] + " место до " + flightDesc.handbags.split("PC")[1] + " кг на чел." : "Нет информации"}}</a>
                </div>
                <div class="col-6">                              
                  <span class="fas fa-suitcase"></span>
                  <a> Багаж:  </a> <br>
                  <a> {{ flightDesc.baggage != undefined && flightDesc.baggage != "" ? flightDesc.baggage.split("PC")[0] + " место до " + flightDesc.baggage.split("PC")[1] + " кг на чел." : "Нет информации"}}</a>
                  
                </div>
              </div>
            </div>
          </div>

          <div class="tripDesc row">
            <div class="col-12">
              <div class="row text-center text-extra-small">
                <div class="col-2 align-self-center tool-tip">
                  <img class="airCompLogo" :src="'http://pics.avs.io/50/20/'+ flightDesc.operated_by +'.png'" alt="" >
                  <div class="tool-tiptext tool-tip-top">
                    <span class="fas fa-plane"></span> 
                    <span class="text-extra-small">Авиалинии:</span>
                    <div>{{ airlines[flightDesc.operated_by].name  }}</div>
                  </div>
                </div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6 ">
                      <div class="row">
                        <div class="col-12">
                          <span>{{ flightDesc.departure_time }}</span> 
                          <span>{{ convertDate(flightDesc.departure_date) }}</span>
                        </div>
                        <div class="col-12">
                          <span>{{ flightDesc.departure }}</span>
                          <div class="cityData text-extra-small">{{ nameAirPorts(flightDesc.departure) }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                      <div class="row">
                        <div class="col-12">
                          <span>{{ flightDesc.arrival_time }}</span> 
                          <span>{{ convertDate(flightDesc.arrival_date) }}</span>
                        </div>
                        <div class="col-12">
                          <span class="fas fa-long-arrow-alt-right"></span>
                          <span>{{ flightDesc.arrival }}</span>
                          <div class="cityData text-extra-small">{{ nameAirPorts(flightDesc.arrival) }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="aviaDesc col-12 tool-tip">
                      <span class="fas fa-info-circle"></span>
                      <a>Информация о рейсе</a>
                      <div class="tool-tiptext-info text-extra-small tool-tip-top">

                        <ul class="list-unstyled text-center ">
                          <li class="list-inline-item">Самолет модель: {{ flightDesc.aircraft }}
                          </li>
                          <li class="list-inline-item">
                            Расстояние между рядами: {{ pitch(airplaneInfo(flightDesc.trip_class, flightDesc.operating_carrier, flightDesc.number)) }}
                          </li>
                          <li class="list-inline-item">
                            Ширина сидения: 41-46см
                          </li>
                          <!-- <li class="list-inline-item" v-if="airplaneInfo(flightDesc.trip_class, flightDesc.operating_carrier, flightDesc.number).food">
                            Еда: {{ airplaneInfo(flightDesc.trip_class, flightDesc.operating_carrier, flightDesc.number).food}}
                          </li> -->

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2 justify-content-center align-self-center">
                  <span>{{ durationDesc(flightDesc.duration) }}</span>
                </div>
              </div>
              
            </div>
          </div>

          
     
        </div>
      </div>


      <div id="descShow" class="col-12 text-center collapsed" data-toggle="collapse" :data-target="'.handl_'+ url" aria-expanded="false" :aria-controls="'handl_'+ url">
        <span class="fas fa-chevron-circle-up"></span>
        <span class="fas fa-chevron-circle-down"></span>
      </div>

    </div>
    <div id="priceInfo" class="col-12 col-sm-4 col-md-4 col-lg-4">
      <div class="row">
        <div class="col-12 text-center">
          <!-- <p class="text-center text-extra-small">
            осталось 5 билетов
          </p> -->
          <div id="priceCard" :style='"margin-top:" + (ticket.segment.length > 2 ? 15 : 5 ) + "%"'>
            <span class="text-extra-small" style="color:#595959;">Цена за {{ ticket.segment.length }} {{declension(ticket.segment.length, ['билет','билета','билетов'])}}:</span>
            <div id="price">
              {{ price }}
            </div>
            <button class="btn btn-primary" @click="redirect(url)" v-if="!statTimeOut">
              Купить
            </button>
            <button class="btn btn-primary" @click="reloadTicket" v-if="statTimeOut">
              Обновить
            </button>
          </div>
          
          <a class="text-center text-extra-small" target="_blank" :href=salesInfo(ticket.terms).site> {{ salesInfo(ticket.terms).name }} </a>
        </div>
        <div class="col-12 text-center" v-if="ticket.group_param != undefined">
          <!-- <span v-for="sale in ticket.group_param">
            {{ salesInfo(sale.terms).name}}
          </span> -->
          <a class="text-center text-extra-small">
            + еще 
            <span> {{ ticket.group_param != undefined ? ticket.group_param.length - 1 : 0 }} </span>
            {{declension(ticket.segment.length, ['вариант','варианта','вариантов'])}}
            цен
          </a>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
	
  import BusEvent from './BusEvent.vue';
  import Moment from 'moment';
  import Toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';

  export default {
    name: 'Avia_Item',
    components: { },
    props: {
      ticket: Object,
      airlines: Object,
      airports: Object,
      airplane: Object,
      sales: Object,

      statTimeOut: Boolean,
    },
    data () {
      return {

      }
    },
    computed: {
      url: function(){
        var key = Object.keys(this.ticket.terms);
        return this.ticket.terms[key[0]].url;
      },
      flights: function(){
        var arrflights = [];
        for (var s = 0; s < this.ticket.segment.length; s++) {
          var flight = {
            "part": Number,
            "segment": Object,
          };
          for( var key in flight){
            switch (key) {
              case "part":
                flight[key] = parseInt(s) + 1;
                break;
              default:
                flight[key] = this.ticket[key] != undefined ? this.ticket[key][s] : "";
            }
          }
          // console.log(flight)
          arrflights[s] = flight;
        }
        return arrflights;
      },
      flights_handbags: function(){
        var key = Object.keys(this.ticket.terms);
        var handbags = this.ticket.terms[key[0]].flights_handbags;
        if(handbags != undefined && handbags[0][0].length != 0){
          for (var i = 0; i < handbags.length; i++) {
            if(handbags[i][0].length > 0 && parseInt(handbags[i][0].split("PC")[1])){
              return "до " + handbags[i][0].split("PC")[1] + " кг. на " + handbags[i][0].split("PC")[0] + " чел.";
            }
          }
        }else{
          return "Нет информации";
        }
      },
      flights_baggage: function(){
        var key = Object.keys(this.ticket.terms);
        var baggage = this.ticket.terms[key[0]].flights_baggage;
        if(baggage != undefined && baggage[0][0] != false && baggage[0][0] != "" && baggage[0][0].split("PC").length >= 2 ){
          for (var i = 0; i < baggage.length; i++) {
            if(baggage[i].length > 0 && parseInt(baggage[i][0].split("PC")[1])){
              return "до " + baggage[i][0].split("PC")[1] + " кг. на " + baggage[i][0].split("PC")[0] + " чел.";
            }
          }
        }else{
          return "Нет информации";
        }
        // add == false, pay for baggege
      },
      
      price: function(){
        var key = Object.keys(this.ticket.terms);
        var price = parseInt(this.ticket.terms[key[0]].price).toString();
        price = price.replace(/./g, function(c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
        });
        return price +" руб." ;
      },

      



      
    },
    mounted () {
      // console.log('///////////////')
      // console.log('avia item - loaded')

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
      convertDate(date){
        date = Moment(date, "YYYY-MM-DD").locale('ru').format('L');
        return date
      },
      stops(flight){
        if(flight.length == 1){
          return "Прямой рейс!";
        }else{
          return "Пересадки: " + (flight.length - 1) + " шт.";
        }
        return ""
      },
      salesInfo(terms){
        var key = Object.keys(terms)[0];
        var sale_info = this.sales[key]
        return { 
          name: sale_info.label != undefined ? "Авиакасса: " + sale_info.label : "", 
          site: sale_info.site != undefined ? sale_info.site : ""
        };
      },
      duration(arr){
        var dur = 0
        for (var i = 0; i < arr.length; i++) {
          dur = dur + arr[i].delay + arr[i].duration
        }
        var x = parseInt(dur/60);
        var y = parseInt((dur/60 - x)*60);
        return x + "ч " + y + "мин";
      },
      durationDesc(minutes){
        var x = parseInt(minutes/60);
        var y = parseInt((minutes/60 - x)*60);
        return x + "ч" + y + "м";
      },
      nameAirPorts(iata){
        return this.airports[iata].name + " " + this.airports[iata].city + ", " + this.airports[iata].country;
      },
      airplaneInfo(tripclass, carries, number){
        var code = tripclass + carries + number;
        return this.airplane[code];
      },
      pitch(airplane){
        var obj = airplane;
        if(obj != undefined && obj.seat != undefined){
          if(obj.seat.pitch != undefined ){
            return obj['pitch'] = (obj.seat.pitch * 2,51).toFixed(0) + "cм";
          }else{
            return "-";
          }
        }else{
          return "-";
        }
      },
      good_summary(key, rating_summary){
        if('good' in rating_summary){
          var check = rating_summary.good.indexOf(key);
          if (check != -1) {
            return true;
          }else{
            return false;
          }
        }
      },
      bad_summary(key, rating_summary){
        if('bad' in rating_summary){
          var check = rating_summary.bad.indexOf(key);
          if (check != -1) {
            return true;
          }else{
            return false;
          }
        }
        
      },

      //alert
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
      
      // reload ticket
      reloadTicket(){
        BusEvent.$emit('reloadTicket');
      },
      // redirect at seller company @buy
      redirect(url){
        // alert
        this.alertMsg('Готовьтесь :)','Мы перенаправляем вас, на сайт для покупки билета', 'success');
        // get search id from router
        let uuid = this.$route.params.uuid;
        let obj = {
          'url': url,
          'uuid': uuid,
        };
        this.$http.post('http://127.0.0.1:8081/aviaGetURLRedirect', obj).then(function (response) {
          // Success
          console.log('///////////////')
          console.log('redirect')
          if(response.status == 200){
            if(response.data != null){
              let obj = JSON.parse(response.data);
              setTimeout(() => {
                window.open(obj.url, '_blank');
              }, 3000)
              
            }else{
              this.alertMsg('Ошибка','Что-то не так на сервере, простите!', 'error');
            }      
            
          }else{
            this.alertMsg('Ошибка','Сервер не отвечает, попробуйте позже.', 'error');
          }
        }).catch(err => {
          this.alertMsg('Ошибка','Сервер не отвечает, попробуйте позже.' , 'error');
        });
      }
    }
  }

</script>

<style>

	#aviaItem{
    padding: 10px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }

  #aviaItem .col-lg-4{
    border-left: 1px dashed #EBEBEB;
  }


  #aviaItem .btn {
    width: 100%;
    border: 1px solid #FF9F1C;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #FF9F1C;

    /*font-family: 'Lato', sans-serif;*/
    /*line-height: 30px;
    color: white;
    font-weight: 700;*/

    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 16px;
    line-height: 33px;
    color: white;
    letter-spacing: -0.5px;
    font-weight: 700;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
-moz-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
box-shadow: 0px 0px 15px 0px rgba(189,189,189,1)
  }

  #aviaItem .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }
  #aviaItem .btn:hover{
    background-color: #F09A24
  }

  /*#aviaItem .shortDesc .baggageDesc li{
    padding-top:5%;
  }
  #aviaItem .shortDesc .goodsDesc li{
    padding-top:5%;
  }*/


  
  #aviaItem .titleData{
    margin-top: 10px; 
    margin-bottom: 10px; 
  }

  #aviaItem .dataBasic{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #aviaItem .dataBasic .btn{
    cursor: default;
  }
  #aviaItem .dataBasic .btn:hover{
    background-color: #FF9F1C;
  }

  
  .border-top-dashed{
    border-top: 0.5px dashed #EBEBEB;
  }

  #aviaItem .timeData{
    font-weight:700; 
    font-size:28px; 
    color: #000;
  }
  #aviaItem .dateData{
    font-weight:700; 
    color: #595959;
    margin-bottom: 8px;
  }
  #aviaItem .cityData{
    line-height: 1.5;
    color: #727272;
  }

  #aviaItem #priceCard{
    margin-top: 15%;
  }
  #aviaItem #price{
    font-weight:700; 
    font-size:24px; 
    color: #000;
    margin-bottom: 15px;
  }

  #aviaItem .baggDesc > .col-12{
    margin-top:10px;
    padding-top: 10px;
    padding-bottom: 10px;

    border-top: 0.5px dashed #EBEBEB;
    border-bottom: 0.5px dashed #EBEBEB;

    line-height:2;
  }
  /*#aviaItem .baggDesc > .col-12 > .row > .col-6{
    border-right: 0.5px dashed #EBEBEB;
  }*/

  #aviaItem .tripDesc > .col-12{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #aviaItem .tripDesc .fas.fa-long-arrow-alt-right{
    position: absolute; 
    top: 15px;
    left: -5px;
  }
  #aviaItem .tripDesc .col-8{
    border-right: 0.5px dashed #EBEBEB;
    border-left: 0.5px dashed #EBEBEB;
  }
  #aviaItem .tripDesc .col-2{
    padding-right: 0.5px;
    padding-left: 0.5px;
  }
  #aviaItem .aviaDesc{
    margin-top: 10px;
  }

  #aviaItem .delayDesc > .col-12{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #aviaItem .delayDesc .col-8{
    border-right: 0.5px dashed #EBEBEB;
    border-left: 0.5px dashed #EBEBEB;
  }

  #aviaItem #descShow{
    color: #EE9935;
    cursor: pointer;
  }
  #aviaItem #descShow{
    cursor: pointer;
  }
  #aviaItem #descShow:hover .fas.fa-chevron-circle-up, #aviaItem #descShow:hover .fas.fa-chevron-circle-down{
    transition: font-size 0.1s;
    font-size: 20px;
  }
  #aviaItem #descShow[aria-expanded=true] .fa-chevron-circle-down {
    display: none;
  }
  #aviaItem #descShow[aria-expanded=false] .fa-chevron-circle-up {
    display: none;
  }


  /*common*/

  .shadow{
    border-radius: 3px;
    background-color: white;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  #aviaItem .airCompLogo{
    /*height: 20px;*/
  }


  /* Tool-tip */
  .tool-tip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .tool-tip .tool-tiptext {
    display: none;
    min-width: 160px;
    max-width: 260px;
    opacity: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    line-height: 1.4;
    position: absolute;
    z-index: 1;
    bottom: 115%;
    left: 50%;
    margin-left: -80px;
  }
  .tool-tip .tool-tiptext-info {
    display: none;
    min-width: 160px;
    max-width: 300px;
    opacity: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    line-height: 1.5;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -150px;
  }
  .tool-tip-top::after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(0, 0, 0, 0);
    border-top-color: #000000;
    border-width: 6px;
    margin-left: -6px;
  }
  .tool-tip:hover .tool-tiptext, .tool-tip:hover .tool-tiptext-info{
      display: block;
      opacity: 0.8;
      /*bottom: 125%;*/
      transition: opacity 1.45s bottom 0.45s;
  }

  @media (max-width: 575px){

    #aviaItem .col-lg-4{
      border: none;
    }

    #aviaItem #priceCard{
      margin-top: 10px;
    }

  }

</style>