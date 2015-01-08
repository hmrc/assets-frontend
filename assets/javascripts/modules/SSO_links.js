define(['jquery'], function($) {
  return function(element, ssoUrl) {
    var $target,
        clientSso,
        serverSso,
        successful,
        destination;

    /**
     * Attach a one-time event handler for all global links
     */
    if (element) {
      $target = $(element.target);

      clientSso =
        $(element.target).data('sso') === true ||
        $(element.target).data('sso') === "client";
      serverSso = $(element.target).data('sso') === "server";

      if (clientSso || serverSso) {
        successful = true;
        destination = serverSso ? {
          ssoRedirect: true
        } : {
          destinationUrl: $target[0].href
        };
        $.ajax({
          url: serverSso ? $target[0].href : '/ssoout',
          data: destination,
          type: 'GET',
          async: false,
          cache: false,
          success: function(data, status, jqXHR) {
            window.location = ssoUrl + '?payload=' + encodeURIComponent(data);
          },
          error: function() {
            successful = false;
          }
        });
        // cancel link click event if everything is successful
        return !successful;
      }
    }
  };
});
