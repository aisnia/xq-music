//判断是不是生产环境
const IS_PROD = ["production", "prod"].includes(process.env["NODE_ENV "])
//引入resolve
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: IS_PROD ? process.env["VUE_APP_PUBLIC_PATH "] : "./",
    devServer: {
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //   warnings: true,
        //   errors: true
        // },
        // open: false, // 是否打开浏览器
        // host: "localhost",
        // port: "8080", // 代理断就
        // https: false,
        // hotOnly: false, // 热更新
        proxy: {
            "/api": {
                target:
                    "https://www.baidu.com/", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    chainWebpack: config => {
        //修复HMR(热更新)失效
        config.resolve.symlinks(true)

        //修复 Lazy loading routes Error
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });

        //添加别名
        config.resolve.alias
            // .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@scss", resolve("src/assets/scss"))
            .set("@components", resolve("src/components"))
            .set("@plugins", resolve("src/plugins"))
            .set("@views", resolve("src/views"))
            .set("@router", resolve("src/router"))
            .set("@store", resolve("src/store"))
            .set("@layouts", resolve("src/layouts"))
            .set("@static", resolve("src/static"));
    },

}