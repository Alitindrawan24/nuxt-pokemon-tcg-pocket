interface ApiRequestParams {
    method: Method,
    path: string,
}

type Method = 'GET' ;

interface ApiResponseData<T = unknown>{
    status: string,
    message: string
    data: T
}

export const useApi = async <T = unknown>({
    method,
    path
}: ApiRequestParams): Promise<ApiResponseData<T>> => {
    const config = useRuntimeConfig()
    const url = config.public.apiHost + path

    return await $fetch<ApiResponseData<T>>(url, {
        method: method,
        headers: {
            "accept": "application/json",
        }
    }).then(data => {
        return data as ApiResponseData<T>
    }).catch(err => {
    if (err.data && typeof err.data === 'object') {
        return {
            status: 'error',
            message: err.data.message || 'Request failed',
            data: err.data.data || (null as unknown as T)
        }
    }
    return {
            status: 'error',
            message: err.message || 'Unknown error',
            data: null as unknown as T
        }
    })
}
