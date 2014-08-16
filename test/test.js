var matches = require('..');

describe('matches(elem, selector)', function () {
  var fixture, one;

  beforeEach(function () {
    fixture = document.createElement('div');
    fixture.innerHTML = '' +
      '<div id="one" class="foo">text</div>' +
      '<div id="two" class="foo bar">text</div>' +
      '<div id="three" class="foo baz">text</div>';

    document.body.appendChild(fixture);
    one = document.getElementById('one');
  });

  afterEach(function () {
    document.body.removeChild(fixture);
  });

  it('should not throw an Error when the first argument is not a DOM element', function () {
    expect(matches(null, '#one')).toEqual(false);
    expect(matches(one.firstChild, '#one')).toEqual(false);
  });

  describe('when the element is `div#one.foo`', function () {
    it('returns true for selector `#one`', function () {
      expect(matches(one, '#one')).toEqual(true);
    });

    it('returns true for selector `.foo`', function () {
      expect(matches(one, '.foo')).toEqual(true);
    });

    it('returns true for selector `div`', function () {
      expect(matches(one, 'div')).toEqual(true);
    });

    it('returns true for selector `div > div`', function () {
      expect(matches(one, 'div > div')).toEqual(true);
    });

    it('returns false for selector `#two`', function () {
      expect(matches(one, '#two')).toEqual(false);
    });

    it('returns false for selector `.bar`', function () {
      expect(matches(one, '.bar')).toEqual(false);
    });
  });

  describe('when the element `div#orphan.foo` is not yet attached to the document', function () {
    var orphan = document.createElement('div');
    orphan.id = 'orphan';
    orphan.className = 'foo';

    it('returns true for selector `#orphan`', function () {
      expect(matches(orphan, '#orphan'), 'testing').toEqual(true);
    });

    it('returns true for selector `.foo`', function () {
      expect(matches(orphan, '.foo')).toEqual(true);
    });

    it('returns true for selector `div`', function () {
      expect(matches(orphan, 'div')).toEqual(true);
    });

    it('returns false for selector `#one`', function () {
      expect(matches(orphan, '#one')).toEqual(false);
    });

    it('returns false for selector `.bar`', function () {
      expect(matches(orphan, '.bar')).toEqual(false);
    });

    it('returns false for selector `body #orphan`', function () {
      expect(matches(orphan, 'body #orphan')).toEqual(false);
    });
  });
});
