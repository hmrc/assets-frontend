# Timeout Dialog

{{ wip(89) }}

For anyone that takes longer to complete information on a digital form, or would need to step away from the computer to find any required information, after 15 minutes of being on the same page their session would expire and they would be signed out of the service. They are redirected to a information page telling them they have been signed out and can sign in again. Up until that point any form entries on the previous page are lost.

To address this issue a session timeout warning has been included in the P800 Tax Calculation service. A modal popup appears after 13 minutes warning the user that their session is about to end and gives them 2 minutes to extend the session by another 15 minutes, otherwise they are automatically signed out and redirected to an information page. By extending their session all the information input into the current form is retained and they can continue using the service from that point.

#### Example timeout dialog interactive example

{{ example('timeout-dialog-options.html', true) }}

#### Example options

{{ markup('options.html') }}

#### Example signed out page

{{ example('signed-out.html', true) }}
