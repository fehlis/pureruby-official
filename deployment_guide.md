# Deploying the PureRuby Webpage to www.purerubyofficial.com

This guide outlines the recommended best practice for deploying the static webpage to your custom domain, including setting up free HTTPS.

## Recommended Approach: GitHub + Netlify (or Vercel)

For a static site like this, the best practice is to use a combination of a Git provider (like GitHub) and a specialized static hosting provider (like Netlify or Vercel). This workflow is used by millions of developers, is free for projects like this, and automates many steps.

### Step 1: Put the Code in a GitHub Repository

Your website is code (`index.html`, `style.css`, and `channels4_banner.jpg`). The first step is to place it in a GitHub repository. This acts as the "source of truth" for your website.

1.  **Create a free account** on [GitHub.com](https://github.com).
2.  **Create a new, public repository.** You can name it something like `pureruby-webpage`.
3.  **Upload your files** (`index.html`, `style.css`, and `channels4_banner.jpg`) to this new repository. You can do this directly on the GitHub website using the "Add file" -> "Upload files" button.

### Step 2: Deploy the Site with Netlify

Netlify is a hosting platform that specializes in static websites. It will automatically pull the code from your GitHub repo, deploy it, and even re-deploy it every time you make a change.

1.  **Create a free account** on [Netlify.com](https://www.netlify.com) using your GitHub account.
2.  In your Netlify dashboard, click **"Add new site"** -> **"Import an existing project"**.
3.  Choose **GitHub** as your provider and authorize Netlify to access your repositories.
4.  **Select the repository** you just created (`pureruby-webpage`).
5.  Netlify will detect it's a simple static site. The default settings will be correct. Just click the **"Deploy site"** button.

Within a minute, your website will be live on a temporary Netlify URL (like `random-name-12345.netlify.app`).

### Step 3: Connect Your Custom Domain

This is the final step to make the site appear at `www.purerubyofficial.com`.

1.  Inside your new site's dashboard on Netlify, go to **"Domain settings"**.
2.  Click **"Add a domain"** and enter `www.purerubyofficial.com`.
3.  Netlify will verify you own it and ask you to point your domain to its servers. The **easiest and recommended way** is to use Netlify's DNS:
    *   Netlify will give you 4 custom **"nameservers"**. They will look something like `dns1.p01.nsone.net`.
    *   Log in to the account where the domain `purerubyofficial.com` is registered (e.g., GoDaddy, Namecheap, Google Domains).
    *   Find the DNS / Nameserver settings for the domain.
    *   **Replace the existing nameservers** with the 4 nameservers Netlify gave you.

### Step 4: HTTPS is Automatic!

Once you've saved the nameserver changes (it can take anywhere from a few minutes to a few hours to update globally), Netlify will **automatically provision a free SSL certificate** for your domain using Let's Encrypt.

Your website will then be securely accessible at **`https://www.purerubyofficial.com`**.

This "Git-based" approach is powerful because if you ever want to change something on the site, you just update the file in your GitHub repository, and Netlify will automatically deploy the changes to the live site.
