<template>
        <div id="map" v-bind:style="{ 'width':mapWidth + 'px', 'height': mapHeight + 'px'}">
        </div>
</template>



<script>
// import mapboxgl from 'mapbox-gl'


export default {
  name: 'Map',
  data () {
    return {
      mapToken : 'pk.eyJ1IjoiY3JvbGxlciIsImEiOiJWX0ZXZF9zIn0.lIjITIfJ3v62baoHVIqtqQ',
      mapWidth:  document.documentElement.clientWidth,
      mapHeight:  document.documentElement.clientHeight - 100,
      json: 'json',

    }
  },
  mounted () {
    const map = this.mapInit(this.mapToken);
    window.addEventListener('resize', this.handleResize)
    this.registerEvents(map);


  },

  methods: {
    
    mapInit: function mapInit(token) {

      L.mapbox.accessToken = 'pk.eyJ1IjoiY3JvbGxlciIsImEiOiJWX0ZXZF9zIn0.lIjITIfJ3v62baoHVIqtqQ';
      const map = L.mapbox.map('map')
        .setView([40, -74.50], 9);

      L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8').addTo(map);
      // L.mapbox.styleLayer('mapbox://styles/croller/cjdd0efupbhxy2snt0z6a82s3').addTo(map);

      // mapboxgl.accessToken = token;

      // const map = new mapboxgl.Map({
      //   container: 'map',
      //   style: 'mapbox://styles/croller/cjdd0efupbhxy2snt0z6a82s3',
      //   center: [15.057,25.885],
      //   zoom: 1.8,
      //   doubleClickZoom: false,
      //   dragPan: true,
      //   localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
      // });

      // var nav = new mapboxgl.NavigationControl();

      // map.addControl(nav, 'top-right');

      // this.$emit('map-init', map)

      
      return map;
    },

    registerEvents (map){

      //Map Loaded
      map.on('load', () => {
        this.$emit('map-load', map);
      });

      //Map Clicked
      map.on('click', e => {
        this.$emit('map-click', map, e);
        console.log(e)
        console.log(map.queryRenderedFeatures(e.point))


        this.createLayer(map, 'test', 'polygon', false, '')
      });


    },

    handleResize (event) {
      this.mapHeight = event.currentTarget.innerHeight
      this.mapWidth = event.currentTarget.innerWidth
    },

    createLayer: function createLayer(map, idSource, geojson, clusterStat, layerBefore) {

      console.log('map start')


      var idSource = '111'
      var clusterStat = false;

      if (layerBefore != '') {
        layerBefore = 'place-city-sm'
      };


      var polygon = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "id":1
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    37.59315490722656,
                    55.76633779361904
                  ],
                  [
                    37.613067626953125,
                    55.734649503774015
                  ],
                  [
                    37.68379211425781,
                    55.74199420362587
                  ],
                  [
                    37.65769958496094,
                    55.7742558445822
                  ],
                  [
                    37.59315490722656,
                    55.76633779361904
                  ]
                ]
              ]
            }
          }
        ]
      }

      //style

      var paint = {
        "fill-color": "#ff4000",
        "fill-opacity": 0.5,
        "fill-outline-color": "rgba(255,64,0,0.2)"
      };

      //source
      
      geojson = polygon;

      map.addSource(idSource, {
        "type": "geojson",
        "data": geojson,
        "cluster": clusterStat,
        "clusterMaxZoom": 18,
        "clusterRadius": 30
      })

      //layer

      map.addLayer({
        id: idSource + "_layer",
        type: "fill",
        source: idSource,
        layout: {},
        paint: paint
      }, layerBefore);




      console.log('add')
      //hover

    },

    watch: {
    json: function (newQuestion, oldQuestion) {

      if (this.json.lenght > 0) {
        this.createLayer(map, 'test', 'polygon', false, '')
      }
      
      // $('#dp3').datepicker().on('changeDate', function (ev) {
      //   $('#date-daily').change();
      // });
    }
  },

  }
}
</script>

<style>
#map {
  width: 1000px;
  height: 1000px;
}

</style>
