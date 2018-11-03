<template>
  <div class="explore">
    <h1>This is the explore page</h1>

    <GmapMap
      v-if="getLongitude !== 0"
      :center="{ lat: latitude, lng: longitude }"
      :zoom="15"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        v-for="(item, index) in listings"
        :key="index"
        :position="{lat: Number(item.latitude), lng: Number(item.longitude)}"
        :clickable="true"
        @click="openModal(item)"
      />
  </GmapMap>

    <MapsMarkerModal v-if="modal.visible" :details="modal.selectedListing" :closeModal="closeModal" />
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
  data: function() {
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
    openModal: function(item) {
      this.modal.selectedListing = item;
      this.modal.visible = true;
    },
    closeModal: function() {
      this.modal.visible = false;
    }
  },
  mounted: function() {
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
<style scoped>
</style>
