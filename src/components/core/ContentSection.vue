<script setup lang="ts">
import ChevronRightIcon from "../icons/ChevronRightIcon.vue";

const props = defineProps({
	contentTitle: String,
});
</script>

<template>
	<section class="content-section">
		<div class="content-header">
			<h2 class="text-4xl">{{ props.contentTitle }}</h2>
			<span class="text-lg text-rose-700 content-header__more"
				>See more <ChevronRightIcon class="content-header__more-icon"
			/></span>
		</div>
		<slot></slot>
	</section>
</template>

<style scoped>
.content-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
}
.content-header__more {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.content-header__more-icon {
	stroke: var(--rose-700);
}
</style>
