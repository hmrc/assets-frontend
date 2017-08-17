# HMRC Header

<div class="alert alert--info">
  <p class="alert__message">This patterns is work in progress.</p>
  <p class="alert__message">View the todo list for this pattern on <a href="https://github.com/hmrc/design-language-documentation/issues/4">GitHub</a>.</p>
</div>

The HMRC header is an variant of the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer)

## Header design

The HMRC logo is included for services where there is a user need to reassure users that they are using an HMRC service.
For example, when they are making a payment and need to be sure that the money is going to the right government department.

More user research is needed to prove if the HMRC logo reassures users.

## Header examples

* [Header - with cookie](#header-with-cookie)
* [Header - signed out](#header-signed-out)
* [Header - signed in](#header-signed-in)

### Header with cookie

<div class="scale-wrapper">
  <div class="scale">
     {% include "header-with-cookie.html" %} 
  </div>
</div>

[View in a new window](blank/header.html)

This is essentially just the GOV.UK header but it's included here for completeness.

---

### Header signed out

<div class="scale-wrapper">
  <div class="scale">
    {% include "header--signed-out.html" %}
  </div>
</div>

[View in a new window](header--signed-out.html)

Should be used for services when there is a need to identify the service as an HMRC service.

This version of the header should contain:

* the GOV.UK header
* a phase banner unless the service is live
* HMRC logo
* Welsh toggle

---

### Header signed in

<div class="scale-wrapper">
  <div class="scale">
    {% include "header--signed-in.html" %}
  </div>
</div>

[View in a new window](header--signed-in.html)

Should be used for services when there is a need to identify the service as an HMRC service and when users can have a signed in state.

This version of the header should contain:

* the GOV.UK header
* a sign out link
* a phase banner unless the service is live
* HMRC logo
* Last logged in status
* Welsh toggle
