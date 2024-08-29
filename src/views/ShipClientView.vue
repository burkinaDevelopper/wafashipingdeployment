<template>
  <NavBarUser />

  <div class="card ">
    <main>
      <div v-if="client.holds.length" class="container-box ">
        <div v-for="hold in client.holds" :key="hold.id" class="box">
          <h6 class="text-center my-3">{{ hold.name }}</h6>
        </div>
      </div>
    </main>
  </div>
  <!-- / Content -->
  <div class="card card-heigth">
    <h5 class="card-header">{{ $t('titleHold') }}</h5>
    <div class="table-responsive text-nowrap">
      <div v-if="client.holds.length" class="mt-3 d-flex flex-row">
        <div class="vertical-align">
          <div class="p-2 border">Holds</div>
          <div class="p-2 border">Total cargo</div>
          <div class="p-2 border">Total discharged</div>
          <div class="p-2 border">Remaining on board</div>
        </div>
        <CardHoldClient v-for="hold in client.holds" :key="hold.id" :hold="hold" :ship_id="hold.id" />
        <div class="vertical-align">
          <div class="p-2 border">Total</div>
          <div class="p-2 border">{{ totalCargos }}</div>
          <div class="p-2 border">{{ totaldischarged }}</div>
          <div class="p-2 border">{{ totalreste }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="alert alert-danger text-end" role="alert"><strong>ETB:</strong>{{ client.ship.etb }}</div>

</template>

<script setup>
import CardHoldClient from '../components/CardHoldClient.vue'
import NavBarUser from "@/components/NavBarUser.vue";
import { useClientStore } from "@/stores/client";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";


const user = useUserStore();
const client = useClientStore();
const route = useRoute();




onMounted(() => {
  client.holds(route.params.id);
  client.ship(route.params.id);
})
const totalCargos = computed(() => {
  return client.holds
    .reduce((sum, item) => sum + item.Total_cargo, 0)
    .toFixed(3);
});
const totaldischarged = computed(() => {
  return client.holds
    .reduce((sum, item) => sum + item.Total_discharged, 0)
    .toFixed(3);
});
const totalreste = computed(() => {
  return (totalCargos.value - totaldischarged.value).toFixed(3);
});
const pourcentage = computed(() => {
  return totalCargos.value > 0
    ? ((totaldischarged.value * 100) / totalCargos.value).toFixed(2)
    : 0;
});

// console.log();
</script>
<style scoped>
.card-heigth {
  margin: 0 auto;
  display: flex;
  align-items: center;
}

main {
  background-image: url('@/assets/img/wafa-ship.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

}

.container-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 150px auto 10px;
}

.card-heigth {
  overflow-x: scroll;
}

/* @media only screen and (max-width: 1028px) {} */

.box {
  width: 200px;
  height: 100px;
  background-color: rgb(238, 227, 227);
  margin: 8px 3px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-size: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

@keyframes slide-up {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>