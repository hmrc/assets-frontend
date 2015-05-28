require('jquery');

describe('AjaxFormSubmit', function() {
  var ajaxFormSubmit,
    forms = [],
    formCount = 0;
    

  beforeEach(function () {
    this.originalTimeout = 0;
    this.timeoutInterval = 2000;

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";

    this.baseBeforeEachAsync = function (done, timeoutInterval) {
      this.originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = timeoutInterval;
      
      loadFixtures('ajax-form-client-access-request.html');
      forms = $("form[data-ajax-submit], button[data-ajax-submit], input[data-ajax-submit]");
      formCount = forms.length;
      ajaxFormSubmit = require('../../javascripts/modules/ajaxFormSubmit.js');
      ajaxFormSubmit.init();
      
      setTimeout(function () {
        done();
      }, 1);
    };

  });

  afterEach(function (done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = this.originalTimeout;
    done();
  });
  
  describe('When the client access request fixture loads', function() {
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 2000);
    });
    
    it('Form element is present', function() {
      expect($('#verify-form').length).toBeTruthy();
    });
    
    for (var e = 0; e < formCount; e++) {
      var payeId = Array(4).join(e.toString()) + "/Z" + Array(4).join(e.toString()),
          panelId = '#client_' + payeId.replace('/', '') + '_notes';
      
      it('Form elements for PAYE Ref '+ payeId + ' are present', function () {
        var $formPanel = $(panelId);
        expect($formPanel.find('input[name="csrfToken"]')).toBeDefined();
        expect($formPanel.find('input[name="csrfToken"]').attr('value').length).toBeTruthy();

        expect($formPanel.find('input[name="name"]')).toBeDefined();
        expect((/^Employer[0-9]$/i).test($formPanel.find('input[name="name"]').attr('value'))).toBe(true);

        expect($formPanel.find('input[name="payeref"]')).toBeDefined();
        expect((/^[0-9]{3}\/[A-Z][0-9]{3}$/i).test($formPanel.find('input[name="payeref"]').attr('value'))).toBe(true);

        expect($formPanel.find('input[name="email"]')).toBeDefined();
      });

      it('Form button attributes for PAYE Ref '+ payeId + ' are present', function () {
        var $button = $(panelId + ' > details > .panel-indent > .button');
        expect($button.length).toBeTruthy();

        expect($button.attr('data-ajax-submit')).not.toBeUndefined();
        expect($button.attr('data-ajax-submit')).toBe('true');

        expect($button.attr('data-container')).not.toBeUndefined();
        expect((/^#client_[0-9]{3}[A-Z][0-9]{3}_notes$/i).test($button.attr('data-container'))).toBe(true);

        expect($button.attr('data-callback-name')).not.toBeUndefined();
        expect($button.attr('data-callback-name')).toBe('window.callbacks.ajaxFormSubmit.clientList.insertFormResponse');

        expect($button.attr('data-callback-args')).not.toBeUndefined();

        var callbackArgs = $button.attr('data-callback-args').split(',');
        expect(callbackArgs.length).toBe(2);
        expect(callbackArgs[0]).toBe($button.attr('data-container'));
        expect(callbackArgs[1]).toBe('insert');
        expect(callbackArgs[1]).not.toBe('replace');
      });
    }
  });
  
  describe('When the "ajaxFormSubmit.js" is loaded in the client access request fixture', function() {
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 2000);
      done();
    });
    
    it("the 'ajaxFormSubmit' var loads if we wait", function (done) {
      setTimeout(function () {
        expect(ajaxFormSubmit).toBeDefined();
        done();
      }, this.timeoutInterval - 500);
    });

    it("the 'ajaxFormSubmit.init' property is available", function (done) {
      setTimeout(function () {
        expect(ajaxFormSubmit.init).toBeDefined();
        expect(typeof ajaxFormSubmit.init).toBe('function');
        done();
      }, this.timeoutInterval - 500);
    });

    it("the 'ajaxFormSubmit.doSubmit' property is available", function (done) {
      setTimeout(function () {
        expect(ajaxFormSubmit.doSubmit).toBeDefined();
        expect(typeof ajaxFormSubmit.doSubmit).toBe('function');
        // doSubmit: function(path, data, targetContainer, targetType, callback
        done();
      }, this.timeoutInterval - 500);
    });

    it("the 'ajaxFormSubmit.serializeForAjax' property is available", function (done) {
      setTimeout(function () {
        expect(ajaxFormSubmit.serializeForAjax).toBeDefined();
        expect(typeof ajaxFormSubmit.serializeForAjax).toBe('function');
        // serializeForAjax: function(formScope)
        done();
      }, this.timeoutInterval - 500);
    });

    it("the 'ajaxFormSubmit.getCalllback' property is available", function (done) {
      setTimeout(function () {
        expect(ajaxFormSubmit.getCalllback).toBeDefined();
        expect(typeof ajaxFormSubmit.getCalllback).toBe('function');
        // getCalllback: function(config, data)
        done();
      }, this.timeoutInterval - 500);
    });
  });
  
  describe('When the "ajaxFormSubmit.js" is initialized in the client access request fixture', function() {
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 2000);
      done();
    });

    it("'doSubmit' handler is bound to the client access form", function (done) {
      setTimeout(function () {
        var handlers = $._data($('#verify-form')[0], 'events');

        expect(handlers.submit.length).toBeTruthy();
        expect(typeof handlers.submit[0].handler).toBe("function");

        var formHandler;

        for (var f = 0; f < handlers.submit.length; f++) {
          var h = handlers.submit[f].handler;

          if (h.toString().indexOf(".doSubmit(") > -1) {
            formHandler = h;
          }
        }

        expect(formHandler).toBeDefined();

        done();
      }, this.timeoutInterval - 500);
    });
  });

  describe("When 'serializeForAjax' creates a data string for the scoped form ONLY", function () {
    
    var scopeForms = [],
        scopeCount = 0;
    
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 10000);

      setTimeout(function () {
        for (var e = 0; e < formCount; e++) {
          var payeId = Array(4).join(e.toString()) + "/Z" + Array(4).join(e.toString()),
            containerId = '#client_' + payeId.replace('/', '') + '_notes',
            data = ajaxFormSubmit.serializeForAjax(containerId);

          scopeForms.push({
            payeId: payeId,
            containerId: containerId,
            $fields: $(containerId).find('input[name]'),
            serial: data.replace(/&?isajax=true&?/i, '').split('&')
          });
          scopeCount++;
        }
        done();
      }, this.timeoutInterval - 500);
    });

    it('scoped forms exist',function(done) {
      setTimeout(function () {
        expect(scopeCount).toBeTruthy();
        done();
      }, this.timeoutInterval - 500);
    });

    it('serialized form fields match field values', function (done) {
      setTimeout(function () {
        for (var f = 0; f < scopeCount; f++) {
          var form = scopeForms[f],
            data = form.serial,
            count = data.length,
            $fields = form.$fields,
            fieldCount = $fields.length,
            dataValues = {};
        
          for (var d = 0; d < count; d++) {
            var kvp = data[d].split('=');
            dataValues[kvp[0]] = kvp[1];
          }
        
          for (var i = 0; i < fieldCount; i++) {
            var $field = $($fields[i]),
              name = $field.attr('name'),
              value = $field.attr('value');
            expect(dataValues[name]).toBe(encodeURIComponent(value));
          }
        }
        done();
      }, this.timeoutInterval - 500);
    });

  });

  describe("When 'getCallback' gets the callback function", function() {
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 2000);
    });

    for (var e = 0; e < formCount; e++) {
      var payeId = Array(4).join(e.toString()) + "/Z" + Array(4).join(e.toString()),
        panelId = '#client_' + payeId.replace('/', '') + '_notes';

      it('The Button "data-callback" values for  '+ payeId + ' return a function', function () {
        var $button = $(panelId + ' > details > .panel-indent > .button'),
            callback = ajaxFormSubmit.getCalllback({
          name: $button.attr('data-callback-name'),
          args: $button.attr('data-callback-args')
        }, ajaxFormSubmit.serializeForAjax($button.attr('data-container')));
        expect(typeof callback).toBe("function");
      });
    }
  });

  describe('When the a client access request form is submitted', function() {
    beforeEach(function (done) {
      this.baseBeforeEachAsync(done, 2000);
      done();
    });

    it("Makes an ajax post", function (done) {
      setTimeout(function () {
        debugger;

        var callbackMethod = spyOn($, "ajax").and.callFake(function() {
          this.done = function() {
            return this; // "<p>You asked for access on d MMMM YYYY.</p><p>You’ll usually hear back within 2 days.</p>";
          };
          this.fail = function() { return this; };
          this.always = function() { return this; };
          return this;
        });

        if (forms[0].tagName === "FORM") {
          forms[0].submit();
        }
        else {
          forms[0].click();
        }

        expect(callbackMethod).toHaveBeenCalled();
        expect(callbackMethod.calls.mostRecent().args[0].type).toBe("POST");
        expect(callbackMethod.calls.mostRecent().args[0].data).toBe(
          ajaxFormSubmit.serializeForAjax($(forms[0]).attr('data-callback-args').split(',')[0])
        );
        done();
      }, this.timeoutInterval - 500);
    });
  });  
});
