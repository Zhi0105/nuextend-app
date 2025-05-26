import { apiClient } from "@_src/http-commons";
import { useQuery } from "@tanstack/react-query"

export const storeParticipant = (payload) => {
    const { user_id, event_id, token } = payload
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const data = {
        user_id,
        event_id,
    }

    const result = apiClient.post(`api/v1/participant/create`, data, { headers }).then(res => {
        return res.data
    })

    return result
}
export const getParticipantEvents = (user_id) => {
    return useQuery({
        queryKey: ['get-participant-event'],
        queryFn: async() => {
            const result = await apiClient.get(`api/v1/participant/events/${user_id}`)
            return result?.data
        },
        staleTime: 5 * 60000,
        refetchOnWindowFocus: true,
    })
}