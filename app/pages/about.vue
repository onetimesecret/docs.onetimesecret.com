<template>
  <NuxtLayout>
    <div class="about-us-page dark:bg-gray-900">
      <!-- Hero Section -->
      <section class="hero bg-gradient-to-r from-brand-500 to-brand-400 dark:from-brandcomp-800 dark:to-brandcomp-700 text-white py-20">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">About Onetime Secret</h1>
          <p class="text-xl md:text-2xl">Secure, ephemeral information sharing</p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="py-16 bg-brand-200 dark:bg-brandcomp-800">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center dark:text-white">Our Mission</h2>
          <p class="text-xl text-center max-w-3xl mx-auto dark:text-gray-300">
            Onetime Secret provides a secure platform for sharing sensitive information.
            We offer simple, effective tools that prioritize user privacy and data protection.
          </p>
        </div>
      </section>

      <!-- Notes from the Founder Section -->
      <section class="py-16 dark:bg-gray-800">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center dark:text-white">Notes from the Founder</h2>
          <div class="max-w-3xl mx-auto dark:text-gray-300">
            <p class="mb-4">
              Hi, I'm <a href="https://delanotes.com/" class="text-brand-500 hover:underline dark:text-brand-400">Delano</a>, the creator of Onetime Secret. What started in 2012 as a simple, secure way to share sensitive information has grown beyond our wildest expectations. Over a decade later, we're facilitating the secure sharing of millions of secrets monthly, with use cases we never imagined.
            </p>
            <p class="mb-4">
              The first half of 2024 has been our busiest period yet. We're grateful that people have continued to use and share our product for more than a decade. We're currently working on improvements that we think will make the service even more useful — we'll share more details soon.
            </p>
            <p class="mb-4">
              True to our roots, <a href="https://github.com/onetimesecret/onetimesecret" class="text-brand-500 hover:underline">our code remains open-source</a> on GitHub. As we navigate the evolving landscape of digital privacy and security, we're committed to transparency and continual improvement.
            </p>
            <p class="mb-4">
              Thank you for being part of our journey. Here's to another decade of secure, ephemeral sharing.
            </p>
            <p class="mb-4">
              Happy sharing,<br />Delano
            </p>
            <div class="text-center">
              <NuxtImg src="/img/portait-profile-pic-delano-2024.jpeg" class="w-24 h-30 mx-auto rounded" alt="Delano Mandelbaum" />
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="py-16 bg-brand-200 dark:bg-brandcomp-700">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">Our Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="value in values" :key="value.title" class="text-center">
              <Icon :icon="value.icon" class="w-16 h-16 mx-auto mb-4 text-brand-500 dark:text-brand-400" />
              <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ value.title }}</h3>
              <p class="dark:text-gray-300">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="py-16 dark:bg-gray-800">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">Our Team</h2>
          <div class="text-center">
            <NuxtImg src="/img/delano-g.png" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
            <h3 class="text-lg font-semibold dark:text-white">Delano Mandelbaum</h3>
            <p class="text-brandcomp-600 dark:text-brandcomp-400">Founder &amp; Developer</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-brand-100 dark:bg-brandcompdim-900">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">Frequently Asked Questions</h2>
          <div class="max-w-3xl mx-auto">
            <div v-for="faq in faqs" :key="faq.question" class="mb-8">
              <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ faq.question }}</h3>
              <p v-html="faq.answer" class="dark:text-gray-300"></p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-brandcomp-600 dark:bg-brandcomp-800 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">Secure Communication Made Simple</h2>
          <p class="text-xl mb-8">A straightforward solution for sharing sensitive information.</p>
          <a href="https://onetimesecret.com/signup"
             class="bg-white text-brandcomp-600 dark:bg-gray-200 dark:text-brandcomp-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-brandcomp-200 dark:hover:bg-gray-300 transition duration-300">
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
]);

const faqs = ref([
  {
    question: 'Why would I use this?',
    answer: "When sharing sensitive information via email or chat, multiple copies are often stored in various locations. Onetime Secret provides a more secure alternative. Our links allow for a single viewing, after which the information is permanently deleted. This ensures that sensitive data is accessed only once, reducing the risk of unauthorized access. Think of it like a self-destructing message."
  },
  {
    question: 'Can I retrieve a secret that has already been shared?',
    answer: "Nope. We display it once and then delete it. After that, it's gone forever."
  },
  {
    question: 'Why should I trust you?',
    answer: `Since 2012, Onetime Secret has provided a reliable platform for secure information sharing. Our system prioritizes privacy and security, backed by <a href="https://github.com/onetimesecret/onetimesecret" class="text-brand-500 hover:underline">open-source code</a> for transparency and community review. We implement industry-standard security practices and stand behind our service with our professional reputations. Our decade of experience demonstrates our commitment to protecting user privacy and maintaining trust.`
  },
  // Add more FAQs as needed
]);

</script>
