---
title: "Gotcha: Google Cloud Functions with a Build Step"
date: "2018-12-01T22:13:37.000Z"
description: "Maybe you don't have to repeat my mistakes."
---

Ok, I'm going to admit that I'm not a huge fan of dev-ops. Anything I can
automate away I'll automate. Anything I can delegate to an inexpensive service
to maintain and scale I will. So, as a JavaScript developer, it's probably no
surprise that I'm a fan of [Google Cloud Functions](https://cloud.google.com/functions/).

Cloud functions allow me to focus on getting the logic written and leaving the
uptime to the pros.

There was just one little problem. Every time I created a new repo that included
a build step – in my case building from typescript – my deployments to gcloud
would fail. I could run them in the gcloud simulator. However, on deployment I
would be greeted with the following, lovely, error message:

> (gcloud.beta.functions.deploy) OperationError: code=3, message=Function load
> error: File lib/functions/index.js that is expected to define function doesn't
> exist

After beating my head against this issue enough times, I've finally decided to
move the solution from my faulty memory to the internet at large.

Here's the one-line fix. Add the following to your `.gcloudignore` file at the
root of the repo:

`#!include: .gitignore`

Understandably we add the build directory for the repo to the `.gitignore` file.
It turns out that gcloud functions respects the `.gitignore` when building your
project and doesn't see the `/dist`, `/build`, or `/lib` directory that has the code
expected to run for your function.

It's such a small thing, but I hope this saves you from beating your head on
your desk in the future just as I hope it saves me.
