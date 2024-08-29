<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <!-- Register -->
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center">
              <a href="index.html" class="app-brand-link gap-2">
                <span class="app-brand-logo demo">
                  <img src="@/assets/img/logowafa.png" alt="" width="70">
                </span>
                <span class="app-brand-text demo text-body fw-bolder">Wafa shipping</span>
              </a>
            </div>
            <h4 class="mb-2">Bienvenue Wafa shipping! 👋</h4>
            <ErrorsMessage v-if="user.getErrors.length" :errors="user.getErrors" />

            <form id="formAuthentication" class="mb-3" @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Email" autofocus v-model="form.email" />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">mote de passe</label>
                </div>
                <div class="input-group input-group-merge">
                  <input type="password" v-model="form.password" class="form-control" name="password"
                    aria-describedby="password" />
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember-me" />
                  <label class="form-check-label" for="remember-me">
                    Se souvenir
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">
                  se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- /Register -->
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorsMessage from "../../components/ErrorsMessage.vue";
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const user = useUserStore();
const form = reactive({
  email: "",
  password: "",
});
const onSubmit = () => {
  user.login(form);
};
const router = useRouter();
console.log(router);


</script>

<style></style>