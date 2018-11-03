<script>
  export default {
    name: "MapsMarkerModal",
    props: {
      details: Object,
      closeModal: Function,
    },
    data: function () {
      return {};
    }
  };
</script>

<template>
  <div class="modal">
    <div class="modal-item">
      <div class="modal-item-header">
        <h1>{{details.title}}</h1>
        <i @click="closeModal" class="material-icons modal-item-header-close">close</i>
      </div>
      <div class="underline modal-underline"></div>
      <div class="modal-item-details">
        <img class="modal-item-img" :src="details.picture" >
        <div class="modal-item-details-right">
          <h4>Description</h4>
          <p class="light">{{details.description}}</p>
          <h4>Category</h4>
          <p class="light">{{details.category}}</p>
          <h4>Posted by</h4>
          <div class="modal-item-postedBy">
            <img class="modal-item-postedBy-img" src="http://www.yourdictionary.com/images/definitions/lg/4320.farmer.jpg" >
            <div>
              <p class="modal-item-postedBy-name">{{details.postedBy.name}}</p>
              <p class="modal-item-postedBy-date">{{details.postedBy.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./MapsMarkerModal.css" scoped></style>
