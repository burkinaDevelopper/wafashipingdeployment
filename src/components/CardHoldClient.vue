<template>
  <div class="vertical-align">
    <div class="p-2 border">
      <strong class="ms-2 d-flex justify-content-between"><span>{{ props.hold.name }}- {{ props.hold.type }}</span>

      </strong>
    </div>
    <div class="p-2 border">{{ props.hold.Total_cargo }}</div>
    <div class="p-2 border">{{ props.hold.Total_discharged }}</div>
    <div class="p-2 border mb-5">
      {{ (props.hold.Total_cargo - props.hold.Total_discharged).toFixed(3) }}
    </div>

    <div class="p-0 border ">

      <div v-if="props.hold.holdHistories.length">
        <p v-for="holdHistory in props.hold.holdHistories" :key="holdHistory.id"
          class="card-text mt-0 mb-0 fs-6 border heighborder p-2">
          {{ holdHistory.discharged }}
          <!-- <em class="fs-6">
      <i class="bi bi-clock"></i> {{ holdHistory.history }} 
     </em> -->

        </p>
      </div>
    </div>
  </div>
</template>

<script setup>



const props = defineProps(["hold"]);


</script>

<style scoped>
.vertical-align {
  display: flex;
  flex-direction: column;
}

.heighborder {
  padding: 8px 0;
}
</style>