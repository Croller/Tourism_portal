<template>
  
  <div id="loadBlock">
    <div class="sk-spinner sk-spinner-double-bounce">
      <div class="sk-double-bounce1 shadow"></div>
      <div class="sk-double-bounce2 shadow"></div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Loader',
  components: { 
  },
  data () {
    return {
    }
  },
  computed:{
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

  }

}

</script>

<style>

  #loadBlock {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  #loadBlock .sk-spinner-double-bounce.sk-spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce1,
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid white;
    background-color: #FF9F1C;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-doubleBounce 2s infinite ease-in-out;
    animation: sk-doubleBounce 2s infinite ease-in-out;
  }
  #loadBlock .sk-spinner-double-bounce .sk-double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  
  
</style>