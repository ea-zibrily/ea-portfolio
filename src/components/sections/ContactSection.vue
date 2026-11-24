<script setup>
import profile from '@/content/profile.js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
</script>

<template>
  <section
    id="contact"
    aria-labelledby="contact-heading"
    class="scroll-mt-[var(--nav-h)] py-20 md:py-28 px-4 md:px-8"
  >
    <RevealOnScroll>
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <!-- Eyebrow Pill -->
        <span
          class="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--tag-bg)] text-text-muted text-[11px] font-medium tracking-[0.18em] uppercase mb-5 select-none"
        >
          Let's Collaborate
        </span>

        <!-- Headline -->
        <h2
          id="contact-heading"
          class="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-text leading-tight md:whitespace-nowrap mb-3"
        >
          Ready to turn your ideas into playable worlds?
        </h2>

        <!-- Subtitle with Nickname -->
        <p class="text-sm sm:text-base text-text-muted leading-relaxed mb-8 max-w-md">
          Let's create something extraordinary together — reach out to
          <span class="text-text font-medium">{{ profile.name }} (@{{ profile.nickname.toLowerCase() }})</span>.
        </p>

        <!-- Primary Pill CTA (Email) -->
        <a
          v-if="profile.email && !profile.email.startsWith('TODO')"
          :href="'mailto:' + profile.email"
          aria-label="Send an email to get in touch"
          class="group inline-flex items-center gap-2.5 hover:gap-4 px-7 py-3.5 rounded-full bg-primary text-primary-fg text-sm font-semibold shadow-sm hover:opacity-95 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span>Get in Touch</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-4 transition-all duration-300 ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M3 10h16" />
            <path d="m14 5 5 5-5 5" />
          </svg>
        </a>

        <!-- Minimal Social Links (GitHub & LinkedIn) -->
        <div class="mt-7 flex items-center justify-center gap-5 text-xs sm:text-sm text-text-muted">
          <a
            v-if="profile.github"
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            class="inline-flex items-center gap-1.5 hover:text-text transition-colors duration-200 focus:outline-none focus-visible:underline"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <span>GitHub</span>
          </a>

          <span
            v-if="profile.github && profile.linkedin && !profile.linkedin.startsWith('TODO')"
            class="text-border select-none"
            aria-hidden="true"
          >
            &middot;
          </span>

          <a
            v-if="profile.linkedin && !profile.linkedin.startsWith('TODO')"
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            class="inline-flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors duration-200 focus:outline-none focus-visible:underline"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
