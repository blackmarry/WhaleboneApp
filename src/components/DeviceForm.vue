<template>
	<form @submit.prevent="saveDevice()">
		<div class="grid md:grid-cols-4 md:gap-4">
		<div class="mb-2">
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{{ headers.hostname }}
			</label>
			<input v-model="device.hostname" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hostname" required>
		</div>

		<div class="mb-2">
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{{ headers.device_type }}
			</label>
			<select v-model="device.device_type" @change="deviceChange()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option v-for="type in deviceType"> 
					{{ type }}
				</option>
			</select>
		</div>

		<div class="mb-2">
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{{ headers.os_type }}
			</label>
			<select v-model="device.os_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<template v-for="type in osType">
					<option v-if="compatible(type)" :value="type">
						{{ type }}
					</option>
				</template>
			</select>
		</div>

		<div class="mb-2">
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{{ headers.owner }}
			</label>
			<input v-model="device.owner_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meno" required>
		</div>
		</div>
		<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Uložit</button>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDevices } from '@/composables/useDevices';
import type { RequestDevice } from '@/includes/device';
import { postDevice } from '@/includes/api';
const emit = defineEmits(['submited'])

const deviceType = { pc: 'pc', laptop: 'laptop', mobile: 'mobile'}
const osType = { win: 'win', lin: 'lin', macOS: 'macOS', ios: 'ios', android: 'android'}

const headers = { hostname: 'Hostname', device_type: 'Typ zařízení', os_type: 'Typ OS', owner: 'Vlastník' }

const { devices } = useDevices()


const cleanDevice = (): RequestDevice => {
	return {
		hostname: '',
		device_type: deviceType.pc,
		os_type: osType.win,
		owner_name: '',
	}
}
const device = ref<RequestDevice>(cleanDevice())

const saveDevice = async () => {
	await postDevice(device.value)
	devices.value?.push({
		hostname: device.value.hostname,
		device_type: device.value.device_type,
		os_type: device.value.os_type,
		owner: device.value.owner_name,
	})
	device.value = cleanDevice()
	emit('submited')
}

const compatible = (type: string) => {
  const isPC = device.value.device_type === deviceType.pc || device.value.device_type === deviceType.laptop;
  if (isPC && (['win', 'lin', 'macOS'].includes(type))) {
    return true;
  } else if (!isPC && ['ios', 'android'].includes(type)) {
    return true;
  }
  return false;
};

const deviceChange = () => {
	if (['pc', 'laptop'].includes(device.value.device_type)) {
		if (['ios', 'android'].includes(device.value.os_type)) {
			device.value.os_type = osType.win
		}
	} else {
		device.value.os_type = osType.android
	}
}
</script>