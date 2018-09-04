<template>
   <div id="infoBlock">
      <div class="shadow">
        
      
        <div id="infoPanel" class="col-12">

        </div>
        
        <div id="progressSearch" class="progress">
          <div id="aviaProgress" class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :style="'width: ' + progressPerc.avia +'%'" aria-valuenow="25" aria-valuemin="3" aria-valuemax="100" v-if="progressPerc.avia > 0"></div>

          <div id="hotelProgress" class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :style="'width: ' + progressPerc.hotels +'%'" aria-valuenow="25" aria-valuemin="3" aria-valuemax="100" v-if="progressPerc.hotels > 0"></div>
        </div>



      </div>
    </div>
</template>

<script>
  export default {
    name: 'MultiResultsBar',
    components: {},
    props:{
      progressPerc: {
        avia: Number,
        hotels: Number,
      },
    },
    data() {
      return {}
    },
    computed: {},
    created: function() {},
    mounted() {},
    methods: {},
    watch: {
      'progressPerc.avia': function(nVal, oVal){
        let aviaBar = document.getElementById("aviaProgress");
        if(nVal > 0 && nVal < 100 && aviaBar.hasOwnProperty('classList') ){
          aviaBar.classList.add('progress-bar-animated');
        }else{
          aviaBar.classList.remove('progress-bar-animated');
        }
      },
      'progressPerc.hotels': function(nVal, oVal){
        let hotelsBar = document.getElementById("hotelProgress");
        if(nVal > 0 && nVal < 100){
          hotelsBar.classList.add('progress-bar-animated');
        }else{
          hotelsBar.classList.remove('progress-bar-animated');
        }
      },
    },
  }
</script>

<style>
  #infoBlock{
    margin-top: 20px;
  }
  #infoBlock #infoPanel{
    width: 100%;
    height: 60px;
  }
  #infoBlock .progress{
    height: 0.5rem;
    background-color: white;
    border-radius: 0px 0px 3px 3px;
  }
  #infoBlock .progress #aviaProgress{
    background-color: #ffbb5f !important;
  }
  #infoBlock .progress #hotelProgress{
    background-color: #A5DB93 !important;
  }


</style>

