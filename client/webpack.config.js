const  webpack = require('webpack');
const  htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry:{
        main:'./main.js'
    },
    output:{
        path:__dirname+'/dist',
        filename:'js/form.nsw.min.js'
    },
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query:
			{
				presets: ['es2015']
			}
		}]
	},
	plugins:[
        new htmlWebpackPlugin({
            title:'加页表单',
            template:'./index.html',
            filename:'./index.html',
            showErrors:true,
            inject:'head',
           
        }),
        // new ExtractTextPlugin({
        //     filename:  (getPath) => {
        //         return getPath('css/[name].css').replace('css/js', 'css');
        //       },
        //       allChunks: true
        //   })
    ]
}