
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import useUserStore from '@_stores/auth';
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUser } from '@_services/authentications';
import { showMessage } from "react-native-flash-message";

import { getDepartments } from "@_src/services/department";
import { getPrograms } from '@_services/program';
import { getSkills } from '@_services/skill';
import _ from 'lodash';


export const Profile = () => {
    const queryClient = useQueryClient();
    const { user, setUser, token } = useUserStore((state) => ({ user: state.user, setUser: state.setUser, token: state.token }));
    const { data: departmentData } = getDepartments()
    const { data: programData } = getPrograms()
    const { data: skillData } = getSkills()
    const [ isUpdate, setIsUpdate ] = useState(false)
    const [selectedDept, setSelectedDept] = useState(new IndexPath());
    const [selectedProgram, setSelectedProgram] = useState(new IndexPath());
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const {
        handleSubmit,
        control,
        setValue,
        formState : { errors }
    } = useForm({  
        defaultValues: {
            skills: [],
            department: "",
            program: "",
        },
    });

    const { mutate: handleUpdateUser, isLoading: updateUserLoading} = useMutation({
        mutationFn: UpdateUser,
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['update-user'] });
                setUser(data?.data)
                setIsUpdate(false)
                showMessage({
                message: "update success",
                type: 'success',
                duration: 1000,
                floating: true,
                position: 'top',
                })
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

    const onSubmit = (data) => {
        handleUpdateUser({
            token,
            user_id: user?.id,
            department_id: data?.department,
            program_id: data?.program,
            skills: [ ...data?.skills ]
        })
    }

    useEffect(() => {
        const deptId = departmentData?.data[selectedDept?.row]?.id;
        if (deptId && programData?.data) {
            const filtered = _.filter(programData.data, p => p.department_id === deptId);
            setFilteredPrograms(filtered);
        }
    }, [selectedDept, programData, departmentData]);

    useEffect(() => {
        if (departmentData?.data?.length && user?.department_id) {
            const deptIndex = departmentData.data.findIndex(d => d.id === user.department_id);
            if (deptIndex !== -1) {
            setSelectedDept(new IndexPath(deptIndex));
            setValue('department', departmentData.data[deptIndex].id);
            }
        }

        if (programData?.data?.length && user?.program_id) {
            const filtered = programData.data.filter(p => p.department_id === user.department_id);
            setFilteredPrograms(filtered);
            const progIndex = filtered.findIndex(p => p.id === user.program_id);
            if (progIndex !== -1) {
            setSelectedProgram(new IndexPath(progIndex));
            setValue('program', filtered[progIndex].id);
            }
        }
    }, [user, departmentData, programData]);

    useEffect(() => {
        if (user?.skill && skillData?.data?.length) {
            const indexes = [];
            const ids = [];

            user.skill.forEach(userSkill => {
            const index = skillData.data.findIndex(s => s.id === userSkill.id);
            if (index !== -1) {
                indexes.push(new IndexPath(index));
                ids.push(userSkill.id);
            }
            });

            setValue('skills', ids); // 👈 THIS is the missing piece
        }
    }, [user, skillData, setValue]);

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <View className="profile-main min-h-screen w-full p-6 space-y-4">
            <View className="space-y-4 form md:space-y-6 flex-col gap-4">
                {!( user?.role_id === 2 || user?.role_id === 5 ) && (
                    <>
                        <View className='department'>
                            <Text className='mb-2 text-lg font-bold'>Department:</Text>
                            {isUpdate ? (
                                <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange } }) => (
                                    <Layout level='1'>
                                        <Select
                                            selectedIndex={selectedDept}
                                            value={departmentData?.data[selectedDept?.row]?.name || 'Select department'}
                                            onSelect={index => {
                                            setSelectedDept(index);
                                            const selectedId = departmentData?.data[index.row].id;
                                            onChange(selectedId);

                                            // Reset program dropdown when dept changes
                                            const filtered = programData?.data.filter(p => p.department_id === selectedId);
                                            setFilteredPrograms(filtered);
                                            setSelectedProgram(new IndexPath());
                                            setValue('program', null);
                                            }}
                                        >
                                            {departmentData?.data.map((d) => (
                                            <SelectItem key={d.id} title={d.name} />
                                            ))}
                                        </Select>
                                    </Layout>
                                )}
                                name="department"
                                />
                            ) : (
                                <Text className='pl-4'>{departmentData?.data.find(d => d.id === user.department_id)?.name || 'N/A'}</Text>
                            )}
                            {errors.department && (
                                <Text className="text-sm text-red-400 indent-2">Please select your department*</Text>
                            )}
                        </View>
                        <View className='program'>
                            <Text className='mb-2 text-lg font-bold'>Program:</Text>
                            {isUpdate ? (
                                <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange } }) => (
                                    <Layout level='1'>
                                    <Select
                                        selectedIndex={selectedProgram}
                                        value={filteredPrograms?.[selectedProgram?.row]?.name || 'Select program'}
                                        onSelect={index => {
                                        setSelectedProgram(index);
                                        onChange(filteredPrograms[index.row]?.id);
                                        }}
                                    >
                                        {filteredPrograms.map((p) => (
                                        <SelectItem key={p.id} title={p.name} />
                                        ))}
                                    </Select>
                                    </Layout>
                                )}
                                name="program"
                                />
                            ) : (
                                <Text className='pl-4'>{programData?.data.find(p => p.id === user.program_id)?.name || 'N/A'}</Text>
                            )}
                            {errors.program && (
                                <Text className="text-sm text-red-400 indent-2">Please select your program*</Text>
                            )}
                        </View>
                    </>
                )}
                <View className='skills'>
                    <Text className='mt-2 text-lg font-bold'>Skills:</Text>
                    {isUpdate ? (
                        <Controller
                        control={control}
                        name="skills"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => {
                            const selectedIndexes = value?.map(skillId => {
                            const index = skillData?.data.findIndex(s => s.id === skillId);
                            return index !== -1 ? new IndexPath(index) : null;
                            }).filter(i => i !== null) || [];

                            return (
                            <Layout level="1">
                                <Select
                                multiSelect
                                selectedIndex={selectedIndexes}
                                onSelect={(indexes) => {
                                    const selectedIds = indexes.map(i => skillData.data[i.row].id);
                                    onChange(selectedIds);
                                }}
                                value={
                                    (value && value.length)
                                    ? value.map(id => skillData.data.find(s => s.id === id)?.name).join(', ')
                                    : 'Select skills'
                                }
                                >
                                {skillData?.data.map((s) => (
                                    <SelectItem key={s.id} title={s.name} />
                                ))}
                                </Select>
                            </Layout>
                            )
                        }}
                        />
                    ) : (
                        <Text className='pl-4'>
                        {user?.skill?.map((s) => s.name).join(', ') || 'N/A'}
                        </Text>
                    )}
                    {errors.skills && (
                        <Text className="text-sm text-red-400 indent-2">Please select at least one skill*</Text>
                    )}
                </View>

                {isUpdate &&
                    <View className="flex gap-2">
                        <TouchableOpacity
                        disabled={updateUserLoading}
                        onPress={handleSubmit((data) => onSubmit(data))} 
                        className="flex justify-center items-center rounded pb-2 pt-2.5 bg-green-400"
                        >
                        <Text
                            className="text-xs font-medium capitalize leading-normal text-center text-white"
                        >
                            {updateUserLoading ? "Please wait..." : "Confirm"}  
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={() => setIsUpdate(false)} 
                        className="flex justify-center items-center rounded pb-2 pt-2.5 bg-red-400"
                        >
                        <Text
                            className="text-xs font-medium capitalize leading-normal text-center text-white"
                        >
                            cancel
                        </Text>
                        </TouchableOpacity>
                    </View>
                }
                {!isUpdate &&
                    <TouchableOpacity
                        onPress={() => setIsUpdate(true)} 
                        className="flex justify-center items-center rounded pb-2 pt-2.5 bg-[#364190]"
                    >
                        <Text
                        className="text-sm font-medium capitalize leading-normal text-center text-white"
                        >
                        Update
                        </Text>
                    </TouchableOpacity>
                }
        </View>
        </View>
    )
}
