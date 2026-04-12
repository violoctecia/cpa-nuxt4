<template>
	<header>
		<div class="container flex items-center justify-between gap-4 py-4">
			<nuxt-link to="/">
				<Logo />
			</nuxt-link>
			<div class="flex items-center">
				<ModeToggle />
				<Button
					size="sm"
					class="mr-2 ml-4"
					as-child
				>
					<nuxt-link to="/auth/login">Войти</nuxt-link>
				</Button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import ModeToggle from './ModeToggle.vue';
</script>
