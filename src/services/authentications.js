import { apiClient } from "@_src/http-commons";

export const Register = async(payload) => {
    const data = {
        ...(payload.department?.id && { department_id: payload.department.id }),
        ...(payload.program?.id && { program_id: payload.program.id }),
        role_id: payload?.role.id,
        ...(payload.school_id && { school_id: payload.school_id }),
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
