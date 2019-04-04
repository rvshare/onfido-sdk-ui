describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', () => {
    browser.url('http://bs-local.com:45691/check')
    browser.getPageSource().should.match(/Up and running/i);
  });
});
