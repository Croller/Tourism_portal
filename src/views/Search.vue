<template>

  <div id="search">
    <!-- <div id="mapBlock"> -->
      <Map :geojson="geojson" :params="mapParams"></Map>
    <!-- </div> -->

    <div id="searchBlock" class="container">
      <div class="row">
        <div id="searchCategory" class="justify-content-center align-items-center mx-auto">
          <ul class="nav shadow scrollmenu">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#avia" role="tab"  aria-selected="true">Авиабилеты</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href=".hotel" role="tab"  aria-selected="true">Отели</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#transfer" role="tab"  aria-selected="true">Трансфер</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#tourism" role="tab"  aria-selected="true">Экскурсии</a>
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
          <div id="" class=" hotel tab-pane fade show" role="tabpanel">
            2
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

  import Map from '../components/Map.vue'
  import Avia from '../components/Avia.vue'
  import Footer from '../components/Footer.vue'

  export default {
    name: 'Search',
    components: { 
      'Map': Map,
      'Avia': Avia,
      'Footer': Footer,
    },
    data () {
      return {
        geojson: {},
        mapParams: {
          width: document.documentElement.clientWidth + 'px',
          height: document.documentElement.clientHeight  + 'px',
        }
      }
    },
    created: function() {
      
    },
    mounted () {
      console.log('///////////////')
      console.log('search - loaded')

      
      $('body').css('overflow-y','scroll');
    },
    methods: {      

    }
  }

</script>

<style>
  


  #search #mapBlock{
    height: 400px; 
    /*margin-top: 85px; */
    padding-top:3px; 
    padding-bottom:3px; 
    /*border-top: 1px solid #FF9F1C; */
    /*border-bottom: 1px solid #FF9F1C;*/
  }


  #search #searchBlock{
    position: relative;
    margin-top: -210px;
  }






  #search .nav{
    margin-top: 25px;
    font-size: 12px;
    font-family: 'Comfortaa', sans-serif;
    background-color: #FAFAFA;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  #search .nav .active{
    background-color: #FF9F1C;
    border-radius: 3px;
    color: white;
    font-weight: 700;
  }

  #search .nav li:hover{
    background-color: white;
  }





  /*---------------------------------*/


  #searchCategory .scrollmenu {
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
    margin-bottom: 8px;
  }
  #searchCategory .scrollmenu::-webkit-scrollbar {
    display: none;
  }

  /*---------------------------------*/







  




  /*common*/

  .shadow{
    border-radius: 3px;
    background-color: white;
    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .flex-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90px;
    height: 28px;
  }


  @media (max-width: 600px){
    #search #searchBlock{
      position: relative;
      margin-top: -450px;
    }
  }
</style>
