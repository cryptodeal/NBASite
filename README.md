# NBA

## Full Stack NBA news website: 
* Progressive Web App (PWA) - Using Svelte/Sapper, Rollup, and Polka
  * Leverages Server Side Rendering (SSR) for UX and SEO
* Professional Grade Backend - Using nanoexpress, which leverages the performance of the uWebsockets.js library and provides:
  * Websocket Support + Pub/Sub
  * WebRTC
  * Server Cluster Support

### Features (All From Scratch):
* Content Management System (CMS)
  * MongoDB
  * Javascript API Wrapper
* User Sessions
  * Scope/Permissions Based

### Utilizes:

* Bcrypt (securely salt, hash, and store password in database)
* JWT Session/Permissions
* Dynamically resize/serve images

## Prerequisites

* Install node.js
* Install and run MongoDB (OSx I recommend [instructions](https://zellwk.com/blog/install-mongodb/))
* Clone repository to your device
```
git clone 
```

## Usage

* Navigate to root of project directory:
```
cd NBASite
```
* Install Node dependencies (both root and /backend):
```
npm install
```
* Run in dev mode (from root):
```
npm run dev
```
* Deploy for production (from root):
First, run:
```
npm run build
```
This uses rollup to bundle the view, src, javascript, modules, etc. to client and server side packages. Server side bundles run on the server and are not served directly to client (namely, src/server.js and any helper files).

Next, run:
```
npm run start
```
This starts the polka server, which listens on port 3000 and serves the app views, static assets, and performs any server side rendering (SSR).

