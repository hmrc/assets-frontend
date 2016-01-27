require("jquery");

describe("Tests for the <details> polyfill for pre-historic browsers.", function ()
{
  var details1 = "#details-1";
  var details2 = "#details-2";
  var selectors = details1 + ", " + details2;

  beforeEach(function ()
  {
    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";

    loadFixtures('details-polyfill-fixture.html');

    require('../../javascripts/modules/details.polyfill.js');
  });

  afterEach(function ()
  {
    jasmine.clock().uninstall();
  });

  describe("How it works when details got initialised on page load.", function ()
  {
    beforeEach(function ()
    {
      $("details").details();
    });

    it("Should initialise details polyfill for all <details> elements.", function ()
    {
      $(selectors).each(function ()
      {
        expect($(this).prop("details-initialised")).toBeTruthy();
      });
    });

    it("Should set content ids.", function ()
    {
      expect($("div", details1).attr("id")).toMatch(/details-content-\d+/);
      expect($("div", details2).attr("id")).toMatch(/details-content-\d+/);
    });

    it("Should contain arrows.", function ()
    {
      var openArrowQuery = "summary>i.arrow.arrow-open";
      var closedArrowQuery = "summary>i.arrow.arrow-closed";
      expect($(openArrowQuery, details1).length).toEqual(1);
      expect($(closedArrowQuery, details1).length).toEqual(1);

      expect($(openArrowQuery, details2).length).toEqual(1);
      expect($(closedArrowQuery, details2).length).toEqual(1);
    });

    describe("Opening details.", function ()
    {
      it("Should trigger 'open.details' when clicked on details.", function ()
      {
        var closeDetails = jasmine.createSpy("close.details");
        var openDetails = jasmine.createSpy("open.details");

        $(details1)
          .on("close.details", closeDetails)
          .on("open.details", openDetails);

        $(details1).children("summary").click();

        expect(closeDetails).not.toHaveBeenCalled();
        expect(openDetails).toHaveBeenCalled();
      });

      it("Should add 'open' attribute to details element.", function ()
      {
        $(details1).children("summary").click();

        expect($(details1).is("[open]")).toBeTruthy();
      });
    });

    describe("Closing details.", function ()
    {
      it("Should trigger 'close.details' when clicked on open details.", function ()
      {
        var closeDetails = jasmine.createSpy("close.details");
        var openDetails = jasmine.createSpy("open.details");

        $(details2)
          .on("close.details", closeDetails)
          .on("open.details", openDetails);

        $(details2).children("summary").click();

        expect(closeDetails).toHaveBeenCalled();
        expect(openDetails).not.toHaveBeenCalled();
      });

      it("Should remove 'open' attribute from details element.", function ()
      {
        $(details2).children("summary").click();

        expect($(details2).is("[open]")).toBeFalsy();
      });
    });
  });

  describe("Details got initialised by the event.", function ()
  {
    beforeEach(function()
    {
      $(window).triggerHandler("reapplyDetails");
    });

    it("Should initialise details polyfill for all <details> elements.", function ()
    {
      $(selectors).each(function ()
      {
        expect($(this).prop("details-initialised")).toBeTruthy();
      });
    });
  });
});
