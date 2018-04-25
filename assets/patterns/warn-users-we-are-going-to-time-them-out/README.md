# Warn users we are going to time them out

This pattern warns someone we are going to time them out and what to tell them if we do.

{{ example("timeout.html", true) }}

## When to use this pattern

Warn a user we are going to time them out when they do not do anything for 13 minutes. This gives them 2 minutes to decide to stay signed in.

The warning helps make a service more accessible.

Automatically take them to a page that tells them what has happened after 15 minutes.

## How the pattern works

### Warning

Use an accessible modal box to warn users what will happen. The user can:

* select a button to stop being timed out without refreshing the page
* select a link
* press the escape key to close the warning and stop being timed out without refreshing the page
* do nothing

If they are signed in to the service, the modal should:

- say “For your security, we will sign you out in 2 minutes.”
- say what will happen to their answers
- have a “Stay signed in” button
- have a “Sign out” link that signs them out as normal

If they do nothing, take them to a “We signed you out” page that uses content that complements the modal box.

{{ example("timeout-saved.html", true) }}

{{ example("timeout-will-not-save.html", true) }}

If they are not signed in to the service, the modal should:

- say “For your security, we will delete your answers in 2 minutes.”
- have a button to stay in the service
- have a “Delete your answers” link that takes them to the “You deleted your answers” page

If they do nothing, delete their answers and take them to the “We deleted your answers” page.

{{ example("timeout-not-signed-in.html", true) }}

### Other pages

#### We signed you out

{{ example("we-signed-you-out.html", false) }}

{{ example("we-signed-you-out-saved.html", false) }}

{{ example("we-signed-you-out-did-not-save.html", false) }}

#### We deleted your answers

{{ example("we-deleted-your-answers.html", false) }}

#### You deleted your answers

{{ example("you-deleted-your-answers.html", false) }}

### Technical details

Add the timeout-dialog.js file and call the timeoutDialog method on a service’s main template. This will add the warning to every page.

```
$.timeoutDialog({
  timeout: 900,
  countdown: 120,
  keep_alive_url: '/keep-alive',
  logout_url: '/sign-out',
});
```

From the JavaScript file:

- timeout is the number of seconds before you are timed out, 900 is the platform default
- countdown is the number of seconds from the end of the timeout the warning is displayed
- keep_alive_url is a call to the server that keeps them in the service without refreshing the page
- logout_url is the same URL as your service’s sign out page

When the modal loads:

- set focus to the modal
- read the paragraph of content
- set focus to the button
- read the button label

This lets a user hear what they need to and stay in the service with a single click.

## Research on this component

The warning was tested with 5 people for a service they were signed in to. One person had dyslexia and the other was 70 years old. All 5 people understood the warning and managed to stay signed in.

{{ research(89) }}

We want to do more usability testing, especially with people who use assistive technology and with services you do not sign in to.

We want to know if people:

- understand what has happened
- understand the content and if there is anything missing
– can do what they need to do
– stay signed in, continue with the service, sign out, start again, or get timed out

We want to test with more 

The warning has been tested with [all recommended browsers](https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices). It has been lab tested with most assistive technology including:

* JAWS
* ZoomText
* NVDA
* VoiceOver

It has not been tested with Dragon NaturallySpeaking.