ember-gyro
==============================================================================

This addon provides interface for Tribe Framework's APIs and a front-end CMS app to manage it  

*Tribe is a project management framework by Postcode - https://github.com/tribe-framework/tribe*

Compatibility
------------------------------------------------------------------------------

* Ember.js v5.4 or above
* Ember CLI v5.4 or above


Installation
------------------------------------------------------------------------------

1. Install
```bash
ember install ember-gyro
```
  * Generate Gyro CMS (optional)  
  `yes | ember g gyro-cms`
  * To create Tribe/Gyro compatible Models, simply use:  
  `ember g model <model-name>`

2. Configure  
copy `.env.sample` to `.env` and fill in the required values

3. Sync Tribe's types.json with Ember Models
```bash
php sync-types.php
```
4. To serve frontend webapp with custom code injections for using page-wise meta tags
- On local:
```bash
php sync-dist.php
```
- On server:
```bash
wget --no-cache --no-cookie https://raw.githubusercontent.com/tribe-framework/tribe/master/install/ember.sh -O -
```

<!-- Usage
------------------------------------------------------------------------------

For more info visit https://postcodesolutions.com -->


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
