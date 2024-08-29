<template>
    <nav class="navbar navbar-example navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/dashboard-client">{{ $t('titleHeader') }}</a>
            <!-- <RouterLink to="/dashboard-client" class="navbar-brand">Suivi Bl</RouterLink> -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-ex-3">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar-ex-3">
                <div v-if="client.ships.length" class="navbar-nav me-auto">
                    <!-- <RouterLink v-for="ship in client.ships" :key="ship.id"
                        :to="{ name: 'client.ship', params: { id: ship.id } }" class="nav-item nav-link ">{{ ship.name
                        }}
                    </RouterLink> -->
                    <!-- <a class="nav-item nav-link active" href="javascript:void(0)">Home</a> -->
                    <a class="nav-item nav-link" v-for="ship in client.ships" :key="ship.id"
                        :href="`/bls/ship/${ship.id}`" @click="handleNavigation(ship)">{{ ship.name }}</a>
                </div>
                <div class="btn-group mx-1">
                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ $t('language') }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a @click.prevent="changeLanguage('fr')" class="dropdown-item"
                                href="javascript:void(0);">french</a></li>
                        <li><a @click.prevent="changeLanguage('en')" class="dropdown-item"
                                href="javascript:void(0);">english</a></li>
                    </ul>
                </div>
                <button @click.prevent="user.logout()" class="btn btn-outline-danger" type="button">{{ $t('logout')
                    }}</button>

            </div>
        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/client";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';

const user = useUserStore();
const client = useClientStore();
const route = useRoute();

onMounted(() => {
    client.shipByUser();
})
const handleNavigation = (ship) => {
    route.push({ name: 'bls.ship', params: { id: ship.id } })
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