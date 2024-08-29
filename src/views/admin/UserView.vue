<template>
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
              <!-- Basic with Icons -->
              <div class="col-xxl">
                <div class="card mb-4">
                  <div
                    class="card-header d-flex align-items-center justify-content-between"
                  >
                    <h5 class="mb-0">Ajouter un Client</h5>
                  </div>
                  <div class="card-body">
                    <div
                      class="bs-toast toast fade show bg-success"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      v-if="successMessage"
                    >
                      <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">client créé</div>
                        <small>il ya 2s</small>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                    <ErrorsMessage
                      v-if="user.getErrors.length"
                      :errors="user.getErrors"
                    />
                    <form @submit.prevent="onSubmit">
                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-icon-default-fullname"
                          >Nom(*)</label
                        >
                        <div class="col-sm-10">
                          <div class="input-group input-group-merge">
                            <span
                              id="basic-icon-default-fullname2"
                              class="input-group-text"
                              ><i class="bx bx-user"></i
                            ></span>
                            <input
                              type="text"
                              class="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="John Doe"
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              v-model="form.name"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-icon-default-email"
                          >Email(*)</label
                        >
                        <div class="col-sm-10">
                          <div class="input-group input-group-merge">
                            <span class="input-group-text"
                              ><i class="bx bx-envelope"></i
                            ></span>
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              class="form-control"
                              placeholder="john.doe"
                              aria-label="john.doe"
                              aria-describedby="basic-icon-default-email2"
                              v-model="form.email"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-icon-default-password"
                          >mot de passe(*)</label
                        >
                        <div class="col-sm-10">
                          <div class="input-group input-group-merge">
                            <span class="input-group-text"
                              ><i class="bx bx-comment"></i>
                            </span>
                            <input
                              type="password"
                              id="basic-icon-default-password"
                              class="form-control"
                              placeholder="*****"
                              v-model="form.password"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">
                            ajouter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <h5 class="card-header">Liste des clients</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>email</th>
                      <th>mot de passe</th>
                      <th>Client</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0 containerimg">
                    <img
                      src="@/assets/img/loading.gif"
                      alt=""
                      v-if="user.getLoading"
                    />
                    <CardUser
                      v-for="(user, index) in users"
                      :key="index"
                      :user="user"
                    />
                  </tbody>
                </table>
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
import ErrorsMessage from "../../components/ErrorsMessage.vue";
import CardUser from "../../components/CardUser.vue";
import Footer from "../../components/Footer.vue";
import SideBar from "../../components/SideBar.vue";
import NavBar from "../../components/NavBar.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const user = useUserStore();
const { users, errors } = storeToRefs(user);
const { getUsersAll, createClient } = user;

getUsersAll();
const successMessage = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
});
const onSubmit = async () => {
  await createClient(form);
  if (!user.getErrors.length) {
    successMessage.value = true;
  }
  getUsersAll();
  setTimeout(() => {
    successMessage.value = false;
  }, 2000);
};
</script>
<style  scoped>
.containerimg {
  position: relative; /* Position relative pour le conteneur parent */
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}

.containerimg img {
  position: absolute; /* Position absolue pour l'image */
  top: 10px; /* Vous pouvez ajuster ces valeurs */
  left: 50%; /* pour positionner l'image */
  width: 100px; /* Taille de l'image */
  height: auto; /* Conserver les proportions */
  transform: translateX(-50%);
}
</style>