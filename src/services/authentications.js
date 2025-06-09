import { apiClient } from "@_src/http-commons";

export const Register = async(payload) => {
    const data = {
        ...(payload.department && { department_id: payload.department }),
        ...(payload.program && { program_id: payload.program }),
        role_id: payload?.role,
        ...(payload.schoolID && { school_id: payload.schoolID }),
        firstname: payload.firstname,
        middlename: payload.middlename,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password,
        contact: payload.contact,
        ...(payload.skills?.length && {
            skills: [...payload.skills],
        })
    }
    const result = await apiClient.post('api/v1/register', data).then(res => {
        return res.data
    })

  return result
}
export const Login = async(payload) => {
    const data = {
        email: payload.email,    
        password: payload.password
    }
    const result = await apiClient.post('api/v1/authenticate', data).then(res => {
        return res.data
    })

    return result
}
export const UpdateUser = (payload) => {
    const { department_id, program_id, skills } = payload
    const headers = {
        Authorization: `Bearer ${payload.token}`
    }
    const data = {
        department_id,
        program_id,
        skills: [ ...skills ]
    }

    const result = apiClient.post(`api/v1/user/update/${payload.user_id}`, data, { headers }).then(res => {
        return res.data
    })

    return result
}