---
layout: post
title: "Installing Onetime Secret: The Complete Guide (Part 1 of 5)"
date: 2024-10-08
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/install-guide/onetimesecret installation guide - 1 of 5 - Homepage (light).jpeg
badge:
  label: Guide
readingTime: 15
---


Welcome to our comprehensive series on setting up and installing Onetime Secret. In this first installment, we'll walk you through the process of installing Onetime Secret as a standalone web application using the latest methods and best practices. Whether you're a seasoned sysadmin or just getting started with self-hosting, this guide will help you get Onetime Secret up and running smoothly.

## Introduction

Onetime Secret is a secure, open-source solution for sharing sensitive information. It allows you to send passwords, private links, and other confidential data through a link that can only be viewed once. This guide covers the installation process for the standalone version of Onetime Secret, providing a foundation for setting up the service on your own infrastructure.

* [Introduction](#introduction)
  * [What This Guide Covers](#what-this-guide-covers)
  * [What This Guide Does Not Cover](#what-this-guide-does-not-cover)
* [Installation Steps](#installation-steps)
  * [Prerequisites](#prerequisites)
* [System Requirements](#system-requirements)
  * [Step 1: Install Dependencies](#step-1-install-dependencies)
  * [Step 2: Get the Onetime Secret Code](#step-2-get-the-onetime-secret-code)
  * [Step 3: Initialize Configuration Files](#step-3-initialize-configuration-files)
  * [Step 4: Install Ruby Dependencies](#step-4-install-ruby-dependencies)
  * [Step 5: Install JavaScript Dependencies](#step-5-install-javascript-dependencies)
  * [Step 6: Build the Frontend](#step-6-build-the-frontend)
  * [Step 7: Configure Onetime Secret](#step-7-configure-onetime-secret)
* [Step 8: Running the Web Application](#step-8-running-the-web-application)
  * [For Production Environment](#for-production-environment)
  * [For Development with Live Reloading](#for-development-with-live-reloading)
* [Conclusion](#conclusion)


### What This Guide Covers

This guide aims to get you started with a basic, functional Onetime Secret installation. It's ideal for testing, development, or as a starting point for a more comprehensive setup. For a production environment, you'll need to consider additional security measures, performance optimizations, and infrastructure components not covered here.

This guide covers the following:
- Installing Onetime Secret on a Linux-based system (Debian recommended)
- Setting up the core components: Ruby, Redis, Node.js, and related dependencies
- Configuring the basic Onetime Secret application
- Running the service using Ruby's Thin server on port 3000

### What This Guide Does Not Cover

To set clear expectations, it's important to note that this guide does not cover several aspects of a full production deployment. Specifically, we won't be addressing:

- SSL/TLS configuration: Securing your connection with HTTPS
- Domain configuration: Setting up a custom domain for your Onetime Secret instance
- Reverse proxy setup: Configuring Nginx, Apache, or other web servers as a front-end
- Production-ready Redis configuration:
  - Redis authentication
  - Persistence and backup strategies
  - System tuning for optimal Redis performance
- Load balancing for high-availability setups
- Monitoring and logging for production environments
- Automated deployment processes

In future parts of this series, we'll explore more advanced topics and configurations to help you build a robust, production-ready Onetime Secret deployment. Whether you're a seasoned sysadmin or just getting started with self-hosting, this guide will help you understand the core installation process for Onetime Secret.


But before we dive in, here's a quick teaser for what's coming in Part 2 of our series:

> **Coming Soon: Onetime Secret Lite Edition**
>
> In our next post, we'll introduce a new docker installation method for Onetime Secret: Lite Edition. This streamlined Docker image combines both the webapp and Redis, leveraging the ephemeral nature of Docker containers as a security feature. By default, once the container is stopped or removed, all secrets disappear – providing an extra layer of protection for your sensitive data. Stay tuned for this exciting new option!


## Installation Steps

Now, let's get started with installing the full version of Onetime Secret.

### Prerequisites

Before beginning the installation, ensure you have the following:

- A Linux-based system (Debian recommended) or macOS
- Root or sudo access
- Basic familiarity with the command line


## System Requirements

Onetime Secret requires the following:

- **Ruby 3.1+** (3.2, 3.3, and newer versions are also compatible)
  - We recommend Ruby 3.1 for Debian 12 (Bookworm) users, as it's readily available in the default repositories
  - Ruby 3.0 may work but is not officially supported
- **Redis server 5+**
- **Node.js 20+** (22+ recommended)
  - Node.js 20 is the minimum supported version, but 22+ is preferred for optimal performance and security
- **pnpm 9.0.0+**
- Additional packages: **build-essential, libyaml-dev, libffi-dev**

#### Notes on Ruby versions
- While Ruby 3.1 is the minimum officially supported version, Onetime Secret is known to work with Ruby 3.2 and 3.3 as well (we currently develop with Ruby 3.3).
- We specify Ruby 3.1 as the baseline due to its availability in Debian 12 (Bookworm) repositories, ensuring easier installation for many users.
- If you're using a different distribution or have the means to install newer Ruby versions, feel free to use Ruby 3.2 or 3.3 for potential performance improvements and longer support lifecycles.

#### Notes on Node.js versions
- Node.js 20 is the minimum supported version and will work for most use cases.
- We recommend Node.js 22+ for the best performance, security updates, and future compatibility.
- Always consider using the latest LTS (Long Term Support) version of Node.js for production environments.

Remember to check for compatibility with your operating system and other dependencies when choosing specific versions of Ruby and Node.js.

#### Minimum system specifications

- 2 core CPU (or equivalent)
- 1GB memory
- 4GB disk

### Step 1: Install Dependencies

First, update your package list and install the necessary dependencies:

```bash
sudo apt update
sudo apt install -y git redis-server build-essential libyaml-dev libffi-dev
```

Next, install Ruby 3.1:

```bash
sudo apt install -y ruby3.1 ruby3.1-dev
```

Install Node.js and pnpm:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

### Step 2: Get the Onetime Secret Code

You have two options to obtain the Onetime Secret code:

#### Option A: Clone the Repository

Clone the Onetime Secret repository using git:

```bash
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret
```

#### Option B: Download the Latest Release

Alternatively, you can download the latest release:

1. Download the [latest release](https://github.com/onetimesecret/onetimesecret/archive/refs/tags/latest.tar.gz)
2. Extract the downloaded archive:
```bash
   tar -xzvf onetimesecret-latest.tar.gz
   mv onetimesecret-latest onetimesecret
   cd onetimesecret
   ```

> [!NOTE]
> Choose the method that best suits your needs and environment. The git clone option is useful for developers who want to easily pull updates or contribute to the project, while the download option might be preferable for those who just want the latest stable release.

### Step 3: Initialize Configuration Files

Set up the necessary configuration files:

```bash
git rev-parse --short HEAD > .commit_hash.txt
cp --preserve --no-clobber ./etc/config.example.yaml ./etc/config.yaml
```

### Step 4: Install Ruby Dependencies

Install Bundler and the required Ruby gems:

```bash
sudo gem install bundler
bundle config set --local without 'development test'
bundle update --bundler
bundle install
```
### Step 5: Install JavaScript Dependencies

We utilize pnpm, an advanced Node.js package manager known for its speed and efficiency. By employing this tool along with the frozen lockfile strategy through the command:

```bash
pnpm install --frozen-lockfile
```

This ensures that each dependency is installed in its specific version as declared within the project’s `package.json`. Any potential conflicts caused by different versions of dependencies can be mitigated. For instance, if two packages require slightly varying versions of another package and both attempt to install it simultaneously without a lockfile mechanism, such a situation could cause unexpected behavior or errors during runtime.

### Step 6: Build the Frontend

To prepare our front-end for production deployment, we compile all assets using:

```bash
pnpm run build
```

This command triggers the built-in `Vite` server to optimize and bundle all JavaScript files into a static directory that can be served directly by any web server. Vite's advanced features such as Fast Refresh allow developers to instantly see changes made in their code, significantly reducing development cycles.



**For more detailed documentation:**

- [Vue CLI Documentation](https://vuejs.org/guide/cli.html)
- [Vite Configuration Guide](https://vitejs.dev/config/)
- [pnpm Documentation](https://pnpm.io/)


### Step 7: Configure Onetime Secret

Edit the `./etc/config.yaml` file to customize your Onetime Secret installation. At minimum, update the `site:secret` key with a secure random value:

```yaml
:site:
  :secret: your_secure_random_key_here
```

You can generate a secure key using:

```bash
openssl rand -hex 32
```

## Step 8: Running the Web Application

To run the web application, use `thin` in either development or production mode.


### For Production Environment

In this scenario where you're preparing for a live deployment (e.g., on Heroku), your command will look like so:
```
RACK_ENV=production bundle exec thin -R config.ru -p 3000 start
```

This ensures that the environment is properly set to production mode, and `thin` begins serving requests via port 3000. The necessary configuration files (`config.ru`) are also sourced.


### For Development with Live Reloading

For faster iteration during development or testing, use live reload functionality to see changes instantly. Follow these steps:

1. Set `development:enabled: true` in your `etc/config.yaml` file.
2. Run the following command:
   ```
   RACK_ENV=development bundle exec thin -R config.ru -p 3000 start
   ```
3. In a separate terminal, run:
   ```
   pnpm run dev
   ```

With live reload enabled:
- Ruby file changes: Refresh your browser to see updates.
- Front-end asset changes (e.g., Vue components): Pages will automatically recompile and re-render without manual refresh.

Note: You may need to update `:development:frontend_host` in your configuration depending on your IP and port settings.



## Conclusion

Congratulations! You've successfully installed Onetime Secret. You can now access it by navigating to `http://localhost:3000` in your web browser.

In our next post, we'll explore the streamlined Onetime Secret Lite Docker image, offering an even simpler installation process with built-in ephemerality for enhanced security. Stay tuned for Part 2 of our series!


::ImageModal{src="/img/blog/2024/install-guide/onetimesecret installation guide - 1 of 5 - Homepage (light).jpeg" alt="Homepage (light)" width="320"}
::


::ImageModal{src="/img/blog/2024/install-guide/onetimesecret installation guide - 1 of 5 - Homepage (dark).jpeg" alt="Homepage (light)" width="320"}
::

---

This concludes Part 1 of our 5-part series on setting up and installing Onetime Secret. In future posts, we'll cover:

- Part 2: Installing Onetime Secret Lite with Docker
- Part 3: Using Caddy as a Reverse Proxy for Onetime Secret
- Parts 4 and 5: TBD (open to suggestions!)

We hope you found this guide helpful. If you have any questions or suggestions for future topics, please let us know in the comments below!
