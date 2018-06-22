<template>
  
  <div> 

    <Main_Carousel></Main_Carousel>

    <Avia_SearchBar v-bind:style="{ position: positionSearchBar, top: topSearchBar+'%' }"></Avia_SearchBar>

    <!-- <Main_Body></Main_Body> -->

    <!-- <Footer></Footer> -->




    <!-- <input id="uploadFile" type="file" name="browse" @change="getVT($event)">
    <img src="data:image/png;base64," /> -->
    <!-- <NavBar></NavBar> -->
    <!-- <Map  v-bind:geojson="geojson" ></Map> -->
    <!-- <MapSearchFilter v-bind:citiesTrP="citiesTrP" v-bind:userLocation="userLocation"></MapSearchFilter> -->
  </div>
  
</template>

<script>

import Main_Carousel from '../components/Main_Carousel.vue'
import Avia_SearchBar from '../components/Avia_SearchBar.vue'
import Main_Body from '../components/Main_Body.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Index',
  components: { 
    'Main_Carousel': Main_Carousel,
    'Avia_SearchBar': Avia_SearchBar,
    'Main_Body': Main_Body,
    'Footer': Footer
  },
  data () {
    return {
      locale: "ru",
      geojson : {},
      citiesTrP : {},
      countriesTrP : {},
      userLocation: {},


      positionSearchBar : "absolute", // set position searchBar
      //topSearchBar : 60,
    }
  },
  computed:{
    topSearchBar: function(){
      if(window.innerWidth <= 767){
        return 35;
      }else if(window.innerWidth >= 767 && window.innerWidth <= 991){
        return 55;
      }else{
        return 60;
      }
    }
  },
  mounted() {

    // update positionSearchBar by width windwos
    // if(window.innerWidth <= 767){
    //   this.positionSearchBar = 'static';
    // }




    //this.loadCitiesTrP();
    //this.loadCountriesTrP();
    // this.getIP();
    // this.getVT();

    // this.$router.push({ path:'/search', params: { messageId: 'bar' } })
  },
  methods: {

    loadCitiesTrP() {
      this.$http.get('http://127.0.0.1:8081/getCities')
      .then(response => {
        
        if(response.status == 200){

          // console.log(response.data)

          // edit object Cities for SearchFilter
          var citiesArr = [];
          var geojsonArr = [];
          var data = response.data;
          // for (var i = 0; i < data.length; i++) {
          for (var i = 0; i < data.length; i++) {

            data[i].name_translations[this.locale]
            citiesArr.push({
              "code": data[i].code, 
              "name": data[i].name_translations[this.locale]
            })

            if("coordinates" in data[i] && data[i].coordinates != null){
              if(data[i].coordinates.lat != 0 && data[i].coordinates.lon != 0){
                var feature = turf.point(
                    [
                      data[i].coordinates.lon,
                      data[i].coordinates.lat
                    ]
                  );
                feature.properties = {
                  "id": i,
                  "code": data[i].code, 
                  "name": data[i].name_translations[this.locale]
                };

                geojsonArr.push(feature);
              }
            }
          }
          this.citiesTrP = citiesArr;
          this.geojson = turf.featureCollection(geojsonArr);
          console.log("load " + this.citiesTrP.length + " cities from travelpayouts");
          return response.data;
        }else{
          console.log("Server error: "+ response.status);
        }

      });
    },

    loadCountriesTrP() {
      this.$http.get('http://127.0.0.1:8081/getCountries')
      .then(response => {
        
        if(response.status == 200){
          this.countriesTrP = response.data;
          console.log("load " + this.countriesTrP.length + " countries from travelpayouts");
        }else{
          console.log("Server error: "+ response.status);
        }

      });
    },

    getIP() {
      this.$http.get('http://127.0.0.1:8081/getIP')
      .then(response => {
        
        if(response.status == 200){
          this.userLocation = response.data;
        }else{
          console.log("Server error: "+ response.status);
        }
      });
    },

    getRandomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },







    // parse binary test
    getVT(event){

      var vm = this;

      var file = event.target.files[0];
      if (!file) {
          $('#loadDiv').css('display', 'none')
          return;
      } else {
          // var name = event.target.files[0].name.replace('.json', '');
          console.log(event.target.files[0].name)
          var reader = new FileReader();
          
          reader.readAsBinaryString(file);

          reader.onload = function(e) {
            var binary = e.target.result;
            console.log(binary)
            

            var arr = new Buffer(binary, "binary")
            console.log(arr)
            var hexTag = '';
            var hexStr = '';
            for (var i = 0; i < arr.length - 1; i++) {
              var hex = arr[i].toString(16);
              hexTag += ' 0x' + hex;
              hexStr += hex;

            };



            console.log(hexTag);
            console.log(hexStr);

            var base64String = new Buffer(hexStr, 'hex').toString('base64')
            console.log(base64String)

            var len = arr.byteLength;
            var bin;
            for (var i = 0; i < len; i++) {
              bin += String.fromCharCode( arr[ i ] );
            }
            console.log( btoa(bin) )

            var blob = new Blob(arr, { type: "image/png" });
            var url = URL.createObjectURL(blob);
            var img = new Image();
            img.src = url;
            document.body.appendChild(img);
            // console.log(vm.hexToBase64(binary))
            // var hex = arr[0].toString(16);
            // console.log(hex) 

          }


   
      }
    },

    hexToBase64(str) {
      return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    },


  }

}

</script>

<style>

  #aviaSearchBar{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    top: 40%;
  }


  .shadow{
    border-radius: 3px;
    background-color: white;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
  
  
</style>