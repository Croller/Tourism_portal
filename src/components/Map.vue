<template>

  <div id="map" v-bind:style="{ 'width': mapWidth, 'height': mapHeight }" >
    <Map_InfoCard v-show="false" ref="Map_InfoCard"></Map_InfoCard>
  </div>

  
</template>



<script>

  import BusEvent from './BusEvent.vue'

  import Map_InfoCard from './Map_InfoCard.vue'

  export default {
    name: 'Map',
    components: {
      'Map_InfoCard': Map_InfoCard,
    },
    props:{
      geojson: {
        type: Object,
      },
      params : Object,
    },
    data () {
      return {
        // MapBox GL
        mapToken: 'pk.eyJ1IjoiY3JvbGxlciIsImEiOiJWX0ZXZF9zIn0.lIjITIfJ3v62baoHVIqtqQ',
        map: {},
        // mapWidth:  document.documentElement.clientWidth + 'px',
        // mapHeight:  document.documentElement.clientHeight + 'px',

        // Open Weather Map
        openWeatherMapToken: 'e4922d5a32daed7adb3fde25dfb2e8c0',
        openWeatherMapTokenCurr: 'b1b15e88fa797225412429c1c50c122a1',
        // city
        
        // airport

        // hotel

        layerDB: [], // 0 - layerName, 1 - group, 2 - data, 3 - paint,
        layerClicked: "",
        popUpCard: {},
      }
    },
    computed: {
      mapWidth: function(){
        if(this.params.hasOwnProperty('width')){
          return this.params.width;
        }else{
          return document.documentElement.clientWidth + 'px';
        };
      },
      mapHeight: function(){
        if(this.params.hasOwnProperty('height')){
          return this.params.height;
        }else{
          return document.documentElement.clientHeight + 'px';
        };
      },
    },
    created: function() {
      
    },
    mounted () {
      let self = this;

      //map init
      this.map = this.mapInit();

      //event map - resize
      

      //event map - custom fucn for action
      this.registerEvents(this.map);
      this.$emit('map-init', map);

      //add layer if reload components
      // this.createLayer('cities', this.geojson, "", "")

      

      //get geojson
      BusEvent.$on('zoomTo', function(data) {
        self.zoomTo(data);
      })
      //get geojson
      BusEvent.$on('closePopUp', function() {
        this.popUpCard.remove();
      })

      window.addEventListener('resize', this.handleResize)
    },

    methods: {
      
      mapInit: function mapInit() {

        // L.mapbox.accessToken = this.mapToken;
        // const map = L.mapbox.map('map')
        //   .setView([40, -74.50], 9);
        // L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8').addTo(map);

        mapboxgl.accessToken = this.mapToken;

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/croller/cji75uvtw12de2sr0cwwfce45',
          center: [15.057,25.885],
          zoom: 1.8,
          // minZoom: 1.8,
          doubleClickZoom: false,
          dragPan: true,
          dragRotate: false,
          localIdeographFontFamily: "'Roboto', 'Noto Sans', 'Noto Sans CJK SC', sans-serif",
          continuousWorld: false,
          noWrap: true
        });

        var nav = new mapboxgl.NavigationControl();

        map.addControl(nav, 'top-right');

        var geom = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [
                      -163.828125,
                      -56.94497418085159
                    ],
                    [
                      189.84375,
                      -56.94497418085159
                    ],
                    [
                      189.84375,
                      83.7539108491127
                    ],
                    [
                      -163.828125,
                      83.7539108491127
                    ],
                    [
                      -163.828125,
                      -56.94497418085159
                    ]
                  ]
                ]
              }
            }
          ]
        }

        var coordinates = geom.features[0].geometry.coordinates[0];
        var bounds = coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
            padding: 20
        });

        return map;

      },

      registerEvents (map){

        //Map Loaded
        map.on('load', () => {
          this.$emit('map-load', map);
        });

        map.on('mouseover', e => {
          this.$emit('map-mouseover', map, e);
        });

        map.on('mouseenter', e => {
          this.$emit('map-mouseenter', map, e);
        });

        map.on('mousemove', e => {
          this.$emit('map-mousemove', map, e);
          // console.log(map.queryRenderedFeatures(e.point))
          var objs = map.queryRenderedFeatures(e.point);
          if(objs.length > 0){
            if(objs[0].layer.id.indexOf("_layer") > 0){
              map.getCanvas().style.cursor = "pointer";
            }else{
              map.getCanvas().style.cursor = "";
            }
          }
        });


        map.on('mouseleave', e => {
          this.$emit('map-mouseleave', map, e);

          var objs = map.queryRenderedFeatures(e.point);
          if(objs[0].layer.id.indexOf("_layer") > 0){
            map.on('mouseleave', objs[0].layer.id, function () {
              map.getCanvas().style.cursor = "";
            });
          }
        });

        map.on('click', e => {
          this.$emit('map-click', map, e);
          let popUpHTML = this.$refs.Map_InfoCard.$el.innerHTML;
          let objs = map.queryRenderedFeatures(e.point);
          // set center on click 
          this.zoomTo(turf.point([e.lngLat.lng, e.lngLat.lat]), map.getZoom(), 0.7);
          // check popUp, and remove if exist and add
          if(this.popUpCard.hasOwnProperty("option")){
            this.popUpCard.remove();
          }
          // if click at custom object
          if(objs.length > 0){
            if(objs[0].layer.id.indexOf("_layer") > 0){
              this.layerClicked = objs[0].layer.id
              map.setFilter(objs[0].layer.id.replace("_layer","_hover"), 
                ["==", "id", objs[0].properties.id]
              );
            }else{
              if(this.layerClicked.length > 0){
                map.setFilter(this.layerClicked.replace("_layer","_hover"), 
                  ["==", "id", ""]
                );
                this.layerClicked = "";
              }
            }
          }
          // config popUp
          this.popUpCard = new mapboxgl
            .Popup({
              anchor: 'bottom',
              offset: {
                'bottom': [0, -10]
              }
            })
            .setLngLat(e.lngLat)
            .setHTML(popUpHTML)
            .addTo(map);

          // console.log(this.$refs.Map_InfoCard.$el)
          //fade effect
          // let el = document.getElementsByClassName("mapboxgl-popup");
          // el[0].style.opacity = 0;
          console.log(objs)
        });


      },

      handleResize (event) {
        // this.mapHeight = event.currentTarget.innerHeight - $('.navbar').height();
        this.mapWidth = event.currentTarget.clientWidth;
        this.mapHeight = event.currentTarget.clientHeight - ( this.mapWidth < 600 ? 300 : 250 );
        this.map.resize();
      },

      createLayer: function (layerName, geojson, clusterStat, layerBefore) {

        // simple mapbox
        //this.map.featureLayer.setGeoJSON(geojson);

        // mapbox gl

        var paint_border = {};
        var paint_hover = {};
        var clusterStat = false;

        if (layerBefore != '') {
          layerBefore = 'place-city-sm'
        };

        //paint

        var paint = {
          "circle-color": "#00AEE8",
          "circle-opacity": 1,
          "circle-radius": 5,
          "circle-stroke-width": 1,
          "circle-stroke-opacity": 1,
          "circle-stroke-color": "#fff",
        };

        var paint_hover = {
          "circle-color": "#db4b1c",
          "circle-opacity": 1,
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-opacity": 1,
          "circle-stroke-color": "#fff",
        };

        //source

        this.map.addSource(layerName, {
          "type": "geojson",
          "data": geojson,
          "cluster": clusterStat,
          "clusterMaxZoom": 18,
          "clusterRadius": 30
        });

        //layer

        this.map.addLayer({
          id: layerName + "_layer",
          type: "circle",
          source: layerName,
          layout: {},
          paint: paint
        }, layerBefore);

        this.map.addLayer({
          "id": layerName+"_hover",
          "type": "circle",
          "source": layerName,
          "layout": {},
          "paint": paint_hover,
          "filter": ["==", "", ""]
        });


        console.log('add ' + layerName);
        
        // zoom to data
        this.zoomTo(geojson);

      },

      loadWeatherTile: function(layerName){
        // weathrer tile

        // temp_new - Temperature
        // wind_new - Wind speed
        // pressure_new - Sea level pressure
        // precipitation_new - Precipitation
        // clouds_new - Clouds

        var layerWeater = ['temp_new', 'wind_new', 'pressure_new', 'precipitation_new', 'clouds_new']
        if(layerName.length == 0){
          layerName = 'temp_new';
        }

        if(this.map.getSource(layerName) == undefined && this.map.getLayer(layerName + '_layer') == undefined){
          this.map.addSource(layerName,{
            type: 'raster',
            tiles: ['http://tile.openweathermap.org/map/' + layerName + '/{z}/{x}/{y}.png?appid='+ this.openWeatherMapToken],
            tileSize: 256
          });
          this.map.addLayer({
            'id': layerName + '_layer',
            'type': 'raster',
            'source': layerName,
            'layout': {
              'visibility': 'visible'
            }
          }, 'place-city-sm');
        }else{
          for (var i = 0; i < layerWeater.length; i++) {
            if (layerName == layerWeater[i]) {
              this.map.setLayoutProperty(layerName + '_layer', 'visibility', 'visible');
            }else{
              this.map.setLayoutProperty(layerName + '_layer', 'visibility', 'none');
            };
          };
        }
        console.log('add ' + layerName);
      },

      zoomTo: function(data, zoom = 10, speed = 1.2){
        let coords = null;
        // if point
        if(typeof(data) == "object"){
          if(!data.hasOwnProperty('features') && data.geometry.type == "Point"){
            coords = data.geometry.coordinates;
          }
        }
        

        if(coords != null){
          this.map.flyTo({
            center: coords, 
            zoom: zoom,
            speed: speed,
          });
        }else{
          console.log('error: wrong coordinates')
        }
        // var bbox = [[-79, 43], [-73, 45]];
        // this.map.fitBounds(bbox);
      }

    },

    watch: {

      geojson: function (val, oldVal) {
        this.createLayer('cities', val, "", "")
      },


    },
  }
</script>

<style>

  #map {
    width: 1000px;
    height: 1000px;
  }

  #map .mapboxgl-ctrl-logo{
    display: none;
  }
  #map .mapboxgl-ctrl.mapboxgl-ctrl-attrib{
    display: none;
  }
  #map .mapboxgl-ctrl-top-right{
    top: 15%;
  }
  #map .mapboxgl-popup{
    opacity: 1;
    transition: opacity 2s;
  }
  #map .mapboxgl-popup-content{
    padding: 0px;
    border-radius: 3px 10px 3px 3px;
    /*padding-top: 15px;*/
  }
  #map .mapboxgl-popup-close-button{
    position: absolute;
    z-index: 100;
    display: none;
  }

  #mapInfoCard #infoCard {
    font-family: 'Comfortaa', cursive, sans-serif;
    width: 15rem; 
  }
  #mapInfoCard .fa-times-circle {
    position: absolute; 
    right:0px; 
    color:#F26326; 
    background-color:white;
  }

</style>

