/* eslint-env jquery */

require('jquery')

/**
 * SSO encryption process file
 * Use Cases:
 * Customer clicks a link or button on a form with GET
 * Customer is sent to a page which contains a redirect element
 *
 * SSO GET call is successful then let the SSO redirect manage that.
 * SSO GET call is a failure cancel
 * - 401 (Unauthorised) - reload the page (this is currently used for links only)
 * - Anything else, render the returned html error page and place in the page (BadRequest from Encryption process)
 *
 * @param element
 * @param ssoUrl
 * @param ssoMethod
 * @returns {boolean}
 */
module.exports = function (element, ssoUrl, ssoMethod) {
  var $element
  var payload
  var clientSso
  var serverSso
  var destination
  var winId
  var openInNewWindow
  var allowLinkCLickEvent = true
  var destinationUrl
  var elementTarget
  var useGet = ssoMethod === 'GET'

  if (element) {
    $element = $(element)
    clientSso = $element.data('sso') === true || $element.data('sso') === 'client'
    serverSso = $element.data('sso') === 'server'

    if (clientSso || serverSso) {
      destinationUrl = (element.form && element.form.action) || element.href

      elementTarget = element.target
      winId = element.id

      // accept custom target attribute values
      openInNewWindow = !!elementTarget && (elementTarget !== '_self' && elementTarget !== '_top' && elementTarget !== '_parent')

      destination = serverSso ? { ssoRedirect: true } : { destinationUrl: destinationUrl }

      $.ajax({
        url: serverSso ? destinationUrl : '/ssoout',
        data: destination,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data, status, jqXHR) {
          var win = window
          var getUrl = ssoUrl + '?payload=' + encodeURIComponent(data)

          allowLinkCLickEvent = false

          if (useGet) {
            if (openInNewWindow) {
              win.open(getUrl, winId || elementTarget)
              win.focus()
            } else {
              win.location = getUrl
            }
          } else {
            var form = document.createElement('form')
            form.method = 'POST'
            form.action = ssoUrl

            if (openInNewWindow) {
              form.target = winId || elementTarget
            }

            payload = document.createElement('input')
            payload.type = 'hidden'
            payload.name = 'payload'
            payload.value = data
            document.body.appendChild(form)
            form.appendChild(payload)

            // POST form
            form.submit()

            if (openInNewWindow) {
              win.focus()
            }
          }
        },

        error: function (jqXHR, textStatus, errorThrown) {
          var statusCode = jqXHR.status
          var responseText = jqXHR.responseText
          var htmlFragment

          allowLinkCLickEvent = false

          if (statusCode === 401) {
            // Unauthorised from a page link click
            window.location.reload()
          } else {
            if (responseText) {
              htmlFragment = document.createElement('html')
              htmlFragment.lang = 'en'
              htmlFragment.innerHTML = responseText

              // place returned failure html into page
              document.replaceChild(htmlFragment, document.documentElement)
            }
          }
        }
      })
    }

    // control link event
    return allowLinkCLickEvent
  }
}
