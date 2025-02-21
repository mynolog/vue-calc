<script lang="ts">
import { defineComponent } from 'vue'
import CalculatorApp from './components/CalculatorApp.vue'

export default defineComponent({
  components: {
    CalculatorApp,
  },
})
</script>

<template>
  <div class="app-container">
    <calculator-app />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
