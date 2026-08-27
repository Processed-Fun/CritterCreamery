# Fake Business Template

This project is a website for a fake business.  The business is supposed to be a joke or parody.  It should be a fully functional website with images, links, and a real seeming product.

# Requirements

1. Hosting.  This site will be hosted and deployed from Github pages from the index.html file.
2. Architecture.  Use vanilla JS.  Other frameworks for style (such as Tailwind) are okay if needed.
3. Branching. Work off of main, push everything to main.  Don't create any other branches.
4. Images. Use the OpenAI API to create images.  There is an API key in the environment for this project.
6. Language and AI Feel.  Do not use EM dashes.  Use the "humanizer" skill, which is installed in this project, to check all text used on the site.
7. Name Check.  Before creating, please do a quick search to make sure there isn't an obvious real company with this name.

# Image Generation Rules

1. Use the "gpt-image-2" model.
2. Default to "medium" quality unless specifically asked to override.
3. Use the "Generations" endpoint documented here: https://developers.openai.com/api/docs/guides/image-generation#generate-images.

# Building the Site

Before generating images give me a list of all the images that need to be generated, the size of each image, and the prompt.  I want to approve these first.
