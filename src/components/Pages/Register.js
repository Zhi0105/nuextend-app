import React, { useState } from 'react'
import { Text, View  } from 'react-native'
import Stepper from 'react-native-stepper-ui';


const MyComponent = (props) => {
    return (
        <View className="my-20">
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>
        <Text>{props.title}</Text>

        </View>
    );
    };

const content = [
    <MyComponent title="Component 1" />,
    <MyComponent title="Component 2" />,
    <MyComponent title="Component 3" />,
    <MyComponent title="Component 4" />,
];

export const Register = ({ navigation }) => {
    const [active, setActive] = useState(0);
    

    return (
    <View className="min-h-screen " style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Stepper
            active={active}
            content={content}
            onBack={() => setActive((p) => p - 1)}
            onFinish={() => alert('Finish')}
            onNext={() => setActive((p) => p + 1)}
            buttonStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: 'center',
                backgroundColor: '#2196F3',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
            }}
            buttonTextStyle={{ color: 'white' }}
        />
    </View>
    )
}
