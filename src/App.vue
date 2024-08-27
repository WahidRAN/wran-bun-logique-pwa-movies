<script setup lang="ts">
import { onBeforeMount } from "vue";
import PWABadge from "./components/PWABadge.vue";
import { useOmdbStore } from "./stores/useOmdbStores";
import ContentSection from "./components/core/ContentSection.vue";
import MovieCard from "./components/core/MovieCard.vue";
import VideoCard from "./components/core/VideoCard.vue";
import CastCard from "./components/core/CastCard.vue";

const omdbStore = useOmdbStore();

onBeforeMount(() => {
	omdbStore.fetchFeaturedMovies();
});
</script>

<template>
	<ContentSection :content-title="'Featured Movie'">
		<MovieCard :movie-title="'Stranger Things'" />
	</ContentSection>
	<ContentSection :content-title="'New Arrival'">
		<MovieCard :movie-title="'Stranger Things'" />
	</ContentSection>
	<ContentSection :content-title="'Exclusive Videos'">
		<VideoCard />
	</ContentSection>
	<ContentSection :content-title="'Featured Casts'">
		<CastCard />
	</ContentSection>
	<PWABadge />
</template>

<style scoped></style>
