<template>
  <v-card>
    <v-card-title>Form Input</v-card-title>
    <v-tabs v-model="tabs">
      <v-tab :value="1">Text Field</v-tab>
      <v-tab :value="2">Text Area</v-tab>
      <v-tab :value="3">Select</v-tab>
      <v-tab :value="4">Datepicker</v-tab>
    </v-tabs>
    <v-card-text>
      <v-tabs-window v-model="tabs">

        <!-- Tab untuk Text Field -->
        <v-tabs-window-item :value="1">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 1 && field.type === 'TextField'">
              <v-col cols="2">
                <v-text-field
                  label="Label"
                  v-model="field.Label"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                    <v-select
                      v-model="field.Rules"
                      :items="['Text', 'Number']"
                      label="Type"
                      variant="outlined"
                    ></v-select>
              </v-col>
              <v-col cols="2">
                    <v-text-field
                      label="Min"
                      type="number"
                      :maxlength="field.Counter"
                      :min=1
                      v-model="field.MinCounter"
                    ></v-text-field>
              </v-col>
              <v-col cols="2">
                    <v-text-field
                      label="Max" 
                      type="number"
                      :min="1"
                      v-model="field.Counter"
                    ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-switch v-model="field.FieldRequired" label="Required"></v-switch>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Text Field')">Add Text Field</v-btn>
        </v-tabs-window-item>

        <!-- Tab untuk Text Area -->
        <v-tabs-window-item :value="2">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 2 && field.type === 'TextArea'">
              <v-col cols="4">
                <v-text-field
                  label="Label"
                  v-model="field.Label"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-switch v-model="field.FieldRequired" label="Required"></v-switch>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Text Area')">Add Text Area</v-btn>
        </v-tabs-window-item>

        <!-- Tab untuk Select -->
        <v-tabs-window-item :value="3">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 3 && field.type === 'Select'">
              <v-col cols="4">
                <v-select
                  :items="['Option 1', 'Option 2', 'Option 3']"
                  label="Options"
                  v-model="field.Value"
                  variant="outlined"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-switch v-model="field.FieldRequired" label="Required"></v-switch>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Select')">Add Select</v-btn>
        </v-tabs-window-item>

        <!-- Tab untuk Datepicker -->
        <v-tabs-window-item :value="4">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 4 && field.type === 'Datepicker'">
              <v-col cols="4">
                <v-date-picker
                  v-model="field.Value"
                  label="Select Date"
                  variant="outlined"
                ></v-date-picker>
              </v-col>
              <v-col cols="2">
                <v-switch v-model="field.FieldRequired" label="Required"></v-switch>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Datepicker')">Add Datepicker</v-btn>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Tab yang aktif
const tabs = ref(1);

// Definisikan union type untuk berbagai field
type Field = 
  | 
  { 
      type: 'TextField'; 
      Tab: number; 
      Label: string; 
      FieldRequired: boolean;
      Rules: string;
      Value?: string;
      MinCounter: number;
      Counter: number;
      Min: number;
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

// Menyimpan semua field dalam satu array
const fields = ref<Field[]>([]);

const emit = defineEmits<{
  (e: "update:fields", value: Field[]): void;
}>();

// Fungsi untuk menambah field baru
const addField = (type: string) => {
  if (type === "Text Field") {
    fields.value.push(
      { 
        type: 'TextField',  
        Tab: tabs.value, 
        Label: "", 
        FieldRequired: false ,
        Rules: "Text",
        Value: `model_${fields.value.length + 1}`,
        MinCounter: 0,
        Counter: 0,
        Min: 0,
      }
    );
  } else if (type === "Text Area") {
    fields.value.push(
      { 
        type: 'TextArea', 
        Tab: tabs.value, 
        Label: "", 
        FieldRequired: false 
      }
    );
  } else if (type === "Select") {
    fields.value.push(
      { 
        type: 'Select', 
        Tab: tabs.value, 
        Value: "", 
        FieldRequired: false 
      }
    );
  } else if (type === "Datepicker") {
    fields.value.push(
      { 
        type: 'Datepicker', 
        Tab: tabs.value, 
        Value: new Date(), 
        FieldRequired: false 
      }
    );
  }

  console.log('ini sih',fields)
};

// Fungsi untuk menghapus field
const removeField = (index: number) => {
  fields.value.splice(index, 1);
};

watch(
  fields,
  () => {
    emit("update:fields", fields.value);
  },
  { deep: true }
);
</script>
