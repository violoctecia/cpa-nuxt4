<template>
	<main class="container max-w-[1000px]! pt-8 pb-16">
		<h1 class="text-2xl md:text-3xl font-bold mb-2">Документация</h1>
		<p class="text-muted-foreground mb-10 text-sm">Справочник по работе с платформой для рекламодателей и вебмастеров</p>

		<Tabs default-value="webmaster">
			<TabsList class="mb-8">
				<TabsTrigger value="webmaster">Вебмастерам</TabsTrigger>
				<TabsTrigger value="advertiser">Рекламодателям</TabsTrigger>
			</TabsList>

			<TabsContent value="webmaster">
				<div class="space-y-10">
					<section
						v-for="section in docs.webmaster"
						:key="section.title"
					>
						<h2 class="text-lg font-semibold mb-3">{{ section.title }}</h2>
						<p
							v-if="section.description"
							class="text-muted-foreground text-sm mb-4"
						>
							{{ section.description }}
						</p>

						<div
							v-if="section.steps"
							class="space-y-2"
						>
							<div
								v-for="(step, i) in section.steps"
								:key="i"
								class="flex gap-3 items-start text-sm text-muted-foreground"
							>
								<span
									class="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5"
								>
									{{ i + 1 }}
								</span>
								<span>{{ step }}</span>
							</div>
						</div>

						<div
							v-if="section.statuses"
							class="mt-4 space-y-2"
						>
							<div
								v-for="status in section.statuses"
								:key="status.name"
								class="flex gap-3 items-start text-sm border rounded-lg p-3"
							>
								<span
									class="text-xs font-mono font-semibold px-2 py-0.5 rounded shrink-0 mt-0.5"
									:class="status.class"
								>
									{{ status.name }}
								</span>
								<span class="text-muted-foreground">{{ status.description }}</span>
							</div>
						</div>
					</section>
				</div>
			</TabsContent>

			<TabsContent value="advertiser">
				<div class="space-y-10">
					<section
						v-for="section in docs.advertiser"
						:key="section.title"
					>
						<h2 class="text-lg font-semibold mb-3">{{ section.title }}</h2>
						<p
							v-if="section.description"
							class="text-muted-foreground text-sm mb-4"
						>
							{{ section.description }}
						</p>

						<div
							v-if="section.steps"
							class="space-y-2"
						>
							<div
								v-for="(step, i) in section.steps"
								:key="i"
								class="flex gap-3 items-start text-sm text-muted-foreground"
							>
								<span
									class="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5"
								>
									{{ i + 1 }}
								</span>
								<span>{{ step }}</span>
							</div>
						</div>

						<div
							v-if="section.params"
							class="mt-4 overflow-x-auto"
						>
							<table class="w-full text-sm border-collapse">
								<thead>
									<tr class="border-b text-left">
										<th class="pb-2 pr-4 font-medium text-muted-foreground">Параметр</th>
										<th class="pb-2 pr-4 font-medium text-muted-foreground">Обязателен</th>
										<th class="pb-2 pr-4 font-medium text-muted-foreground">Описание</th>
										<th class="pb-2 pr-4 font-medium text-muted-foreground">Тип (JavaScript)</th>
										<th class="pb-2 font-medium text-muted-foreground">Пример</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="param in section.params"
										:key="param.name"
										class="border-b last:border-0"
									>
										<td class="py-2 pr-4 font-mono text-xs font-semibold">{{ param.name }}</td>
										<td class="py-2 pr-4 text-muted-foreground">{{ param.required ? 'Да' : 'Нет' }}</td>
										<td class="py-2 pr-4 text-muted-foreground">{{ param.desc }}</td>
										<td class="py-2 pr-4">
											<span class="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{{ param.type }}</span>
										</td>
										<td class="py-2"><code class="text-xs font-mono text-muted-foreground">{{ param.example }}</code></td>
									</tr>
								</tbody>
							</table>
						</div>

						<div
							v-if="section.example"
							class="mt-4 bg-muted rounded-lg px-4 py-3"
						>
							<p class="text-xs text-muted-foreground mb-1 font-medium">Пример</p>
							<code class="text-xs break-all">{{ section.example }}</code>
						</div>
					</section>
				</div>
			</TabsContent>
		</Tabs>
	</main>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

definePageMeta({
	layout: 'base',
});

const docs = {
	webmaster: [
		{
			title: '1. Трекинговые ссылки и клики',
			description:
				'Трекинговая ссылка — это уникальный URL, привязанный к вашей кампании. Каждый переход по ней автоматически фиксируется в системе как клик.',
			steps: [
				'Получите трекинговую ссылку в разделе "Кампании" вашего личного кабинета.',
				'Разместите её в своих рекламных материалах (сайт, соцсети, рассылка).',
				'Система фиксирует каждый переход. Клики агрегируются по дням.',
			],
		},
		{
			title: '2. Лиды и статусы',
			description:
				'Лид — это конверсия, то есть выполненное целевое действие пользователем (регистрация, покупка и т.д.). Лид создаётся рекламодателем через постбек.',
			statuses: [
				{
					name: 'hold',
					description: 'Лид принят системой, но ещё не проверен рекламодателем. Ожидает подтверждения.',
					class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
				},
				{
					name: 'approved',
					description: 'Лид подтверждён рекламодателем. Вознаграждение начислено на ваш баланс.',
					class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
				},
				{
					name: 'rejected',
					description:
						'Лид отклонён рекламодателем (фрод, дубль, нарушение условий и т.д.). Вознаграждение не начисляется.',
					class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
				},
			],
		},
		{
			title: '3. Выплаты',
			description: 'Начисленные вознаграждения за approved-лиды доступны к выводу в разделе "Баланс".',
			steps: [
				'Перейдите в раздел "Баланс" в личном кабинете.',
				'Создайте заявку на выплату.',
				'Укажите реквизиты. Выплата обрабатывается в течение нескольких рабочих дней.',
			],
		},
	],
	advertiser: [
		{
			title: '1. Как работает трекинг',
			description:
				'Пользователь переходит по трекинговой ссылке вебмастера — мы фиксируем клик и сохраняем click_id. Когда пользователь совершает целевое действие на вашем сайте, вы отправляете нам постбек с этим click_id, и мы создаём лид.',
		},
		{
			title: '2. Настройка постбека',
			description:
				'Постбек — это HTTP-запрос от вашего сервера на наш URL в момент, когда пользователь совершил целевое действие. Получите ваш постбек-URL в разделе "Постбеки".',
			steps: [
				'Сохраните click_id из параметров трекинговой ссылки при визите пользователя.',
				'После выполнения целевого действия отправьте GET или POST запрос на ваш постбек-URL.',
				'Передайте все обязательные параметры. Система создаст лид.',
			],
			params: [
				{ name: 'lead_id', type: 'string', required: true, example: '550e8400-e29b-41d4-a716-446655440000', desc: 'Уникальный UUID лида (генерируется на вашей стороне)' },
				{ name: 'click_id', type: 'string', required: true, example: 'abc123xyz', desc: 'Идентификатор клика из трекинговой ссылки' },
				{ name: 'status', type: 'string', required: true, example: 'approved', desc: 'Статус конверсии: hold, approved или rejected' },
				{ name: 'merchant_amount', type: 'number', required: true, example: '1500.00', desc: 'Сумма выплаты от рекламодателя (мин. 0.01)' },
				{ name: 'currency', type: 'string', required: true, example: 'USD', desc: 'Валюта в формате ISO-4217' },
				{ name: 'timestamp', type: 'string', required: true, example: '2024-01-15 12:30:00', desc: 'Дата и время конверсии в формате Y-m-d H:i:s' },
				{ name: 'tariff_id', type: 'number', required: true, example: '3', desc: 'ID тарифа (ставки) оффера' },
				{ name: 'promo_id', type: 'number', required: true, example: '7', desc: 'ID промо-инструмента кампании' },
				{ name: 'network_amount', type: 'number', required: false, example: '200.00', desc: 'Прибыль сети (обязателен если передаётся affiliate_amount)' },
				{ name: 'affiliate_amount', type: 'number', required: false, example: '1300.00', desc: 'Прибыль вебмастера (обязателен если передаётся network_amount)' },
				{ name: 'action_id', type: 'string', required: false, example: '550e8400-...', desc: 'UUID события (опционально)' },
				{ name: 'session_id', type: 'string', required: false, example: '550e8400-...', desc: 'UUID сессии пользователя (опционально)' },
				{ name: 'client_id', type: 'string', required: false, example: '550e8400-...', desc: 'UUID клиента на вашей стороне (опционально)' },
				{ name: 'request_id', type: 'string', required: false, example: 'req_001', desc: 'Произвольный идентификатор запроса (опционально)' },
				{ name: 'warn_message', type: 'string', required: false, example: 'Duplicate check', desc: 'Предупреждение или заметка (макс. 255 символов)' },
			],
			example: 'https://api.testjulo.ru/api/leads/postback?lead_id=UUID&click_id=CLICK_ID&status=approved&merchant_amount=1500&currency=USD&timestamp=2024-01-01+12:00:00&tariff_id=1&promo_id=1',
		},

		{
			title: '3. Управление лидами',
			description:
				'Все входящие лиды отображаются в разделе "Лиды" вашего кабинета. Вы можете изменить статус лида на approved или rejected вручную, либо автоматически через повторный постбек.',
		},
	],
};
</script>
