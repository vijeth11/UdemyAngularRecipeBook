const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	/*webpack.chainWebpack(config => {
		config.module
		  .rule('scss')
		  .use('node-sass')
		  .options({ sassOptions: { indentedSyntax: true } })
	  })*/

	return webpack.resolveConfig();
};
