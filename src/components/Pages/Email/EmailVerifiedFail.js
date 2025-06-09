import { View, Text } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements";
import Entypo from 'react-native-vector-icons/Entypo';

export const EmailVerifiedFail = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    return (
        <View style={{
            marginTop: -headerHeight
        }} className="email-verified-main min-h-screen flex-1 py-4 justify-center items-center bg-white">
            <Entypo name="circle-with-cross" size={60} color="red" />
                <Text className="text-black">Email verification</Text>
                <Text className="text-black">Your email address was not yet verified.</Text>
        </View>        
    )
}
