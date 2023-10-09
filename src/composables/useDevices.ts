import type { Device } from "@/includes/device";
import { ref } from "vue";

const devices = ref<Device[]>()

export const useDevices = () => {
	return { devices }
}
