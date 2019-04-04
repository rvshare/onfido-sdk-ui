describe('Google\'s Search Functionality', () => {
  it('can find search results', () => {
      browser.url('https://www.google.com/');

      const search = $('[aria-label="Search"]')
      search.waitForExist(100)
      search.setValue('BrowserStack');
      $('[name="btnK"]').click();
      browser.getTitle().should.match(/BrowserStack - Google Search/i);
  });
});
