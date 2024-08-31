<script setup lang="ts">
import FacebookIcon from "./icons/FacebookIcon.vue";
import InstagramIcon from "./icons/InstagramIcon.vue";
import TwitterIcon from "./icons/TwitterIcon.vue";
import YoutubeIcon from "./icons/YoutubeIcon.vue";
</script>

<template>
	<footer class="footer">
		<div class="footer__social-media">
			<span class="svg-icon">
				<FacebookIcon />
			</span>
			<span class="svg-icon">
				<InstagramIcon />
			</span>
			<span class="svg-icon">
				<TwitterIcon />
			</span>
			<span class="svg-icon">
				<YoutubeIcon />
			</span>
		</div>
		<div class="footer__policy text-base md:text-lg text-gray-900 fw-bold">
			<p>Conditions of Use</p>
			<p>Privacy & Policy</p>
			<p>Press Room</p>
		</div>
		<div class="footer__trademark text-base md:text-lg text-gray-500">
			© {{ new Date().getFullYear() }} MovieBox <br />
			UI by Adriana Eka Prayudha <br />
			FE by Wahid Rizqi Akbar Nurjaman
		</div>
	</footer>
</template>

<style scoped>
.footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
	margin-bottom: 48px;
}
.footer__policy {
	display: flex;
	flex-direction: row;
	gap: 8px;
}
.footer__trademark {
	text-align: center;
}
.footer__social-media {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.svg-icon {
	padding: 8px;
}

@media (min-width: 768px) {
	.footer {
		gap: 24px;
	}
  .footer__social-media {
    gap: 16px;
  }
}

@media (min-width: 1024px) {
	.footer {
		gap: 32px;
	}
	.footer__policy {
		gap: 48px;
	}
  .footer__social-media {
    gap: 40px;
  }
}
</style>
