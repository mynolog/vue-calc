<script lang="ts">
import type { PropType } from 'vue'
import type { CalculatorState } from '../types/calculator'
import type { Button } from '../constants/calculatorButtons'
import { defineComponent } from 'vue'
import {
  numberButtons,
  operationButtons,
  clearButton,
  undoButton,
} from '../constants/calculatorButtons'

export default defineComponent({
  data() {
    return {
      clearButton,
      undoButton,
      operationButtons,
      numberButtons,
    }
  },
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
    previousValue(): CalculatorState['previousValue'] {
      return this.calculatorState.previousValue
    },
    operator(): CalculatorState['operator'] {
      return this.calculatorState.operator
    },
    currentValue(): CalculatorState['currentValue'] {
      return this.calculatorState.currentValue
    },
    result(): CalculatorState['result'] {
      return this.calculatorState.result
    },
  },
  emits: [
    'setDisplayValue',
    'clearDisplay',
    'undoDisplayValue',
    'setOperator',
    'setPreviousValue',
    'setCurrentValue',
    'calculateResult',
    'setResult',
    'setCurrentFormular',
    'clearDisplayValue',
  ],
  methods: {
    handleButtonClick(value: Button['value']) {
      const operationTypes = ['+', '-', '*', '/']

      if (value === '.' && this.displayValue?.includes('.')) {
        return
      }

      if (value === '=') {
        const hasOperation = operationTypes.some((operation) =>
          this.displayValue?.includes(operation)
        )
        if (!hasOperation) {
          return
        }
        const currentValue = this.displayValue
          .replace(this.previousValue, '')
          .replace(this.operator, '')
        this.$emit('setCurrentValue', currentValue)

        this.handleEquals()
        return
      }

      if (operationTypes.includes(value)) {
        if (
          this.displayValue &&
          operationTypes.some((operator) => this.displayValue.includes(operator))
        ) {
          return
        }
        this.$emit('setPreviousValue', this.displayValue)
        this.$emit('setOperator', value)
      }

      if (
        operationTypes.includes(value) &&
        operationTypes.includes(this.displayValue[this.displayValue.length - 1])
      ) {
        return
      }

      this.$emit('setDisplayValue', value)
    },
    handleClear() {
      this.$emit('clearDisplay')
    },
    handleUndo(value: string) {
      this.$emit('undoDisplayValue', value)
    },
    handleEquals() {
      if (this.previousValue && this.operator && this.currentValue) {
        console.log('aa')
        this.$emit('calculateResult')
        this.$emit('setResult', this.result)
        this.$emit('setCurrentFormular', this.displayValue)
        this.$emit('clearDisplayValue')
      }
    },
  },
})
</script>

<template>
  <div class="keypad">
    <div class="operands">
      <button v-if="displayValue === '0'" class="clear" @click="handleClear">
        {{ clearButton.value }}
      </button>
      <button v-else class="undo" @click="handleUndo(displayValue)">{{ undoButton.label }}</button>
      <button
        class="numbers"
        v-for="button in numberButtons"
        :key="button.id"
        @click="handleButtonClick(button.value)"
      >
        {{ button.label }}
      </button>
    </div>
    <div class="operations">
      <button
        v-for="button in operationButtons"
        :key="button.id"
        @click="handleButtonClick(button.value)"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keypad {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  button {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    color: var(--text);
    font-size: 1.3rem;
  }

  .operands {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 5px;

    button {
      background-color: var(--operand-button);
    }
  }

  .clear,
  .undo {
    grid-column: span 3;
    width: 100%;
  }

  .numbers {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .operands button:nth-child(11) {
    grid-column: span 2;
    width: 100%;
  }

  .operands button:nth-child(12) {
    grid-column: span 1;
    width: 100%;
  }

  .operations {
    display: grid;
    grid-gap: 5px;

    button {
      background-color: var(--operation-button);
    }
  }
}
</style>
