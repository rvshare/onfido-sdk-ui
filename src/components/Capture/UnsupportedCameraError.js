import { h, Component } from 'preact'

import Title from '../Title'
import theme from '../Theme/style.css'
import style from './style.css'
import { sendScreen } from '../../Tracker'
import { localised } from '../../locales'

class UnsupportedCameraError extends Component {
  componentDidMount() {
    sendScreen(['unsupported_camera_error'])
  }
  render ({translate}) {
    return (
      <div>
        <Title title={translate('errors.unsupported_camera_error.message')} subTitle={translate('errors.unsupported_camera_error.instruction')} />
        <div className={theme.thickWrapper}>
          <span className={`${theme.icon}  ${style.icon}`} />
        </div>
      </div>
    )
  }
}

export default localised(UnsupportedCameraError)
