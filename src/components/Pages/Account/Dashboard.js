import FastImage from 'react-native-fast-image'
import { View } from "react-native"
import { useHeaderHeight } from '@react-navigation/elements';

export const Dashboard = () => {
    const headerHeight = useHeaderHeight();
    return (
        <View className="dashboard-main min-h-screen lex-1 justify-center items-center bg-white">
            <FastImage 
                style={{ width: 110, height: 110, marginTop: -headerHeight }}
                source={require('../../../assets/nuextend.webp')}
                alt={"Logo"}
                resizeMode={FastImage.resizeMode.contain}
            />           
        </View>
    )
}
