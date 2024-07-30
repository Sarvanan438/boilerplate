import { useEffect, useMemo, useState } from "react";
import { Button, Dimensions, StyleSheet ,View} from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
const width = Dimensions.get('screen').width
type Easingtype = 'LINEAR'|'BOUNCE';
function useEasing(type:Easingtype){
    const [easingType,setEasingType] = useState(type);
    
    const easingValue = useMemo((

    )=>{
        let easingValue = Easing.linear;
        if(easingType==='BOUNCE') easingValue = Easing.bounce;
        return easingValue
    },[easingType]);
   
    return {easingType,setEasingType,easingValue};
}
export default function SpringBox({initialWidth=100}:{initialWidth:number}){
    const x  = useSharedValue<number>(width/2)
    const transform = useAnimatedStyle(()=>({
        transform:[{translateX:x.value}]
    }))
   const {easingType:type,setEasingType,easingValue} = useEasing('LINEAR')
    useEffect(()=>{
        x.value=width/2
        x.value = withRepeat(withTiming(-width/2,{
            duration:1000,
            easing:easingValue,
        }),-1,true)
    },[type])
    return (<View style={styles.container}>
        <Animated.View style={[styles.box,transform]}/>
        <Animated.View style={[styles.box,transform]}/>
        <View style={styles.buttonStyle}>
        <Button title={type==='LINEAR'?'BOUNCE':"LINEAR"} onPress={()=>setEasingType(type=>type==='LINEAR'?'BOUNCE':'LINEAR')}/>
        </View>
    </View>);

}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
        borderRadius:5,
        padding:10,
        alignItems:'center'
    },
    box:{
        width:50,
        height:50,
        borderRadius:5,
        backgroundColor:'violet',
        marginBottom:40,
        
    },
    buttonStyle:{
        width:'100%',
        minHeight:100
    }

})