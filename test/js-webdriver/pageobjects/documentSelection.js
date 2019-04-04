class DocumentSelectionScreen{
    get title() { return $('.onfido-sdk-ui-Title-titleSpan'); }

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)["document_selector"]["identity"]
}

export default new DocumentSelectionScreen();
