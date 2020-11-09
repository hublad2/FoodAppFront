module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/scss/_fonts.scss";
        @import "@/scss/_colors.scss";
        @import "@/scss/_extensions.scss";
        @import "@/scss/_media.scss";
        @import "@/scss/_utils.scss";
        `,
      },
    },
  },
};
