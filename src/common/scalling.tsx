import {
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('window');

//Guideline sizes are based on standard "iPhoneSE" mobile device
const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

const screenWidth = width;
const screenHeight = height;
const scale = (size: number) => width / guidelineBaseWidth * size;
const verticalScale = (size: number) => height / guidelineBaseHeight * size;

export {
    screenWidth,
    screenHeight,
    scale,
    verticalScale,
};