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
            <h4 class="fw-bold py-3 mb-4">
              <span class="text-muted fw-light">Formulaire/</span>
              Administrateur
            </h4>

            <!-- Basic Layout & Basic with Icons -->
            <div class="row">
              <!-- Basic Layout -->
              <div class="col-xxl">
                <div class="card mb-4">
                  <div
                    class="card-header d-flex align-items-center justify-content-between"
                  >
                    <h5 class="mb-0">Tous les champs sont obligatoires.</h5>
                    <small class="text-muted float-end"
                      >information actuel</small
                    >
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
                        <div class="me-auto fw-semibold">client modifier</div>
                        <small>il ya 2s</small>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                    <div
                      class="bs-toast toast fade show bg-danger"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      v-if="errorMessage"
                    >
                      <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">
                          Remplire tout les champs
                        </div>
                        <small>il ya 1s</small>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                    <form @submit.prevent="onSubmit">
                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-default-name"
                          >Nom</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="basic-default-name"
                            placeholder="John Doe"
                            v-model="form.name"
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-default-email"
                          >Email</label
                        >
                        <div class="col-sm-10">
                          <div class="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-default-email"
                              class="form-control"
                              placeholder="john.doe@gmail.com"
                              v-model="form.email"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          class="col-sm-2 col-form-label"
                          for="basic-default-password"
                          >mot de passe</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="basic-default-password"
                            placeholder="****"
                            v-model="form.password"
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">role</label>
                        <div class="col-sm-10">
                          <select v-model="form.role" class="form-control">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        </div>
                      </div>
                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">
                            modifier
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- Basic with Icons -->
              <button @click="deleteUser" type="button" class="btn btn-danger">
                supprimer compte
              </button>
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
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Footer from "../../components/Footer.vue";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";

const user = useUserStore();
const successMessage = ref(false);
const errorMessage = ref(false);
const form = reactive({
  name: user.getUser.name,
  email: user.getUser.email,
  password: "",
  role: user.getUser.role,
  id: user.getUser.id,
});
const onSubmit = async () => {
  await user.updateAdmin(form);
  if (!user.getErrors.length) {
    successMessage.value = true;
  }
  if (user.getErrors.length) {
    errorMessage.value = true;
  }

  setTimeout(() => {
    successMessage.value = false;
    errorMessage.value = false;
  }, 2000);
};
const deleteUser = () => {
  Swal.fire({
    icon: "error",
    title: form.name,
    text: "Voulez-vous supprimer cet utilisateur ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await user.destroyAdmin(form.id);
    }
  });
};
</script>

<style>
</style>