require('jquery');

describe('More DOM', function() {
  it('should remove our fixture data after tearDown', function() {
    expect(document.getElementById('js-injected')).toBeNull();
  });
});

describe('Loading fixtures', function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";    
  });

  describe('Loading a test fixture', function() {
    it('should load a test fixture', function() {
      loadFixtures('text-fixture.html');
      expect($('#my-fixture')).toBeVisible();
    });
  });
});
