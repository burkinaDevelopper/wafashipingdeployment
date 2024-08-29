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
      <li class="menu-item" :class="{ active: isActive('/dashboard') }">
        <router-link to="/dashboard" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </router-link>
      </li>
      <li class="menu-item" :class="{ active: isActive('/user') }">
        <router-link to="/user" class="menu-link">
          <i class="bi bi-people"></i> &nbsp; &nbsp;
          <div data-i18n="Analytics">Client</div>
        </router-link>
      </li>
      <li class="menu-item" :class="{ active: isActive('/bls') }">
        <router-link to="/bls" class="menu-link">
          <i class="bi bi-file-arrow-down"></i> &nbsp; &nbsp;
          <div data-i18n="Analytics">Suivi BL</div>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (url) => {
  return route.fullPath == url;
};
</script>

<style></style>