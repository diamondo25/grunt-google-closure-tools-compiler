/*
 * grunt-google-closure-tools-compiler-compiler
 * https://github.com/ShrimpDev/grunt-google-closure-tools-compiler
 *
 * Copyright (c) 2015 CSoellinger
 * Licensed under the MIT license.
 */

/* global options */

'use strict';

module.exports = function (grunt) {

  var exec = require('child_process').exec;
  var fs = require('fs');
  var _isUndefined = require('lodash/lang/isUndefined');

  var possible_options = {
    compilation_level: ['SIMPLE', 'ADVANCED', 'WHITESPACE_ONLY'],
    language_in: ['ECMASCRIPT3', 'ECMASCRIPT5', 'ECMASCRIPT5_STRICT', 'ECMASCRIPT6', 'ECMASCRIPT6_STRICT', 'ECMASCRIPT6_TYPED'],
    language_out: ['ECMASCRIPT3', 'ECMASCRIPT5', 'ECMASCRIPT5_STRICT', 'ECMASCRIPT6_TYPED'],
    formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER', 'SINGLE_QUOTES']
  };

  var getFilesizeInBytesfunction = function (filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
  };
//  var path = require('path');
//  var gzip = require('zlib').gzip;

  grunt.registerMultiTask('closurecompiler', 'A Grunt task for Closure Compiler.', function () {
    var compileDone = this.async(); // Asynchronous task

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      closure_compilation_level: 'SIMPLE',
      closure_create_source_map: true,
      closure_language_in: null,
      closure_language_out: null,
      closure_formatting: null,
      closure_debug: false,
      closure_extra_param: null,
      banner: '',
      report_file: '',
      compiler_jar: 'node_modules/google-closure-compiler/compiler.jar',
      exec_maxBuffer: 200,
      java_path: null,
      java_d32: false,
      java_tieredcompilation: true
    });

    // Check if the compiler_jar property is empty
    if (options.compiler_jar.trim() === "") {
      grunt.fail.warn('Empty compiler_jar property. No compilation executed...');
      compileDone(false);
    }

    // Check if the files property is empty
    if (this.files.length <= 0) {
      grunt.fail.warn('Empty files property.');
      compileDone(false);
    }

    if (possible_options.compilation_level.indexOf(options.closure_compilation_level) === -1) {
      grunt.fail.warn('Wrong value for compilation level. (Possible values: ' + possible_options.compilation_level.join(',') + ')');
      compileDone(false);
    }

    if (options.closure_language_in !== null) {
      if (possible_options.language_in.indexOf(options.closure_language_in) === -1) {
        grunt.fail.warn('Wrong value for language in. (Possible values: ' + possible_options.language_in.join(',') + ')');
        compileDone(false);
      }
    }

    if (options.closure_language_out !== null) {
      if (possible_options.language_out.indexOf(options.closure_language_out) === -1) {
        grunt.fail.warn('Wrong value for language out. (Possible values: ' + possible_options.language_out.join(',') + ')');
        compileDone(false);
      }
    }

    if (options.closure_formatting !== null) {
      if (possible_options.formatting.indexOf(options.closure_formatting) === -1) {
        grunt.fail.warn('Wrong value for formatting. (Possible values: ' + possible_options.formatting.join(',') + ')');
        compileDone(false);
      }
    }

    var java_path = 'java';

    // If we have setted JAVA_HOME we would prefer this
    if (!_isUndefined(process.env.JAVA_HOME)) {
      java_path = process.env.JAVA_HOME + '/bin/java';
    }

    // At least the user can set it by config
    if (options.java_path !== null) {
      java_path = options.java_path;
    }

    // Java command with optional parameters
    var command = java_path + ' ' +
            (options.java_d32 === true ? '-client -d32 ' : '') +
            (options.java_tieredcompilation === true ? '-server -XX:+TieredCompilation ' : '') +
            '-jar "' + options.compiler_jar + '"';

    this.files.forEach(function (f) {
      grunt.verbose.writeflags(f.src, "Input files");

      if (f.src.length === 0) {
        grunt.fail.warn('No javascript files given');
        compileDone(false);
      }

      var output_file = f.dest;
      var output_mapfile = output_file + '.map';
      var output_reportFile = options.report_file || output_file + '.report.txt';
      var fSrcSizeTotal = 0.0;
      var fileInputArray = [];
      f.src.forEach(function (fSrc) {
        if (fSrc !== output_file) {
          fileInputArray.push(fSrc);

          var fSrcSize = getFilesizeInBytesfunction(fSrc) / 1000.0;
          grunt.verbose.writeln('Input ' + fSrc + ' (' + fSrcSize.toFixed(2) + ' KB)');
          fSrcSizeTotal += fSrcSize;
        }
      });

      var javascript_files = '--js="' + fileInputArray.join('" --js="') + '"';
      var closure_command = command + ' ' + javascript_files + ' --js_output_file="' + output_file + '"';

      // Add compilation level
      closure_command += ' --compilation_level="' + options.closure_compilation_level + '"';

      // Add source map param if necessary
      if (options.closure_create_source_map === true) {
        closure_command += ' --create_source_map="' + output_mapfile + '"';
      }

      if (options.closure_language_in !== null) {
        closure_command += ' --language_in="' + options.closure_language_in + '"';
      }

      if (options.closure_language_out !== null) {
        closure_command += ' --language_out="' + options.closure_language_out + '"';
      }

      if (options.closure_formatting !== null) {
        closure_command += ' --formatting="' + options.closure_formatting + '"';
      }

      // Add debug param if necessary
      if (options.closure_debug === true) {
        closure_command += ' --debug';
      }

      if (options.closure_extra_param !== null) {
        closure_command += ' ' + options.closure_extra_param;
      }

      // Closure tools don't create directories, so first we create an empty file at our dest
      grunt.file.write(output_file, '');

      grunt.verbose.writeln(grunt.util.linefeed + 'Execute' + grunt.util.linefeed + closure_command + grunt.util.linefeed);

      grunt.log.writeln('Input  total size ' + fSrcSizeTotal.toFixed(2) + ' KB');

      exec(closure_command, {maxBuffer: options.exec_maxBuffer * 1024}, function (err, stdout, stderr) {
        if (err) {
          grunt.warn(err);
          compileDone(false);
        } else {
          if (options.banner.trim() !== "") {
            var tmpOutputFile = options.banner + grunt.file.read(output_file);
            grunt.file.write(output_file, tmpOutputFile);
          }

          if (options.closure_create_source_map === true) {
            var tmpOutputMapFile = grunt.file.read(output_mapfile) + grunt.util.linefeed + '//# sourceMappingURL=' + output_mapfile;
            grunt.file.write(output_mapfile, tmpOutputMapFile);
          }
        }

        var outputSize = getFilesizeInBytesfunction(output_file) / 1000;
        var minifiedPercent = (outputSize.toFixed(2) / (fSrcSizeTotal.toFixed(2) / 100));

        grunt.log.writeln('Output total size ' + outputSize.toFixed(2) + ' KB [' + (minifiedPercent > 0 ? '-' + (100 - minifiedPercent) : '0') + '%]');
        grunt.verbose.writeln('Output file ' + output_file);

        if (stdout) {
          grunt.log.writeln(stdout);
        }

        grunt.log.ok('Compiled succesfully.');
        compileDone();
      });
    });
  });

};
