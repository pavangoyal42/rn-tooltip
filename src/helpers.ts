//  @flow

import {ReactElement} from 'react'

import {Platform, Dimensions} from 'react-native'

const Screen = Dimensions.get('window')
export const ScreenWidth: number = Screen.width
export const ScreenHeight: number = Screen.height
export const isIOS = Platform.OS === 'ios'

export const Colors = {
  darkergray: '#617080',
  overlay_bright: 'rgba(250, 250, 250, 0.70)',
}

export type State = {
  isVisible: boolean
  yOffset: number
  xOffset: number
  elementWidth: number
  elementHeight: number
}

export type Props = {
  withPointer: boolean
  popover: ReactElement
  height: number | string
  width: number | string
  containerStyle: any
  pointerColor: string
  pointerStyle: unknown
  onClose: () => void
  onOpen: () => void
  withOverlay: boolean
  overlayColor: string
  backgroundColor: string
  highlightColor: string
  toggleWrapperProps: unknown
  actionType: 'press' | 'longPress' | 'none'
}
