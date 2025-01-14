<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { isRequired } from '../../utils/formValidation'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: String,
  format: String,
  rules: Array,
  required: Boolean,
  placeholder: String,
  disabledDate: String as any,
})

const emit = defineEmits({
  'update:modelValue': String,
})

const datePicker = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const disabledDates = computed(() => {
  const parsedDisabledDate = new Date(props.disabledDate);
  parsedDisabledDate.setHours(0, 0, 0, 0); // Normalize the date to midnight

  return (date) => {
    date.setHours(0, 0, 0, 0); // Normalize the date to midnight
    return date < parsedDisabledDate;
  };
});

// --- Define State and Declarations ---
const vuetifyTheme = useTheme()
const selectedDate = ref(new Date())

const format = (targetDate: Date) => {
  const day = String(targetDate.getDate()).padStart(2, '0')
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const year = targetDate.getFullYear()
  const formatString = props.format

  const updatedDate = formatString
    ?.replace('dd', day.toString())
    .replace('mm', month.toString())
    .replace('yyyy', year.toString())

  datePicker.value = updatedDate
}

const emitValue = () => {
  emit('update:modelValue', datePicker.value)
}

</script>
<template>
  <VueDatePicker
    v-bind="$attrs"
    :format="format"
    :append-to-body="false"
    :popup-position="'bottom'"
    @update:model-value="emitValue"
    v-model="selectedDate"
    :disabled-dates="disabledDates"
    position="left"
    :enable-time-picker="false"
    v-if="vuetifyTheme.global.name.value === 'light'"
  >
    <template #trigger>
      <v-text-field
        :label="props.label"
        prepend-inner-icon="mdi-calendar-range"
        v-model="datePicker"
        :placeholder="props.placeholder"
        :rules="props.required ? [isRequired] : []"
        readonly
        variant="outlined"
      />
    </template>
  </VueDatePicker>
  <VueDatePicker
    dark
    v-bind="$attrs"
    :format="format"
    position="left"
    :append-to-body="false"
    :popup-position="'bottom'"
    @update:model-value="emitValue"
    v-model="selectedDate"
    :enable-time-picker="false"
    class="dp__theme_dark"
    v-if="vuetifyTheme.global.name.value === 'dark'"
  >
    <template #trigger>
      <v-text-field
        :label="props.label"
        prepend-inner-icon="mdi-calendar-range"
        v-model="datePicker"
        :placeholder="props.placeholder"
        :rules="props.required ? [isRequired] : []"
        readonly
      />
    </template>
  </VueDatePicker>
</template>

<style lang="scss" scoped>
:deep() .dp__theme_dark {
  --dp-background-color: #28243d;
  --dp-font-family: inter, sans-serif, -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --dp-primary-color: #9155fd;
}
:deep() .dp__theme_light {
  --dp-primary-color: #ffb003;
  --dp-font-family: inter, sans-serif, -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

:deep() .dp__action_button {
  padding: 0 15px;
  margin: 8px 5px;
  height: 34px;
  text-transform: uppercase;
  font-weight: 500;
}

:deep() .date-picker-container .vdtp-popup {
  top: 100% !important; /* Position the popup at the bottom */
  left: 0; /* Align it to the left */
  margin-top: 8px; /* Add some space if needed */
}
:deep().dp--menu-wrapper {
  top: 66px !important;
  bottom: 0 !important;
}
</style>
