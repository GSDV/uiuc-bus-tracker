# UIUC Bus Tracker
The perfect bus app for University of Illinois students! Look at any bus stop and all the routes. View the map and track buses around campus. Plan trips anywhere in Champaign-Urbana area. Star your favorite bus stops and view ones nearby. Get notified for bus departures.

<img src="https://github.com/GSDV/uiuc-bus-tracker/blob/main/assets/thumbnail.png" alt="Thumbnail" style="width:100%;"/>


## Setup
Run
 ```bash
 git clone https://github.com/GSDV/uiuc-bus-tracker.git
 npm install
 ```
to get the code. Sign up for a free MTD API key [here](https://developer.cumtd.com/). Then add a file named "env.ts" in "src/util/" directory. This is file, write the following:
```js
export const REQ_URL = "https://developer.cumtd.com/api/v2.2/json/";
export const API_KEY = "YOUR API KEY";
```


## Whats going on with routing?
There is an issue with Expo SDK 50 where when one uses "registerRootComponent" to have a custom entry file that is not "app/index.tsx", the parent "_layout.tsx" files are not recognized. To work around this, I have the default entry point but immediately manually load the actual entry screen (All Stops inside Nav).