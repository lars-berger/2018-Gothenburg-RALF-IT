<template>
  <div class="explore">
    <nav class="sidebar">
      <div class="sidebar-header">
        <h1>Local Sharing</h1>
      </div>

      <p class="sidebar-label">Categories</p>
      <a class="sidebar-link" href="/volunteering">Volunteering</a>
      <a class="sidebar-link" href="/sharing-food">Sharing food</a>
      <a class="sidebar-link selected" href="/lending-items">Lending Items</a>
      <a class="sidebar-link" href="/communal-activities">Communal Activities</a>
    </nav>
    <main>
      <aside class="top">
        <h1>Lending items</h1>
        <div class="top-inputs">
          <input class="top-inputs-search" type="text" placeholder="Type to search...">
          <select class="top-inputs-language">
            <option value="English">English</option>
            <option value="Swedish">Swedish</option>
            <option value="Norwegian">Norwegian</option>
            <option value="German">German</option>
          </select>
        </div>
      </aside>

      <div class="content">
        <div class="list">
          <h1>45 Results</h1>
          <div class="list-items">
            <div class="list-item" v-for="listing in listings">
              <img class="list-item-img" :src="listing.picture">
              <p>foijdsa</p>
            </div>
          </div>
          <!-- <p>fdijsoaof</p> -->
        </div>
        <div class="map">
          <GmapMap :center="{ lat: latitude, lng: longitude }" :zoom="15" style="z-index: 0; width: 100%; height: 100%">
            <GmapMarker v-for="(item, index) in listings" :key="index" :position="{lat: Number(item.latitude), lng: Number(item.longitude)}"
              :clickable="true" @click="openModal(item)" />
          </GmapMap>

          <MapsMarkerModal v-if="modal.visible" :details="modal.selectedListing" :closeModal="closeModal" />
        </div>
      </div>

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