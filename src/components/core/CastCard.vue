<script setup lang="ts">
const props = defineProps<{
	castName: string;
	castProfilePath: string;
}>();
</script>

<template>
	<div class="cast-card">
		<div>
			<img
				:src="`https://image.tmdb.org/t/p/w342/${props.castProfilePath}`"
				:alt="props.castName"
				class="cast-card__poster"
			/>
		</div>
		<h2 class="text-lg fw-bold">{{ props.castName }}</h2>
	</div>
</template>

<style scoped>
.cast-card {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.cast-card__poster {
	width: 100%;
}
</style>
