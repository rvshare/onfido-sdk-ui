import { h, Component } from 'preact'

export default WrappedComponent =>
  class extends Component {

    render() {
      const { useWebcam, hasCamera } = this.props
      return useWebcam && !hasCamera ?
        <div>some error </div> :
        <WrappedComponent {...this.props} />
    }
  }
