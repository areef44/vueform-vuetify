<template>
  <v-card>
    <v-card-title>Form Input</v-card-title>
    <v-tabs v-model="tabs">
      <v-tab :value="1">Text Field</v-tab>
      <v-tab :value="2">Text Area</v-tab>
      <v-tab :value="3">Single Selection</v-tab>
      <v-tab :value="4">Multiple Selection</v-tab>
      <v-tab :value="5">Datepicker</v-tab>
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

        <!-- Tab untuk Single Selection -->
        <v-tabs-window-item :value="3">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 3 && field.type === 'SingleSelection'">
              <v-col cols="2">
                <v-text-field
                  label="Label"
                  v-model="field.Label"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-center">
                <v-text-field
                    v-model="field.OptionsInput"
                    label="Add Option"
                    variant="outlined"
                    placeholder="Enter new option"
                    dense
                    clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-start justify-center">
                <v-btn @click="addOption(field)" color="primary">
                  Add Option
                </v-btn>
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-select
                  label="Delete Option"
                  :items="field.Options"
                  variant="outlined"
                  v-model="field.OptionsDelete"
                >
                <template v-slot:item="{ item, props }">
                  <v-list-item
                    v-bind="props"
                    class="d-flex align-center justify-space-between"
                  >
                    <!-- Icon dan Text Sebelah -->
                       <v-list-item-title>{{ item.field }}</v-list-item-title>
                        <template v-slot:append>
                          <v-icon
                          @click.stop="onDeleteOption(field, item.value)"
                          >
                            mdi-close
                          </v-icon>
                        </template>
                  
                  </v-list-item>
                </template>
                </v-select>
              </v-col>
             
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Single Selection')">Add Single Selection</v-btn>
        </v-tabs-window-item>

        <!-- Tab untuk Multiple Selection -->
        <v-tabs-window-item :value="4">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 4 && field.type === 'MultipleSelection'">
              <v-col cols="2">
                <v-text-field
                  label="Label"
                  v-model="field.Label"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-center">
                <v-text-field
                    v-model="field.OptionsInput"
                    label="Add Option"
                    variant="outlined"
                    placeholder="Enter new option"
                    dense
                    clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-start justify-center">
                <v-btn @click="addOption(field)" color="primary">
                  Add Option
                </v-btn>
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-select
                  label="Delete Option"
                  :items="field.Options"
                  variant="outlined"
                  v-model="field.OptionsDelete"
                >
                <template v-slot:item="{ item, props }">
                  <v-list-item
                    v-bind="props"
                    class="d-flex align-center justify-space-between"
                  >
                    <!-- Icon dan Text Sebelah -->
                       <v-list-item-title>{{ item.field }}</v-list-item-title>
                        <template v-slot:append>
                          <v-icon
                          @click.stop="onDeleteOption(field, item.value)"
                          >
                            mdi-close
                          </v-icon>
                        </template>
                  
                  </v-list-item>
                </template>
                </v-select>
              </v-col>
             
              <v-col cols="2">
                <v-btn @click="removeField(index)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-btn class="mt-4" @click="addField('Multiple Selection')">Add Multiple Selection</v-btn>
        </v-tabs-window-item>

        <!-- Tab untuk Datepicker -->
        <v-tabs-window-item :value="5">
          <v-row v-for="(field, index) in fields" :key="index" align="center">
            <template v-if="field.Tab === 5 && field.type === 'DatePicker'">
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
          <v-btn class="mt-4" @click="addField('Date Picker')">Add Datepicker</v-btn>
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
      FieldRequired: boolean;
      Rules: string;
      Value?: string;
      MinCounter: number;
      Min: number;
  }
  | 
  { 
      type: 'SingleSelection'; 
      Tab: number; 
      Label: string;
      Value: string; 
      FieldRequired: boolean;
      Options: string[];
      OptionsInput: string; 
      OptionsDelete: string;
  }
  |
  { 
      type: 'MultipleSelection'; 
      Tab: number; 
      Label: string;
      Value: string; 
      FieldRequired: boolean;
      Options: string[];
      OptionsInput: string; 
      OptionsDelete: string;
  }
  |
  { 
      type: 'DatePicker'; 
      Tab: number; 
      Label: string;
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
        FieldRequired: false,
        Rules: "Text",
        Value: `model_${fields.value.length + 1}`,
        MinCounter: 0,
        Min: 0,
      }
    );
  } else if (type === "Single Selection") {
    fields.value.push(
      { 
        type: 'SingleSelection', 
        Tab: tabs.value, 
        Value: "", 
        Label: "",
        FieldRequired: false,
        Options: [],
        OptionsInput: '',
        OptionsDelete: '',
      }
    );
  } else if(type === "Multiple Selection"){
    fields.value.push(
      { 
        type: 'MultipleSelection', 
        Tab: tabs.value, 
        Value: "", 
        Label: "",
        FieldRequired: false,
        Options: [],
        OptionsInput: '',
        OptionsDelete: '',
      }
    );
  } else if (type === "Date Picker") {
    fields.value.push(
      { 
        type: 'DatePicker', 
        Tab: tabs.value, 
        Label: "",
        Value: "", 
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

// Function to add a new option
// Tambahkan opsi baru ke field tertentu
const addOption = (field: Field) => {
  if (field.type === 'SingleSelection') { // Validasi tipe field
    const newOption = (field.OptionsInput || '').trim(); // Cegah undefined
    if (newOption && !field.Options.includes(newOption)) {
      field.Options.push(newOption); // Tambahkan opsi baru
      field.OptionsInput = ''; // Reset input
    } else {
      alert('Option is empty or already exists!');
    }
  } else {
    console.error('Field type is not SingleSelection:', field);
  }
  if (field.type === 'MultipleSelection') { // Validasi tipe field
    const newOption = (field.OptionsInput || '').trim(); // Cegah undefined
    if (newOption && !field.Options.includes(newOption)) {
      field.Options.push(newOption); // Tambahkan opsi baru
      field.OptionsInput = ''; // Reset input
    } else {
      alert('Option is empty or already exists!');
    }
  } else {
    console.error('Field type is not SingleSelection:', field);
  }
};

// Function to delete option
const onDeleteOption = (field: Field, item: string) => {
  field.Options = field.Options.filter(option => option !== item);
  field.OptionsDelete = '';
};
</script>