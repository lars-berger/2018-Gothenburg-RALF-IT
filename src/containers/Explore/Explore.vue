<template>
  <div class="explore">
    <nav class="sidebar">

    </nav>
    <main>
      <aside class="top">
        <h1>Lending items</h1>
        <input type="text" name="" id="">
        <select name="" id="" class="top-langSelect"></select>
      </aside>
      
      <div class="content">
        <div class="list">
          <!-- <p>fdijsoaof</p> -->
        </div>
        <div class="map">
            <!-- <p>fdijsfijijijoaof</p> -->
  
        </div>
      </div>
      <h1>This is the explore page</h1>

    </main>

  </div>
</template>

<script>
  import listings from "./listings.json";
  import MapsMarkerModal from "@/components/MapsMarkerModal/MapsMarkerModal.vue";

  export default {
    name: "Explore",
    props: {
      msg: String
    },
    components: {
      MapsMarkerModal
    },
    data: function () {
      return {
        latitude: "",
        longitude: "",
        listings: [],
        modal: {
          visible: false,
          selectedListing: {}
        }
      };
    },
    methods: {
      openModal: function (item) {
        this.modal.selectedListing = item;
        this.modal.visible = true;
      },
      closeModal: function () {
        this.modal.visible = false;
      }
    },
    mounted: function () {
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      };
      getLocation();

      const getListings = () => {
        this.listings = listings;
      };
      getListings();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Explore.css">
</style>