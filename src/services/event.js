/* eslint-disable react-hooks/rules-of-hooks */
import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query"

export const getEvents = (payload) => {
    const headers = {
        Authorization: `Bearer ${payload?.token}`
    }

    return useQuery({
        queryKey: ['event'],
        queryFn: async() => {
            const result = await apiClient.get('api/v1/event/all', {headers})
            return result
        },
        staleTime: 5 * 60000,
        refetchOnWindowFocus: true,
        enabled: !!payload?.token
    });

}