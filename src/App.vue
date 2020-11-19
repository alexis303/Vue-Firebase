<template>
  <v-app>
    <v-content>
      <transition
        name="router-anim"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        mode="out-in"
      >
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {},
  name: "App",
  data: () => ({
    titulo: "Lista-Regalo"
  }),
  computed: {
    ocupado() {
      return this.$store.state.ocupado;
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Cute+Font&display=swap");
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import url('https://fonts.googleapis.com/css?family=Merienda&display=swap');

.titulo {
  font-family: "Cute Font", cursive;
}

.form-anim-enter-active {
  animation: form-anim-coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}
.theme--light.v-application{
  background: #fff !important;
}
.form-anim-leave-active {
  animation: form-anim-going 0.5s;
}

@keyframes form-anim-going {
  from {
    transform: translatex(0);
  }
  to {
    transform: translatex(-50px);
    opacity: 0;
  }
}

@keyframes form-anim-coming {
  from {
    transform: translatex(-50px);
  }
  to {
    transform: translatex(0);
    opacity: 1;
  }
}

</style>