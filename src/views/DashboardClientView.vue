<template>
  <!-- <NavBarUser /> -->
  <div class="content-wrapper vh-100 d-flex justify-content-center align-items-center">

    <div class="d-flex justify-content-center align-items-center ">
      <!-- <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> {{ $t('blTitle') }}</h4> -->
      <!-- Basic Bootstrap Table -->
      <!-- <div class="card">
        <h5 class="card-header">{{ $t('titleHeader') }}</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Tonnage Mt</th>
                <th>Marchandise</th>
                <th>Réceptionnaire</th>
                <th>Date de réception</th>
                <th>navire</th>
              </tr>
            </thead>
            <tbody v-if="client.bls.length" class="table-border-bottom-0">
              <tr v-for="bl in client.bls" :key="bl.id">
                <td>{{ bl.n }}</td>
                <td>{{ bl.tonnage_mt }}</td>
                <td>{{ bl.marchandise }}</td>
                <td>{{ bl.receptionnaire }}</td>
                <td>{{ bl.date_reception }}</td>
                <td>{{ bl.ship?.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->
      <div class="row mb-5 ">
        <div class="col-md-6 col-lg-4 mb-3 mx-3">
          <div class="card text-center size-minimal">
            <div class="card-body">
              <h5 class="card-title">Liste des BLs</h5>
              <a href="/bl-client" class="btn btn-primary">Suivi BLs</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-3  mx-3">
          <div class="card text-center size-minimal">
            <div class="card-body">
              <h5 class="card-title">Rapport de Déchargement</h5>

              <a href="/rapport-client" class="btn btn-primary">Rapport</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// import NavBarUser from "@/components/NavBarUser.vue";
// import { useClientStore } from "@/stores/client";
// import { useUserStore } from "@/stores/user";
// import { onMounted } from "vue";

// const user = useUserStore();
// const client = useClientStore();

// onMounted(() => {
//   client.bls();
// })
// console.log();

</script>
<style scoped>
.size-minimal {
  min-width: 200px;
  min-height: 200px;
}
</style>
