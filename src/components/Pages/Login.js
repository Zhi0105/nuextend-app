import React, { useState, useContext, useCallback } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
// import { AuthContext } from '@_context/AuthContext';
import FastImage from 'react-native-fast-image'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Login = ({ navigation }) => {
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    // const { login, loginLoading } = useContext(AuthContext)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
        email: "",
        password: "",
        },
    });

    
    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <View className="login-main min-h-screen flex justify-center items-center">
            <View className="w-4/5 flex-col items-center justify-center gap-2 px-6 py-8 mx-auto rounded-lg shadow-lg bg-gray-50 lg:py-0">
                <FastImage 
                    style={{ width: 110, height: 110 }}
                    source={require('../../assets/nuextend.webp')}
                    alt={"Logo"}
                    resizeMode={FastImage.resizeMode.contain}
                />
                
                <Text>Login to participate in projects</Text>
                <View className="form-container w-full p-6 space-y-4 form_container md:space-y-6 sm:p-8">
                    <View className="space-y-4 form md:space-y-6 gap-4">

                        <View className="email-textfield">
                            <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^\S+@\S+\.\S+$/,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Enter your NU email or email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="email"
                            />
                            {errors.email && (
                                <Text className="text-sm text-red-400 indent-2">email is required*</Text>
                            )}
                        </View>
                        <View className="password-field">
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /[\S\s]+[\S]+/,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        secureTextEntry={isPasswordVisible}
                                        placeholder="password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                    <TouchableOpacity 
                                        className="absolute -inset-y-0 right-0 px-4 mt-3" 
                                        onPress={() => setisPasswordVisible(!isPasswordVisible)}
                                    >
                                        <MaterialCommunityIcons name={isPasswordVisible ? 'eye-off' : 'eye' } color="gray" size={28} /> 
                                    </TouchableOpacity>
                                    </View>
                                )}
                                name="password"
                            />
                            {errors.password && (
                                <Text className="text-sm text-red-400 indent-2">password is required*</Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            className="w-full text-gray-900 bg-white flex justify-center items-center cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onPress={handleSubmit(onSubmit)}
                            // disabled={loginLoading}              
                        >
                            {/* <Text>{loginLoading ? "Please wait..." : "Login"}</Text> */}
                            <Text>Login</Text>

                        </TouchableOpacity>

                        <View className="flex-row justify-center items-center">
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity className="p-2" onPress={() => navigation.navigate('Register')}>
                                <Text className="text-[#364190]">Sign up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}
