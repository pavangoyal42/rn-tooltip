import { ReactElement } from 'react';
export declare const ScreenWidth: number;
export declare const ScreenHeight: number;
export declare const isIOS: boolean;
export declare const Colors: {
    darkergray: string;
    overlay_bright: string;
};
export declare type State = {
    isVisible: boolean;
    yOffset: number;
    xOffset: number;
    elementWidth: number;
    elementHeight: number;
};
export declare type Props = {
    withPointer: boolean;
    popover: ReactElement;
    height: number | string;
    width: number | string;
    containerStyle: any;
    pointerColor: string;
    pointerStyle: {};
    onClose: () => void;
    onOpen: () => void;
    withOverlay: boolean;
    overlayColor: string;
    backgroundColor: string;
    highlightColor: string;
    toggleWrapperProps: {};
    actionType: 'press' | 'longPress' | 'none';
};
