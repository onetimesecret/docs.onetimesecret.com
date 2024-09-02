<template>
  <NuxtLayout>
    <div class="about-us-page">
      <!-- Hero Section -->
      <section class="hero bg-gradient-to-r from-brand-500 to-brand-400 text-white py-20">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">About Onetime Secret</h1>
          <p class="text-xl md:text-2xl">Secure, ephemeral information sharing</p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="py-16 bg-brand-200">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p class="text-xl text-center max-w-3xl mx-auto">
            Onetime Secret provides a secure platform for sharing sensitive information.
            We offer simple, effective tools that prioritize user privacy and data protection.
          </p>
        </div>
      </section>

      <!-- Values Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="value in values"
                 :key="value.title"
                 class="text-center">
              <Icon :icon="value.icon"
                    class="w-16 h-16 mx-auto mb-4 text-brand-500" />
              <h3 class="text-xl font-semibold mb-2">{{ value.title }}</h3>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="py-16 bg-brand-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="member in team"
                 :key="member.name"
                 class="text-center">
              <NuxtImg src="/img/delano-g.png"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
              <h3 class="text-lg font-semibold">{{ member.name }}</h3>
              <p class="text-brandcomp-200">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div class="max-w-4xl mx-auto">
            <div v-for="testimonial in testimonials"
                 :key="testimonial.name"
                 class="mb-8 bg-white p-6 rounded-lg shadow-md">
              <p class="text-lg mb-4">"{{ testimonial.quote }}"</p>
              <p class="font-semibold">{{ testimonial.name }}, {{ testimonial.company }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-brandcomp-600 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">Secure Communication Made Simple</h2>
          <p class="text-xl mb-8">A straightforward solution for sharing sensitive information.</p>
          <a href="https://onetimesecret.com/signup"
             class="bg-white text-brandcomp-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-brandcomp-200 transition duration-300">
            Create Your Account
          </a>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const values = ref([
  { title: 'Privacy', description: 'We prioritize user data protection and confidentiality.', icon: 'lucide:fingerprint' },
  { title: 'Simplicity', description: 'We offer straightforward tools for secure information sharing.', icon: 'lucide:zap' },
  { title: 'Transparency', description: 'We maintain clear communication about our processes and limitations.', icon: 'streamline:open-book' }
])

const team = ref([
  { name: 'Delano Mandelbaum', role: 'Professional', photo: '~/assets/img/delano-g.png' },

])


import { useFetch } from '#app';

const { data: testimonials, error } = await useFetch('/api/testimonials')

if (error.value) {
  console.error('Error fetching testimonials:', error.value)
}
</script>
