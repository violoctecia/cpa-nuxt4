<script setup lang="ts">
import { Badge } from '@/components/ui/badge';

definePageMeta({
	layout: 'dashboard',
});

const route = useRoute();
const id = Number(route.params.id);

const data = {
	id: 3,
	status: 'joined',
	pinned: false,
	name: 'Тестовая сеть 1',
	logo: null,
	country: {
		code: 'RU',
		title: 'Россия',
	},
	created_at: 1770335175,
	pricing_models: [
		{
			id: 6,
			name: 'CPC (Cost per Click)',
		},
	],
	currencies: [
		{
			code: 'RUB',
			name: 'российский рубль',
			symbol: '₽',
		},
		{
			code: 'USD',
			name: 'доллар США',
			symbol: '$',
		},
	],
	requirements: {
		affiliate: [
			{
				role: 'affiliate',
				param: 'kyc_level',
				value: 1,
			},
			{
				role: 'affiliate',
				param: 'rating',
				value: 0,
			},
		],
		merchant: [
			{
				role: 'merchant',
				param: 'kyc_level',
				value: 1,
			},
			{
				role: 'merchant',
				param: 'rating',
				value: 0,
			},
		],
	},
	merchants_count: 3,
	affiliates_count: 3,
	offers_count: 5,
	settings: {
		auto_approve: false,
	},
	leads_count: 0,
	leads_turnover: 0,
	visibility: {
		roles: ['affiliate', 'merchant'],
	},
	default_manager_affiliate: {
		id: 4,
		first_name: '234',
		last_name: '234243243',
	},
	default_manager_merchant: {
		id: 5,
		first_name: 'Менджер',
		last_name: 'реклов',
	},
	description: [
		{
			id: 1,
			lang: 'ru',
			type: 'description',
			text: '<p>Сеть <strong>Альфа</strong> — надежная партнерская программа с быстрым выводом средств.</p>',
		},
		{
			id: 2,
			lang: 'ru',
			type: 'description',
			text: '<p>Сеть <strong>Бета</strong> предлагает уникальные промо-материалы и высокие ставки.</p>',
		},
		{
			id: 3,
			lang: 'ru',
			type: 'description',
			text: '<p>Сеть <strong>Гамма</strong> ориентирована на международный трафик и мультивалютные выплаты.</p>',
		},
	],

	rules: [
		{
			id: 4,
			lang: 'ru',
			type: 'rules',
			text: '<ol><li>Не распространять внутреннюю информацию сети</li><li>Соблюдать сроки отчетности</li><li>Не использовать запрещенный трафик</li></ol>',
		},
		{
			id: 5,
			lang: 'ru',
			type: 'rules',
			text: '<ol><li>Запрещены мошеннические методы привлечения клиентов</li><li>Следить за качеством трафика</li></ol>',
		},
		{
			id: 6,
			lang: 'ru',
			type: 'rules',
			text: '<ol><li>Все лиды должны быть валидными</li><li>Запрещены повторные регистрации</li></ol>',
		},
	],

	agreement: [
		{
			id: 7,
			lang: 'ru',
			type: 'agreement',
			text: '<p>Подтверждаю согласие с условиями сети и обязуюсь их соблюдать.</p>',
		},
		{
			id: 8,
			lang: 'ru',
			type: 'agreement',
			text: '<p>Я ознакомлен с правилами сети и принимаю их безоговорочно.</p>',
		},
		{
			id: 9,
			lang: 'ru',
			type: 'agreement',
			text: '<p>Согласен с политикой конфиденциальности и условиями партнерства.</p>',
		},
	],
	phone: '+7 953 406 65 79',
	email: 'kzncrvert@mail.ru',
	questions: [],
	domain_url: null,
	domain_logo: null,
};
</script>

<template>
	<div class="rounded-xl bg-muted/50 p-4 md:p-8">
		<div class="flex lg:grid lg:grid-cols-6 gap-4 lg:gap-6">
			<div class="lg:col-span-1">
				<Avatar class="size-12! lg:w-full! lg:aspect-square! lg:h-auto!">
					<AvatarImage src="" />
					<AvatarFallback class="text-xl lg:text-6xl">{{ data.name[0] }}</AvatarFallback>
				</Avatar>
			</div>
			<div class="lg:col-span-5 max-w-6xl">
				<h1 class="text-lg lg:text-2xl mb-4">{{ data.name }}</h1>
				<div class="flex items-center flex-wrap gap-2">
					<Badge class="px-3 py-1.5 bg-muted text-foreground">Активные офферы: {{ data.offers_count }}</Badge>
					<Badge class="px-3 py-1.5 bg-muted text-foreground">Рекламодателей: {{ data.merchants_count }}</Badge>
					<Badge class="px-3 py-1.5 bg-muted text-foreground">Вебмастеров: {{ data.affiliates_count }}</Badge>
				</div>

				<div class="hidden xl:block">
					<Separator class="my-8" />

					<div class="grid gap-6 text-sm">
						<div
							class="flex justify-between gap-4 items-start"
							v-for="(item, index) in [
								{
									label: 'Дата регистрации',
									value: new Date(data.created_at * 1000).toLocaleDateString('ru-RU'),
								},
								{ label: 'Модели оплаты', value: data.pricing_models.map((i) => i.name).join(', ') },
								{ label: 'Валюты', value: data.currencies.map((i) => i.code).join(', ') },
								{ label: 'Страна', value: data.country.title },
							]"
							:key="index"
						>
							<span>{{ item.label }}</span>
							<span>{{ item.value }}</span>
						</div>
					</div>

					<Separator class="my-8" />

					<Tabs default-value="description">
						<TabsList>
							<TabsTrigger value="description">Описание</TabsTrigger>
							<TabsTrigger value="rules">Правила</TabsTrigger>
							<TabsTrigger value="agreement">Соглашение</TabsTrigger>
						</TabsList>
						<div class="bg-muted p-4 rounded-xl text-sm">
							<TabsContent
								value="description"
								class="flex flex-col gap-4"
							>
								<div v-for="i in data.description">
									<div v-html="i.text"></div>
								</div>
							</TabsContent>
							<TabsContent
								value="rules"
								class="flex flex-col gap-4"
							>
								<div v-for="i in data.rules">
									<div v-html="i.text"></div>
								</div>
							</TabsContent>
							<TabsContent
								value="agreement"
								class="flex flex-col gap-4"
							>
								<div v-for="i in data.agreement">
									<div v-html="i.text"></div>
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
		<div class="block xl:hidden">
			<Separator class="my-8" />

			<div class="grid gap-6 text-sm">
				<div
					class="flex justify-between gap-4 items-start"
					v-for="(item, index) in [
						{
							label: 'Дата регистрации',
							value: new Date(data.created_at * 1000).toLocaleDateString('ru-RU'),
						},
						{ label: 'Модели оплаты', value: data.pricing_models.map((i) => i.name).join(', ') },
						{ label: 'Валюты', value: data.currencies.map((i) => i.code).join(', ') },
						{ label: 'Страна', value: data.country.title },
					]"
					:key="index"
				>
					<span>{{ item.label }}</span>
					<span>{{ item.value }}</span>
				</div>
			</div>

			<Separator class="my-8" />

			<Tabs default-value="description">
				<TabsList>
					<TabsTrigger value="description">Описание</TabsTrigger>
					<TabsTrigger value="rules">Правила</TabsTrigger>
					<TabsTrigger value="agreement">Соглашение</TabsTrigger>
				</TabsList>
				<div class="bg-muted p-4 rounded-xl text-sm">
					<TabsContent
						value="description"
						class="flex flex-col gap-4"
					>
						<div v-for="i in data.description">
							<div v-html="i.text"></div>
						</div>
					</TabsContent>
					<TabsContent
						value="rules"
						class="flex flex-col gap-4"
					>
						<div v-for="i in data.rules">
							<div v-html="i.text"></div>
						</div>
					</TabsContent>
					<TabsContent
						value="agreement"
						class="flex flex-col gap-4"
					>
						<div v-for="i in data.agreement">
							<div v-html="i.text"></div>
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	</div>
</template>
