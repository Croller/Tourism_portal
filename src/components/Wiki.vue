<template>
  <div id="wiki" class="row">

    <div class="col-12">
      <Wiki_SearchBar></Wiki_SearchBar>
    </div>

    <div class="col-12">
      <MultiResultsBar :progressPerc="progressPerc"></MultiResultsBar>
    </div>

    <div class="col-12">
      <Wiki_Wikipedia></Wiki_Wikipedia>
      <!-- <Loader :color=color></Loader> -->
    </div>

    <div class="col-12">
      <div id="wikiInst" class="shadow">
        <div id="slider">
          <Loader v-if="post.length == 0" :color=color></Loader>

          <Wiki_Instagram_Item v-bind:pos=pos v-for="(pos, index) in post" :key="index" v-if="post.length > 0"></Wiki_Instagram_Item>

          <div id="slickPrev" v-on:click="prev">
            <span class="fas fa-chevron-circle-left" ></span>
          </div>
          <div id="slickNext" v-on:click="next">
            <span class="fas fa-chevron-circle-right"></span>
          </div> 
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

  import BusEvent from './BusEvent.vue';

  import Wiki_SearchBar from './Wiki_SearchBar.vue';
  import MultiResultsBar from './MultiResultsBar.vue';
  import Wiki_Instagram_Item from './Wiki_Instagram_Item.vue';
  import Wiki_Wikipedia from './Wiki_Wikipedia.vue';
  import Loader from './Loader.vue';

  export default {
    name: 'Wiki',
    components: {
      'Wiki_SearchBar': Wiki_SearchBar,
      'MultiResultsBar': MultiResultsBar,
      'Wiki_Instagram_Item': Wiki_Instagram_Item,
      'Wiki_Wikipedia': Wiki_Wikipedia,
      'Loader': Loader,
    },
    props:{},
    data() {
      return {
        // ip
        pathData: document.location.href.indexOf("8080") != -1 ? document.location.href.split(":").slice(0,2).join(":")+":8081" : document.location.href.split("/").slice(0,3).join("/"),
        // language
        locale: "ru",
        color: "#DE66A6",

        //data post instagram
        postNoSort: [], 
        post: [], 


        // stats
        progressPerc: {
          avia: 0,
          hotels: 0,
          excurs: 0,
          wiki: 0,
        },

        queryObj: {},


      }
    },
    computed: {},
    created: function() {
      let self = this;

      //get hotel
      BusEvent.$on('getWiki', function(obj) {
        self.post = []
        self.getWiki(obj);
      })
    },
    mounted() {},
    methods: {

      getWiki(obj){
        let self = this;
        self.queryObj = obj;

        this.progressPerc["wiki"] = 20;

        self.getWikiInstagram(obj);
        self.getWikiPedia(obj);
      },

      getWikiInstagram(obj){
        let self = this;
        this.$http.post(self.pathData + '/getWikiInstagram', obj).then(function (response) {
          console.log('///////////////')
          console.log('get instagram tag - loaded');

          let data = response.data;
          // console.log(data); // full resp
          if(data != null && typeof data.post != String){
            self.postNoSort = data.post;
            self.post = data.post.slice(0, 10);
          }else{
          }

          this.progressPerc["wiki"] = 50;
        });
      },

      next() {
        let self = this;
        let el = document.getElementById('slider');
        el.scrollLeft = el.offsetWidth + el.scrollLeft;
        self.post = self.postNoSort.slice(0, self.post.length + 10);
      },
      prev() {
        let el = document.getElementById('slider');
        if(el.scrollLeft != 0){
          el.scrollLeft = - el.offsetWidth + el.scrollLeft;
        }
      },

      detectmob() { 
        if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ){
          return true;
        }
        else {
          return false;
        }
      },

      getWikiPedia(obj){
        let self = this;
        this.$http.post(self.pathData + '/getWikipedia', obj).then(function (response) {
          console.log('///////////////')
          console.log('get wikipedia tag - loaded');

          let data = response.data;
          console.log(data); // full resp
          

          this.progressPerc["wiki"] = 100;
        });
      }
    },
    watch: {},
  }
</script>

<style>
  #wikiInst{
    padding: 10px;
    font-family: 'Comfortaa', sans-serif;
  }
  #wikiInst #instLogo{
    font-size: 35px;
    position: absolute;
    top: -25px;
  }
  #wikiInst #slider{
    overflow-y: hidden;
    white-space: nowrap;
    -ms-overflow-style: none; 
    overflow: -moz-scrollbars-none;
    margin-bottom: -15px;
  }
  #wikiInst #slider::-webkit-scrollbar { width: 0; }

  #wikiInst #slickPrev, #wikiInst #slickNext{
    position: absolute;
    top: 0;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
     -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 15%;
    height: 100%;
    cursor: pointer;
  }
  #wikiInst #slickPrev{
    left: 0px;
  }
  #wikiInst #slickNext{
    right: 0px;
  }

</style>

