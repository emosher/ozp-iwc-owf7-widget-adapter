# Installation
## Required Tools
Like other ozone projects, the legacy adapter requires `node/npm`, `bower`, and `grunt`.

To install node & npm refer to the [node js website](https://nodejs.org/).

To install bower and grunt (may require sudo/admin access depending on environment):
```
npm install -g bower grunt-cli
```

## Hosting the Legacy Adapter
The legacy adapter is to be treated as an extension to an existing IWC deployment. To learn how to deploy the IWC, refer
to the "IWC Backend Integration Guide" found in the `/docs` directory of the ozp-iwc repository.

### Building
If using an ozone-released version of the legacy adapter, the adapter code is prebuilt and located in the `/dist`
directory. If using a specific/latest commit, the `/dist` directory can be generated using the following steps.
```
npm install
bower install
grunt build
```
The `/dist` directory should contain the following when built:

```
dist
├── js
│   ├── ozp-iwc-owf7-widget-adapter.js
│   ├── ozp-iwc-owf7-widget-adapter.js.map
│   ├── ozp-iwc-owf7-widget-adapter.min.js
│   └── ozp-iwc-owf7-widget-adapter.min.js.map
├── owf7adapter.html
├── owf7prefs.html
└── rpc_relay.uncompressed.html
```

### Deploying
The contents of the `/dist` directory are to be combined with the IWC's deployed `/dist` directory (as per "IWC Backend
Integration Guide"). This can be done either by directly copying the contents to the IWC directory or using a proxy
(not covered in this guide).

To copy the adapter code to the IWC deployment directory run the following:
```
cd dist;
cp -r * <Hosted IWC Directory>/
```

#### Modifications
The adapter html, `owf7adapter.html`, contains two variable definitions that are commonly altered to match the IWC
deployment. If the default value of these are not correct, alter them for deployment:

 * `ozpIwc.apiRootUrl="api";` : line 32
 * `ozpIwc.owf7PrefsUrl="/owf/prefs";` : line 35

Property | Type | Default Value | Definition
---------|------|----------------|-----------
ozpIwc.apiRootUrl | String| "/api" | The location of Api backend root hal data index.json (relative or absolute)
ozpIwc.owf7PrefsUrl | String| "/owf/prefs" | The location of the legacy preferences backend root (relative or absolute)

