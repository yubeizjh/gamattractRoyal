const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("daisyui")
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A1A1AA", // zinc-400
          secondary: "#52525B", // zinc-600
          accent: "#37cdbe", // 未定义
          neutral: "#3d4451", // 未定义
          "base-100": "#ffffff",
        },
      }
    ],
  },
};

module.exports = config;