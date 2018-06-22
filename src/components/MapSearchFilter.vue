<template>
  <section style="margin-top:200px">
    <form id="map-search-form">
      <div class="container" id="tabs-search-block">
        <div class="row">
          <div class="col-lg-11 col-xs-12 tabs-icons">
            <ul id="tabs-list" class="nav nav-tabs">
              <li class="active" role="presentation" data-toggle="tooltip" data-placement="top" title="Билеты на самолет">
                <a href="#planes" id="plane-tab" role="tab" data-toggle="tab" aria-controls="plane">
                  <i class="fa fa-plane"></i>
                </a>
              </li>
              <li role="presentation" data-toggle="tooltip" data-placement="top" title="Отели">
                <a href="#hotels" id="hotels-tab" role="tab" data-toggle="tab" aria-controls="hotels">
                  <i class="fa fa-home"></i>
                </a>
              </li>
              <li role="presentation" data-toggle="tooltip" data-placement="top" title="Экскурсии">
                <a href="#excursions" id="excursions-tab" role="tab" data-toggle="tab" aria-controls="excursions">
                  <i class="fa fa-tree"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-1 visible-lg">
            <a href="#" id="search-form-hide">
              <i class="glyphicon glyphicon-chevron-down"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row tab-content">

          <div role="tabpanel" class="col-xs-12 tab-pane fade in active" id="planes">
            <div class="row">

              <div class="col-xs-12 col-sm-6 col-lg-2">
                <label class="font-normal">Откуда:</label>
                <div class="form-group">
                  <input type="text" id="from_cities_planes" class="form-control" autocomplete="off">
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-lg-2">
                <label class="font-normal">Куда:</label>
                <div class="form-group">
                  <input type="text" id="to_cities_planes" class="form-control" autocomplete="off">
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-lg-2">
                <label class="font-normal">Туда:</label>
                <div class="form-group">
                  <input type="text" id="from_date_planes" class="form-control" autocomplete="off">
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-lg-2">
                <label class="font-normal">Обратно:</label>
                <div class="form-group">
                  <input type="text" id="to_date_planes" class="form-control" autocomplete="off">
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-lg-2">
                <label class="font-normal">Пассажиры:</label>
                <div class="form-group">
                  <input type="text" id="numPas_planes" class="form-control" autocomplete="off">
                </div>
              </div>
              
            </div>
          </div>

          <div role="tabpanel" class="col-xs-12 tab-pane fade" id="hotels">
          </div>
          <div role="tabpanel" class="col-xs-12 tab-pane fade" id="excursions">

          </div>


        </div>
      </div>
      <div class="container">
        <div class="row">
          <div id="search-button-run" class="col-sm-12 col-md-6 col-lg-2 col-md-offset-6 col-lg-offset-10">
            <a href="#" class="button-primary pull-right">
              <i class="fa fa-search"></i>
              <span>Поиск</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>



<script>

export default {
  name: 'MapSearchFilter',
  data () {
    return {
      
    }
  },
  mounted () {
    // $('.bootstrap-select').select2();

    $('[data-toggle="tooltip"]').tooltip();




  },

  methods: {
    
    

  },
  created: function () {

    var lng_globe = 'ru';
    var citiesTrP = [];
    var citiesTrP_lng = [];



    // this.$http.get('http://127.0.0.1:8080/getCities')
    //   .then(response => {
    //     this.sources = response.data.sources;
    //     console.log(response.data)

    //     citiesTrP = response.data;

    //     for (var i = 0; i < citiesTrP.length; i++) {

    //       citiesTrP[i].name_translations[lng_globe]
    //       citiesTrP_lng.push({
    //         "code": citiesTrP[i].code, 
    //         "name": citiesTrP[i].name_translations[lng_globe]
    //       })
    //     }

    //     $("#from_cities_planes, #to_cities_planes").autocompleter({
    //       source: citiesTrP_lng,
    //       limit: 5,
    //       empty: true,
    //       cache: true,
    //       customLabel: 'name',
    //       customValue: '<span>{{ name }} - {{ code }}</span>',
    //       template: '<span>{{ name }} - {{ code }}</span>'
    //     });
        // $("#map-search-form .autocompleter").css("width", $("#from_planes").width() + 22);





        // $("#from_date_planes, #to_date_planes").autocompleter({
        //   source: [1,2,3,4,5],
        //   limit: 5,
        //   empty: true,
        //   cache: true,
        //   customLabel: 'name',
        //   customValue: '<span>{{ name }} - {{ code }}</span>',
        //   template: '<span>{{ name }} - {{ code }}</span>'
        //  });
        // $("#map-search-form .autocompleter").css("width", $("#from_planes").width() + 22);

        // numPass = [
        // ["label": 1, "value": 1]
        // ["label": 2, "value": 2]
        // ["label": 3, "value": 3]
        // ["label": 4, "value": 4]
        // ["label": 5, "value": 5]
        // ]
        // $("#numPas_planes").autocompleter({
        //   source: numPass,
        //   limit: 5,
        //   empty: true,
        //   cache: true,
        // });

        
      // });
  }
}
</script>

<style>

/*@import '../node_modules/bootstrap3/dist/css/bootstrap.min.css';
@import '../node_modules/bootstrap3/dist/fonts/glyphicons-halflings-regular.ttf'*/

@import url('https://fonts.googleapis.com/css?family=Montserrat+Alternates|Open+Sans+Condensed:300|Roboto+Condensed');

#map-search-form {
  
  position: absolute;
  z-index: 150;
  
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%); 
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%); 

  left: 50%;
  -ms-transform: translateX(-50%);
  -webkit-transform: translateX(-50%); 
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%); 

  opacity: 0.65;
  -webkit-transition: all .5s ease-in-out; 
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}

#map-search-form:hover{
  opacity: 1;
  -webkit-transition: all .5s ease-in-out; 
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}

/* ------------------------------------------- */

#tabs-list {
  border-bottom: none;
}

#tabs-list li{
  background-color: #f8f8f8
}

#tabs-list li a{
  border: none !important;
  border-radius: 0 !important;
  margin-right: 0;
  display: block;
  height: 69px;
  width: 69px;
  position: relative;
  text-align: center;
  line-height: 69px;
  outline: none;
  color: #979797;
}

#tabs-list li.active a{
  background: #3797dd !important;
  color: #fff
}

#tabs-list li.hover a{
  background: #eee;
}

#tabs-list li.active::after, #tabs-list li:hover::after{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  content: "";
  bottom: 0;
  left: 50%;
  position: absolute;
  z-index: 11;
  margin-left: -10px;
  background: transparent url(./assets/MapSearchFilter/menu-carret.png) no-repeat bottom center;
  border-color: transparent transparent #f8f8f8 transparent;
}

#tabs-list li a i{
  font-size: 2.2em;
}

.tooltip.top .tooltip-inner {
    background-color: #3797dd;
}
.tooltip.top .tooltip-arrow {
      border-top-color: #3797dd;
}

#search-form-hide{
  background: #3797dd;
  color: #ffffff;
  float: right;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  margin-top: 18px;
  padding-top: 3px;
  display: block;
  text-decoration: none;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}

/* ------------------------------------------- */


.tab-content{
  padding-left: 0px;
  padding-right: 0px;
  background: #f8f8f8;
  margin: 0px;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 15;
  
  /*height: 150px;*/
}


#search-button-run a{
  background: #3797dd;
  height: 50px;
  line-height: 50px;
  padding: 0 30px 0 30px;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;  
  text-decoration: none;
  font-size: 1.08em;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  -o-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  white-space: nowrap;
}

#search-button-run a i{
  color: #ffffff
}

/* ------------------------------------------- */



#map-search-form label {
  color: #5d5d5d;
  font-weight: 500;
  font-size: 1.18em;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top: 5px;
}

#map-search-form input {
  color: #5d5d5d;
  font-weight: 700;
  font-size: 1.18em;
  font-family: 'Roboto Condensed', sans-serif;

  border-radius: 0;
  border-color: #ccc;
  height: 50px;
  padding:10px;

  /*margin-bottom: 5px;*/
}

#map-search-form .autocompleter{
  top: 100px;
  border-radius: 0;
  border: 1px solid #ccc;

}

#map-search-form .autocompleter li{
  height: 45px;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
  padding-left:5px;
  font-family: 'Roboto Condensed', sans-serif;
  border-bottom: 1px dashed #ccc;
}

#map-search-form .autocompleter li:last-child{
  border-bottom: 0px dashed #ccc;
}

#map-search-form .autocompleter li:hover{

  background: #eee;
  color: #3797dd;
}



</style>

<!-- font-family: 'Roboto Condensed', sans-serif;
font-family: 'Open Sans Condensed', sans-serif;
font-family: 'Montserrat Alternates', sans-serif;