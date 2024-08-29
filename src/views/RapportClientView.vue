<template>
    <NavBarRapport />
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <!-- <SideBarClient /> -->
            <!-- / Menu -->
            <SideBarClientRapport />

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                <!-- <NavBar /> -->
                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 mb-4">
                            <span class="text-muted fw-light">selectionner le navire /</span>
                        </h4>

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

import Footer from '../components/Footer.vue'
import NavBarRapport from '@/components/NavBarRapport.vue';
import SideBarClientRapport from '@/components/SideBarClientRapport.vue';

</script>
<style></style>