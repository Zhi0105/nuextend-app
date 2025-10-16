import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Layout, Text, Select, SelectItem, IndexPath, Button, Card, Divider } from '@ui-kitten/components';
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from "react-native-flash-message";
import _ from 'lodash';
import useUserStore from '@_stores/auth';
import { UpdateUser } from '@_services/authentications';
import { getDepartments } from "@_src/services/department";
import { getPrograms } from '@_services/program';
import { getSkills } from '@_services/skill';

export const Profile = () => {
  const queryClient = useQueryClient();
  const { user, setUser, token } = useUserStore(state => ({ 
    user: state.user, 
    setUser: state.setUser, 
    token: state.token 
  }));

  const { data: departmentData } = getDepartments();
  const { data: programData } = getPrograms();
  const { data: skillData } = getSkills();

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedDept, setSelectedDept] = useState(new IndexPath());
  const [selectedProgram, setSelectedProgram] = useState(new IndexPath());
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({  
    defaultValues: {
      skills: [],
      department: "",
      program: "",
    },
  });

  const { mutate: handleUpdateUser, isLoading: updateUserLoading } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['update-user'] });
      setUser(data?.data);
      setIsUpdate(false);
      showMessage({
        message: "Update successful!",
        type: 'success',
        duration: 1200,
        floating: true,
        position: 'top',
      });
    }, 
    onError: (err) => {  
      showMessage({
        message: err.response?.data?.message || "Something went wrong.",
        type: 'danger',
        duration: 1200,
        floating: true,
        position: 'top',
      });
    },
  });

  const onSubmit = (data) => {
    handleUpdateUser({
      token,
      user_id: user?.id,
      department_id: data?.department,
      program_id: data?.program,
      skills: [...data?.skills],
    });
  };

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
      const ids = [];
      user.skill.forEach(userSkill => {
        const index = skillData.data.findIndex(s => s.id === userSkill.id);
        if (index !== -1) ids.push(userSkill.id);
      });
      setValue('skills', ids);
    }
  }, [user, skillData, setValue]);

  return (
    <Layout level='1' style={{ flex: 1, padding: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={{ borderRadius: 12, marginBottom: 12, paddingVertical: 12 }}>
          <Text category='h5' style={{ marginBottom: 10, color: '#364190' }}>
            Profile Information
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <Text className='text-3xl' appearance='hint' style={{ marginBottom: 8, fontSize: 28, color: "#000000", textTransform: "capitalize" }}>
            {user?.lastname}, {user?.firstname} {user?.middlename}
          </Text>
          
          <Text appearance='hint' style={{ marginBottom: 8 }}>School Id: {user?.school_id}</Text>

          <Text appearance='hint' style={{ marginBottom: 12 }}>email: {user?.email}</Text>
        </Card>

        {!(user?.role_id === 2 || user?.role_id === 5) && (
          <Card style={{ borderRadius: 12, marginBottom: 12 }}>
            <Text category='h6' style={{ color: '#364190', marginBottom: 12 }}>
              Academic Information
            </Text>

            {/* Department */}
            <Text category='label'>Department</Text>
            {isUpdate ? (
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Select
                    selectedIndex={selectedDept}
                    value={departmentData?.data[selectedDept?.row]?.name || 'Select department'}
                    onSelect={index => {
                      setSelectedDept(index);
                      const selectedId = departmentData?.data[index.row].id;
                      onChange(selectedId);
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
                )}
                name="department"
              />
            ) : (
              <Text appearance='hint' style={{ marginBottom: 8, marginLeft: 8 }}>
                {departmentData?.data.find(d => d.id === user.department_id)?.name || 'N/A'}
              </Text>
            )}
            {errors.department && (
              <Text status='danger' appearance='hint'>Please select your department*</Text>
            )}

            {/* Program */}
            <Text category='label' style={{ marginTop: 8 }}>Program</Text>
            {isUpdate ? (
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
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
                )}
                name="program"
              />
            ) : (
              <Text appearance='hint' style={{ marginBottom: 8, marginLeft: 8 }}>
                {programData?.data.find(p => p.id === user.program_id)?.name || 'N/A'}
              </Text>
            )}
            {errors.program && (
              <Text status='danger' appearance='hint'>Please select your program*</Text>
            )}
          </Card>
        )}

        {/* Skills */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Text category='h6' style={{ color: '#364190', marginBottom: 12 }}>Skills</Text>
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
                );
              }}
            />
          ) : (
            <Text appearance='hint' style={{ marginLeft: 8 }}>
              {user?.skill?.map((s) => s.name).join(', ') || 'N/A'}
            </Text>
          )}
          {errors.skills && (
            <Text status='danger' appearance='hint'>Please select at least one skill*</Text>
          )}
        </Card>

        {/* Buttons */}
        <Layout style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
          {isUpdate ? (
            <>
              <Button
                style={{ flex: 1, marginRight: 8 }}
                status='success'
                onPress={handleSubmit(onSubmit)}
                disabled={updateUserLoading}
              >
                {updateUserLoading ? "Please wait..." : "Confirm"}
              </Button>
              <Button
                style={{ flex: 1 }}
                status='danger'
                appearance='outline'
                onPress={() => setIsUpdate(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              style={{ width: '100%' }}
              status='primary'
              onPress={() => setIsUpdate(true)}
            >
              Update
            </Button>
          )}
        </Layout>
      </ScrollView>
    </Layout>
  );
};
