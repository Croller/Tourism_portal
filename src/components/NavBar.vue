<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light" >
      <div class="container">

        <router-link to="/">
          <img src="../../src/assets/img/logo.svg" alt="" style="height:60px; color: red">
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Menu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Главная</router-link>
            </li>
            <!--<li class="nav-item">
              <router-link class="nav-link" to="/search">Билеты</router-link>
            </li> -->
            <li class="nav-item">
              <a class="nav-link" href="#">Сервисы</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Блог</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Галлерея</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Контакты</a>
            </li>
          </ul> 
        </div>
      </div>
    </nav>                    
  </header>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'NabBar',
    prop:{

    },
    data () {
      return {
        
      }
    },

    created: function() {
      window.addEventListener('scroll', this.getScroll);
    },
    mounted () {
      console.log('///////////////')
      console.log('navbar - loaded')

    

    },
    methods: {
      
    }
  }

</script>



<style>
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .navbar{
    /*background: transparent;*/
    /*background-color: rgb(217, 217, 217, 0.3);*/
    font-family: 'Comfortaa', cursive, sans-serif;
    box-shadow: none;
  }


    /*font-family: 'Lato', sans-serif;*/

  .navbar .container{
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-left: auto;
    margin-right: auto;

    color: #fff;
    font-size: 12px;
    /*font-weight: 400;*/
    /*text-transform: uppercase;*/
    
  }

  .navbar .navbar-brand{
    text-transform: uppercase;
  }

  .navbar .container ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }


  .navbar .container li a{
    line-height: 2.5;
    text-decoration: none;
    text-align: center;
    color: white;
    font-size: 12px;
  }


  .navbar .container li a:after{
    display:block;
    content: '';
    border-bottom: solid 3px #FF9F1C;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }

  .navbar .container li a:before{
    position: absolute;
    left: 0;
    width: 100%;
  }

  .navbar .container li a:hover:after{ 
    transform: scaleX(1); 
  }


  .navbar .nav-item .nav-link{
    color: #D6D6D6;
    color: black;
    font-weight: 300;
  }

  .navbar .nav-item.active .nav-link{
    background-color: rgba(0,0,0,0);
    color: white;
  }

  .navbar .nav-item .nav-link:hover{
    color: #FF9F1C;
    transition: color 250ms ease-in-out;

  }


</style>






