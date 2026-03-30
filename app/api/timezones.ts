export interface TimezoneData {
	id: number;
	name: string;
	shift: number;
}

function formatOffset(shift: number) {
	const sign = shift >= 0 ? '+' : '-';
	const abs = Math.abs(shift);

	const hours = Math.floor(abs / 3600);
	const minutes = (abs % 3600) / 60;

	return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
}

function formatTimezoneLabel(tz: TimezoneData) {
	return `${tz.name} (${formatOffset(tz.shift)})`;
}

export function useTimezonesApi() {
	const baseUrl = 'https://api.testjulo.ru/api';
	return {
		getTimezones: async () => {
			const response = await $fetch<TimezoneData[]>(`${baseUrl}/timezones`, {
				method: 'GET',
			});
			return response.map((tz) => ({
				value: tz.name,
				label: formatTimezoneLabel(tz),
			}));
		},
	};
}
