class DocumentUploadScreen{
    get upload() { return $('.onfido-sdk-ui-CustomFileInput-input'); }
    get uploadButton() { return $('.onfido-sdk-ui-Uploader-button')}

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)
}

export default new DocumentUploadScreen();
