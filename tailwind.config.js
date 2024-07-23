/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      animation: {
        coolHorizontalShake: "coolHorizontalShake 0.5s ",
        bounceFromTop: "bounceFromTop 1s",
        progress: "progress 5s ease-in-out forwards",
      },
      keyframes: {
        coolHorizontalShake: {
          "3%, 21%, 39%, 57%, 74%, 92%": { transform: "translateX(8px)" },
          "6%, 24%, 42%, 60%, 77%, 95%": { transform: "translateX(3px)" },
          "9%, 27%, 45%, 63%, 80%, 98%": { transform: "translateX(-8px)" },
        },
        bounceFromTop: {
          "0%, 25%, 55%, 85%, 100%": {
            "animation-timing-function": "ease-out",
            transform: "translate3d(0, 0, 0)",
          },
          "41%, 44%": {
            "animation-timing-function": "ease-in",
            transform: "translate3d(0, -10px, 0) scale3d(1, 1.6, 1)",
          },
          "70%": {
            "animation-timing-function": "ease-in",
            transform: "translate3d(0, -2.5px, 0)",
          },
          "90%": {
            transform: "translate3d(0, -0.5px, 0)",
          },
        },
        progress: {
          "0%": { width: "0" },
          "100%": { width: "calc(100% + 10px)" },
        },
      },
    },
    plugins: [],
  },
};
