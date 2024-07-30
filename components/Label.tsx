import { StyleSheet, View, ViewStyle,Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export interface LabelProps{
    text:string;
    containerStyle:ViewStyle;
    isFilled:boolean;
}
export default function Label({text,containerStyle,isFilled}:LabelProps){
    const style = useSharedValue({
        position:'relative',
        top:0,
        left:0,
        textAlign:'center',
    })

    const onCheckStyle = ''
    return (<View style={[styles.container,containerStyle]}>
        <Text style={styles.onBorder}>{text}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        borderColor:'violet',
        borderRadius:5,
        padding:10,
        borderWidth:1,
    },
    default:{
        fontSize:14,
        color:'violet'
    },
    onBorder:{
        position:'absolute',
        top:0,
        left:"10%",
        fontSize:10,
        color:'violet',
        transform:[{translateY:-5}],
        zIndex:10,backgroundColor:'white    '
    }

})