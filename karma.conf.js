// Karma configuration
// Generated on Tue Jul 29 2014 22:50:01 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'public/javascripts/libs/jquery.js',
            'public/javascripts/libs/jquery.elastic.source.js',
            'public/javascripts/HtmlIdsAndClasses.js',
            'public/javascripts/ClassTrainerInfo.js',
            'public/javascripts/ClassAjax.js',
            'public/javascripts/ClassDivHeightSetter.js',
            'public/javascripts/ClassListEditorSetAnswerId.js',
            'public/javascripts/ClassListEditorSaveNewVoc.js',
            'public/javascripts/ClassListEditorDeleteVoc.js',
            'public/javascripts/ClassListEditorUpdateQuestion.js',
            'public/javascripts/ClassListEditorUpdateAnswer.js',
            'public/javascripts/ClassListEditorAnswerEdit.js',
            'public/javascripts/ClassListEditor.js',
            'public/javascripts/ClassListEditorNewVocEdit.js',
            'public/javascripts/ClassListEditorNewVocCreateFieldQuestion.js',
            'public/javascripts/ClassListEditorNewVocCreateFieldAnswer.js',
            'public/javascripts/ClassListEditorNewVocCreateFieldVocMenu.js',
            'public/javascripts/ClassListEditorNewVocCreateField.js',
            'public/javascripts/ClassListEditorNewVoc.js',
            'public/javascripts/trainer/helpersFunctions.js',
            'public/javascripts/jsTree/TreeStartObject.js',
            'public/javascripts/trainer/*.js',
            'public/javascripts/jsTree/*.js',
            'public/javascripts/*.js',
            'spec/javascripts/helpers/jasmine-jquery.js',
            'spec/javascripts/helpers/*.js',
            'spec/javascripts/files/*.js',
            'spec/javascripts/fixtures/**/*.html'
        ],


        // list of files to exclude
        exclude: [
            'public/javascripts/jsTree/tree_start.js',
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,

        proxies: {
            '/': 'http://localhost/trainer/units/myUnit00/'
        },


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};