<template>
  <v-card>
    <h1 class="pa-1">Result</h1>
    <v-card-title>Form Result</v-card-title>
    <v-card-item>
      <v-row v-for="(field, index) in fields" :key="index">
        <v-col v-if="field.type == 'TextField'" cols="12">
          <v-text-field
            :label="field.Label"
            :type="getFieldType(field.Rules)"
            :rules="generateRules(field)"
            :required="field.FieldRequired"
            v-model="field.DefaultValue"
            variant="outlined"
            :counter="field.MinCounter"
            :minlength="field.MinCounter"
            :maxlength="field.Counter"
          ></v-text-field>    
        </v-col>
        <!-- <v-col v-if="field.Type == 'TextArea'" cols="12">
          <v-textarea
            :min="field.Min"
            :label="field.Label"
            :rules="generateRules(field)"
            :required="field.FieldRequired"
            v-model="field.DefaultValue"
            variant="outlined"
          ></v-textarea>
        </v-col> -->
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type Field = 
  | 
  { 
      type: 'TextField';
      Tab: number; 
      Label: string; 
      FieldRequired: boolean;
      Rules: string;
      DefaultValue?: string;
      Value: string;
      MinCounter?: number;
      Counter?: number;
  }
  | 
  { 
      type: 'TextArea'; 
      Tab: number; 
      Label: string; 
      FieldRequired: boolean 
  }
  | 
  { 
      type: 'Select'; 
      Tab: number; 
      Value: string; 
      FieldRequired: boolean
  }
  | 
  { 
      type: 'Datepicker'; Tab: number; 
      Value: string | Date; 
      FieldRequired: boolean 
  };

// Props untuk menerima data dari parent
const props = defineProps<{
  fields: Field[];
}>();

// Fungsi untuk menghasilkan rules berdasarkan tipe field
const generateRules = (field: Field) => {
  const rules = [];
  if (field.FieldRequired) {
    rules.push((v: string) => !!v || "This field is required.");
  } 

   // Tambahkan aturan untuk minimum panjang karakter
   if (field.MinCounter) {
    rules.push((v: string) =>
      v.length >= field.MinCounter || `Minimum ${field.MinCounter} characters required.`
    );
  }

  // Tambahkan aturan untuk maksimum panjang karakter jika diperlukan
  if (field.Counter) {
    rules.push((v: string) =>
      v.length <= field.Counter || `Maximum ${field.Counter} characters allowed.`
    );
  }
  return rules;

};

// Fungsi untuk menentukan tipe field berdasarkan Rules
const getFieldType = (rule: string): string => {
  switch (rule) {
    case "Number":
      return "number";
    default:
      return "text";
  }
};
</script>
