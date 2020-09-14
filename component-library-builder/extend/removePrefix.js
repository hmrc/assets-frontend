'use strict';

module.exports = function(Handlebars) {
  /**
   * This removes the "Deprecated:" or "Experimental:" flags from the items description
   */
  Handlebars.registerHelper('removePrefix', function(options) {
    this.description = this.description.replace(/(Deprecated:|Experimental:)\s?/g, '');
    return options.fn(this);
  });
};
