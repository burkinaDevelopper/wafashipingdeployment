<script setup>
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const timeout = ref(null);
const inactivityTime = ref(6000000); //1000=1s 60000=1min

if (user.logged) {
  const startTimeout = () => {
    inactivityTime.value = 6000000;
    timeout.value = setTimeout(() => {
      // console.log("L’utilisateur est inactif");
      user.logout();
    }, inactivityTime.value);
  };
  const resetTimeout = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    // console.log("Vous êtes actif");
    startTimeout();
  };

  const setupInactivityDetection = () => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((event) => {
      window.addEventListener(event, () => {
        resetTimeout();
      });
    });
    startTimeout();
  };
  setupInactivityDetection();

  onMounted(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((event) => {
      window.removeEventListener(event, () => {
        resetTimeout();
      });
    });
  });
}

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://buttons.github.io/buttons.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
