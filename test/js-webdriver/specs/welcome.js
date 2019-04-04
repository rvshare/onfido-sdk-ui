import WelcomeScreen from '../pageobjects/welcome.js';
import DocumentSelectionScreen from '../pageobjects/documentSelection.js';

describe('Welcome screen click', () => {
  it('can click welcome', () => {
      browser.url('https://localhost:8080/');

      WelcomeScreen.primaryBtn.click();


      DocumentSelectionScreen.title.getText().should.equal(DocumentSelectionScreen.copy().title);
  });
});
