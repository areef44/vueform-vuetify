<template>
  <v-row>
    <v-col cols="6">
      <FormInput @update:fields="updateFields" />
    </v-col>
    <v-col cols="6">
      <FormResult :fields="fields" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormInput from "./FormInput.vue";
import FormResult from "./FormResult.vue";

interface Field {
  Tab: number,
  Type: string;
  Label: string;
  FieldRequired: boolean;
  Rules: string;
  Value: string;
}

// State global untuk menyimpan data fields
const fields = ref<Field[]>([]);

// Fungsi untuk menerima update dari FormInput
const updateFields = (newFields: Field[]) => {
  fields.value = newFields;
};

watch(fields, () => {
})
</script>
