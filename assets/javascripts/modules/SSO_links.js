GOVUK.setSSOLinks = function () {
    /**
     * Attach a one-time event handler for all global links
     */
    $(document).on('click', 'a', function () {
        var $target = $(this),
            linkHost = ($(this).data('sso') === true) ? true : false,
            a = document.createElement('a');
        a.href = ssoUrl;
        var ssoHost = a.host;
        if (linkHost) {
            var successful = true;
            $.ajax({
                url: '/ssoout',
                data: {
                    destinationUrl: $target[0].href
                },
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
        /*
    TODO: currently disabled until decision is made on analytics tool to use
    if ($target.data('regime')) {
      var regime = $(this).data('regime');
      _gaq.push(['_trackPageview', '/' + regime]);
    }
    */
    });
}();