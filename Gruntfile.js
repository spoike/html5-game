module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		open: {
			dev: {
				path: 'http://localhost:8000'
			}
		},
		connect: {
			server: {
					options: {
					port: 8000,
					base: './www'
				}
			}
		},
		watch: {
			scripts: {
				files: './www/**/*.js'
			}
		}
	});
	
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.registerTask('default', ['connect', 'open:dev', 'watch']);
};