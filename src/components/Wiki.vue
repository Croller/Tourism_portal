<template>
  <div id="wiki" class="row">

    <div class="col-12">
      <Wiki_SearchBar></Wiki_SearchBar>
    </div>

    <div class="spaceDiv" v-if="!firstSearch"></div>

    <div class="col-12" v-if="firstSearch">
      <MultiResultsBar :progressPerc="progressPerc"></MultiResultsBar>
    </div>

    <div class="col-12" v-if="firstSearch">
      <div id="wikiInst" class="shadow">
        <div id="slider">

          <Wiki_Instagram_Item v-bind:pos=pos v-for="(pos, index) in post" :key="index" v-if="post.length > 0"></Wiki_Instagram_Item>

          <div id="slickPrev" v-on:click="prev">
            <span class="fas fa-chevron-circle-left" ></span>
          </div>
          <div id="slickNext" v-on:click="next">
            <span class="fas fa-chevron-circle-right"></span>
          </div> 
        </div>

        <div id="errorBlock" class="row shadow" v-if="(post.length == 0 && progressPerc.wiki == 100)" style="margin-bottom: 100px;">
          <div class="container">
            <h3 class="display-6 text-center">Instagram не дала результата 😔</h3>
          </div>
        </div>
        
        <Loader  v-if="post.length == 0" :color=color></Loader>
      </div>
    </div>

    <div class="col-12" v-if="firstSearch">
      <Wiki_Wikipedia></Wiki_Wikipedia>
      
      <div id="errorBlock" class="row shadow" v-if="(wiki.length == 0 && progressPerc.excurs == 100)" style="margin-bottom: 100px;">
        <div class="container">
          <h3 class="display-6 text-center">Wikipedia не дала результата 😔</h3>
        </div>
      </div>
        
      <Loader  v-if="wiki.length < 100 && wiki.length > 0" style="margin-bottom: 100px;" :color=color></Loader>
    </div>

  </div>
</template>

<script>

  import { mapState } from 'vuex';

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
        wiki: '',
        post: [], 
        firstSearch: false,


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
    computed: {
      wiki() {
        return this.$store.state.wikiPedia;
      },
      postNoSort() {
        return this.$store.state.wikiInstagram;
      },
    },
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
      // ...mapState(["getWikiPedia"]),

      getWiki(obj){
        let self = this;
        self.queryObj = obj;
        self.firstSearch = true;

        this.progressPerc["wiki"] = 20;

        // console.log(this)
        // self.getWikiInstagram(obj);
        // self.getWikiPedia(obj);
        this.$store.commit('WIKI_QUERY', obj);
        this.$store.dispatch("getWikiPedia");
        this.$store.dispatch("getWikiInstagram");

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

      // getWikiPedia(obj){

        // this.getWikiPedia();
        // let self = this;
        // this.$http.post(self.pathData + '/getWikipedia', obj).then(function (response) {
        //   console.log('///////////////')
        //   console.log('get wikipedia tag - loaded');

        //   let data = response.data;
        //   console.log(data); // full resp
          

        //   this.progressPerc["wiki"] = 100;
        // });
      // }
    },
    watch: {
      postNoSort: function(nVal, oVal) {
        this.post = nVal.slice(0, 10);
      }
    },
  }
</script>

<style>
  #wikiInst{
    padding: 10px;
    font-family: 'Comfortaa', sans-serif;
    /*margin-top: 12px;*/
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

