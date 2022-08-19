"use strict";
//  @flow
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = exports.isIOS = exports.ScreenHeight = exports.ScreenWidth = void 0;
const react_native_1 = require("react-native");
const Screen = react_native_1.Dimensions.get('window');
exports.ScreenWidth = Screen.width;
exports.ScreenHeight = Screen.height;
exports.isIOS = react_native_1.Platform.OS === 'ios';
exports.Colors = {
    darkergray: '#617080',
    overlay_bright: 'rgba(250, 250, 250, 0.70)',
};
