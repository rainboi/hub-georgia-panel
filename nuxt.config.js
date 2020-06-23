export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: "universal",
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    /*
     ** Global CSS
     */
    css: ["~/css/styles.css"],
    /*
     ** Loading
     */
    loading: {
        color: "#00aa55",
        height: "5px"
    },
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        "@nuxtjs/auth"
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: "https://api.hub-georgia.ge/api/"
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "authentication/login",
                        method: "post",
                        propertyName: "result.data.token"
                    },
                    user: false,
                    logout: false
                }
            }
        }
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {}
};
