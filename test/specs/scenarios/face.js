import { it } from '../../utils/mochaw'
import { goToPassportUploadScreen, uploadFileAndClickConfirmButton } from './sharedFlows.js'

export const faceScenarios = (driver, screens, lang) => {
  const {
    crossDeviceIntro,
    cameraPermissions,
    documentUploadConfirmation,
    livenessIntro,
    verificationComplete,
    common
  } = screens
  const copy = common.copy(lang)

  describe(`FACE scenarios in ${lang}`, () => {
    it('should return unsupported file type error for selfie', async () => {
      goToPassportUploadScreen(driver, screens, `?language=${lang}&async=false&useWebcam=false`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      uploadFileAndClickConfirmButton(screens, 'national_identity_card.pdf')
      documentUploadConfirmation.verifyUnsuppoertedFileError(copy)
    })

    it('should upload selfie', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&async=false&useWebcam=false`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      uploadFileAndClickConfirmButton(screens, 'face.jpeg')
      verificationComplete.verifyUIElements(copy)
      verificationComplete.checkBackArrowIsNotDisplayed()
    })

    it('should take one selfie using the camera stream', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&async=false`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      documentUploadConfirmation.takeSelfie()
      documentUploadConfirmation.confirmBtn.click()
      verificationComplete.verifyUIElements(copy)
      verificationComplete.checkBackArrowIsNotDisplayed()
    })

    it('should take multiple selfies using the camera stream', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&async=false&useMultipleSelfieCapture=true`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      documentUploadConfirmation.takeSelfie()
      documentUploadConfirmation.confirmBtn.click()
      verificationComplete.verifyUIElements(copy)
      verificationComplete.checkBackArrowIsNotDisplayed()
    })

    it('should return no face found error for selfie', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&async=false&useWebcam=false`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      uploadFileAndClickConfirmButton(screens, 'llama.jpg')
      documentUploadConfirmation.verifyNoFaceError(copy)
    })

    it('should return multiple faces error', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&async=false&useWebcam=false`)
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      uploadFileAndClickConfirmButton(screens, 'two_faces.jpg')
      documentUploadConfirmation.verifyMultipleFacesError(copy)
    })

    it('should be taken to the cross-device flow if I do not have a camera and liveness variant requested', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&liveness=true`)
      driver.executeScript('window.navigator.mediaDevices.enumerateDevices = () => Promise.resolve([])')
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      crossDeviceIntro.verifyTitleForFace(copy)
    })

    it('should be taken to the selfie screen if browser does not have MediaRecorder API and liveness variant requested', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&liveness=true`)
      driver.executeScript('window.navigator.mediaDevices.enumerateDevices = () => Promise.resolve([{ kind: "video" }])')
      driver.executeScript('window.MediaRecorder = undefined')
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      cameraPermissions.verifyUIElementsOnTheCameraPermissionsScreen(copy)
    })

    it('should enter the liveness flow if I have a camera and liveness variant requested', async () => {
      goToPassportUploadScreen(driver, screens,`?language=${lang}&liveness=true`)
      driver.executeScript('window.navigator.mediaDevices.enumerateDevices = () => Promise.resolve([{ kind: "video" }])')
      uploadFileAndClickConfirmButton(screens, 'passport.jpg')
      livenessIntro.verifyUIElementsOnTheLivenessIntroScreen(copy)
      livenessIntro.clickOnContinueButton()
    })

  })
}
