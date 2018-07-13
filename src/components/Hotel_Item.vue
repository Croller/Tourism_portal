<template>
  <div id="hotelItem" class="row shadow">

  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';
  import Moment from 'moment';
  import Toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';

  export default {
    name: 'Hotel_Item',
    components: {},
    props:{
      hotel: Object,
    },
    data() {
      return {}
    },
    computed: {},
    created: function() {},
    mounted() {},
    methods: {},
    watch: {},
  }
</script>

<style>
  #hotelItem{
    padding: 10px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }

  #hotelItem .col-lg-4{
    border-left: 1px dashed #EBEBEB;
  }


  #hotelItem .btn {
    width: 100%;
    border: 1px solid #FF9F1C;
    /*border: 2px solid white;*/
    border-radius: 3px;
    background-color: #FF9F1C;

    /*font-family: 'Lato', sans-serif;*/
    /*line-height: 30px;
    color: white;
    font-weight: 700;*/

    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 16px;
    line-height: 33px;
    color: white;
    letter-spacing: -0.5px;
    font-weight: 700;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
-moz-box-shadow: 0px 0px 15px 0px rgba(189,189,189,1);
box-shadow: 0px 0px 15px 0px rgba(189,189,189,1)
  }

  #hotelItem .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }
  #hotelItem .btn:hover{
    background-color: #F09A24
  }

</style>

