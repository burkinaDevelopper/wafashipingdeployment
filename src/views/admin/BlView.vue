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
            <div class="row">
              <div class="col-md-6 mt-3">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="bs-toast toast fade show bg-success" role="alert" aria-live="assertive"
                      aria-atomic="true" v-if="successMessage">
                      <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">Bl ajouter</div>
                        <small>il ya 2s</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                      </div>
                    </div>
                    <form @submit.prevent="onSubmitFile()">
                      <div>
                        <label for="defaultFormControlInput" class="form-label">Navire(*)</label>

                        <div>
                          <Multiselect v-model="selectedOption" :options="options" :searchable="true"
                            :close-on-select="true" :clear-on-select="true" :preserve-search="true"
                            placeholder="Select un navire" label="name" track-by="id" />
                        </div>
                      </div>
                      <div class="mt-2">
                        <label for="defaultFormControlInput" class="form-label">upload fichier Excel(*)</label>
                        <input type="file" class="form-control" id="defaultFormControlInput" placeholder="John Doe"
                          aria-describedby="defaultFormControlHelp" @change="changeSelect($event)" />
                      </div>
                      <button type="submit" class="btn btn-primary mt-2">
                        Envoyer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-3">
                <div class="card mb-4">
                  <h5 class="card-header">Total par marchandise</h5>
                  <div class="card-body">
                    <div class="table-responsive text-nowrap">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Marchandise</th>
                            <th>Total BLs recus</th>
                            <th>Total non BLs recus</th>
                          </tr>
                        </thead>
                        <tbody v-if="store.sumBl.length" class="table-border-bottom-0">
                          <tr v-for="bl in store.sumBl" :key="bl.category">
                            <td>{{ bl.category }}</td>
                            <td>{{ bl.sumTotal.toFixed(3) }}</td>
                            <td>{{ bl.sumTotalOf.toFixed(3) }}</td>
                          </tr>
                          <tr>
                            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>Total</strong></td>
                            <td><strong>{{ store.getTotalMarchandise.toFixed(3) }}</strong></td>
                            <td><strong>{{ store.getTotalMarchandiseOf.toFixed(3) }}</strong></td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- / Content -->
        <div class="card mt-0">
          <div class="input-group input-group-merge">
            <span class="input-group-text" id="basic-addon-search31"><i class="bx bx-search"></i></span>
            <input @input="loopSearch()" v-model="search" type="text" class="form-control" placeholder="Search..." />
          </div>
          <h5 class="card-header">Liste des bls</h5>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th>N°</th>
                  <th>Tonnage Mt</th>
                  <th>Marchandise</th>
                  <th>Réceptionnaire</th>
                  <th>Date de réception</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr v-for="bl in store.bls.sort((a, b) => a.n - b.n)" :key="bl.id">
                  <td>
                    {{ bl.n }}
                  </td>
                  <td>{{ bl.tonnage_mt }}</td>
                  <td>
                    {{ bl.marchandise }}
                  </td>
                  <td>
                    {{ bl.receptionnaire }}
                  </td>
                  <td>
                    {{ bl.date_reception == 'non_recu' ? "non reçu" : bl.date_reception }}
                  </td>
                  <td>
                    <div class="d-flex align-items-end justify-content-space-evenly">
                      <span>
                        <div class="col-lg-4 col-md-6">
                          <div class="mt-3">
                            <!-- Button trigger modal -->
                            <button :data-id="bl.id" :data-n="bl.n" :data-tonnage="bl.tonnage_mt"
                              :data-marchandise="bl.marchandise" :data-receptionnaire="bl.receptionnaire"
                              :data-reception="bl.date_reception" @click="handleClick($event)" type="button"
                              class="btn btn-primary btn-xs" data-bs-toggle="modal" data-bs-target="#modalTop">
                              <i class="bx bx-edit-alt me-1"></i>
                            </button>
                            <!-- Modal -->
                          </div>
                        </div>
                      </span>
                      <span>
                        <button :data-idbl="bl.id" @click.prevent="deleteBl($event)" type="button"
                          class="btn btn-xs btn-danger">
                          <i class="bx bx-trash me-1"></i>
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
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


</template>

<script setup>
import { useShipStore } from "@/stores/shipStore";
import { computed, onMounted, reactive, ref } from "vue";
import Footer from "../../components/Footer.vue";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import axios from 'axios';

const store = useShipStore();


const { bls, } = storeToRefs(store);
const { blAll, getShips } = store;

const selectedOption = ref(null);
const options = ref([]);
onMounted(() => {
  const token = localStorage.getItem('wafatoken') ? localStorage.getItem('wafatoken') : null;
  const url = import.meta.env.VITE_API_URL;
  //const url = 'https://www.backend.developpeur-junior.com/api';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.get(url + '/ships/pending')
    .then((response) => {
      if (response.status === 200) {
        options.value = response.data.ships;
      }
    }).catch((error) => {
      console.log(error);
    })
})
getShips();
const formFIle = reactive({
  file: "",
});
const changeSelect = (event) => {
  formFIle.file = event.target.files[0];
};
const search = ref("");

const loopSearch = async () => {
  await blAll(search.value);
};

const successMessage = ref(false);
const onSubmitFile = async () => {
  const form = new FormData();
  form.append("file", formFIle.file);
  await store.storebl(selectedOption.value.id, formFIle);
  if (!store.getErrors.length) {
    successMessage.value = true;
    setTimeout(() => {
      successMessage.value = false;
    }, 2000);
    blAll(search.value);
  }
  if (store.getErrors.length) {
    setTimeout(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: store.getErrors,
        allowOutsideClick: false,
      });
    }, 1000);
  }
};
// const searchQuery = ref("");
// const filteredData = computed(() => {
//   if (!searchQuery.value) {
//     return [];
//   }
//   const query = searchQuery.value.toLowerCase();
//   return store.bls.filter((item) =>
//     item.ship.name.toLowerCase().includes(query)
//   );
// });

const form = reactive({
  n: "",
  tonnage_mt: "",
  marchandise: "",
  receptionnaire: "",
  date_reception: "",
});
const handleClick = async (event) => {
  const n = event.currentTarget.dataset.n;
  const tonnage = event.currentTarget.dataset.tonnage;
  const marchandise = event.currentTarget.dataset.marchandise;
  const receptionnaire = event.currentTarget.dataset.receptionnaire;
  const reception = event.currentTarget.dataset.reception;
  const id = event.currentTarget.dataset.id;

  const { value: formValues } = await Swal.fire({
    title: "Mofifier navire",
    html: `
     <label  class="form-label">N</label>
    <input type="number" id="swal-input1" class="form-control mb-2 ml-0 me-1" value="${n}">
    <label  class="form-label">tonnage_mt</label>
    <input type="number"  id="swal-input2" step="0.001" class="form-control mb-2" value="${tonnage}">
    <label  class="form-label">marchandise</label>
    <input type="text"  id="swal-input3" class="form-control mb-2" value="${marchandise}">
    <label  class="form-label">receptionnaire</label>
    <input type="text"  id="swal-input4" class="form-control mb-2" value="${receptionnaire}">
    <label  class="form-label">date_reception</label>
    <input type="text"  id="swal-input5" class="form-control mb-2" value="${reception}">
    <input type="hidden" id="swal-input6" class="swal2-input" value="${id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "modifier",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (form.n = document.getElementById("swal-input1").value),
        (form.tonnage_mt = document.getElementById("swal-input2").value),
        (form.marchandise = document.getElementById("swal-input3").value),
        (form.receptionnaire = document.getElementById("swal-input4").value),
        (form.date_reception = document.getElementById("swal-input5").value),
        (form.id = document.getElementById("swal-input6").value),
      ];
    },
  });
  if (formValues) {
    onSubmit();
  }
};
const onSubmit = async () => {
  await store.updatebl(form.id, form);
  if (!store.getErrors.length) {
    blAll(search.value);
  }
  if (store.getErrors.length) {
    const alerError = Swal.fire({
      icon: "error",
      title: "Oops...",
      text: store.getErrors,
      allowOutsideClick: false,
    });
    setTimeout(() => {
      alerError = "";
    }, 2000);
  }
};

const deleteBl = async (event) => {
  const id = event.currentTarget.dataset.idbl;
  await store.destroyBl(id);
  if (!store.getErrors.length) {
    blAll(search.value);
  }
}

</script>

<style></style>