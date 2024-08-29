<template>
  <tr>
    <td>
      <i class="fab fa-angular fa-lg text-danger me-3"></i>
      <strong>{{ props.user.name }}</strong>
    </td>
    <td>{{ props.user.email }}</td>

    <td>
      <span class="badge bg-label-primary me-1">
        {{ props.user.passwordview }}</span>
    </td>
    <td>
      <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
          class="avatar avatar-xs pull-up" title="Lilian Fuller">
          <img src="@/assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
        </li>
        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
          class="avatar avatar-xs pull-up" title="Sophia Wilkerson">
          <img src="@/assets/img/avatars/6.png" alt="Avatar" class="rounded-circle" />
        </li>
        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
          class="avatar avatar-xs pull-up" title="Christina Parker">
          <img src="@/assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
        </li>
      </ul>
    </td>
    <td>
      <div class="d-flex align-items-end justify-content-space-evenly">
        <span>
          <div class="col-lg-4 col-md-6">
            <div class="mt-3">
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary btn-xs" data-bs-toggle="modal" data-bs-target="#modalTop"
                :data-name="props.user.name" :data-email="props.user.email" :data-password="props.user.passwordview"
                :data-role="props.user.role" :data-id="props.user.id" @click="handleClick($event)">
                <i class="bx bx-edit-alt me-1"></i>
              </button>

              <!-- Modal -->
            </div>
          </div>
        </span>
        <span>
          <button @click="deleteUser($event)" type="button" class="btn btn-xs btn-danger" :data-userid="props.user.id"
            :data-username="props.user.name">
            <i class="bx bx-trash me-1"></i>
          </button>
        </span>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";

const props = defineProps(["user"]);
const user = useUserStore();

const successMessage = ref(false);
const errorMessage = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: "",
  id: "",
});
const handleClick = async (event) => {
  const name = event.currentTarget.dataset.name;
  const email = event.currentTarget.dataset.email;
  const password = event.currentTarget.dataset.passwordview;
  const role = event.currentTarget.dataset.role;
  const id = event.currentTarget.dataset.id;

  const { value: formValues } = await Swal.fire({
    title: "Mofifier Client",
    html: `
    <label for="" class="form-label">Nom</label>
    <input type="text" id="swal-input1" class="form-control mb-2" value="${name}">
    <label for="" class="form-label">Email</label>
    <input type="email"  id="swal-input2" class="form-control mb-2" value="${email}">
    <label for="" class="form-label">mot de passe</label>
    <input type="password" id="swal-input3" class="form-control mb-2" value="${password}">
    <select value="${role}" class="form-control mb-2" id="swal-input4">
        <option value="user">user</option>
        <option value="admin">admin</option>
    </select>
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
        (form.email = document.getElementById("swal-input2").value),
        (form.password = document.getElementById("swal-input3").value),
        (form.role = document.getElementById("swal-input4").value),
        (form.id = document.getElementById("swal-input5").value),
      ];
    },
  });
  if (formValues) {
    onSubmit();
  }
};

const onSubmit = async () => {
  await user.updateClient(form);
  if (!user.getErrors.length) {
    successMessage.value = true;
    user.getUsersAll();
  }
  if (user.getErrors.length) {
    errorMessage.value = true;
  }

  setTimeout(() => {
    successMessage.value = false;
    errorMessage.value = false;
  }, 2000);
};

const deleteUser = (event) => {
  const id = event.currentTarget.dataset.userid;
  const name = event.currentTarget.dataset.username;
  Swal.fire({
    icon: "error",
    title: name,
    text: "Voulez-vous supprimer cet utilisateur ?",
    showCancelButton: true,
    cancelButtonText: "Retour",
    confirmButtonText: "Oui",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await user.destroy(id);
      user.getUsersAll();
    }
  });
};
</script>

<style>
.justify-content-space-evenly {
  justify-content: space-evenly !important;
}
</style>