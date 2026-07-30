<!-- src/components/layout/Navbar.vue -->
<template>
  <nav class="bg-red-700 text-white shadow-md relative z-50">
    <div class="container mx-auto px-4 flex justify-between items-center h-16">
      <!-- Logo / Slogan -->
      <a href="/" class="flex items-center gap-2 font-bold text-lg">
        <span>Club Autostar</span>
        <span class="hidden md:inline text-xs bg-red-800 px-2 py-1 rounded">
          Toujours libres, jamais seuls
        </span>
      </a>

      <!-- Menu Desktop -->
      <div class="hidden md:flex space-x-6 items-center">
        <a href="/" class="hover:text-red-200">Accueil</a>
        <a href="/presentation" class="hover:text-red-200">Présentation</a>
        
        <!-- Dropdown Sorties -->
        <div class="relative group">
          <button class="hover:text-red-200 flex items-center py-2">
            Sorties ▾
          </button>
          <div class="absolute left-0 hidden group-hover:block bg-white text-slate-800 shadow-lg rounded py-2 w-48 z-10">
            <a href="/sorties/a-venir" class="block px-4 py-2 hover:bg-slate-100">Sorties à venir</a>
            <a href="/sorties/ecoulees" class="block px-4 py-2 hover:bg-slate-100">Sorties écoulées</a>
            <a href="/sorties/inscription" class="block px-4 py-2 hover:bg-slate-100">Inscription</a>
          </div>
        </div>

        <a href="/fiches-pratiques" class="hover:text-red-200">Fiches "C'est pas sorcier"</a>
        <a href="/adhesion" class="hover:text-red-200">Adhésion</a>
      </div>

      <!-- Bouton Hamburger Mobile -->
      <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Drawer Mobile -->
    <div v-if="isOpen" class="md:hidden bg-red-800 px-4 pt-2 pb-4 space-y-2 relative z-50">
      <a href="/" class="block hover:bg-red-700 p-2 rounded">Accueil</a>
      <a href="/presentation" class="block hover:bg-red-700 p-2 rounded">Présentation & Organigramme</a>
      <a href="/sorties/a-venir" class="block hover:bg-red-700 p-2 rounded">Sorties à venir</a>
      <a href="/sorties/ecoulees" class="block hover:bg-red-700 p-2 rounded">Sorties écoulées</a>
      <a href="/fiches-pratiques" class="block hover:bg-red-700 p-2 rounded">Fiches pratiques</a>
      <a href="/adhesion" class="block hover:bg-red-700 p-2 rounded">Adhésion</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isOpen = ref(false);
</script>