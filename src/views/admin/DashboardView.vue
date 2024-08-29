<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <!-- Menu -->
      <SideBar />
      <!-- / Menu -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->
        <NavBar />
        <!-- / Navbar -->

        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->

          <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4">
              <span class="text-muted fw-light">Formulaire /</span>
            </h4>
            <FormShip />
          </div>
          <!-- / Content -->
          <div class="card">
            <div class="input-group input-group-merge">
              <span class="input-group-text" id="basic-addon-search31"><i class="bx bx-search"></i></span>
              <input v-model="searchQuery" type="text" class="form-control" placeholder="Search..." />
            </div>
            <h5 class="card-header">Liste des navires</h5>
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead>
                  <tr>
                    <th>Navire</th>
                    <th>ETA</th>
                    <th>ETB</th>
                    <th>ETC</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <img src="@/assets/img/loading.gif" alt="" v-if="store.getLoading" />
                <tbody class="table-border-bottom-0 containerimgship" v-if="ships.length">
                  <CardShip v-for="ship in filteredData" :key="ship.id" :ship="ship" />
                </tbody>
              </table>
            </div>

          </div>

          <!-- Footer -->
          <Footer />
          <!-- / Footer -->

          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
</template>

<script setup>
import CardShip from "../../components/CardShip.vue";
import FormShip from "../../components/FormShip.vue";
import SideBar from "../../components/SideBar.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import { useShipStore } from "@/stores/shipStore";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { reactive, ref, computed } from "vue";

const store = useShipStore();

const { ships } = storeToRefs(store);
const { getShips } = store;
getShips();


const searchQuery = ref("");
const filteredData = computed(() => {
  // if (!searchQuery.value) {
  //   return [];
  // }
  const query = searchQuery.value.toLowerCase();
  return store.ships.filter((ship) =>
    ship.name.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.containerimgship {
  position: relative;
  /* Position relative pour le conteneur parent */
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}

.containerimgship img {
  position: absolute;
  /* Position absolue pour l'image */
  top: 10px;
  /* Vous pouvez ajuster ces valeurs */
  left: 50%;
  /* pour positionner l'image */
  width: 100px;
  /* Taille de l'image */
  height: auto;
  /* Conserver les proportions */
  transform: translateX(-50%);
}
</style>