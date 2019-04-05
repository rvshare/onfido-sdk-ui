class DocumentSelectionScreen{
    get title() { return $('.onfido-sdk-ui-Title-titleSpan'); }
    get passport() { return $('.onfido-sdk-ui-DocumentSelector-icon-passport')}

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)["document_selector"]["identity"]
}

export default new DocumentSelectionScreen();
