<script lang="ts">
import type { CalculatorState } from '../types/calculator'
import { defineComponent } from 'vue'
import CalculatorDisplay from './CalculatorDisplay.vue'
import CalculatorKeypad from './CalculatorKeypad.vue'

const initialState: CalculatorState = {
  displayValue: '0',
  currentValue: '0',
  previousValue: '0',
  operator: '',
  result: '0',
  currentFormular: '',
}

export default defineComponent({
  components: {
    CalculatorDisplay,
    CalculatorKeypad,
  },
  data() {
    return {
      calculatorState: { ...initialState },
    }
  },
  methods: {
    setDisplayValue(value: string) {
      this.calculatorState.displayValue =
        this.calculatorState.displayValue === '0'
          ? value
          : this.calculatorState.displayValue + value
    },
    clearDisplayValue() {
      this.calculatorState.displayValue = '0'
    },
    clearDisplay() {
      this.calculatorState = { ...initialState }
    },
    undoDisplayValue(value: string) {
      if (this.calculatorState.displayValue.length > 1) {
        this.calculatorState.displayValue = value.slice(0, -1)
      } else {
        this.clearDisplay()
      }
    },
    setOperator(value: string) {
      this.calculatorState.operator = value
    },
    setPreviousValue(value: string) {
      this.calculatorState.previousValue = value
    },
    setCurrentValue(value: string) {
      this.calculatorState.currentValue = value
    },
    calculateResult() {
      const prev = parseFloat(this.calculatorState.previousValue)
      const current = parseFloat(this.calculatorState.currentValue)

      switch (this.calculatorState.operator) {
        case '+':
          this.calculatorState.result = Number((prev + current).toFixed(8)).toString()
          break
        case '-':
          this.calculatorState.result = Number((prev - current).toFixed(8)).toString()
          break
        case '*':
          this.calculatorState.result = Number((prev * current).toFixed(8)).toString()
          break
        case '/':
          if (this.calculatorState.currentValue === '0') {
            this.calculatorState.result = '부정식'
          } else {
            this.calculatorState.result = Number((prev / current).toFixed(8)).toString()
          }
          break
        default:
          this.calculatorState.result = '0'
      }
    },
    setResult(value: string) {
      this.calculatorState.result = value
    },
    setCurrentFormular(value: string) {
      this.calculatorState.currentFormular = value
    },
  },
})
</script>

<template>
  <div class="calculator">
    <calculator-display :calculator-state="calculatorState" />
    <calculator-keypad
      :calculator-state="calculatorState"
      @set-display-value="setDisplayValue"
      @clear-display="clearDisplay"
      @undo-display-value="undoDisplayValue"
      @set-operator="setOperator"
      @set-previous-value="setPreviousValue"
      @set-current-value="setCurrentValue"
      @calculate-result="calculateResult"
      @set-result="setResult"
      @set-current-formular="setCurrentFormular"
      @clear-display-value="clearDisplayValue"
    />
  </div>
</template>

<style scoped>
.calculator {
  width: 230px;
  height: 400px;
  border-radius: 10px;
  background-color: var(--background);
  color: var(--text);
  display: grid;
  grid-template-rows: 3fr 7fr;
}
</style>
