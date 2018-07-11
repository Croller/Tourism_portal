<template>
  
  <div id="mainSearchBar" class="container">
    <div class="row justify-content-center">
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-compass"></span>
        <input type="text" class="form-control" id="departure" placeholder="Откуда" autofocus>
      </div>
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-bars"></span>
        <input type="text" class="form-control" id="departure" placeholder="Куда">
      </div>
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control" id="departure" placeholder="Вылет">
      </div>
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="far fa-calendar-alt"></span>
        <input type="text" class="form-control" id="departure" placeholder="Прилет">
      </div>
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <!-- <label class="d-sm-block d-md-none d-lg-none">Example label</label> -->
        <span class="fas fa-male"></span>
        <input type="text" class="form-control" id="people" placeholder="Пассажиры">
      </div>
      <div class="form-group col-xs-8 col-sm-10 col-md-5 col-lg-2">
        <span class="fas fa-search"></span>        
        <button class="btn btn-primary">Поиск</button>
      </div>
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'Main_SearchBar',
    data () {
      return {
      }
    },
    mounted () {


    },
    methods: {


    },
  }

</script>
  

<style>

  /*#mainSearchBar{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    text-align: center;
    top: 70%;
  }*/

  /*#mainSearchBar.container {
    max-width: 70%;
  }*/

  #mainSearchBar .row {
    text-align: center;
  }

  #mainSearchBar .form-group {
    padding: 0px;
    margin: 0px;
  }

  #mainSearchBar .form-control {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 0px;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    text-align: center;
    /*font-family: 'Lato', sans-serif;*/
    font-family: 'Comfortaa', cursive, sans-serif;
    font-size: 14px;
    line-height: 33px;
    color: #888;
    letter-spacing: -0.5px;
    font-weight: 600;
  }

  #mainSearchBar  .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }

  #mainSearchBar .form-group span {
    position:absolute;
    left:8px;
    top:8px;
    font-size: 20px;
    line-height: 32px;
  }
  

  /*#mainSearchBar .row .form-group:first-child input{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
*/
  #mainSearchBar .btn {
    width: 100%;
    border: 1px solid #FF9F1C;
    /*border: none;*/
    border-radius: 0px;
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
  }

  #mainSearchBar  .btn:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #FF9F1C;
  }

  #mainSearchBar  .btn:hover{
    background-color: #F09A24
  }
  

  #mainSearchBar .fa-search{
    color: white;
    text-align: center;
  }
  


  @media (max-width: 989px){
    #mainSearchBar{
      position: relative;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      will-change: content;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
    }

    #mainSearchBar {
      background-color: white;
      padding: 15px; 
      padding-top: 20px;
      margin-top: 15px; 
      margin-bottom: 15px; 
    }

    #mainSearchBar .form-group {
      padding: 0px;
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
    #mainSearchBar .row .form-group input{
      /*border-top-left-radius: 0px;*/
      /*border-bottom-left-radius: 0px;*/
      border-radius: 30px;
    }

    #mainSearchBar .btn{
      /*border-top-right-radius: 0px;*/
      /*border-bottom-right-radius: 0px;*/
      border-radius: 30px;

    }

    #mainSearchBar .form-group span {
      position:absolute;
      left:15px;
      top:8px;
      font-size: 20px;
      line-height: 30px;
    }
  }

  @media (min-width: 990px){
    #mainSearchBar .row .form-group:first-child input{
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    #mainSearchBar .btn{
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }
  }
   
</style>






