<template>

  <div id="search">
    <LightBoxGallery></LightBoxGallery>
    <!-- <div id="mapBlock"> -->
      <Map :geojson="geojson" :params="mapParams"></Map>
    <!-- </div> -->

    <div id="searchBlock" class="container" v-bind:style="{ 'margin-top': topSearchBar+'%' }">
      <div class="row">
        <div id="searchCategory" class="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6  justify-content-center align-items-center mx-auto">
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
              <a class="nav-link" data-toggle="tab" href="#tourism" role="tab"  aria-selected="true">Экскурсии</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#tourism" role="tab"  aria-selected="true">Wiki</a>
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
            <Avia></Avia>
          </div>
          <div id="hotel" class="tab-pane fade show" role="tabpanel">
            <Hotel></Hotel>
          </div>
          <div id="transfer" class="tab-pane fade show" role="tabpanel">
            3
          </div>
          <div id="tourism" class="tab-pane fade show" role="tabpanel">
            4
          </div>
          <div id="chats" class="tab-pane fade show" role="tabpanel">
            5
          </div>
        </div>
      </div>


    </div>

    
    <Footer></Footer>
  </div>

</template>

<script>

  import LightBoxGallery from '../components/LightBoxGallery.vue'
  import Map from '../components/Map.vue'
  import Avia from '../components/Avia.vue'
  import Hotel from '../components/Hotel.vue'
  import Footer from '../components/Footer.vue'

  export default {
    name: 'Search',
    components: { 
      'LightBoxGallery': LightBoxGallery,
      'Map': Map,
      'Avia': Avia,
      'Hotel': Hotel,
      'Footer': Footer,
    },
    data () {
      return {
        geojson: {},
        mapParams: {},

        topSearchBar: -25,
      }
    },
    created: function() {
      
    },
    computed: {
    },
    mounted () {
      console.log('///////////////')
      console.log('search - loaded')

      this.searchResize();
      window.addEventListener('resize', this.searchResize)
      $('body').css('overflow-y','scroll');
    },
    methods: {      
      searchResize() { 
        let width = window.innerWidth;
        if(width <= 576){
          this.topSearchBar = -130;
        }else if(width >= 577 && width <= 766){
          this.topSearchBar = -100;
        }else if(width >= 767 && width <= 991){
          this.topSearchBar = -55;
        }else if(width >= 992 && width <= 1200){
          this.topSearchBar = -28;
        }else{
          this.topSearchBar = -20;
        }

        this.mapParams.width = window.innerWidth - 10 + 'px';
        this.mapParams.height = window.innerHeight  + 'px';
      },
    }
  }

</script>

<style>
  


  #search #mapBlock{
    height: 400px; 
    padding-top:3px; 
    padding-bottom:3px; 
  }

  #search #searchBlock{
    position: relative;
    /*margin-top: -25%;*/
  }

  #search #searchCategory .nav{
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

  #search #searchCategory .nav .active{
    background-color: #FF9F1C;
    border-radius: 3px;
    color: white;
    transition: background-color 0.5s;
  }
  
  #search .nav li{
    border-right: 1.2px dashed #e5e6e7;
  }
  #search .nav li:last-child{
    border-right: 0px dashed #e5e6e7;
  }
  #search #searchCategory .nav li:hover{
    background-color: white;
  }

  #search #searchCategory a {
    text-decoration: none;
    background-color: transparent;
    color: #888;
  }
  #search #searchCategory .nav a[href$=avia].active{
    background-color: #FF9F1C;
  }
  #search #searchCategory .nav a[href$=hotel].active{
    background-color: #55B533;
  }
  #search #searchCategory .scrollmenu {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 

  }
  #search #searchCategory .scrollmenu::-webkit-scrollbar {
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







  




  /*common*/

  .shadow{
    border-radius: 3px;
    background-color: white;
    -webkit-box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  


  @media (max-width: 600px){
    #search #searchBlock{
      position: relative;
      margin-top: -450px;
    }
  }
</style>
