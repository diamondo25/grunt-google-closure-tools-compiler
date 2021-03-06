# grunt-google-closure-tools-compiler [![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=CSoellinger&url=https://github.com/ShrimpDev/grunt-google-closure-tools-compiler&title=grunt-google-closure-tools-compiler&language=en_GB&tags=github&category=software) [![Bountysource](https://api.bountysource.com/badge/team?team_id=117626&style=raised)](https://www.bountysource.com/teams/grunt-google-closure-tools-compiler)

[![npm version](https://badge.fury.io/js/grunt-google-closure-tools-compiler.svg)](https://badge.fury.io/js/grunt-google-closure-tools-compiler) [![dependencies](https://david-dm.org/ShrimpDev/grunt-google-closure-tools-compiler.svg)](https://david-dm.org/ShrimpDev/grunt-google-closure-tools-compiler) [![Build Status](https://travis-ci.org/ShrimpDev/grunt-google-closure-tools-compiler.svg?branch=master)](https://travis-ci.org/ShrimpDev/grunt-google-closure-tools-compiler) [![Coverage Status](https://coveralls.io/repos/ShrimpDev/grunt-google-closure-tools-compiler/badge.svg?branch=master&service=github)](https://coveralls.io/github/ShrimpDev/grunt-google-closure-tools-compiler?branch=master)<br />
[![Stories in Ready](https://badge.waffle.io/ShrimpDev/grunt-google-closure-tools-compiler.svg?label=ready&title=Ready)](http://waffle.io/ShrimpDev/grunt-google-closure-tools-compiler) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Another Grunt task for Google Closure Compiler. Uses compiler npm build or you can use your own (eg: nightly builds)

<!-- toc -->

* [Getting Started](#getting-started)
* [closurecompiler task](#closurecompiler-task)
  - [Options](#options)
  - [Usage Examples](#usage-examples)
* [Release History](#release-history)
* [ToDo](#todo)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

## Getting Started

This plugin requires Grunt `>= 0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install grunt-google-closure-tools-compiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-google-closure-tools-compiler');
```

## closurecompiler task

_Run this task with the `grunt closurecompiler` command._

This task requires that you have the closure compiler jar file anywhere on your building machine. However, this plugin loads the npm closure compiler.jar and set it as default compiler. You still can use a custom or another build from closure to set a new path to the
jar file you want.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### closure_compilation_level

Choices: `'SIMPLE'`, `'ADVANCED'` , `'WHITESPACE_ONLY'`<br />
Default: `'SIMPLE'`

Choose which closure compilation level we should use.

#### closure_create_source_map

Type: `Boolean`<br />
Default: `true`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

#### closure_language_in

Choices: `'ECMASCRIPT3'`, `'ECMASCRIPT5'` , `'ECMASCRIPT5_STRICT'`, `'ECMASCRIPT6'`, `'ECMASCRIPT6_STRICT'`, `'ECMASCRIPT6_TYPED'`<br />
Default: `'ECMASCRIPT3' (null)`

#### closure_language_out

Choices: `'ECMASCRIPT3'`, `'ECMASCRIPT5'` , `'ECMASCRIPT5_STRICT'`, `'ECMASCRIPT6_TYPED'`<br />
Default: `language in`

#### closure_formatting

Choices: `'PRETTY_PRINT'`, `'PRINT_INPUT_DELIMITER'` , `'SINGLE_QUOTES'`<br />
Default: `'PRETTY_PRINT' (null)`

#### debug

Type: `Boolean`<br />
Default: `true`

Turn on closure compiler debug parameter.

#### closure_extra_param

Type: `String`<br />
Default: `null`

Set some custom parameters for closure execution.

#### banner

Type: `String`<br />
Default: `''`

Put a string at the top of the compiled files.

#### compiler_jar

Type: `String`<br />
Default: `'node_modules/google-closure-compiler/compiler.jar'`

Path to the compiler.jar file. This could be relative beginning from the google-closure-compiler directory or absolute like `'/opt/closure-compiler/compiler.jar'`.

#### exec_maxBuffer

Type: `Integer`<br />
Default: `0`

Set maxBuffer if you got message "Error: maxBuffer exceeded."

#### java_path

Type: `String`<br />
Default: `null`

We use this path if it is setted. NOTE: If it is `null` we can also set the JAVA_HOME environment variable

#### java_d32

Type: `Boolean`<br />
Default: `false`

If this is true, the jar file will be executed with `-client` and `-d32` java parameters.

#### java_tieredcompilation

Type: `Boolean`<br />
Default: `true`

If this is true, the jar file will be executed with `-server` and `-XX:+TieredCompilation` java parameters.

### Usage Examples

#### Basic compression

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});
```

#### Advanced compilation

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      options: {
        closure_compilation_level: 'ADVANCED',
        banner: '/*\n' +
                ' * Minified by closure compiler \n' +
                ' */\n'
      },
      files: {
        'dest/output.min.js': ['src/*.js']
      }
    }
  }
});
```

#### All files with all subdirectories

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      options: {
        closure_compilation_level: 'WHITESPACE_ONLY'
      },
      files: {
        'dest/output.min.js': ['src/**']
      }
    }
  }
});
```

## Release History

<a name="0.1.7"></a>

#### [0.1.7](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.6...v0.1.7) (2015-12-21)

##### Bug Fixes

* **task:** Add lodash for isUndefined condition instead of grunt.util.kindOf ([eccecfb](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/eccecfb))

<a name="0.1.6"></a>

#### [0.1.6](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.5...v0.1.6) (2015-12-20)

##### Bug Fixes

* **task:** Updating closure dependencies ([e1cc166](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/e1cc166))

<a name="0.1.5"></a>

#### [0.1.5](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.4...v0.1.5) (2015-12-20)

##### Bug Fixes

* **package:** Move google closure library from dev to normal dependencies ([24450ab](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/24450ab))
* **task:** compile js files and put them into the same directory ([f048611](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/f048611))

##### Features

* **task:** Add custom extra parameters config for closure ([a89fd1f](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/a89fd1f))
* **task:** Add formatting parameter ([c8b85c9](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/c8b85c9))
* **task:** Add language-in and language-out options ([a71416f](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/a71416f))

<a name="0.1.4"></a>

#### [0.1.4](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.3...v0.1.4) (2015-12-18)

##### Features

* **task:** Show input and output file size after compilation ([fe369ae](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/fe369ae))

<a name="0.1.3"></a>

#### [0.1.3](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.2...v0.1.3) (2015-12-18)

##### Bug Fixes

* **bump:** Fixing peerDependencies reference inside readme ([da7553e](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/da7553e))

<a name="0.1.2"></a>

#### [0.1.2](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.1...v0.1.2) (2015-12-18)

##### Bug Fixes

* **task:** Catch error if files object is empty or dest file has an empty array ([bd37307](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/bd37307))
* **travis-ci:** Removing npm uninstall grunt ([1959803](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/1959803))

##### Features

* **task:** Add JAVA_HOME and option.java_path to set the java binary path ([2c24e70](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/2c24e70))

<a name="0.1.1"></a>

#### [0.1.1](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.0...v0.1.1) (2015-12-17)

<a name="0.1.0"></a>

### 0.1.0 (2015-12-17)

## ToDo

### Some stuff we have to do...

* Write unit tests
* Make closure externs possible
* Support "--js closure-library/closure/goog/deps.js" https://github.com/thanpolas/grunt-closure-tools/issues/64
* 
  - google-closure-library
* Enhancement: change compilation levels for certain files. https://github.com/gmarty/grunt-closure-compiler/issues/13
* Enable log file

## Author

**CSoellinger**

+ [github/ShrimpDev](https://github.com/ShrimpDev)
* [twitter/Zerogiven](http://twitter.com/Zerogiven)

## License

Copyright © 2015 CSoellinger
Released under the [MIT](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/blob/master/LICENSE-MIT) license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on December 21, 2015._