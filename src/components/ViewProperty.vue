<template>
  <div class="row">
    <div id="viewProperty" class="col-2 justify-content-center align-items-center mx-auto ">
      <ul>
        <li class="active">
          <a>Карта</a>
        </li>
        <li class="">
          <a>Список</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'ViewProperty',
    components: {},
    props:{},
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
  #viewProperty{
    font-size: 12px;
    font-family: 'Comfortaa', cursive, sans-serif;
  }
 #viewProperty ul{
    border-radius: 3px;
    list-style-type: none;
    margin: 0;
    padding: 0;    
  }
   #viewProperty ul li{
    float: left;
    color: #888;
    cursor: pointer;
    margin-right: 0px;
    border-radius: 3px;
    border: 0px;
    padding: 8px 16px 8px 16px;    
    background-color: #FAFAFA;
    transition: background 0.5s;
  }
  #viewProperty li:first-child{
    border-right: 1.2px dashed #e5e6e7;
  }
  #viewProperty ul li a{
    text-decoration: none;
    background-color: transparent;
    transition: color 0.5s;
  }
  #viewProperty ul li:hover{
    background-color: white;
    border-radius: 3px 3px 3px 3px;
    -webkit-transition: background 1s;
    transition: background 0.5s;
  }
  #viewProperty ul li.active {
    background-color: #FF9F1C;
    border-radius: 3px;
    color: white;
  }

</style>

