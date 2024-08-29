<script setup lang="ts">
import ChevronRightIcon from "../icons/ChevronRightIcon.vue";

const props = defineProps({
	contentTitle: String,
});
</script>

<template>
	<section class="content-section">
		<div class="content-header">
			<h2 class="text-3xl md:text-4xl">{{ props.contentTitle }}</h2>
			<span class="text-base md:text-lg text-rose-700 content-header__more"
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
	margin-bottom: 16px;
}
.content-header__more {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.content-header__more-icon {
	stroke: var(--rose-700);
	width: 20px;
	height: 20px;
}

@media (min-width: 768px) {
	.content-header {
		margin-bottom: 24px;
	}
	.content-header__more-icon {
		width: 24px;
		height: 24px;
	}
}

@media (min-width: 1024px) {
	.content-header {
		margin-bottom: 40px;
	}
}
</style>
