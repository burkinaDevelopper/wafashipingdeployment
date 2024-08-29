<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-logo demo">

        </span>
        <span class="app-brand-text demo menu-text fw-bolder ms-2">Wafa shipping</span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <li class="menu-item" :class="{ active: isActive('/dashboard-client') }">
        <a href="/dashboard-client" class="menu-link">
          <div data-i18n="Analytics">Accueil</div>
        </a>
      </li>
      <!-- <li v-for="ship in client.ships" :key="ship.id" @click="handleNavigation(ship)" class="menu-item"
        :class="{ active: isActive('/dashboard') }">
        <a :href="`/client/${ship.id}`" class="menu-link">
          <div data-i18n="Analytics">{{ ship.name }}</div>
        </a>
      </li> -->
      <li v-for="ship in client.ships" :key="ship.id" class="menu-item">
        <a :href="`/holds/ship/${ship.id}`" @click="handleNavigation(ship)" class="menu-link">
          <div data-i18n="Analytics">{{ ship.name }}</div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/client";
import { onMounted } from "vue";

import { useI18n } from 'vue-i18n';

const route = useRoute();

const isActive = (url) => {
  return route.fullPath == url;
};


const user = useUserStore();
const client = useClientStore();


onMounted(() => {
  client.shipByUser();
})
const handleNavigation = (ship) => {
  route.push({ name: 'holds.ship', params: { id: ship.id } })
    .then(() => {
      window.location.reload();
    });
}
const { t, locale } = useI18n();
const changeLanguage = (newLocale) => {
  locale.value = newLocale;
};

</script>

<style></style>