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
          <div class="row mt-3">
            <!-- Button with Badges -->
            <div class="col-lg">
              <div class="card mb-1">
                <h5 class="card-header d-flex justify-content-between">
                  <span>{{ store.ships.name }}</span>
                  <span @click="handleAddDate()" class="cursor-pointer"><i class="bi bi-plus"></i>date rapport</span>
                  <span @click="handleAdd()" class="cursor-pointer"><i class="bi bi-plus"></i>hold</span>

                </h5>
                <div class="card-body">
                  <div class="row gy-3">
                    <div class="col-sm-4">
                      <small class="text-light fw-semibold">pourcentage</small>
                      <div class="demo-inline-spacing">
                        <button type="button" class="btn btn-primary">
                          {{ pourcentage }}%
                        </button>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <small class="text-light fw-semibold">valider modification</small>
                      <div class="demo-inline-spacing">
                        <button @click="handleActive($event)" data-validate="true" :class="{
                          'btn btn-success': store.ships.confirmed,
                          'btn btn-outline-primary':
                            !store.ships.confirmed,
                        }" type="button">
                          Valider
                        </button>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <small class="text-light fw-semibold">Annuler modification</small>
                      <div class="demo-inline-spacing">
                        <button @click="handleActive($event)" data-validate="false" type="button" :class="{
                          'btn btn-success': !store.ships.confirmed,
                          'btn btn-outline-primary':
                            store.ships.confirmed,
                        }">
                          Annuler
                        </button>
                      </div>
                    </div>

                    <div class="col-sm-2">
                      <div class="demo-inline-spacing">
                        <button @click="router.back()" type="button" class="btn btn-dark">
                          Retour
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <h5 class="card-header">Liste des Holds</h5>
              <div class="table-responsive text-nowrap">
                <div v-if="store.holds.length" class="mt-3 d-flex flex-row">
                  <div class="vertical-align">
                    <div class="p-2 border">Holds</div>
                    <div class="p-2 border">Total cargo</div>
                    <div class="p-2 border">Total discharged</div>
                    <div class="p-2 border">Remaining on board</div>
                    <div v-for="rapportDate in store.rapportDates" :key="rapportDate.id" class="p-2 border ">
                      <span>{{ rapportDate.rapport }} <i @click="deleteRapportDate($event)"
                          :data-rapportid="rapportDate.id"
                          class="bx bx-trash me-1 mx-2 text-danger cursor-pointer"></i></span>
                    </div>
                  </div>
                  <CardHold v-for="hold in store.holds" :key="hold.id" :hold="hold" :ship_id="store.ships.id" />
                  <div class="vertical-align">
                    <div class="p-2 border">Total</div>
                    <div class="p-2 border">{{ totalCargos }}</div>
                    <div class="p-2 border">{{ totaldischarged }}</div>
                    <div class="p-2 border">{{ totalreste }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- / Content -->

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
import CardHold from "../../components/CardHold.vue";
import { useShipStore } from "@/stores/shipStore";
import Swal from "sweetalert2";

import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch, onMounted, reactive } from "vue";
import Footer from "../../components/Footer.vue";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const store = useShipStore();
const user = useUserStore();

const { showShip, rapportDateByShip } = store;

onMounted(() => {
  showShip(route.params.id);
  rapportDateByShip(route.params.id);
})

const formActive = reactive({
  confirmed: false,
  id: "",
});
const handleActive = async (event) => {
  const confirmed =
    event.currentTarget.dataset.validate == "true" ? true : false;
  const id = event.currentTarget.dataset.iduser;

  formActive.confirmed = confirmed;
  formActive.id = store.ships.id;

  await user.activeUser(formActive.id, formActive);
  showShip(route.params.id);
};

const rapportForm = reactive({
  rapport: "",
  id: ""
});
const handleAddDate = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Ajouter date de rapport",
    html: `
    <label  class="form-label" >date(*)</label>               
    <input type="date" id="swal-input6" class="form-control mb-2" value="" >
     <input type="hidden" id="swal-input7" class="swal2-input" value="${store.ships.id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "Ajouter",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (rapportForm.rapport = document.getElementById("swal-input6").value),
        (rapportForm.id = document.getElementById("swal-input7").value),
      ];
    },
  });
  if (formValues) {
    onSubmitRapport();
  }
}
const onSubmitRapport = async () => {
  await store.storeRapportDate(rapportForm.id, rapportForm);
  if (!store.getErrors.length) {
    store.showShip(store.ships.id);
    store.rapportDateByShip(route.params.id);
  }
  if (store.getErrors.length) {
    setTimeout(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: store.getErrors,
        allowOutsideClick: false,
      });
    }, 2000);
  }
}
const form = reactive({
  name: "",
  category: "",
  tcargo: "",
  tdischarged: "",
  shipId: "",
});
const handleAdd = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Ajouter Hold",
    html: `
    <label  class="form-label" >name(*)</label>               
    <input type="text" id="swal-input1" class="form-control mb-2" value="" placeholder="hold name">
    <input type="text"   id="swal-input2" class="form-control mb-2" value="" placeholder="category">
    <label  class="form-label" >total cargo(*)</label>
    <input type="number" step="0.001"  id="swal-input3" class="form-control mb-2" value="" placeholder="total cargo">
    <label  class="form-label" >total decharger(*)</label>
    <input type="number" step="0.001"  id="swal-input4" class="form-control mb-2" value="" placeholder="total decharger">
    <input type="hidden" id="swal-input5" class="swal2-input" value="${store.ships.id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "Ajouter",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (form.name = document.getElementById("swal-input1").value),
        (form.category = document.getElementById("swal-input2").value),
        (form.tcargo = document.getElementById("swal-input3").value),
        (form.tdischarged = document.getElementById("swal-input4").value),
        (form.shipId = document.getElementById("swal-input5").value),
      ];
    },
  });
  if (formValues) {
    onSubmit();
  }
};
const onSubmit = async () => {
  await store.storeHold(form.shipId, form);
  if (!store.getErrors.length) {
    store.showShip(form.shipId);
  }
  if (store.getErrors.length) {
    setTimeout(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: store.getErrors,
        allowOutsideClick: false,
      });
    }, 2000);
  }
};

const totalCargos = computed(() => {
  return store.holds
    .reduce((sum, item) => sum + item.Total_cargo, 0)
    .toFixed(3);
});
const totaldischarged = computed(() => {
  return store.holds
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

const deleteRapportDate = (event) => {
  const id = event.currentTarget.dataset.rapportid;
  Swal.fire({
    icon: "error",
    title: 'Attention',
    text: "Voulez-vous supprimer cet Hold ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await destroyRapport(id);

    }
  });
}
const destroyRapport = async (id) => {
  await store.destroyRapportDate(id);
  rapportDateByShip(route.params.id);
}
</script>

<style scoped>
.vertical-align {
  display: flex;
  flex-direction: column;
}
</style>