const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = (env, args) => {
    const appDir = path.resolve(__dirname, `./src/${args.type}`);
    const outDir = path.resolve(__dirname, `./www/${args.type}`);
    const isProduction = args.mode === "production";

    return {
        devtool: "none",
        entry: {
            main: path.resolve(appDir, "index.ts"),
        },
        output: {
            path: outDir,
            publicPath: "/",
            filename: "[name].js",
        },
        mode: "production",
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin([outDir]),
            new HtmlWebpackPlugin({
                title: `FAST perf test: ${args.type}`,
                contentBase: outDir,
                inlineSource: ".(js|css)$", // embed all javascript and css inline
            }),
            new BundleAnalyzerPlugin({
                // Remove this to inspect bundle sizes.
                analyzerMode: "disabled",
            }),
            new HtmlWebpackInlineSourcePlugin(),
        ],
        resolve: {
            extensions: [".js", ".tsx", ".ts", ".json"],
        },
        devServer: {
            compress: false,
            historyApiFallback: true,
            overlay: true,
            open: true,
            port: 7777,
        },
    };
};
