<template>
  
  <div id='index'> 

    
    <!-- <Main_Carousel></Main_Carousel> -->

    <Map :params="mapParams" v-if="!detectmob()" ></Map>

    <div id="searchBlock" class="container mx-auto" v-bind:style="{ 'margin-top': topSearchBar , 'position': positionSearchBar} ">


      <!-- <ViewProperty></ViewProperty> -->
      
      <div class="row">
        <div id="searchCategory" class="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 justify-content-center align-items-center mx-auto">
          <ul class="nav shadow scrollmenu">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#avia" role="tab"  aria-selected="true">Авиабилеты</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#hotel" role="tab"  aria-selected="true">Отели</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#transfer" role="tab"  aria-selected="true">Трансфер</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#excursion" role="tab"  aria-selected="true">Экскурсии</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#wiki" role="tab"  aria-selected="true">Wiki</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#chats" role="tab"  aria-selected="true">ЧатБот</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="tab-content col-12">
          <div id="avia" class="tab-pane fade show active" role="tabpanel">
            <Avia_SearchBar ></Avia_SearchBar>
          </div>
          <div id="hotel" class="tab-pane fade show" role="tabpanel">
            <Hotel_SearchBar ></Hotel_SearchBar>
          </div>
          <div id="transfer" class="tab-pane fade show" role="tabpanel">
            3
          </div>
          <div id="excursion" class="tab-pane fade show" role="tabpanel">
            <Excursion_SearchBar ></Excursion_SearchBar>
          </div>
          <div id="wiki" class="tab-pane fade show" role="tabpanel">
            5
          </div>
          <div id="chats" class="tab-pane fade show" role="tabpanel">
            6
          </div>
        </div>
      </div>

    </div>

    <!-- <Main_Body></Main_Body> -->

    <Footer v-show="false"></Footer>




    <!-- <input id="uploadFile" type="file" name="browse" @change="getVT($event)">
    <img src="data:image/png;base64," /> -->
    <!-- <NavBar></NavBar> -->
    <!-- <Map  v-bind:geojson="geojson" ></Map> -->
    <!-- <MapSearchFilter v-bind:citiesTrP="citiesTrP" v-bind:userLocation="userLocation"></MapSearchFilter> -->
  </div>
  
</template>

<script>

  import ViewProperty from '../components/ViewProperty.vue'
  import Map from '../components/Map.vue'
  import Avia_SearchBar from '../components/Avia_SearchBar.vue'  
  import Hotel_SearchBar from '../components/Hotel_SearchBar.vue'
  import Excursion_SearchBar from '../components/Excursion_SearchBar.vue'

  import Footer from '../components/Footer.vue'

  export default {

    name: 'Index',
    components: { 
      'ViewProperty': ViewProperty,
      'Map': Map,
      'Avia_SearchBar': Avia_SearchBar,
      'Hotel_SearchBar': Hotel_SearchBar,
      'Excursion_SearchBar': Excursion_SearchBar,
      'Footer': Footer
    },
    data () {
      return {
        locale: "ru",
        geojson : {},
        citiesTrP : {},
        countriesTrP : {},
        userLocation: {},
        

        positionSearchBar : "relative", // set position searchBar
        // topSearchBar: - window.innerHeight  / 2  - 80,
        mapParams: {},
      }
    },
    computed:{
      topSearchBar: function(){
        if(this.detectmob()){
          return 45 + "%";
        }else{
          this.positionSearchBar = "relative";
          return (- window.innerHeight  / 2  - 80) + "px";
        }
      },

    },
    mounted() {
      if(document.location.href.indexOf("8080") == -1){
        this.$metrika.hit("Index");
      }

      this.searchResize();
      window.addEventListener('resize', this.searchResize)
      $('body').css('overflow-y','scroll');

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

      detectmob() { 
        if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ){
          return true;
        }
        else {
          return false;
        }
      },

      searchResize() { 
        // let width = window.innerWidth;
        // let height = window.innerHeight;
        // if(width <= 576){
        //   this.topSearchBar = -130;
        // }else if(width >= 577 && width <= 766){
        //   this.topSearchBar = -100;
        // }else if(width >= 767 && width <= 991){
        //   this.topSearchBar = -55;
        // }else if(width >= 992 && width <= 1200){
        //   this.topSearchBar = -45;
        // }else{
        //   this.topSearchBar = -35;
        // }
        
        this.mapParams.width = window.innerWidth + 'px';
        this.mapParams.height = window.innerHeight  + 'px';
      },

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


    },

    watch: {},

  }

</script>

<style>

  #index #searchBlock #mapBlock{
    height: 400px; 
    padding-top:3px; 
    padding-bottom:3px; 
  }

  #index #search{
    position: relative;
    /*margin-top: -25%;*/
  }

  #index #searchBlock .nav{
    /*margin-top: 25px;*/
    font-size: 12px;
    font-family: 'Comfortaa', sans-serif;
    background-color: #FAFAFA;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    flex-wrap: nowrap;
    font-weight: 400;
  }

  #index #searchBlock .nav .active{
    background-color: #FF9F1C;
    border-radius: 3px;
    color: white;
  }
  #index #searchBlock .nav li{
    border-right: 1.2px dashed #e5e6e7;
  }
  #index #searchBlock .nav li:last-child{
    border-right: 0px dashed #e5e6e7;
  }
  #index #searchBlock .nav li:hover{
    background-color: white;
  }
  #index #searchCategory a {
    text-decoration: none;
    background-color: transparent;
    color: #888;
  }
  #searchBlock #searchCategory .nav a[href$=avia].active{
    background-color: #FF9F1C;
  }
  #searchBlock #searchCategory .nav a[href$=hotel].active{
    background-color: #55B533;
  }
  #searchBlock #searchCategory .nav a[href$=transfer].active{
    background-color: #E3C500;
  }  
  #searchBlock #searchCategory .nav a[href$=excursion].active{
    background-color: #02A9E0;
  }
  #searchBlock #searchCategory .nav a[href$=wiki].active{
    background-color: #E675B1;
  }
  #searchBlock #searchCategory .nav a[href$=chats].active{
    background-color: #F25555;
  }
  #index #searchCategory {
    /*margin-bottom: 20px;*/
  }
  #index #searchCategory .scrollmenu {
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }
  #index #searchCategory .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  #map {
   position: relative;
   z-index: 0;
  }
  #map > .map-wrapper {
    position: relative;
    z-index: 5;
  }
  #map:before {
    content: '';
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    z-index: 10;
    pointer-events: none;

    -webkit-box-shadow: inset 0px -20px 19px -2px rgba(245,245,245,1);
    -moz-box-shadow: inset 0px -20px 19px -2px rgba(245,245,245,1);
    box-shadow: inset 0px -20px 19px -2px rgba(245,245,245,1);
  }

  

  .shadow{
    border-radius: 3px;
    background-color: white;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  
</style>