<template>
  <div class="intro-loader absolute inset-0 grid place-items-center text-highlighted">
    <svg
      id="note"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linejoin="round"
      class="col-start-1 row-start-1 size-16 icon"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="22" rx="4" ry="3" />
      <ellipse cx="8" cy="25" rx="4" ry="3" />
      <path d="M12 25V7l16-3v18" />
    </svg>

    <svg
      id="drum"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="col-start-1 row-start-1 size-16 opacity-0 icon [--icon-cycle-delay:calc(var(--icon-cycle-duration)*-3/4)]"
      aria-hidden="true"
    >
      <path d="M4 17v8c0 2.2 5.4 4 12 4s12-1.8 12-4v-8" />
      <line x1="13" y1="17" x2="29" y2="3" />
      <ellipse cx="16" cy="17" rx="12" ry="4" />
    </svg>

    <svg
      id="sign"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="col-start-1 row-start-1 size-16 opacity-0 icon [--icon-cycle-delay:calc(var(--icon-cycle-duration)*-2/4)]"
      aria-hidden="true"
    >
      <path
        d="M10 18V7c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v8M14 15v-1c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v1M18 15v-1c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v1M22 15V9c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v11"
      />
      <path
        d="M10 16v4.6q0 0 0 0l-1.5-1.8c-.8-.9-2.2-1-3.1-.1h0c-.8.8-.8 2-.1 2.9l3.2 3.6c1.6 1.9 4 2.9 6.4 2.9h3.7c4.1 0 7.4-3.3 7.4-7.4V16"
      />
    </svg>

    <svg
      id="guitar"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="col-start-1 row-start-1 size-16 opacity-0 icon [--icon-cycle-delay:calc(var(--icon-cycle-duration)*-1/4)]"
      aria-hidden="true"
    >
      <path d="m17.6 15.9-1.5-1.5 8-7.9 1.4 1.4" />
      <path
        d="m26.2 8.7-2.9-2.9 4.4-2.9 1.4 1.4zM17.7 11.4 3.1 15.9l9.4 3.6 3.6 9.4 4.5-14.6M13.2 15.9l2.9 2.9"
      />
    </svg>
  </div>
</template>

<style>
html:has(.intro-loader) {
  overflow: hidden;
  scrollbar-gutter: stable;
}
</style>

<style scoped>
.intro-loader {
  --icon-cycle-duration: 1.6s;
}

@media (prefers-reduced-motion: no-preference) {
  .icon {
    animation: icon-cycle var(--icon-cycle-duration) step-end var(--icon-cycle-delay, 0s) infinite;
  }
}

@keyframes icon-cycle {
  0% {
    opacity: 1;
  }
  25%,
  100% {
    opacity: 0;
  }
}
</style>
