<template>
  <v-card>
    <h1 class="pa-1">Result</h1>
    <v-card-title>Form Result</v-card-title>
    
    <v-card-item>
      <!-- Preview Untuk Text Field -->
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

        <!-- Preview Untuk Text Field -->
        <v-col v-if="field.type == 'TextArea'" cols="12">
          <v-textarea
            :min="field.MinCounter"
            :label="field.Label"
            :rules="generateRules(field)"
            :required="field.FieldRequired"
            v-model="field.DefaultValue"
            variant="outlined"
          ></v-textarea>
        </v-col>

        <!-- Preview Untuk Single Selection -->
        <v-col v-if="field.type == 'SingleSelection'" cols="12">
          <v-select
            :label="field.Label"
            :items="field.Options"
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Preview Untuk Multiple Selection -->
        <v-col v-if="field.type == 'MultipleSelection'" cols="12">
          <v-select
            :label="field.Label"
            :items="field.Options"
            variant="outlined"
            multiple
          ></v-select>
        </v-col>


        <v-col v-if="field.type == 'DatePicker'" cols="12">
          <Datepicker
                  v-model="field.DefaultValue"
                  format="dd-mm-yyyy"
                  :label="field.Label"
                  :rules="[isRequired]"
          />
        </v-col>
        
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Datepicker from "./external/DatePicker.vue";
import { isRequired } from '../utils/formValidation'

const date = ref('')

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
      FieldRequired: boolean;
      Rules: string;
      DefaultValue?: string;
      Value: string;
      MinCounter?: number;
  }
  | 
  { 
      type: 'SingleSelection'; 
      Tab: number; 
      Label: string;
      Value: string; 
      FieldRequired: boolean;
      Options: string[];
      OptionsInput: string,
  }
  | 
  { 
      type: 'MultipleSelection'; 
      Tab: number; 
      Label: string;
      Value: string; 
      FieldRequired: boolean;
      Options: string[];
      OptionsInput: string,
  }
  | 
  { 
      type: 'DatePicker'; 
      Tab: number;
      Label: string;
      DefaultValue?: string;
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

onMounted(() => {
  console.log('ini di result',props.fields)
})
</script>
