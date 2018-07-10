<template>
  <div id="mapLeftControl">
    <!-- <div id="layer" class="shadow">
      <ul class="list-unstyled">
        <li class="tooltips active">
          <img id="city" src="../assets/img/map/skyline.png" alt="temperature">
          <span>Города</span>
        </li>
      </ul>
    </div> -->
    <div id="weather" class="shadow">
      <ul class="list-unstyled">
        <li class="tooltips">
          <img id="weather_city" src="../assets/img/map/skyline.png" alt="temperature">
          <span>Города</span>
        </li>
        <li class="tooltips">
          <img id="tile_temp" src="../assets/img/map/009-fahrenheit.png" alt="temperature">
          <span>Температура</span>
        </li>
        <li class="tooltips">
          <img id="tile_pressure" if src="../assets/img/map/010-rain-1.png" alt="rain">
          <span>Дождь</span>
        </li>
        <li class="tooltips">
          <img id="tile_wind" src="../assets/img/map/005-air.png" alt="wind">
          <span>Ветер</span>
        </li>
        <li class="tooltips">
          <img id="tile_clouds" src="../assets/img/map/011-cloudy.png" alt="clouds">
          <span>Облака</span>
        </li>
         <li class="tooltips">
          <img id="tile_precipitation" src="../assets/img/map/006-speed.png" alt="precipitation">
          <span>Давление</span>
        </li>
      </ul>
    </div>
  </div>
    
</template>

<script>

  import BusEvent from './BusEvent.vue'

  export default {
    name: 'Map_LeftControl',
    components: {},
    props:{},
    data() {
      return {}
    },
    computed: {},
    created: function() {},
    mounted() {

      document.addEventListener('click', function(e) {
        let el = e.target;
        // let li = el.parentNode.parentNode.children;

        if(el.tagName == 'LI' && el.classList.contains('tooltips')){
          el = el.children[0];
        }
        if(el.id.indexOf('weather_') != -1 || el.id.indexOf('tile_') != -1){
          if(el.parentNode.classList.contains('active')){
            el.parentNode.classList.remove('active');
          }else{
            el.parentNode.classList.add('active');
          }
        }

        //weather cities
        if(el.id.indexOf('weather_') != -1){
          BusEvent.$emit('weather_cities');
        }
        //tile
        if(el.id.indexOf('tile_') != -1){
          let layerName = el.id.split('_')[1] + '_new';
          BusEvent.$emit('weather_tile', layerName);
        }

      });
    },
    methods: {},
    watch: {},
  }
</script>

<style>
  #mapLeftControl{
    position: absolute;
    float: left;
    top: 20%;
    left: 40px;
    z-index: 1000;
    font-family: 'Comfortaa', cursive, sans-serif;
  }
  #mapLeftControl ul{
    margin-bottom: 0px;
    border-radius: 3px 3px 3px 3px;
  }
  #mapLeftControl ul li{
    cursor: pointer;
    text-align:center;
    padding: 7px 1px 7px 1px;
    border-bottom: 1.2px dashed #e5e6e7;
  }
  #mapLeftControl ul li:last-child{
    border-bottom: 0px dashed #e5e6e7;
  }
  #mapLeftControl ul li:hover{
    background-color: #E6E6E6;
    transition: opacity 2s;
    border-radius: 3px 3px 3px 3px;
    transition: background 1s;
  }
  #mapLeftControl ul li img{
    width:65%;
  }

  #mapLeftControl .active{
    border-radius: 3px 3px 3px 3px;
    background-color: #FF9F1C;
    transition: background 0.5s;
  }

  #mapLeftControl li.tooltips {
    position: relative;
  }
  #mapLeftControl li.tooltips span {
    position: absolute;
    width:140px;
    color: #FFFFFF;
    background: #000000;
    height: 30px;
    line-height: 30px;
    text-align: center;
    visibility: hidden;
    border-radius: 6px;
  }
  #mapLeftControl li.tooltips span:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -8px;
    width: 0; height: 0;
    border-right: 8px solid #000000;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  #mapLeftControl li:hover.tooltips span {
    visibility: visible;
    opacity: 0.8;
    left: 100%;
    top: 50%;
    margin-top: -15px;
    margin-left: 15px;
    z-index: 999;
  }
</style>

