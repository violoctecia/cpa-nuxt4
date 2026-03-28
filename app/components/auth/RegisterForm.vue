<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import Spinner from '../ui/spinner/Spinner.vue';

import { vMaska } from 'maska/vue';

const props = defineProps<{
	class?: HTMLAttributes['class'];
}>();

const showPassword = ref(false);
const isLoading = ref(false);

const formSchema = z.object({
	name: z.string().min(2, 'Введите корректное имя'),
	surname: z.string().min(2, 'Введите корректную фамилию'),
	phone: z.string().min(18, 'Введите корректный номер телефона'),
	email: z.email('Неверный адрес электронной почты'),
	password: z.string().min(6, 'Пароль должен быть не менее 6 символов.'),
});

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(formSchema),
	initialValues: {
		name: '',
		surname: '',
		phone: '',
		email: '',
		password: '',
	},
});

const onSubmit = handleSubmit(async (values) => {
	isLoading.value = true;
	try {
		console.log(values);

		toast.success('Успешная регистрация!');
	} catch (err: any) {
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<form
		:class="cn('flex flex-col gap-12', props.class)"
		@submit="onSubmit"
	>
		<FieldGroup class="gap-6">
			<div class="flex flex-col gap-2 mb-6">
				<h1 class="text-2xl font-medium">Регистрация вебмастера</h1>
				<p class="text-muted-foreground text-sm text-balance">Создайте учетную запись, чтобы продолжить!</p>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<VeeField
					v-slot="{ field, errors }"
					name="name"
					:validate-on-model-update="false"
				>
					<Field :data-invalid="!!errors.length">
						<FieldLabel for="name">Имя</FieldLabel>
						<Input
							id="name"
							v-bind="field"
							placeholder="Иван"
							:aria-invalid="!!errors.length"
						/>
						<FieldError
							v-if="errors.length"
							:errors="errors"
						/>
					</Field>
				</VeeField>
				<VeeField
					v-slot="{ field, errors }"
					name="surname"
					:validate-on-model-update="false"
				>
					<Field :data-invalid="!!errors.length">
						<FieldLabel for="surname">Фамилия</FieldLabel>
						<Input
							id="surname"
							v-bind="field"
							placeholder="Иванов"
							:aria-invalid="!!errors.length"
						/>
						<FieldError
							v-if="errors.length"
							:errors="errors"
						/>
					</Field>
				</VeeField>
			</div>

			<VeeField
				v-slot="{ field, errors }"
				name="phone"
				:validate-on-model-update="false"
			>
				<Field :data-invalid="!!errors.length">
					<FieldLabel for="phone">Телефон</FieldLabel>
					<Input
						id="phone"
						v-bind="field"
						placeholder="+7 (999) 999-99-99"
						v-maska="'+7 (###) ###-##-##'"
						:aria-invalid="!!errors.length"
					/>
					<FieldError
						v-if="errors.length"
						:errors="errors"
					/>
				</Field>
			</VeeField>

			<VeeField
				v-slot="{ field, errors }"
				name="email"
				:validate-on-model-update="false"
			>
				<Field :data-invalid="!!errors.length">
					<FieldLabel for="email">Электронная почта</FieldLabel>
					<Input
						id="email"
						v-bind="field"
						placeholder="m@example.com"
						:aria-invalid="!!errors.length"
					/>
					<FieldError
						v-if="errors.length"
						:errors="errors"
					/>
				</Field>
			</VeeField>

			<VeeField
				v-slot="{ field, errors }"
				name="password"
				:validate-on-model-update="false"
			>
				<Field :data-invalid="!!errors.length">
					<FieldLabel for="password">Пароль</FieldLabel>

					<div class="relative">
						<Input
							id="password"
							v-bind="field"
							autocomplete="off"
							:type="showPassword ? 'text' : 'password'"
							:aria-invalid="!!errors.length"
						/>
						<button
							type="button"
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							@click="showPassword = !showPassword"
						>
							<Eye
								v-if="!showPassword"
								class="size-4"
							/>
							<EyeOff
								v-else
								class="size-4"
							/>
						</button>
					</div>

					<FieldError
						v-if="errors.length"
						:errors="errors"
					/>
				</Field>
			</VeeField>

			<Field class="mt-8">
				<Button
					type="submit"
					size="lg"
					:disabled="isLoading"
				>
					<Spinner
						v-if="isLoading"
						class="animate-spin"
					/>
					Зарегистрироваться
				</Button>
			</Field>
		</FieldGroup>
		<p class="text-sm text-muted-foreground text-center">
			У вас уже есть учетная запись?
			<nuxt-link
				to="/auth/login"
				class="text-primary"
			>
				Войти в систему
			</nuxt-link>
		</p>
	</form>
</template>
