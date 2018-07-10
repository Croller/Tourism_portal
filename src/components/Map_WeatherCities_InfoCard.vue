<template>
  <div id="mapInfoCard">

    <div class="" style="width: 15rem; font-family: 'Comfortaa', cursive, sans-serif; border-radius: 16px 16px 3px 3px;">
      <div class="text-center">
        <span class="far fa-compass rounded-circle float-left" style="font-size: 19px; color:#888;"></span>
        <span class="" style="font-size: 11px;  font-weight: 700;"> X: {{data.coordinates != undefined ? data.coordinates.split(',')[0] : ''}} Y: {{data.coordinates  != undefined ? data.coordinates.split(',')[1]  : ''}}</span>
        <span id="iconClosePopUp" class="far fa-times-circle rounded-circle float-right" style="font-size: 19px; color:#F26326; cursor:pointer;"></span>
      </div>
      
      <div class="text-center" style="font-size: 15px; font-weight: 400; padding-top: 7px;">
        <a>:</a>
      </div>
      <!-- <img class="card-img-top" src="https://dummyimage.com/274x220" alt="Card image cap"> -->
      <div class="card-body">
        
        <div>
          <a class="card-title" style="font-size: 19px; font-weight: 300">Card title</a>
        </div>
        
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

        {{data.coordinates}}

        
      </div>
      <div class="btn-group btn-block" style="font-size:14px; border-top: 1.2px dashed #e5e6e7;">
        <button type="button" class="btn bg-white btn-sm btn-block" style="-webkit-box-shadow: none;">Отсюда</button>
        <button type="button" class="btn bg-white btn-sm btn-block" style="margin-top: 0px; border-left: 1.2px dashed #e5e6e7; -webkit-box-shadow: none;">Сюда</button>
      </div>
    </div>
    
  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue'

  export default {
    name: 'Map_InfoCard',
    components: {},
    props:{
      data: Object,
    },
    data () {
      return {}
    },
    computed: {},
    created: function() {},
    mounted() {

      document.addEventListener('click', function(e) {
        let el = e.target;
        // check click close popup
        if(el.id == 'iconClosePopUp'){
          BusEvent.$emit('closePopUp');
        }
      });
    },
    methods: {

      getNearest(obj){
        this.$http.post('http://127.0.0.1:8081/getAviaTicketsTest', obj).then(function (response) {
            // Success
            console.log('///////////////')
            console.log('get ticket - loaded')

            let data = response.data;
            if(data != null){
              
              if(this.ticketsNoSort.length == 1) this.ticketsNoSort = [];
                Object.assign(this.airlines, data.airlines);
                Object.assign(this.airports, data.airports);
                Object.assign(this.airplane, data.airplane);
                Object.assign(this.sales, data.sales);
                for (var i = 0; i < data.ticketsNoSort.length; i++) {
                  this.ticketsNoSort.push(data.ticketsNoSort[i]);
                }
                this.segments = data.segments;

                if(data.ticketsNoSort.length > 1){
                  this.setPropertyFilter();
                  this.mainFiltr();
                }

            }

        });
      },
    },
    watch: {}
  }
</script>

<style>
  #mapInfoCard .fa-times-circle{
    position: absolute;
    right: 10px;
  }

  /* ----------------------- Style Info Card ----------------------- */

  #map #mapInfoCard .btn:hover{
    background-color: red;
  }
  /*#mapInfoCard #mapInfoCard {
    font-family: 'Comfortaa', cursive, sans-serif;
    width: 15rem; 
  }
  #mapInfoCard .fa-times-circle {
    position: absolute; 
    right:0px; 
    color:#F26326; 
    background-color:white;
  }*/


</style>

