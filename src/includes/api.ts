import apiClient from "./axios"
import type { Device, RequestDevice } from "./device"

export const getDevices = async () => {
	// curl http://localhost:8081/list -v
	const devices = await apiClient.get<Device[]>('http://localhost:8081/list')
	return devices.data
}

export const postDevice = async (newDevice: RequestDevice) => {
	// curl http://localhost:8081/save -v -d '{"hostname":"test-hostname","device_type":"pc","os_type":"lin","owner_name":"test-user"}'
	const response = await apiClient.post<Device>('http://localhost:8081/save', newDevice)
}

