<template>
  <tr :class="{ 'bg-success': props.ship.status == 'finish' }">
    <td>
      <strong><router-link :to="{ name: 'ship.show', params: { id: props.ship.id } }">{{ props.ship.name
          }}</router-link></strong>
    </td>
    <td>{{ props.ship.eta }}</td>
    <td>{{ props.ship.etb }}</td>
    <td>{{ props.ship.etc }}</td>
    <td>
      <div class="d-flex align-items-end justify-content-space-evenly">
        <span>
          <div class="col-lg-4 col-md-6">
            <div class="mt-3">
              <!-- Button trigger modal -->

              <button type="button" class="btn btn-primary btn-xs" data-bs-toggle="modal" data-bs-target="#modalTop"
                :data-name="props.ship.name" :data-status="props.ship.status" :data-eta="props.ship.eta"
                :data-etb="props.ship.etb" :data-etc="props.ship.etc" :data-id="props.ship.id"
                @click="handleClick($event)">
                <i class="bx bx-edit-alt me-1"></i>
              </button>

              <!-- Modal -->
            </div>
          </div>
        </span>
        <span>
          <button @click="destroyShip()" type="button" class="btn btn-xs btn-danger">
            <i class="bx bx-trash me-1"></i>
          </button>
        </span>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { useShipStore } from "@/stores/shipStore";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";

const store = useShipStore();
const props = defineProps(["ship"]);

const successMessage = ref(false);
const errorMessage = ref(false);

const form = reactive({
  name: "",
  status: "",
  eta: "",
  etb: "",
  etc: "",
  id: "",
});
const handleClick = async (event) => {
  const name = event.currentTarget.dataset.name;
  const status = event.currentTarget.dataset.status;
  const eta = event.currentTarget.dataset.eta;
  const etb = event.currentTarget.dataset.etb;
  const etc = event.currentTarget.dataset.etc;
  const id = event.currentTarget.dataset.id;

  const { value: formValues } = await Swal.fire({
    title: "Mofifier navire",
    html: `
    <label for="" class="form-label">Nom du navire</label>
    <input type="text" id="swal-input1" class="form-control mb-2" value="${name}">
    <label for="" class="form-label">Status</label>
    <select value="${status}" class="form-control mb-2" id="swal-input2">
        <option value="pending">pending</option>
        <option value="finish">finish</option>
    </select>
    <label for="" class="form-label">ETA</label>
    <input type="date" min="${eta}" id="swal-input3" class="form-control mb-2" value="${eta}">
    <label for="" class="form-label">ETB</label>
    <input type="date" min="${eta}" id="swal-input4" class="form-control mb-2" value="${etb}">
    <label for="" class="form-label">ETC</label>
    <input type="date" min="${eta}" id="swal-input5" class="form-control mb-2" value="${etc}">
    <input type="hidden" id="swal-input6" class="swal2-input" value="${id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "modifier",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (form.name = document.getElementById("swal-input1").value),
        (form.status = document.getElementById("swal-input2").value),
        (form.eta = document.getElementById("swal-input3").value),
        (form.etb = document.getElementById("swal-input4").value),
        (form.etc = document.getElementById("swal-input5").value),
        (form.id = document.getElementById("swal-input6").value),
      ];
    },
  });
  if (form.name) {
    onSubmit();
  }
};

const etaDate = (e) => {
  let day = new Date(e);
  day.setDate(day.getDate() + 1);
  form.etb = day.toISOString().split("T")[0];
  form.etc = day.toISOString().split("T")[0];
};

const onSubmit = async () => {
  await store.updateShip(form.id, form);
  if (!store.getErrors.length) {
    successMessage.value = true;
    store.getShips();
  }
  if (store.getErrors.length) {
    errorMessage.value = true;
  }

  setTimeout(() => {
    successMessage.value = false;
    errorMessage.value = false;
  }, 2000);
};

const id = ref(props.ship.id);

const destroyShip = async () => {
  Swal.fire({
    icon: "error",
    title: form.name,
    text: "Voulez-vous supprimer cet navire ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await store.destroy(id.value);
      store.getShips();
    }
  });
};
</script>

<style></style>