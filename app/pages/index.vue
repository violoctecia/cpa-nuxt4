<template>
	<main class="container">
		<div class="min-h-[calc(100vh-var(--base-header))] flex flex-col items-center justify-center gap-48">
			<div class="flex flex-col items-center">
				<h1 class="text-xl md:text-3xl font-medium mb-4 text-center">CPA Сеть партнерских программ</h1>
				<p class="text-muted-foreground text-sm md:text-base text-balance text-center mb-12">
					Присоединяйтесь к Julo и начните зарабатывать на трафике
				</p>
				<Button
					class="w-fit"
					as-child
				>
					<nuxt-link to="/auth/register">Зарегистрироваться</nuxt-link>
				</Button>
			</div>
			<ul class="flex justify-center items-center flex-wrap gap-6 text-muted-foreground text-sm md:text-base">
				<li
					v-for="(item, index) in items"
					:key="item"
					v-motion-fade-up
					:delay="450 + index * 120"
				>
					{{ item }}
				</li>
			</ul>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'base',
});
const items = ['Удобный личный кабинет', 'Ежедневные выплаты', 'Поддержка 24/7', 'Прозрачная статистика', 'Высокие ставки'];
</script>
