<!-- src/components/home/HeroSlider.vue -->
<template>
  <div class="relative w-full h-[380px] md:h-[480px] overflow-hidden rounded-xl shadow-lg bg-slate-900 group">
    <!-- Slides -->
    <div 
      v-for="(slide, index) in slides" 
      :key="index"
      class="absolute inset-0 transition-opacity duration-700 ease-in-out"
      :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <!-- Image de fond -->
      <img 
        :src="slide.image" 
        :alt="slide.title" 
        class="w-full h-full object-cover"
      />
      
      <!-- Overlay sombre pour lisibilité du texte -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <!-- Légende et Appel à l'action -->
      <div class="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 text-white">
        <span v-if="slide.badge" class="inline-block bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
          {{ slide.badge }}
        </span>
        <h2 class="text-2xl md:text-4xl font-extrabold mb-2 leading-tight">
          {{ slide.title }}
        </h2>
        <p class="text-sm md:text-base text-slate-200 mb-4 max-w-2xl">
          {{ slide.subtitle }}
        </p>
        <a 
          v-if="slide.link" 
          :href="slide.link" 
          class="inline-block bg-white text-slate-900 hover:bg-red-700 hover:text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-md"
        >
          {{ slide.ctaText || 'Découvrir' }}
        </a>
      </div>
    </div>

    <!-- Flèche Précédent -->
    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      aria-label="Diapositive précédente"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Flèche Suivant -->
    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      aria-label="Diapositive suivante"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Puces de navigation (Indicators) -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="h-2.5 rounded-full transition-all"
        :class="currentSlide === index ? 'w-8 bg-red-600' : 'w-2.5 bg-white/60 hover:bg-white'"
        :aria-label="`Aller à la diapositive ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  badge?: string;
  link?: string;
  ctaText?: string;
}

// Données par défaut pour le carrousel (peuvent aussi être passées en Props)
const slides: Slide[] = [
  {
    image: '/assets/images/sliders/4.jpg',
    title: 'Toujours libres, jamais seuls',
    subtitle: 'Rejoignez le Club Autostar et partagez la passion des voyages en camping-car.',
    badge: 'Vie du Club',
    link: '/adhesion',
    ctaText: 'Rejoindre le Club'
  },
  {
    image: '/assets/images/sliders/sea.jpg',
    title: 'Sorties & Rassemblements 2026',
    subtitle: 'Consultez le calendrier de nos prochains circuits et rencontres régionales.',
    badge: 'Agenda',
    link: '/sorties/a-venir',
    ctaText: 'Voir les sorties'
  },
  {
    image: '/assets/images/sliders/snow.jpg',
    title: "Fiches techniques : C'est pas sorcier",
    subtitle: 'Des trucs et astuces rédigés par nos membres pour entretenir votre camping-car.',
    badge: 'Entraide',
    link: '/fiches-pratiques',
    ctaText: 'Consulter les fiches'
  }
];

const currentSlide = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetTimer();
};

const startTimer = () => {
  timer = setInterval(nextSlide, 6000); // Défilement toutes les 6 secondes
};

const resetTimer = () => {
  if (timer) clearInterval(timer);
  startTimer();
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>