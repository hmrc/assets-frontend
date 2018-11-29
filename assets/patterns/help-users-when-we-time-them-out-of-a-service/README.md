# Help users when we time them out of a service

This pattern warns the user before we time them out of a service and tells them what has happened when we do time them out.

## When to use

We time the user out when they do not do anything for 15 minutes. Warn them after 13 minutes, which gives them 2 minutes to decide to keep using the service.

## How it works

Use an accessible dialog box that appears on top of the page. This stops them using the screen with a mouse or keyboard until they select an option or press the escape key.

The user can:

- select a button to stay in the service and not time out
- select a link to sign out or have their answers deleted
- press the escape key to close the warning, stay in the service and not time out
- do nothing

### When they are signed in to the service

The warning should:

- say ‘For your security, we will sign you out in 2 minutes.’
- say what will happen to their answers, if needed
- have a ‘Stay signed in’ button
- have a ‘Sign out’ link that signs them out as normal

{{ example("timeout.html", scaled=true, cy=true, html=false) }}

{{ example("timeout-saved.html", scaled=true, cy=true, html=false) }}

{{ example("timeout-will-not-save.html", scaled=true, cy=true, html=false) }}

If they do nothing, take them to a ‘We signed you out’ page that uses similar content as the warning box.

{{ example("we-signed-you-out.html", scaled=false, cy=true, html=false) }}

{{ example("we-signed-you-out-saved.html", scaled=false, cy=true, html=false) }}

{{ example("we-signed-you-out-did-not-save.html", scaled=false, cy=true, html=false) }}

### When the user is not signed in

The warning should:

- say ‘For your security, we will delete your answers in 2 minutes.’
- have a button to stay in the service
- have a ‘Delete your answers’ link that takes them to the ‘You deleted your answers’ page

{{ example("timeout-not-signed-in.html", scaled=true, cy=true, html=false) }}

{{ example("you-deleted-your-answers.html", scaled=false, cy=true, html=false) }}

If they do nothing, delete their answers and take them the ‘For your security, we deleted your answers’ page.

{{ example("we-deleted-your-answers.html", scaled=false, cy=true, html=false) }}

### Technical details

Add the timeout-dialog.js file and call the timeoutDialog method on a service’s main template. This will add the warning to every page.

```
$.timeoutDialog({
	timeout: 900,
   countdown: 120,
   keepAliveUrl: '/keep-alive',
   signOutUrl: '/sign-out'  
});
```

From timeout-dialog.js:

- timeout is the number of seconds before the user times out and 900 is the platform default
- countdown is the number of seconds before the service displays the warning
- keep_alive_url is a call to the server that keeps them in the service without refreshing the page
- logout_url is the same URL as your service’s sign out page

When the warning loads:

- set focus to the box
- read the paragraph of content
- set focus to the button
- read the button label

This lets a user hear what they need to and stay in the service with a single click.

## Research

The warning was tested with 5 people for a service they signed in to. One person had dyslexia and the other was 70 years old. All 5 people understood the warning and managed to stay signed in.

We want to do more usability testing, especially with users who use assistive technology and with services you do not sign in to.

We want to know if users:

- understand what has happened
- understand the content and if there is anything missing
- can do what they need to do – stay signed in, continue with the service, sign out, start again, or get timed out

The warning has been tested with [all recommended browsers](https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices). It has been lab tested with most assistive technology including:

* JAWS
* ZoomText
* NVDA
* VoiceOver on MacOS and iOS

It has not been tested with Dragon NaturallySpeaking.

We need more research. If you have used service timeout, get in touch to share your research findings.

[Discuss service timeout on GitHub](https://github.com/hmrc/design-patterns/issues/89)
