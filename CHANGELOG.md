# Changelog

## 2.0.2

* **CRITICAL FIX**: Fixed hsluv v1.0.1 API compatibility
  - Updated color conversion functions to use property-based hsluv API
  - Fixed `TypeError: hsluv.rgbToHsluv is not a function` error
  - Updated both lib/carto/tree/color.js and lib/carto/functions.js
  - Color functions now work correctly with perceptual color mixing

## 2.0.1

* Updated package metadata
  - Description now indicates Tracestrack maintenance
  - Repository URLs updated to point to tracestrack/carto
  - No code changes

## 2.0.0

### Breaking Changes
* **BREAKING**: Minimum Node.js version is now 16.0.0 (was 8.0.0)
* **BREAKING**: Updated js-yaml from ~3.14.0 to ~4.1.0
  - `yaml.safeLoad` is now `yaml.load` (automatically migrated)
* **BREAKING**: Updated yargs from ~15.4.1 to ~18.0.0
  - CLI initialization updated for new yargs API
* **BREAKING**: Updated chroma-js from ~1.3.5 to ~3.1.2
  - May affect color function behavior in some edge cases

### Major Dependency Updates
* chroma-js: ~1.3.5 → ~3.1.2
* hsluv: ~0.0.1 → ~1.0.1
* js-yaml: ~3.14.0 → ~4.1.0
* semver: ~5.6.0 → ~7.7.2
* yargs: ~15.4.1 → ~18.0.0

### Development Dependencies
* Replaced deprecated `istanbul` with `c8` for code coverage
* Updated mocha: ~7.2.0 → ~11.7.1
* Updated mocha-eslint: ^4.0.0 → ^7.0.0
* Updated sax: ~1.2.1 → ~1.4.1
* Updated coveralls: ~3.0.0 → ~3.1.1

### Other Changes
* Fixed deprecated `assert.fail()` usage in tests
* Updated ESLint configuration for ES2015 compatibility
* Updated test scripts to use c8 instead of istanbul
* 223 out of 229 tests passing (6 tests failing due to CLI and color function changes)

## 1.2.0

* Update dependencies
* Update mapnik-reference to support new Mapnik API version ([#498](https://github.com/mapbox/carto/issues/498))

## 1.1.0

* Update dependencies
* Update mapnik-reference to support new Mapnik API version ([#494](https://github.com/mapbox/carto/issues/494))

## 1.0.1

* Fix a error in the serialization process. ([#473](https://github.com/mapbox/carto/issues/488))

## 1.0.0

* Documentation is now available on https://cartocss.readthedocs.io. ([#473](https://github.com/mapbox/carto/issues/473))
* Warnings are emitted if properties are used that are `deprecated`, `unstable` or `experimental`.
There is a new command line / API switch (`-q / --quiet` / `quiet`) to suppress those warnings. ([#474](https://github.com/mapbox/carto/issues/474))
* Warnings are emitted if a layer has no associated styles or styles do not match a corresponding layer selector. ([#29](https://github.com/mapbox/carto/issues/29))
* New command line switch `-f / --file` to specify a file for output instead of `stdout`.
* carto now honors variable redefinition and uses the last defined value instead of the first one ([#338](https://github.com/mapbox/carto/issues/338)).
* All parameters of XML tags are now ouput in alphabetical order. This makes output more predictable.
* carto is now able to output a JSON variant of Mapnik XML. There is a new command line / API switch
(`-o / --output` / `outputFormat`) to choose the output format. Possible values are `mapnik` (default)
for Mapnik XML and `json` for the JSON variant (part of [#413](https://github.com/mapbox/carto/issues/413)).
For Mapnik XML all character data as tag content is now prefixed with CDATA.
* Expressions are allowed in filters e.g. `[height] % 50 = 0` or `[height] + 10 = 0`, fields have to be properly written within brackets
([#377](https://github.com/mapbox/carto/issues/377))
* carto now accepts custom references for validating rules (part of [#413](https://github.com/mapbox/carto/issues/413))
* The JavaScript API has been documented ([#479](https://github.com/mapbox/carto/issues/479))
* New symbolizer rules (work on the whole symbolizer) enable control of symbolizer serialization. Write e.g. `line: none` to suppress output
of the line symbolizer for this definition. Write e.g. `marker: auto` to output a markers symbolizer with default values. Symbolizer rules
are considered an advanced features and are never inherited to other definitions ([#477](https://github.com/mapbox/carto/pull/477)).
* Remove `millstone` from optional dependencies again ([#482](https://github.com/mapbox/carto/issues/482)).

### Breaking changes

#### Stylesheets

* The deprecated `name` attribute for layers is no longer supported. Use `id` instead.
* The deprecated color functions `husl` and `husla` are no longer supported. Use `hsluv` and `hsluva` instead.
* If you define a variable with the same name twice the latest defined value is now used in contrast to the first defined one as before.
* All parameters of XML tags are now ouput in alphabetical order. If you somehow depend on the order
of parameters (e.g. for tests) expect them to change.

#### API

* `carto.Renderer.render` and `carto.Renderer.renderMSS` now return an object `{ msg: Array, data: String }` instead of just a
string. `data` contains the output as before and `msg` now contains an array of error or warning objects.
In case of errors `data` is `null`.
* carto now only throws errors in case of program failures. All other style processing
related errors can be found in the `msg` property (see above).
* The constructor of `carto.Renderer` now only takes one options object
instead of a `env` and `options` parameter.
* The option `mapnik_version` and `validation_data` of `carto.Renderer` have
been renamed to `version` and `validationData` respectively.
* `carto.Renderer` now checks each option before forwarding them to the rendering
chain. Supported options are defined in the documentation. If you use a option that is
missing please open a issue.

## 0.18.2

* Remove `millstone` from optional dependencies again

## 0.18.1

* Updated `mapnik-reference` to fix an install problem for some Node.js versions
* Backported documentation updates

## 0.18.0

* Compile time performance improvement by leaving out rules that do not apply to layer minzoom and maxzoom restrictions if specified ([#469](https://github.com/mapbox/carto/issues/469))
* Confirmed that [#348](https://github.com/mapbox/carto/issues/348) does not occur (anymore)
* Updated dependencies

## 0.17.3

* Fix regression with number parsing after fixing of [#411](https://github.com/mapbox/carto/issues/411) ([#471](https://github.com/mapbox/carto/issues/471))

## 0.17.2

* Remove unintended scoping of package. It is now again `carto`. The NPM requirement is dropped.
* Variables in font definitions are now processed correctly ([#333](https://github.com/mapbox/carto/issues/333))
* Display a better error for missing fonts on font name validation ([#242](https://github.com/mapbox/carto/issues/242))
* Some properties can now be reset to their default value by using `none` ([#214](https://github.com/mapbox/carto/issues/214))

## 0.17.1

* Revert fix for [#315](https://github.com/mapbox/carto/issues/315) due to performance problems ([#466](https://github.com/mapbox/carto/issues/466))

## 0.17.0

* Carto is now a scoped package named `@mapbox/carto`. Scoped packages require NPM >= 1.5. ([#457](https://github.com/mapbox/carto/pull/457))
* Carto now runs in the browser too (part of [#413](https://github.com/mapbox/carto/issues/413))
* Carto can now load MML itself and supports absolute file paths in MML stylesheet references ([#439](https://github.com/mapbox/carto/pull/439))
* The target API default of Mapnik moved from 2.3.0 to being always the latest version (3.0.x). Take that into account if you run a Mapnik 2.x instance (see also the `-a/--api` command line option).
([#454](https://github.com/mapbox/carto/issues/454))
* `husl()` was renamed to `hsluv()`. The HuSL variant is deprecated and will be removed in 1.0.0. ([#456](https://github.com/mapbox/carto/issues/456))
* The `name` attribute for layers in the MML is deprecated and will be removed in 1.0.0. Use `id` instead. ([#165](https://github.com/mapbox/carto/issues/165))
* The `_properties` object in the MML of vector tiles projects is now supported ([#450](https://github.com/mapbox/carto/issues/450))
* Updated `mapnik-reference` to 8.6.1, which enables Browser support and support for the `transform` property of PolygonPatternSymbolizer ([#445](https://github.com/mapbox/carto/issues/445))
* Bugfixes ([#296](https://github.com/mapbox/carto/issues/296), [#121](https://github.com/mapbox/carto/issues/121), [#315](https://github.com/mapbox/carto/issues/315), [#411](https://github.com/mapbox/carto/issues/411), [#426](https://github.com/mapbox/carto/issues/426), [#273](https://github.com/mapbox/carto/issues/273))
* Documentation updates ([#269](https://github.com/mapbox/carto/issues/269), [#452](https://github.com/mapbox/carto/issues/452))

## 0.16.3

* Fixed outdated library reference for carto help screen ([#444](https://github.com/mapbox/carto/pull/443))
* Fixed a regression related to color math with non-color values being interpreted as HSL instead of RGB ([#446](https://github.com/mapbox/carto/issues/446))

## 0.16.2

* Fixed a regression related to color math ([#443](https://github.com/mapbox/carto/issues/443))

## 0.16.1

* Fixed a regression related to the color mix function ([#442](https://github.com/mapbox/carto/issues/442))

## 0.16.0

* Fixed a bug related to parsing numerical selectors ([#393](https://github.com/mapbox/carto/pull/393))
* More meaningful error messages on erroneous Stylesheet references in MML ([#438](https://github.com/mapbox/carto/pull/438))
* Added support for YAML MML files ([#419](https://github.com/mapbox/carto/pull/419))
* Added support for [HuSL](http://www.husl-colors.org) perceptual colors ([#422](https://github.com/mapbox/carto/pull/422))
* Added support for targeting Mapnik API versions in `carto` command line tool ([#433](https://github.com/mapbox/carto/pull/433))
* Added support for `minimum-/maximum-scale-denominator` ([#394](https://github.com/mapbox/carto/issues/394))
* Updated documentation, fixed its display problems and added doc for `image-filter` ([#432](https://github.com/mapbox/carto/pull/432))
* Moved from `underscore` to `lodash` dependency ([#431](https://github.com/mapbox/carto/pull/431))
* Moved from `optimist` to `yargs` dependency ([#435](https://github.com/mapbox/carto/pull/435))
* Bump `mapnik-reference` dependency to 8.5.3 (support for Mapnik 3.0.10)
* Modernized development dependencies
* Further small fixes and improvements for development.

## 0.15.3

* Support for Mapnik 3.0.6

## 0.15.2

* Support for Mapnik 3.0.5

## 0.15.1

* Support for Mapnik 3.0.4

## 0.15.0

* Support for Mapnik 3.0.3

## 0.14.1

* Support latest Mapnik 3.x
* Bump `mapnik-reference` dependency to 7.x.

## 0.14.0

* Support for Mapnik 3.x
* Bump `mapnik-reference` dependency to ~6.0.1.

## 0.13.0

* Allows optional args in transforms.
* Bump `mapnik-reference` dependency to 5.1.x.

## 0.12.0

* Drop mml2json and xml2js dependency.

## 0.11.0

* Switch API to be synchronous. All errors should be caught using try/catch now.

## 0.10.0

* Remove automatic inclusion of `maximum-extent` on Map element to allow geometries that are buffered past extent bounds (e.g. dateline).
* Bump `mapnik-reference` dependency to ~5.0.9 (with `shield-halo-rasterizer`)

## 0.9.6

* Fixed support for `text-face-name` values with `&` like `El&Font Bubble`
* Fixed support for filtering on fields containing single quotes. Now `#layer[name="it's"] { ... }` is possible.
* Fixed support for filtering on fields containing `&`. Now `#layer["Hello&Goodbye"="yes"] { ... }` is possible.
* Added support for exponential notation in filters. Now `#layer[value = 1.2e3] { ... }` is possible.
* Bump `mapnik-reference` dependency to ~5.0.8 (with support for Mapnik v2.3.0 and 3.x)

## 0.9.5

* Various speed optimizations to help address #20 (#231)
* Fixed support for fields that contain the word `zoom` in them (previous clashed with `zoom` keyword)
* Fixed support for a space in front of `zoom` keyword (#288)
* Improved error messages when color functions encounter invalid color (#309)
* The `carto` command line tool now exits cleanly when millstone is used
* The `carto` command line tool now only localized with millstone if requested (#243)
* Added man page for `carto` (#257)
* Fix repeated comments in selectors. Fixes #260
* Fixed `image-filter` duplication (#270)
* Quote all needed XML chars. See #263.
* Added higher tolerance for various characters in field names (#230)
* Bump `mapnik-reference` dependency to ~5.0.7 (with support for Mapnik v2.2.0)
* Adds compatibility with screen units.
* Fixed ability to use carto as global module (#236)
* Now using 'console' instead of `util` for `stderr` (#217)

## 0.9.4

* Fixes nesting of regex calls

## 0.9.3

* Allows `text-face-name` properties to be unquoted
* Detects inline Format XML tags in `text-name` and passes such output
  straight to XML for advanced text names.
* Fixes bugs around concatenation of strings in expressions
* Fixes parsing of comments in between selectors
* Fixes parsing of whitespace in calls
* Improved error messages for unknown properties - advises user on
  the property name most closely matching the incorrect input.
* Improved errors for calls, advises user on number of arguments
* Fixes instance inheritance - thanks @gravitystorm!

## 0.9.2

Tagged Sept 6, 2012

* Bump `mapnik-reference` dependency to ~5.0.0
* Better support for unsigned types in certain Mapnik styling properties

## 0.9.1

Tagged Aug 15, 2012

* Improved error handling for different target `mapnik-reference` versions (strk)
* Bump `mapnik-reference` dependency to ~4.0.3
* Fixed handling of image-filter syntax as per [Mapnik changes](https://github.com/mapnik/mapnik/issues/1384)

## 0.9.0

* Bump `mapnik-reference` dependency to ~4.0.0 to pull in new properties.
* Adapted to `comp-op` rename upstream in `mapnik-reference`.
* Adapted to `transform` rename upstream in `mapnik-reference` and Mapnik.

## 0.8.1

* Bump `mapnik-reference` dependency to ~3.1.0 to pull in new properties.

## 0.8.0

* Adds the modulus operator `%` as an option
* Adds a new field-type like `[FIELD]` instead of "[FIELD]"
* Supports function syntax for transforms, optionally with variables and arguments.

### 0.7.1

* Updated mapnik-reference to `~2.2.1`
* Added support for `status` parameter on layers.
* Command line `carto` program gained `--nosymlink` option to pass to millstone to use absolute paths instead of symlinking files.
* Removed unsupported mixin code.

### 0.7.0

* Updated mapnik-reference to `~2.1.0`
* Support an `opacity` property on any style that is a style-level property

### 0.6.0

* Bump `mapnik-reference` dependency to 1.0.0 to allow for using `buffer-size` in the
  `Map` element.

### 0.5.0

* Now uses the [mapnik-reference](https://github.com/mapnik/mapnik-reference) npm module
  instead of copying `reference.json` when it's updated
* Adds a second parameter to `carto.Renderer` - an object which has a key `mapnik_version`
  that specifies the version of Mapnik this stylesheet should target.

### 0.4.10

* Updated reference.json

### 0.4.9

* Render TileJSON, Mapnik options to Mapnik XML parameters.

### 0.4.8

* Updated reference.json

### 0.4.7

* Removed deprecation warnings re: sys/util
* Updated reference.json
* Updated underscore dependency

### 0.4.6

* Node >=v0.6.x compatibility
* Dropped cartox
* Updated reference.json

### 0.4.5

* Fixes text-name with HTML entities
* Fixes function calls with incorrect number of arguments
* Fixes invalid code segments not having eval

### 0.4.3

* Fixes serialization bug with invalid selectors.

### 0.4.0

* Switches text-symbolizer syntax to new-style for Mapnik 2.0

### 0.3.0

* Add "name/" prefix for creating multiple instances of a symbolizer in the same
  attachment
* Only output `<Layer>` tag when there's at least one style
* Sort styles by location of first rule's index
* Don't support selectors that are not either `Map`, `.` or `#`-prefixed.

### 0.2.3

* Fixes many bugs
* Supports arbitrary properties on layers with the `properties` key in MML
* Adds `min-path-length`
* Updates `reference.json`

### 0.2.2

* Update `carto` to use `millstone` if available.

### 0.2.1

* Accept valid Map properties directly from input mml object.

### 0.2.0

* Removed all external handling - see http://github.com/mapbox/millstone for localizing/caching MML objects with external references.
* All errors are now handled as Error objects.

### 0.1.14

* Optional-file datasources - allows string argument to OGR

### 0.1.9

* Variables in filters.

### 0.1.6 & 0.1.8

* Fixed bug caused by jshint testing

### 0.1.5

* Using npm devDependencies in place of ndistro
* Updated package.json format
* Fixes tests

### 0.1.4

* Fix bug in which SRS autodetection broke error handling
* Update carto
