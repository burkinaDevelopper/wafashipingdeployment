<template>
    <NavBarUser />
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <SideBarClient />
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                <NavBar />
                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->
                    <div class="col-md-6 mt-3 text-center-title">
                        <div class="card mb-4">
                            <h5 class="card-header">{{ $t('total_cargo_title') }}</h5>
                            <div class="card-body">
                                <div class="table-responsive text-nowrap">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>{{ $t('marchandise') }}</th>
                                                <th>{{ $t('total_bl_recu') }}</th>
                                                <th>{{ $t('total_bl_non_recu') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="client.sumBl.length" class="table-border-bottom-0">
                                            <tr v-for="bl in client.sumBl" :key="bl.category">
                                                <td class="text-left">{{ bl.category }}</td>
                                                <td class="text-end">{{ bl.sumTotal.toFixed(3) }}</td>
                                                <td class="text-end">{{ bl.sumTotalOf.toFixed(3) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><i
                                                        class="fab fa-angular fa-lg text-danger me-3"></i>
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="text-end"><strong>{{ client.getTotalMarchandise.toFixed(3)
                                                        }}</strong></td>
                                                <td class="text-end"><strong>{{ client.getTotalMarchandiseOf.toFixed(3)
                                                        }}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"> </span> {{ $t('blTitle')
                            }}</h4>

                        <div class="card">
                            <div class="table-responsive text-nowrap">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>{{ $t('tonnage') }}</th>
                                            <th>{{ $t('marchandise') }}</th>
                                            <th>{{ $t('reception') }}</th>
                                            <th>{{ $t('date_reception') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="client.bls.length" class="table-border-bottom-0">
                                        <tr v-for="bl in client.bls.sort((a, b) => a.n - b.n)" :key="bl.id">
                                            <td>{{ bl.n }}</td>
                                            <td>{{ bl.tonnage_mt }}</td>
                                            <td>{{ bl.marchandise }}</td>
                                            <td>{{ bl.receptionnaire }}</td>
                                            <td>{{ bl.date_reception == 'non_recu' ? "non reçu" : bl.date_reception }}
                                            </td>
                                        </tr>
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
import NavBarUser from '../components/NavBarUser.vue'
import SideBarClient from '@/components/SideBarClient.vue';
import Footer from '../components/Footer.vue'
import { useClientStore } from "@/stores/client";
import { useRoute } from "vue-router";

const route = useRoute();

const client = useClientStore();

client.blsByShip(route.params.id);
</script>

<style scoped>
.text-center-title {
    margin: 0 auto;
}

.textend {
    text-align: right;
}
</style>