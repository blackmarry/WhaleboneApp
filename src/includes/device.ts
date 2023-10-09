export type Device = {
	hostname: string,
	device_type: string,
	os_type: string,
	owner: string
}

export type RequestDevice = {
	hostname: string,
	device_type: string,
	os_type: string,
	owner_name: string
}