<template>
  <div>
    <h1 class="mb-8">Captured Live</h1>

    <div class="mb-8 flex flex-row flex-wrap justify-between items-center gap-4">
      <BandsListFilters
        v-model:search="searchString"
        v-model:with-interview="withInterview"
        v-model:with-live="withLive"
      />
      <BandsListSlideshowAll :bands class="w-full sm:w-64 justify-center" />
    </div>

    <nav
      class="mb-8 flex flex-row flex-wrap items-center gap-x-3 gap-y-1"
      aria-label="Jump to letter"
    >
      <span class="mr-1">Jump to letter:</span>
      <template v-for="letter in INDEX_LETTERS" :key="letter">
        <NuxtLink
          v-if="bandsByLetter.has(letter)"
          :to="{ hash: `#${getLetterId(letter)}` }"
          class="font-bold hover:text-brand-primary"
        >
          {{ letter }}
        </NuxtLink>
        <span v-else class="font-bold text-dimmed" aria-hidden="true">{{ letter }}</span>
      </template>
    </nav>

    <section
      v-for="[letter, group] in bandsByLetter"
      :id="getLetterId(letter)"
      :key="letter"
      class="mb-8 scroll-mt-[calc(var(--ui-header-height)+16px)] grid grid-cols-[repeat(auto-fill,min(90vw,400px))] gap-4"
    >
      <div class="mb-1 col-span-full text-5xl font-bold">{{ letter }}</div>
      <BandsListCard v-for="band in group" :key="band.id" :band />
    </section>
    <div v-if="!filteredBands.length" class="text-brand">No bands found</div>
  </div>
</template>

<script setup lang="ts">
const searchString = ref('')
const withInterview = ref(false)
const withLive = ref(false)
const { find } = useStrapi()

const bands = await useStrapiData('bands', () =>
  find<Band>('bands', {
    filters: {
      // @ts-expect-error bug: nuxt/strapi expects arrays of filters, strapi expects an object
      photos_collections: { photos: { id: { $notNull: true } } },
    },
    fields: ['name', 'slug'],
    sort: 'name:asc',
    populate: {
      photos_collections: { fields: ['title', 'date'], populate: { photos: { fields: ['url'] } } },
      live_links: { fields: ['url'] },
      interview_links: { fields: ['url'] },
    },
    pagination: { page: 1, pageSize: 100 },
  }),
)

const filteredBands = computed(() => {
  const query = toSearchable(searchString.value.trim())
  return bands.value.filter(
    (band) =>
      (!query || toSearchable(band.name).includes(query)) &&
      (!withInterview.value || band.interview_links.length > 0) &&
      (!withLive.value || band.live_links.length > 0),
  )
})

const bandsByLetter = computed(() => {
  const groups = new Map<string, Band[]>()
  for (const letter of INDEX_LETTERS) {
    const group = filteredBands.value.filter((band) => getIndexLetter(band.name) === letter)
    if (group.length) {
      groups.set(letter, group)
    }
  }
  return groups
})
</script>
