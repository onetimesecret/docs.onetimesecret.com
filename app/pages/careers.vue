<template>
  <NuxtLayout>
    <div class="careers-page">
      <!-- Hero Section -->
      <section class="hero bg-gradient-to-r from-brand-500 to-brand-400 text-white py-20">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Careers</h1>
          <p class="text-xl md:text-2xl">Join our team and help build a more secure and private internet.</p>
        </div>
      </section>

      <!-- Equal Opportunities Section -->
      <section class="py-16 bg-brand-200">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center">Equal Opportunities</h2>
          <p class="text-xl text-center max-w-3xl mx-auto">
            We are proud to be an equal opportunity employer. We do not discriminate based on race, color, religion,
            sex, sexual orientation, gender identity, salad preference, national origin, disability, or any other legally protected
            status.
          </p>
        </div>
      </section>

      <!-- Our Commitment Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center">Our Commitment</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="commitment in commitments"
                 :key="commitment.title"
                 class="text-center">
              <Icon :icon="commitment.icon"
                    class="w-16 h-16 mx-auto mb-4 text-brand-500" />
              <h3 class="text-xl font-semibold mb-2">{{ commitment.title }}</h3>
              <p>{{ commitment.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Current Openings Section -->
      <section class="py-16 bg-brand-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center">Current Openings</h2>
          <p class="text-xl text-center max-w-3xl mx-auto mb-8">
            Currently, we do not have any open roles. However, we are always looking for talented individuals to join
            our team. Please check back later for new opportunities.
          </p>
          <div class="text-center">
            <button @click="increaseHiringSpeed"
                    class="bg-brand-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-brand-600 transition duration-300">
              Click to Increase Our Hiring Speed!
            </button>
            <p v-if="clickCount > 0"
               class="mt-4 text-lg">
              Thanks for your enthusiasm! You've clicked {{ clickCount }} {{ clickCount === 1 ? 'time' : 'times' }}.
              {{ hiringMessage }}
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Us Section -->
      <section v-if="showContactUs" class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
          <p class="text-xl mb-8">If you have any questions or would like to learn more about our company, please reach out to us.</p>
          <span class="text-brand-500 text-xl font-semibold hover:underline">
            <span class="email" data-subject="Speedy Job Application Inquiry">careerspeed &#65;&#84; onetimesecret D0T com</span>
          </span>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const commitments = ref([
  { title: 'Diversity', description: 'We value the unique perspectives and experiences that each individual brings to our team.', icon: 'lucide:users' },
  { title: 'Inclusion', description: 'We strive to create an environment where everyone feels welcome and respected.', icon: 'lucide:heart-handshake' },
  { title: 'Growth', description: 'We are dedicated to the professional and personal development of our employees.', icon: 'lucide:trending-up' }
]);

const clickCount = ref(0);
const targetClickCount = ref(Math.floor(Math.random() * 88) + 10); // Random number between 10 and 97
const showContactUs = computed(() => clickCount.value >= targetClickCount.value);

const hiringMessages: { [key: number]: string } = {
  1: "Keep clicking to speed things up!",
  2: "Nice start! Let's speed things up even more!",
  4: "Great job! Keep going!",
  7: "We're accelerating our hiring process!",
  11: "We're really picking up steam now!",
  16: "Wow! We're now hiring at ludicrous speed!",
  22: "Fantastic! We're now hiring faster than ever!",
  29: "Amazing! Our recruitment process is reaching light speed!",
  38: "Incredible! We're now hiring at warp speed!",
  47: "You're on fire! Our hiring team can barely keep up!",
  54: "Mind-blowing! Our hiring algorithm has achieved sentience!",
  62: "You're a hiring wizard! We're onboarding talent before they even apply!",
  71: "Unbelievable! We're now hiring faster than the speed of thought!",
  83: "Our hiring process has transcended time and space!",
  97: "You've reached hiring nirvana! We're assembling dream teams in milliseconds!",
};

const hiringMessage = computed(() => {
  for (const [threshold, message] of Object.entries(hiringMessages).sort((a, b) => Number(b[0]) - Number(a[0]))) {
    if (clickCount.value >= Number(threshold)) {
      return message;
    }
  }
  return hiringMessages[1]; // Default message (changed from 0 to 1)
});

const increaseHiringSpeed = () => {
  clickCount.value++;
};

function deobfuscateEmails(): void {
  document.querySelectorAll<HTMLElement>('.email').forEach(el => {
    const email = el.textContent?.replace(/ &#65;&#84; /g, "@").replace(/ AT /g, "@").replace(/ D0T /g, ".") || '';
    const subject = el.getAttribute('data-subject');
    const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    el.innerHTML = `<a class="dark:text-gray-300" href="mailto:${email}${subjectParam}">${email}</a>`;
  });
}

// Call this function when the DOM is ready or after dynamic content is loaded
onMounted(() => {
  deobfuscateEmails();
});

</script>
