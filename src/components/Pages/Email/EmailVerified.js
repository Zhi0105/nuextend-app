import { View, Text, TouchableOpacity } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EmailVerified = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    return (
        <View style={{
            marginTop: -headerHeight
        }} className="email-verified-main min-h-screen flex-1 py-4 justify-center items-center bg-white">
            <MaterialCommunityIcons name="check-circle" color="green" size={60} /> 
                <Text className="text-black">Email verification</Text>
                <Text className="text-black">Your email address was successfully verified.</Text>
                <TouchableOpacity
                    className="bg-[#2211cc] px-10 py-2 mt-4 rounded-lg"
                    // onPress={() => navigation.navigate('Login')} // make sure 'Login' is a screen in your stack
                >
                    <Text className="text-[#c7c430]">OK</Text>
                </TouchableOpacity>
        </View>        
    )
}
