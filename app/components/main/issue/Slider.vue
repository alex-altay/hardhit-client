<template>
  <div
    class="relative max-w-screen h-full overflow-hidden scrollbar-none [&::-webkit-scrollbar]:hidden"
  >
    <UiBackIcon
      :class="{ hidden: !canScrollLeft }"
      class="absolute left-0 top-[calc(50%-0.25rem)] w-8 h-8 cursor-pointer z-10"
      @click.stop="selectPrevious"
    />
    <UiBackIcon
      :class="{ hidden: !canScrollRight }"
      class="absolute right-0 top-[calc(50%-0.25rem)] w-8 h-8 rotate-180 cursor-pointer z-10"
      @click.stop="selectNext"
    />
    <div
      ref="strip"
      class="relative flex gap-5 pt-4 min-w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      <MainIssueCard
        v-for="(issue, index) in issues"
        :key="index"
        :issue
        :is-open="isOpen && activeIndex === index"
        @toggle="select(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { issues } = defineProps<{ issues: Issue[] }>()

const strip = useTemplateRef('strip')
const { canScrollLeft, canScrollRight, revealItem } = useStripScroll(strip, {
  duration: PANEL_TRANSITION_MS,
})

const activeIndex = ref(0)
const isOpen = ref(false)

function toIssue(index: number) {
  activeIndex.value = index
  nextTick(() => revealItem(index))
}

function select(index: number) {
  isOpen.value = activeIndex.value === index ? !isOpen.value : true
  toIssue(index)
}

function selectNext() {
  if (!issues.length) {
    return
  }
  toIssue(Math.min(activeIndex.value + 1, issues.length - 1))
}

function selectPrevious() {
  toIssue(Math.max(activeIndex.value - 1, 0))
}
</script>
