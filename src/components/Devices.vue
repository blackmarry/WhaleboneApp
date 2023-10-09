<template>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th v-for="header in headers" scope="col" class="px-6 py-3">
						{{ header }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in devices" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="px-6 py-4">{{ row.hostname }}</td>
					<td class="px-6 py-4">{{ row.device_type }}</td>
					<td class="px-6 py-4">{{ row.os_type }}</td>
					<td class="px-6 py-4">{{ row.owner }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { useDevices } from '@/composables/useDevices';

const headers = { hostname: 'Hostname', device_type: 'Typ zařízení', os_type: 'Typ OS', owner: 'Vlastník' }

const { devices } = useDevices()
</script>




<!-- 
  Vypracujte prosím jednoduchou aplikaci na evidenci uživatelských zařízení. 
  Aplikace bude přístupná přes jednoduché web UI. Po přístupu na url aplikace (přihlašování není potřeba) se zobrazí tabulkový výpis zařízení se sloupci:
    hostname,
    typ zařízení (pc, laptop, mobil),
    typ OS (win, lin, macOS, iOS, android),
    vlastník (jméno + prijmeni, jeden vlastník může vlastnit více zařízení)

  U tabulky bude tlačítko 'přidat', po kliknutí na něj se zobrazí formulář, kterým bude možné přidat nové zařízení do seznamu. 
  Validace vstupu, unit testy apod. necháváme na vašem uvážení.
  UI bude komunikovat s backendem pomocí REST api, backend bude data ukládat do relační db.
  Samotné API a DB jsou nachystané jako docker image, je možné je buď stáhnout přes docker pull nebo zbuildovat z přiložených souborů.
  V readme jsou příklady requestů pomocí curl, je přiložen i swagger soubor se specifikací.
-->
