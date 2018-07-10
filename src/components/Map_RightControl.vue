<template>
  <div id="mapRightControl">
    <div id="mapZoom" class="shadow">
      <ul class="list-unstyled">
        <li>
          <img id="zoomIn" src="../assets/img/map/002-plus-symbol.png" alt="zoomIn">
        </li>
        <li>
          <img id="zoomOut" src="../assets/img/map/001-minus-symbol.png" alt="zoomOut">
        </li>
      </ul>
    </div>
    <div id="geolocation" class="shadow">
      <ul class="list-unstyled">
        <li class="tooltips">
          <img id="geolocation" src="../assets/img/map/003-target.png" alt="geolocation">
          <span>Геолокация</span>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>

  import BusEvent from './BusEvent.vue'

  export default {
    name: 'Map_RightControl',
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

        switch (el.id) {
          case "zoomIn":
            BusEvent.$emit('zoomIn');
            break;
          case "zoomOut":
            BusEvent.$emit('zoomOut');
            break;
          case "geolocation":
            BusEvent.$emit('geolocation');
            break;
        }
      });

    },
    methods: {},
    watch: {},
  }
</script>

<style>
  #mapRightControl{
    position: absolute;
    float: right;
    top: 20%;
    right: 40px;
    z-index: 1000;
    font-family: 'Comfortaa', cursive, sans-serif;
  }
  #mapRightControl ul{
    margin-bottom: 0px;
    border-radius: 3px 3px 3px 3px;
  }
  #mapRightControl ul li{
    cursor: pointer;
    text-align:center;
    padding: 7px 0px 7px 0px;
    border-bottom: 1px dashed #e5e6e7;
  }
  #mapRightControl ul li:last-child{
    border-bottom: 0px dashed #e5e6e7;
    border-radius: 0px 0px 3px 3px;
  }
  #mapRightControl ul li:hover{
    background: #e5e6e7;
    transition: opacity 2s;
    border-radius: 3px 3px 3px 3px;
    transition: background 1s;
  }
  #mapRightControl ul li img{
    width:55%;
  }

  /* Tool-tip */
  #mapRightControl li.tooltips {
    position: relative;
  }
  #mapRightControl li.tooltips span {
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
  #mapRightControl li.tooltips span:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -8px;
    width: 0; height: 0;
    border-left: 8px solid #000000;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  #mapRightControl li:hover.tooltips span {
    visibility: visible;
    opacity: 0.8;
    right: 100%;
    top: 50%;
    transition: opacity 1.45s bottom 0.45s opacity 2s;
    margin-top: -15px;
    margin-right: 15px;
    z-index: 999;
  }
</style>

