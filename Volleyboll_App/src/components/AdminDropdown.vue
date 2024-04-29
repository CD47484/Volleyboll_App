<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'icon', 'items', 'noadd'])

const minimized = ref(true)
const target = ref(null)

function toggleMinimized() {
  minimized.value = !minimized.value
} 

const targetHeight = ref(minimized.value ? '4rem' : '0px')
requestAnimationFrame(update)

function update() {
  let tot = 0
  if (target.value?.children) {
    for (let child of Array.from(target.value.children)) {
      tot += child.offsetHeight
      const cStyle = window.getComputedStyle(child)
      tot += parseFloat(cStyle.marginTop)
      tot += parseFloat(cStyle.marginBottom)
    }
  }
  targetHeight.value = minimized.value ? '4rem' : `${tot}px`
  requestAnimationFrame(update)
}
</script>

<template>
  <div ref="target" class="dropdown" :style="`height: ${targetHeight};`">
    <div class="dropdown-title" @click="toggleMinimized">
      <h2>{{ props.title ? props.title : 'Unnamed' }}<span>{{ props.items?.length ? ` ( ${props.items.length} )` : '' }}</span></h2>
      <div v-html="props.icon" class="dropdown-icon" />
    </div>
    <div v-if="!props.noadd" class="dropdown-add btn" @click="$emit('addclick')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
    <div v-if="props.items?.length > 0" class="dropdown-content">
      <div v-for="item in props.items" :key="item.name" class="btn" @click="$emit('itemclick', item)">
        {{ item.name }}
      </div>
    </div>
    <div v-else style="margin: 0.5rem">Här var det tomt.</div>
  </div>
</template>

<style scoped>
@import '@/assets/adminview.css';

.dropdown {
  width: 100%;
  background-color: hsl(0, 0%, 40%);
  text-align: center;
  color: white;
  border-radius: 1rem;
  margin: 0.5rem;
  overflow: hidden;
  transition: height 0.125s ease-in-out;
}

.dropdown-title {
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
}

.dropdown-title:hover {
  cursor: pointer;
}

.dropdown-title > * {
  margin: 0;
  padding: 1rem;
}

.dropdown-icon {
  padding: 0;
}

.dropdown-icon > :deep(*) {
  width: 2rem;
  height: 2rem;
  padding: 1rem;
}

.dropdown-add {
  display: flex;
  justify-content: center;
  background-color: hsl(0, 0%, 35%);
  margin: 0.5rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
}

.dropdown-content {
  display: flex;
  flex-wrap: wrap;
  margin: 0.25rem;
}

.dropdown-content > * {
  background-color: hsl(0, 0%, 35%);
  flex-grow: 1;
  margin: 0.25rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
}

.btn {
  transition: filter 0.125s linear;
}

.btn:hover {
  filter: brightness(105%);
  cursor: pointer;
}

span {
  font-weight: 400;
}
</style>