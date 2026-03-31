<script setup lang="ts">
import ModeToggle from '~/components/global/ModeToggle.vue';
</script>

<template>
	<div class="grid min-h-svh lg:grid-cols-2">
		<div class="bg-muted relative hidden lg:block">
			<img
				src="/images/auth-bg.jpg"
				alt=""
				class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
			/>
		</div>

		<div class="flex flex-col gap-4 p-6 md:p-10">
			<div class="flex justify-between gap-2">
				<nuxt-link
					to="/"
					class="flex items-center gap-2 font-medium"
				>
					<Logo />
				</nuxt-link>

				<ModeToggle />
			</div>
			<div class="flex flex-1 items-center justify-center">
				<div class="w-full max-w-md">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
