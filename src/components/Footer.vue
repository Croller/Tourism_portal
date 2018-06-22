<template>
  
  <footer>
    <div class="container">
      


      <div class="row  justify-content-sm-center fadeInOnScroll">

        


        <div id="info" class="col-md-6 col-lg-3 col-xl-4 order-lg-1 text-center text-sm-center text-md-center text-lg-left">
          <a href="./" class="text-big text-black">Brand</a>
          <p class="text-small" style="margin-top: 16px;">
            Турестический информационный портал. <br> Все новости и события мировых культурных столиц, обзоры и лайфхаки, а так же билеты на самолеты, бронирование отелей и всего что необходимо.
          </p>
        </div>

        <div id="subscribe" class="col-md-6 col-lg-3 col-xl-2 order-lg-4 text-center text-sm-center text-md-center text-lg-left">
          <!-- <p class="text-big text-black">Мы</p> -->
          <ul id="social" class="list-inline">
            <li class="list-inline-item">
              <a href="./" class="fab fa-instagram icon icon-square icon-fill text-gray"></a>
            </li>
            <li class="list-inline-item">
              <a href="./" class="fab fa-instagram icon icon-square icon-fill text-gray"></a>
            </li>
            <li class="list-inline-item">
              <a href="./" class="fab fa-instagram icon icon-square icon-fill text-gray"></a>
            </li>
            <li class="list-inline-item">
              <a href="./" class="fab fa-instagram icon icon-square icon-fill text-gray"></a>
            </li>
          </ul>
          <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#subscribe">Подписка</button>
        </div>

        <div id="service" class="col-sm-12 col-md-12 col-lg-6 order-lg-2 text-center">
          <p class="text-big text-black">Сервисы</p>
          <address>
            <div class="row">
              <div class="col-6 col-sm-6 col-md-6">
                <p class="d-block text-small">Авиабилеты</p>
                <p class="d-block text-small">Отели</p>
                <p class="d-block text-small">Трансфер</p>
                <p class="d-block text-small">Экскурсии</p>
                <p class="d-block text-small">ЧатБот</p>
              </div>
              <div class="col-6 col-sm-6 col-md-6">
                <p class="d-block text-small">Блог</p>
                <p class="d-block text-small">Фотогаллерея</p>
                <p class="d-block text-small">Контакты</p>
              </div>
            </div>
          </address>
        </div>
      </div>

      <div class="space-block"></div>

      <div class="row justify-content-sm-center justify-content-md-between">
        <div class="col-md-5 col-lg-4 col-xl-4 text-center text-sm-center text-md-left text-lg-left text-xl-left" >
          <p class="text-extra-small">
            Copyright 
            <span class="copyright-year"></span>
            <a href="./" class="text-gray">Comp</a> 
            All Rights Reserved.
          </p>
        </div>
        <div class="col-md-6 col-lg-4 col-xl-5  text-center text-sm-center text-md-right text-lg-right text-xl-right">
          <ul class="list-inline text-extra-small">
              <li class="list-inline-item">
                <a href="./">Контакты</a>
              </li>
              <li class="list-inline-item">
                <a href="./">Условия эксплуатации</a>
              </li>
              <li class="list-inline-item">
                <a href="./">Конфиденциальность</a>
              </li>
          </ul>
        </div>
      </div>

    </div>
  </footer>
    
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'Footer',
    data () {
      return {
      }
    },
    mounted () {
      console.log('///////////////')
      console.log('main footer - loaded')

      let vm = this;

      window.addEventListener('scroll', this.onScroll)

      

    },
    methods: {

      onScroll(event) {

        $('.fadeInOnScroll').each( function(i){
              
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
              
            if( bottom_of_window > bottom_of_object ){
                  
              $(this).animate({'opacity':'1'},500);
                      
            }
        }); 

      },





    },
  }

</script>



<style>

  footer {
    /*padding-top: 80px; */
    background-color: white;
    /*height: 100px;*/
    /*text-decoration: none;*/

  }

  a {
    text-decoration: none;
    background-color: transparent;
    color: #888;
  }

  a:hover {
    text-decoration: none;
    color: #888;
  }

  .space-block {
    height: 80px;
    border-bottom: 1px solid #ccc;
  }


  footer #info, footer #service, footer #subscribe{
    margin-top: 55px;
  }

  footer #service .col-md-6{
    line-height: 1.2;
  }


  .icon {
    font-size: 34px;
    display: inline-block;
  }

  .icon-square {
    width: 30px;
    height: 30px;
    line-height: 38px;
  }

  .icon-fill {
    /*background-color: #eee;*/
  }

  .icon-fill:hover {
    color: #ff9f1c;
    /*background-color: #888;*/
    transition: .3s all ease;
  }

  .fa-instagram:before {
    content: "\f16d";
  }

  .fa-paper-plane:before {
    content: "\f167";
  }

  

  footer .btn {
    width: 160px;
    border-radius: 30px;
    border: 1px solid transparent;
    padding: 9px 20px;
    font-size: 12px;
    font-weight: 900;
    line-height: 21px;
    text-transform: uppercase;
    -webkit-transition: .3s ease-out;
    -o-transition: .3s ease-out;
    transition: .3s ease-out;

  }

  footer .btn-primary {
    color: #fff;
    background-color: #ff9f1c;
    border-color: #ff9f1c;
  }

  footer .btn-primary:hover {
    background-color: #EB921A;
    border-color: #EB921A;
  }




  /*font style*/

  .text-big {
    font-family: 'Comfortaa', sans-serif;
    font-size: 18px;
  }

  .text-extra-big {
    font-family: 'Comfortaa', sans-serif;
    font-size: 24px;
  }

  .text-extra-small {
    font-family: 'Comfortaa', sans-serif;
    font-size: 12px;
    line-height: 30px;
  }

  .text-small {
    font-family: 'Comfortaa', sans-serif;
    font-size: 14px;
  }

  /*.text-center {
    text-align: center !important;
  }*/

  .text-gray {
    color: #888;
  }

  .text-black {
    color: #000;
  }

  .fadeInOnScroll
  {
    opacity:0;
  } 


  @media (min-width: 1200px)
    .container {
      max-width: 1200px;
    }
  

</style>






