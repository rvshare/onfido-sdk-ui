import { h, Component } from 'preact'
import UnsupportedCameraError from './UnsupportedCameraError'

export default WrappedComponent =>
  class extends Component {

    render() {
      const { useWebcam, hasCamera, translate } = this.props
      return useWebcam && !hasCamera ?
        <UnsupportedCameraError {...translate} /> :
        <WrappedComponent {...this.props} />
    }
  }
