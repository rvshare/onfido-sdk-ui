import { h } from 'preact'

import Welcome from '../Welcome'
import {SelectPoADocument, SelectIdentityDocument} from '../Select'
import {FrontDocumentCapture, BackDocumentCapture, SelfieCapture, VideoCapture } from '../Capture'
import {DocumentFrontConfirm, DocumentBackConfirm, SelfieConfirm, VideoConfirm} from '../Confirm'
import Complete from '../Complete'
import MobileFlow from '../crossDevice/MobileFlow'
import CrossDeviceLink from '../crossDevice/CrossDeviceLink'
import ClientSuccess from '../crossDevice/ClientSuccess'
import CrossDeviceIntro from '../crossDevice/Intro'
import VideoIntro from '../Video/Intro'
import { includes } from '../utils/array'
import { PoACapture, PoAIntro, PoAGuidance } from '../ProofOfAddress'

export const componentsList = ({flow, documentType, steps, mobileFlow}) => {
  const captureSteps = mobileFlow ? clientCaptureSteps(steps) : steps
  return flow === 'captureSteps' ?
    createComponentList(captureStepsComponents(documentType, mobileFlow), captureSteps) :
    createComponentList(crossDeviceComponents, crossDeviceSteps(steps))
}

const isComplete = (step) => step.type === 'complete'

const hasCompleteStep = (steps) => steps.some(isComplete)

const clientCaptureSteps = (steps) =>
  hasCompleteStep(steps) ? steps : [...steps, {type: 'complete'}]

const shouldUseVideo = ({options = {}}) =>
  options.requestedVariant === 'video' && window.MediaRecorder

const captureStepsComponents = (documentType, mobileFlow) => step => {
  const complete = mobileFlow ? [ClientSuccess] : [Complete]

  return {
    welcome: () => [Welcome],
    face: () => shouldUseVideo(step) ?
        [VideoIntro, VideoCapture, VideoConfirm] :
        [SelfieCapture, SelfieConfirm],
    document: () => createIdentityDocumentComponents(documentType),
    poa: () => [PoAIntro, SelectPoADocument, PoAGuidance, PoACapture, DocumentFrontConfirm],
    complete: () => complete
  }[step.type]()
}

const createIdentityDocumentComponents = (documentType) => {
  const double_sided_docs = ['driving_licence', 'national_identity_card']
  const frontDocumentFlow = [SelectIdentityDocument, FrontDocumentCapture, DocumentFrontConfirm]
  if (includes(double_sided_docs, documentType)) {
    return [...frontDocumentFlow, BackDocumentCapture, DocumentBackConfirm]
  }
  return frontDocumentFlow
}

const crossDeviceSteps = (steps) => {
  const baseSteps = [{'type': 'crossDevice'}]
  const completeStep = Array.find(steps, isComplete)
  return hasCompleteStep(steps) ? [...baseSteps, completeStep] : baseSteps
}

const crossDeviceComponents = ({type}) =>
  ({
    crossDevice: () => [CrossDeviceIntro, CrossDeviceLink, MobileFlow],
    complete: () => [Complete]
  }[type]())

const createComponentList = (components, steps) => {
  const mapSteps = (step, stepIndex) => createComponent(components, step, stepIndex)
  return shallowFlatten(steps.map(mapSteps))
}

const createComponent = (components, step, stepIndex) => {
  const {type} = step
  const createdComponent = components(step)
  if (!createdComponent) { console.error('No such step: ' + type) }
  return createdComponent.map(wrapComponent(step, stepIndex))
}

const wrapComponent = (step, stepIndex) => (component) => ({component, step, stepIndex})

const shallowFlatten = list => [].concat(...list)
