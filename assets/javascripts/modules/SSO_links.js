GOVUK.setSSOLinks = function (element) {
    /**
     * Attach a one-time event handler for all global links
     */

    var $target = $(element.target),
        clientSso = $(element.target).data('sso') === true || $(element.target).data('sso') === "client",
        serverSso = $(element.target).data('sso') === "server",
        a = document.createElement('a');
    if (clientSso || serverSso) {
        var successful = true,
            destination = serverSso ? { ssoRedirect: true  } : { destinationUrl: $target[0].href };
        $.ajax({
            url: serverSso ? $target[0].href : (typeof ssoOutUrl == 'undefined' ? '/ssoout' : ssoOutUrl)
            data: destination,
            type: 'GET',
            async: false,
            cache: false,
            success: function (data, status, jqXHR) {
                var form = document.createElement('form');
                form.method = 'POST';
                form.action = ssoUrl;
                var payload = document.createElement('input');
                payload.type = 'hidden';
                payload.name = 'payload';
                payload.value = data;
                document.body.appendChild(form);
                form.appendChild(payload);
                // POST form
                form.submit();
            },
            error: function () {
                successful = false;
            }
        });
        // cancel link click event if everything is successful
        return !successful;
    }
}
