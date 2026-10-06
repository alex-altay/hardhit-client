<template>
  <div>
    <h1 class="mb-8">Captured Live</h1>
    <BandsListLegend class="mb-8" />

    <nav
      class="mb-8 flex flex-row flex-wrap items-center gap-x-3 gap-y-1"
      aria-label="Jump to letter"
    >
      <span class="mr-1">Jump to letter:</span>
      <template v-for="letter in ALPHABET" :key="letter">
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
      class="mb-8 scroll-mt-[calc(var(--ui-header-height)+16px)]"
    >
      <div class="mb-1 text-5xl font-bold">{{ letter }}</div>
      <BandsListCard v-for="band in group" :key="band.id" :band class="mb-12" />
    </section>
  </div>
</template>

<script setup lang="ts">
const OTHER = '#'
const ALPHABET = [OTHER, ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const SPECIAL_LETTERS: Record<string, string> = { Æ: 'A', Ø: 'O', Ł: 'L', Œ: 'O', Þ: 'T', Ð: 'D' }
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

const bandsByLetter = computed(() => {
  const groups = new Map<string, Band[]>()
  for (const letter of ALPHABET) {
    const group = bands.value.filter((band) => getIndexLetter(band.name) === letter)
    if (group.length) {
      groups.set(letter, group)
    }
  }
  return groups
})

function getIndexLetter(name: string): string {
  const first = name.trim().charAt(0).toUpperCase()
  const letter = SPECIAL_LETTERS[first] ?? first.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  return /^[A-Z]$/.test(letter) ? letter : OTHER
}

function getLetterId(letter: string): string {
  return letter === OTHER ? 'letter-other' : `letter-${letter.toLowerCase()}`
}
</script>
