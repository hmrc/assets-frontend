require('jquery');

module.exports = function(element ,ssoUrl) {
    var $target,
        payload,
        clientSso,
        serverSso,
        destination,
        keepDefaultLinkBehaviour;

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
        keepDefaultLinkBehaviour = false;
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
          error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status === 401) {
              keepDefaultLinkBehaviour = false;
              window.location.reload();
            }
            else {
              keepDefaultLinkBehaviour = true;
            }
          }
        });
        // cancel link click event if SSO call is successful and let the SSO redirect manage that
        return keepDefaultLinkBehaviour;
      }
    }
};
