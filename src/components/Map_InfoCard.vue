<template>
  <div id="mapInfoCard">

    <div class="" style="width: 15rem; font-family: 'Comfortaa', cursive, sans-serif; border-radius: 3px 16px 3px 3px;">
      <span class="far fa-times-circle rounded-circle" style="position: absolute; right: 0px; font-size: 19px; color:#F26326; cursor:pointer;"></span>
      <!-- <img class="card-img-top" src="https://dummyimage.com/274x220" alt="Card image cap"> -->
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        {{str}}
        стиро

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Map_InfoCard',
    components: {},
    props:{},
    data () {
      return {
        str: 'tttt',
      }
    },
    computed: {},
    created: function() {},
    mounted() {},
    methods: {},
    watch: {}
  }
</script>

<style>
  #mapInfoCard .fa-times-circle{
    position: absolute;
    right: 10px;
  }



</style>

