import { View, Text } from "react-native"
import useUserStore from "@_stores/auth";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sentVerificationNotification } from "@_services/emai";
import { showMessage } from "react-native-flash-message";

export const EmailSendLink = () => {
    const headerHeight = useHeaderHeight();
    const queryClient = useQueryClient()
    const route = useRoute();
    const { email } = route.params;
    const { token } = useUserStore((state) => ({
        token: state.token
    }));

    const { mutate: handleSendEmail, isLoading: sendLoading } = useMutation({
        mutationFn: sentVerificationNotification,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['send-link'] });
            showMessage({
                message: data?.message,
                type: 'success',
                duration: 1000,
                floating: true,
                position: 'top',
            })
        }, 
        onError: (err) => {  
            console.log("@SEC", err?.response.data)
        },
    });

    
    if(sendLoading) {
        return (
            <View 
                style={{
                    marginTop: -headerHeight
                }}
                className="email-send-link-main min-h-screen flex-1 py-4 justify-center items-center bg-white">
                    <Text>Sending verification....</Text>
            </View>
        )
    }


    return (
        <View 
        style={{
            marginTop: -headerHeight
        }}
        className="email-send-link-main min-h-screen flex-1 py-4 justify-center items-center bg-white">
            <View className="flex flex-col bg-blue-200 border-2 border-blue-400 p-4 rounded-lg mx-4">
                <Text className="text-blue-500">Confirm Your Email Address</Text>
                <Text className="text-black">
                    A confirmation email has been sent to <Text className='font-bold text-blue-800'>{email}</Text> to verify your email address and activate your account.
                </Text>
                <Text className="mt-4">
                <Text onPress={() => handleSendEmail({ token, is_mobile: true })} className="text-blue-800">Click here</Text>
                    {" "}if you did not receive an email or would like to change the email address you signed up with.
                </Text>
            </View>
        </View>
    )
}
