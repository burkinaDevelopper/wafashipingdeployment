<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <h5 class="card-header">Client(*)</h5>
          <div class="card-body">
            <div class="mb-3">
              <label for="exampleFormControlSelectclient" class="form-label"
                >choisir le client</label
              >
              <select
                class="form-select"
                id="exampleFormControlSelectclient"
                aria-label="Default select example"
                v-model="id"
              >
                <option
                  v-for="user in user.users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bs-toast toast fade show bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        v-if="successMessage"
      >
        <div class="toast-header">
          <i class="bx bx-bell me-2"></i>
          <div class="me-auto fw-semibold">navire ajouter</div>
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
          <div class="me-auto fw-semibold">Remplire tout les champs</div>
          <small>il ya 1s</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-4">
          <h5 class="card-header">tout les champs(*) sont obligatoires</h5>
          <p class="card-header text-danger">
            Si l'un des champs marqués de (*) n'est pas renseigné, vous ne
            pourrez pas envoyer .
          </p>
          <div class="card-body">
            <div class="form-floating"></div>
          </div>
        </div>
      </div>

      <!-- Form controls -->

      <div class="col-md-6">
        <div class="card mb-4">
          <h5 class="card-header">Navire</h5>
          <div class="card-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Nom du navire(*)</label
              >
              <input
                type="texte"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="titanic"
                required
                v-model="form.name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1eta" class="form-label"
                >ETA</label
              >
              <input
                type="date"
                class="form-control"
                id="exampleFormControlInput1eta"
                placeholder="name@example.com"
                @change="etaDate($event.target.value)"
                v-model="form.eta"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1etb" class="form-label"
                >ETB</label
              >
              <input
                type="date"
                class="form-control"
                id="exampleFormControlInput1etb"
                placeholder="name@example.com"
                v-model="form.etb"
                :min="form.etb"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1etc" class="form-label"
                >ETC</label
              >
              <input
                type="date"
                class="form-control"
                id="exampleFormControlInput1etc"
                placeholder="name@example.com"
                v-model="form.etc"
                :min="form.etc"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Input Sizing -->
      <div class="col-md-6">
        <div class="card mb-4">
          <h5 class="card-header">Hold(*)</h5>
          <div class="card-body">
            <div class="mt-2 mb-3">
              <label for="largeInput" class="form-label">Nombre de Hold</label>
              <input
                id="largeInput"
                class="form-control form-control-lg"
                type="number"
                placeholder="5"
                min="0"
                max="10"
                required
                v-model="form.numberHold"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Default Checkboxes and radios & Default checkboxes and radios -->
      <button type="submit" class="btn btn-primary">Envoyer</button>
    </div>
  </form>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useShipStore } from "@/stores/shipStore";
import { reactive, ref } from "vue";

const user = useUserStore();
const store = useShipStore();
const shipStore = useShipStore();
user.getUsersAll();
const id = ref(null);
const successMessage = ref(false);
const errorMessage = ref(false);

const form = reactive({
  name: "",
  eta: null,
  etb: null,
  etc: null,
  numberHold: 0,
});
const etaDate = (e) => {
  let day = new Date(e);
  day.setDate(day.getDate() + 1);
  form.etb = day.toISOString().split("T")[0];
  form.etc = day.toISOString().split("T")[0];
};

const onSubmit = async () => {
  await shipStore.registerForm(id.value, form);
  if (!user.getErrors.length) {
    successMessage.value = true;
    store.getShips();
  }
  if (user.getErrors.length) {
    errorMessage.value = true;
  }

  setTimeout(() => {
    successMessage.value = false;
    errorMessage.value = false;
    form.name = "";
    form.numberHold = 0;
    form.etc = null;
    form.eta = null;
    form.etb = null;
  }, 2000);
};
</script>

<style>
</style>