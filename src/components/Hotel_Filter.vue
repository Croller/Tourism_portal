<template>
  <div id="hotelfilterPanel" class="col-12 shadow">

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Цена</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Количество звезд</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Тип размещения</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Рейтинг гостей</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Расстояние от центра</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Удобства в отеле</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Удобства в номере</a>
      </div>

    </div>

    <div class="searchFiltrs text-small">
      <div class="headFiltr" data-toggle="collapse" data-target="#max_stops_group" aria-expanded="true" aria-controls="max_stops_group">
        <span class="fas fa-caret-down"></span>
        <span class="fas fa-caret-right"></span>
        <a>Опции размещения</a>
      </div>

    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'Hotel_Filter',
    components: {},
    props:{},
    data() {
      return {}
    },
    computed: {},
    created: function() {},
    mounted() {},
    methods: {

      declension(num, expressions) {
        var result;
        var count = num % 100;
        if (count >= 5 && count <= 20) {
            result = expressions['2'];
        } else {
            count = count % 10;
            if (count == 1) {
                result = expressions['0'];
            } else if (count >= 2 && count <= 4) {
                result = expressions['1'];
            } else {
                result = expressions['2'];
            }
        }
        return result;
      },

      changeAllSpan(event){
        var el = event.target
        // check group filtr
        this.changeSpan(el);
        // check child filtr
        var list_el = [];
        var el_Class = '';
        if(el.children[0] != undefined){
          var list_el = event.target.parentNode.children;
          var el_Class = el.children[0].classList[1];
        }else{
          var list_el = event.target.parentNode.parentNode.children;
          var el_Class = el.parentNode.children[0].classList[1];
        }

        for (var i = 1; i < list_el.length; i++) {
          var list_el_Class = list_el[i].children[0].classList[1];
          if(el_Class != list_el_Class){
            this.changeSpan(list_el[i]);
          }
        }
      },
    },
    watch: {},
  }
</script>

<style>


  #hotel #hotelfilterPanel{
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
    padding-left: 0px;
    padding-right: 0px;
  }

</style>

