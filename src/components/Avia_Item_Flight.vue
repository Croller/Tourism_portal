<template>
  <div class="col-12 border-top-dashed">
    <div class="dataBasic row">
      <div class="col-12 text-center collapse" :class="'handl_'+ id" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="titleData row btn">
          <div class="col-12">
            Билет #
          </div>
        </div>
      </div>
      <div class="col-4 text-center border-0">
        <div class="timeData">
          18:56
        </div>
        <div class="text-small">
          Москва
        </div>
        <div class="text-extra-small">
          24 дек, ПН
        </div>
      </div>
      <div class="col-4 text-center border-0">
        <div class="text-extra-small">
          <span class="float-left">DME</span>
          <span class="fas fa-long-arrow-alt-right"></span>
          <span class="float-right">PRT</span>
        </div>
        <div class="text-extra-small">
          <!-- {{max_stops}} -->
        </div>
        <div class="text-extra-small">
          Итого: {{}}
        </div>

        
      </div>
      <div class="col-4 text-center" style="border:none;">
        <div class="timeData">
          20:56
        </div>
        <div class="text-small">
          Санкт-<br>Петербург
        </div>
        <div class="text-extra-small">
          24 дек, ПН
        </div>
      </div>
    </div>
  </div>
  

  <div class="col-12 collapse" :class="'handl_'+ id" aria-labelledby="headingThree" data-parent="#accordion">
    <div class="baggDesc row">
      <div class="col-12 text-center text-extra-small">
        <div class="row">
      
          <div class="col-6">
            <span class="fas fa-shopping-bag"></span>
            <a>Ручная кладь: </a> <br>
            <a>неизвестна :(</a>
          </div>
          <div class="col-6">                              
            <span class="fas fa-suitcase"></span>
            <a> Багаж:  </a> <br>
            <a> 1 место до 30 кг на человека </a>
            
          </div>
        </div>
      </div>
    </div>

    <div class="tripDesc row">
      <div class="col-12">
        <div class="row text-center text-extra-small">
          <div class="col-2 align-self-center">
            <img class="airCompLogo" :src="'http://pics.avs.io/50/20/'+ ticket.carriers[0]+'.png'" alt="">
            <!-- <img class="airCompLogo" src="@/assets/img/airCompLogo/PG@2x.png" alt=""> -->
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col-6 col-sm-6 col-md-6 col-lg-6 ">
                <div class="row">
                  <div class="col-12">
                    <span>25:30</span> 
                    <span>24 дек, ПН</span>
                  </div>
                  <div class="col-12">
                    <span>DME</span>
                    <span>домодедово</span>
                  </div>
                </div>
              </div>
              <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                <div class="row">
                  <div class="col-12">
                    <span>25:30</span> 
                    <span>24 дек, ПН</span>
                  </div>
                  <div class="col-12">
                    <span class="fas fa-long-arrow-alt-right"></span>
                    <span>DME</span>
                    <span>домодедово</span>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <span class="fas fa-info-circle"></span>
                <a>Информация о рейсе</a>
              </div>
            </div>
          </div>
          <div class="col-2 justify-content-center align-self-center">
            <span>8:30</span>
          </div>
        </div>
        
      </div>
    </div>

    <div class="delayDesc row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row text-center text-extra-small">
              <div class="col-2 justify-content-center align-self-center">
                <span class="fas fa-exchange-alt airCompLogo"></span>
              </div>
              <div class="col-8">
                <a>Пересадка</a>
              </div>
              <div class="col-2 justify-content-center align-self-center">
                <span>2:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
	
  export default {
    name: 'Avia_Item_Flight',
    components: { },
    props: {
      flight: Object,
      airlines: Object,
    },
    data () {
      return {

      }
    },
    computed: {
      

      
    },
    mounted () {
      console.log('///////////////')
      console.log('avia item flight- loaded')
    },
    methods: {
      
      
      
      
    }
  }

</script>

<style>


</style>