import {StyleProp, TextStyle} from 'react-native'
import {
  Icon,
  MessageType,
  Position,
  showMessage,
} from 'react-native-flash-message'

enum AlertTypes {
  ERROR = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
}

export interface MessageOptions {
  animated?: boolean
  animationDuration?: number
  backgroundColor?: string
  autoHide?: boolean
  color?: string
  description?: string
  duration?: number
  floating?: boolean
  hideOnPress?: boolean
  hideStatusBar?: boolean
  icon?: Icon
  position?: Position
  textStyle?: StyleProp<TextStyle>
  titleStyle?: StyleProp<TextStyle>
  type?: MessageType
  txOptions?: object
  onPress?(): void
  onLongPress?(): void
}

export class AlertsHelper {
  static DURATION = 2200

  /**
   * Renders a error flash message
   * @param messageText a string must be passed
   * @param options MessageOptions
   */
  static error(messageText?: string, options?: MessageOptions) {
    const message = messageText
    showMessage(
      Object.assign(
        {},
        {
          backgroundColor: 'blue',
          duration: AlertsHelper.DURATION,
          message,
          type: AlertTypes.ERROR,
        },
        options,
      ),
    )
  }

  /**
   * Renders a success flash message
   * @param messageText a string must be passed
   * @param options MessageOptions
   */
  static success(messageText: string, options?: MessageOptions) {
    const message = messageText

    showMessage(
      Object.assign(
        {},
        {
          backgroundColor: 'green',
          duration: AlertsHelper.DURATION,
          message,
          type: AlertTypes.SUCCESS,
        },
        options,
      ),
    )
  }

  /**
   * Renders a info flash message
   * @param messageText a string must be passed
   * @param options MessageOptions
   */
  static info(messageText: string, options?: MessageOptions) {
    const message = messageText

    showMessage(
      Object.assign(
        {},
        {
          backgroundColor: 'blue',
          duration: AlertsHelper.DURATION,
          message,
          type: AlertTypes.INFO,
        },
        options,
      ),
    )
  }
}
