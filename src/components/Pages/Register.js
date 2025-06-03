import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@_context/AuthContext';
import { View, Text, TouchableOpacity, Keyboard, ScrollView } from 'react-native'
import { getRoles } from '@_services/role';
import { getDepartments } from "@_src/services/department";
import { getPrograms } from '@_services/program';
import { useForm, Controller } from "react-hook-form";
import { Layout, Select, Input, SelectItem, IndexPath } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _ from 'lodash';


export const Register = ({ navigation }) => {
    const { register, registerLoading } = useContext(AuthContext)
    const { handleSubmit, control, watch, getValues, formState: { errors }} = useForm({
        defaultValues: {
            role: "",
            schoolID: "",
            firstname: "",
            middlename: "",
            lastname: "",
            contact: "",
            department: "",
            program: "",
            email: "",
            password:""
        },
    });
    const { data: roleData, isLoading: roleLoading } = getRoles()
    const { data: departmentData } = getDepartments()
    const { data: programData } = getPrograms()
    const [selectedRole, setSelectedRole] = useState(new IndexPath());
    const [ roles, setRoles ] = useState([])
    const [selectedDept, setSelectedDept] = useState(new IndexPath());
    const [selectedProgram, setSelectedProgram] = useState(new IndexPath());
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const watchedRole = watch("role");


    const onSubmit = (data) => {
        register(data)
    };

    useEffect(() => {
        const deptId = departmentData?.data[selectedDept?.row]?.id;
        if (deptId && programData?.data) {
            const filtered = _.filter(programData?.data, p => p.department_id === deptId);
            setFilteredPrograms(filtered);
        }
    }, [selectedDept, programData, departmentData]);

    useEffect(() => {
        if(!roleLoading) {
            const includeItems = [2, 3, 4, 5]
            const filteredRoles = _.filter(roleData?.data, role => includeItems.includes(role.id))
            setRoles(filteredRoles)
        }
    }, [roleData, roleLoading])

    useEffect(() => {
        if (roles.length && watchedRole) {
            const index = roles.findIndex(role => role.id === watchedRole);
            if (index >= 0) {
                setSelectedRole(new IndexPath(index));
            }
        }
    }, [watchedRole, roles]);



    return (
        <View className="min-h-screen" style={{ marginVertical: 20, marginHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    className='my-12'
                    contentContainerStyle={{
                        padding: 20,
                        justifyContent: 'center',
                    } || {}}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='mb-4 user-type'>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange } }) => (
                                <Layout
                                level='1'
                                >
                                    <Select
                                        selectedIndex={selectedRole}
                                        value={roles[selectedRole?.row]?.name || 'User type'}
                                        onSelect={index => {
                                            setSelectedRole(index);
                                            onChange(roles[index.row].id)
                                        }}
                                    >
                                    {roles?.map((role) => {
                                        return (
                                            <SelectItem
                                                key={role.id}
                                                title={role.name}
                                            />
                                        )
                                    })}
                                    </Select>
                                </Layout>
                            )}
                            name="role"
                        />
                        {errors.role && (
                            <Text className="text-sm text-red-400 indent-2">Please select your user type*</Text>
                        )}
                    </View>
                    <View className="mb-4 flex-col gap-4">
                        {watchedRole !== 2 && (
                            <View className='school_id'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        pattern: /^\d{4}-\d{6}$/,
                                    }}
                                    render={({ field: { value, onChange } }) => (
                                        <Input
                                            placeholder="Enter your School ID"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                    name="schoolID"
                                />
                                {errors.schoolID && (
                                    <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                        School ID is invalid.*
                                    </Text>
                                )}
                            </View>
                        )}
                        <View className='firstname'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /[\S\s]+[\S]+/,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeholder="Enter your first name"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="firstname"
                            />
                            {errors.firstname && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    First name is required.*
                                </Text>
                            )}
                        </View>
                        <View className='middlename'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /[\S\s]+[\S]+/,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeholder="Enter your middle name"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="middlename"
                            />
                            {errors.middlename && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    Middle name is required.*
                                </Text>
                            )}
                        </View>
                        <View className='lastname'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /[\S\s]+[\S]+/,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeholder="Enter your last name"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="lastname"
                            />
                            {errors.lastname && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    Last name is required.*
                                </Text>
                            )}
                        </View>
                        <View className='contact'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /^0\d{10}$/
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeholder="Enter your phone number"
                                        value={value}
                                        keyboardType='numeric'
                                        onChangeText={onChange}
                                    />
                                )}
                                name="contact"
                            />
                            {errors.contact && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    Contact is invalid.*
                                </Text>
                            )}
                        </View>
                    </View>
                    {!(watchedRole === 2 || watchedRole === 5) && (
                        <View className="mb-4 flex-col gap-4">
                            <View className='department'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <Layout
                                            level='1'
                                        >
                                            <Select
                                                selectedIndex={selectedDept}
                                                value={departmentData?.data[selectedDept?.row]?.name || 'Select department'}
                                                onSelect={index => {
                                                    setSelectedDept(index);
                                                    onChange(departmentData?.data[index.row].id)
                                                }}
                                            >
                                            {departmentData?.data.map((department) => {
                                                return (
                                                    <SelectItem
                                                        key={department.id}
                                                        title={department.name}
                                                    />
                                                )
                                            })}
                                            </Select>
                                        </Layout>
                                    )}
                                    name="department"
                                />
                                {errors.department && (
                                    <Text className="text-sm text-red-400 indent-2">Please select your department*</Text>
                                )}
                            </View>
                            <View className='program'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <Layout
                                            level='1'
                                        >
                                            <Select
                                                selectedIndex={selectedProgram}
                                                value={programData?.data[selectedProgram?.row]?.name || 'Select Program'}
                                                onSelect={index => {
                                                    setSelectedProgram(index);
                                                    onChange(programData?.data[index.row].id)
                                                }}
                                            >
                                            {filteredPrograms.map((program) => (
                                                <SelectItem
                                                    key={program.id}
                                                    title={program.name}
                                                />
                                            ))}
                                            </Select>
                                        </Layout>
                                    )}
                                    name="program"
                                />
                                {errors.program && (
                                    <Text className="text-sm text-red-400 indent-2">Please select your program*</Text>
                                )}
                            </View>
                        </View>
                    )}
                    <View className="mb-4 flex-col gap-4">
                        <View className='email'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    ...(getValues("role") === 2 && {
                                        pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        },
                                    }),
                                    ...(getValues("role") === 3 && {
                                        pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@students\.nu-baliwag\.edu\.ph$/,
                                        },
                                    }),
                                    ...(getValues("role") === 4 && {
                                        pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@nu-baliwag\.edu\.ph$/,
                                        },
                                    }),
                                    ...(getValues("role") === 5 && {
                                        pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        },
                                    })
                                    }}
                                    render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeholder="Enter your Email"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="email"
                            />
                            {errors.email && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    Email is invalid.*
                                </Text>
                            )}
                        </View>
                        <View className='password'>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: /[\S\s]+[\S]+/,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        secureTextEntry={true}
                                        placeholder="Enter your password"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="password"
                            />
                            {errors.password && (
                                <Text className="text-sm italic mt-1 text-red-400 indent-2">
                                    Password is required.*
                                </Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={registerLoading}
                        style={{
                            alignItems: "center",
                            backgroundColor: '#364190',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 5,
                        }}
                    >
                        <Text className='text-white'>{registerLoading ? "Please wait..." : "Register"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    )
}
