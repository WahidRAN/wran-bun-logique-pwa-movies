import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TmdbApiParams } from "../types/TmdbApiTypes";

class ApiService {
	private axiosInstance: AxiosInstance;
	private baseURL: string;
	private apikey: string;

	constructor() {
		this.baseURL = "https://api.themoviedb.org/3";
		this.apikey = "88380de69bc3917a655a93f3389b25fb";
		this.axiosInstance = axios.create({
			baseURL: this.baseURL,
			timeout: 7000,
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				api_key: this.apikey,
			},
		});
	}

	public async get<T>(
		endpoint: string,
		params?: TmdbApiParams,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			const response = await this.axiosInstance.get<T>(endpoint, {
				...config,
				params: {
					...this.axiosInstance.defaults.params,
					...params,
				},
			});
			return response;
		} catch (error) {
			throw new Error(this.handleError(error));
		}
	}

	private handleError(error: any): string {
		if (axios.isAxiosError(error) && error.response) {
			return `Error: ${error.response.status} ${error.response.statusText}`;
		}
		return error.message || "An unexpected error occurred";
	}
}

export default ApiService;
