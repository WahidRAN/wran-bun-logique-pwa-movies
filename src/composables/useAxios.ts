import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ref } from "vue";

export function useAxios() {
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: "https://api.example.com",
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = ref<null | any>(null);
	const error = ref<null | string>(null);
	const loading = ref<boolean>(false);

	const fetchData = async (endpoint: string, config?: AxiosRequestConfig) => {
		loading.value = true;
		try {
			const response: AxiosResponse = await axiosInstance.get(endpoint, config);
			data.value = response.data;
		} catch (err: any) {
			error.value = err.message || "An error occurred";
		} finally {
			loading.value = false;
		}
	};

	return {
		axiosInstance,
		data,
		error,
		loading,
		fetchData,
	};
}
