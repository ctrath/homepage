# Cale's homepage

A simple node.js project to run locally for a new browser window or tab.

### To run
`> ./bin/www`

- This will run the node.js server on the localhost interface only on port 3000.

### To use
- Browse to http://localhost:3000

### To pull dependent npm packages
`> npm install`


### Installing via launchctl on a Mac
* `> npm install`
* modify LaunchAgents/homepage.plist according to point to correct directories
* `launchctl load LaunchAgents/homepage.plist`
* If errors occur, look in /tmp/homepage.err
* To reload node from launchctl, run `launchctl kickstart -kp gui/501/com.cale.homepage`
