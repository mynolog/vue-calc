<script lang="ts">
import type { PropType } from 'vue'
import type { CalculatorState } from '../types/calculator'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    calculatorState: {
      type: Object as PropType<CalculatorState>,
      required: true,
    },
  },

  computed: {
    displayValue(): CalculatorState['displayValue'] {
      return this.calculatorState.displayValue
    },
    result(): CalculatorState['result'] {
      return this.calculatorState.result
    },
    currentFormular(): CalculatorState['currentFormular'] {
      return this.calculatorState.currentFormular
    },
  },
})
</script>

<template>
  <div class="display">
    <span v-show="currentFormular" class="current-formular">{{ currentFormular }}</span>
    <span v-if="!currentFormular" class="current-value">{{ displayValue }}</span>
    <span v-else-if="currentFormular && result" class="current-value">{{ result }}</span>
  </div>
</template>

<style scoped>
.display {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  .current-value {
    font-size: 2.2rem;
    padding: 12px;
  }

  .current-formular {
    font-size: 1.2rem;
    padding: 0 12px;
    color: var(--formular-text);
  }
}
</style>
