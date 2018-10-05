<template>
  <div id="transferItem" class="col-12 col-sm-12 col-md-4 col-lg-4">
    <div class="shadow">
      <div id="head" class="text-center">
        <span> от {{ transfer.min_price }} </span> <span :class=iconCurr /> 
        <h5> {{ transfer.class_text }} </h5>
      </div>
      <div id="photo">
          <img class="img-fluid rounded" :src="imgTarif(transfer.class_name)" alt="tarif_class" style="height: 40px">
      </div>
      <div id="desc" class="text-center">
        <span>Цена поездки:</span>
        <h3>{{ transfer.price.toLocaleString('ru') }} <span :class=iconCurr /></h3>
        <span>Время подачи: {{ convertTime(transfer.waiting_time) }}</span>

        <!--  -->
      </div>
      <div id="transferRedirect">
        <button class="btn text-center" @click="submit" >Заказать</button>
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
    name: 'Transfer_Item',
    components: { },
    props: {
      transfer: Object,
      currency: String,
    },
    data () {
      return {
        //ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),
      }
    },
    computed: {
      iconCurr: function(){
        switch(this.currency){
          case "RUB":
            return 'fas fa-ruble-sign';
          case "EUR":
            return 'fas fa-euro-sign';
          case "USD":
            return 'fas fa-dollar-sign';
        }
      }
    },
    mounted () {
      // console.log('///////////////')
      // console.log('avia item - loaded')

    },
    methods: {
      imgTarif(class_name){
        switch (class_name) {
          case "econom":
            return "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-taxi.png";
            break;
          case "business":
            return "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberx.png"
            break;
          case "comfortplus":
            return "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberselect.png"
            break;
          case "vip":
            return "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-black.png"
            break;
          case "minivan":
            return "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-suv.png"
            break;
        }
      },

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

      submit(){

        if(this.$route.params.hasOwnProperty("transfer")){

          let rParams = this.$route.params.transfer.searchBar;
          let start_lat = rParams.transfDep_Coords.split(',')[1];
          let start_lon = rParams.transfDep_Coords.split(',')[0];
          let end_lat = rParams.transfArr_Coords.split(',')[1];
          let end_lon = rParams.transfArr_Coords.split(',')[0];
          let ref = 'triptrickru';
          let class_level = this.transfer.class_level;
          let appmetrica_tracking_id = "25395763362139037";
          window.open("https://3.redirect.appmetrica.yandex.com/route?start-lat="+ start_lat +"&start-lon="+ start_lon +"&end-lat="+ end_lat +"&end-lon="+ end_lon +"&level="+ class_level +"&ref="+ ref +"&appmetrica_tracking_id="+ appmetrica_tracking_id);
        }

      },
    }
  }

</script>

<style>

	#transferItem{
    padding: 0px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }
  #transferItem #head{
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #EDCF07;
  }
  #transferItem #head span{
    font-size: 14px;
    color: #fff;
  }
  #transferItem #head h5{
    font-weight: 700;
    color: #000;
    margin-top: 7px;
    letter-spacing: 3px;
  }
  #transferItem #photo{
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
  }
  #transferItem #desc{
    border-top: 1px dashed #EBEBEB;
    padding-top: 15px;
  }
  #transferItem #desc{
    font-size: 12px;
  }
  #transferItem #desc h3{
    font-weight: 700;
    color: #000;
    margin-top: 7px;
    margin-bottom: 17px;
    letter-spacing: 1px;
  }
  
  #transferItem #transferRedirect{
    margin-top: 7px;
    background-color: #02A9E0; 
    border-bottom-left-radius: 4.5px;
    border-bottom-right-radius: 4.5px;
  }

  #transferItem .btn {
    width: 100%;
    border: 1px solid #EDCF07;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #EDCF07;


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

  #transferItem .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #E8CB0E;
  }
  #transferItem .btn:hover{
    background-color: #E8CB0E;
  }

</style>