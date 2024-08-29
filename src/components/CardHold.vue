<template>
  <div class="vertical-align">
    <div class="p-2 border">
      <strong class="ms-2 d-flex justify-content-between"><span>{{ props.hold.name }}- {{ props.hold.type }}</span>
        <span class="float-right">
          <i :data-idhold="props.hold.id" @click="AddHistory($event)"
            class="bi bi-clock-history mx-2 cursor-pointer"></i>
          <i :data-name="props.hold.name" :data-category="props.hold.type" :data-tcargo="props.hold.Total_cargo"
            :data-tdischarged="props.hold.Total_discharged" :data-id="props.hold.id" @click="handleClick($event)"
            class="bx bx-edit-alt me-1 mx-2 cursor-pointer"></i><i @click="deleteHold($event)"
            :data-holdname="props.hold.name" :data-holdid="props.hold.id"
            class="bx bx-trash me-1 mx-2 text-danger cursor-pointer"></i></span>
      </strong>
    </div>
    <div class="p-2 border">{{ props.hold.Total_cargo }}</div>
    <div class="p-2 border">{{ props.hold.Total_discharged }}</div>
    <div class="p-2 border">
      {{ (props.hold.Total_cargo - props.hold.Total_discharged).toFixed(3) }}
    </div>
    <div class="p-0 border ">

      <div v-if="props.hold.holdHistories.length">
        <p v-for="holdHistory in props.hold.holdHistories" :key="holdHistory.id"
          class="card-text mt-0 mb-0 fs-6 border heighborder">
          {{ holdHistory.discharged }}&nbsp; &nbsp; &nbsp;
          <!-- <em class="fs-6">
            <i class="bi bi-clock"></i> {{ holdHistory.history }} 
           </em> -->
          <i @click="deleteHoldHistory($event)" :data-historydischarged="holdHistory.discharged"
            :data-historyid="holdHistory.id" class="bx bx-trash ms-3 text-danger cursor-pointer"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShipStore } from "@/stores/shipStore";
import Swal from "sweetalert2";
import { reactive } from "vue";

const store = useShipStore();
const props = defineProps(["hold", "ship_id"]);

const form = reactive({
  name: "",
  category: "",
  tcargo: "",
  tdischarged: "",
  id: "",
});
const formHistory = reactive({
  discharged: 0,
  history: "",
  id: "",
});

const AddHistory = async (event) => {
  const id = event.currentTarget.dataset.idhold;
  const { value: formValues } = await Swal.fire({
    title: "ajouter rapport",
    html: `
    <label for="" class="form-label">decharger</label>
    <input type="number" id="swal-input6" step="0.001" class="form-control mb-2" value="">
    <label for="" class="form-label">date</label>
    <input type="date"   id="swal-input7" class="form-control mb-2" value="">
    <input type="hidden" id="swal-input8" class="swal2-input" value="${id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "Ajouter",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (formHistory.discharged = document.getElementById("swal-input6").value),
        (formHistory.history = document.getElementById("swal-input7").value),
        (formHistory.id = document.getElementById("swal-input8").value),
      ];
    },
  });
  if (formHistory.id) {
    onSubmitForm();
  }
};

const onSubmitForm = async () => {
  await store.storeHoldHistory(formHistory.id, formHistory);
  if (!store.getErrors.length) {
    store.showShip(props.ship_id);
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

const handleClick = async (event) => {
  const name = event.currentTarget.dataset.name;
  const category = event.currentTarget.dataset.category;
  const tcargo = event.currentTarget.dataset.tcargo;
  const tdischarged = event.currentTarget.dataset.tdischarged;
  const id = event.currentTarget.dataset.id;

  const { value: formValues } = await Swal.fire({
    title: "Mofifier Hold",
    html: `
    <label for="" class="form-label">Nom du Hold</label>
    <input type="text" id="swal-input1" class="form-control mb-2" value="${name}">
    <label for="" class="form-label">category</label>
    <input type="text"   id="swal-input2" class="form-control mb-2" value="${category}">
    <label for="" class="form-label">Total cargo</label>
    <input type="number" step="0.001"  id="swal-input3" class="form-control mb-2" value="${tcargo}">
    <label for="" class="form-label">Total decharger</label>
    <input type="number" step="0.001"  id="swal-input4" class="form-control mb-2" value="${tdischarged}">
    <input type="hidden" id="swal-input5" class="swal2-input" value="${id}">
  `,
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonText: "modifier",
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (form.name = document.getElementById("swal-input1").value),
        (form.category = document.getElementById("swal-input2").value),
        (form.tcargo = document.getElementById("swal-input3").value),
        (form.tdischarged = document.getElementById("swal-input4").value),
        (form.id = document.getElementById("swal-input5").value),
      ];
    },
  });
  if (formValues) {
    onSubmit();
  }
};
const onSubmit = async () => {
  await store.updateHold(form.id, form);
  if (!store.getErrors.length) {
    store.showShip(props.ship_id);
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
const deleteHold = (event) => {
  const id = event.currentTarget.dataset.holdid;
  const name = event.currentTarget.dataset.holdname;
  Swal.fire({
    icon: "error",
    title: name,
    text: "Voulez-vous supprimer cet Hold ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await store.destroyHold(id);
      store.showShip(props.ship_id);
    }
  });
};

const deleteHoldHistory = (event) => {
  const id = event.currentTarget.dataset.historyid;
  const discharged = event.currentTarget.dataset.historydischarged;
  Swal.fire({
    icon: "error",
    title: discharged,
    text: "Voulez-vous supprimer ce rapport ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await store.destroyHoldHistory(id);
      store.showShip(props.ship_id);
    }
  });
};
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