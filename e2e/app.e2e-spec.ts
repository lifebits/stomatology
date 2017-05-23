import { StomatologyPage } from './app.po';

describe('stomatology App', () => {
  let page: StomatologyPage;

  beforeEach(() => {
    page = new StomatologyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
