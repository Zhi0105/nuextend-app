import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Register, Login } from '@_services/authentications';
import { AuthContext } from '@_context/AuthContext';
import useUserStore from '@_stores/auth';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import _ from 'lodash'



export const AuthProviders = ({ children }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { setUser, setToken, setUserLogout } = useUserStore((state) => ({
    setUser: state.setUser,
    setToken: state.setToken,
    // setUserLogout: state.setUserLogout
  }));


  const { mutate: handleLoginUser, isLoading: loginLoading } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({ queryKey: ['login'] });
        showMessage({
            message: "Login success",
            type: 'success',
            duration: 1000,
            floating: true,
            position: 'top',
        })
        // authenticate(data.access_token)
      }, 
    onError: (err) => {  
        showMessage({
            message: err.response.data.message,
            type: 'warning',
            duration: 1000,
            floating: true,
            position: 'top',
        })
    },
  });

  const { mutate: handleRegister, isLoading: registerLoading } = useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['register'] });
        showMessage({
            message: "New user created",
            type: 'success',
            duration: 1000,
            floating: true,
            position: 'top',
        })
        console.log(data)
        // authenticate(data.access_token)
      }, 
    onError: (err) => {  
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 1000,
        floating: true,
        position: 'top',
      })
    },
  });


  const register = (data) => {
    handleRegister(data)
  }

//   const login = (data) => {
//     handleLoginUser(data)
//   }

  const authenticate = async(user) => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Account' }],
    // });
    // const userdetails = await GetUser(user)
    // userdetails && setUser(userdetails)
    // setToken(user)

  }

//   const logout = () => {
//     setUserLogout()
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Login' }],
//     });
//     showMessage({
//       message: "Logout success",
//       type: 'success',
//       duration: 1000,
//       floating: true,
//       position: 'top',
//     })
//     logout_debounce()
//   }

  
  return (
    <AuthContext.Provider
      value={{
        register: (data) => { register(data) },
        registerLoading: registerLoading,
        login: (data) => { handleLoginUser(data) },
        loginLoading: loginLoading,
        // authenticate: (user) => { authenticate(user) },
        // logout: () => { logout() },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}