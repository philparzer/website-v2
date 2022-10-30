module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
    colors: {
      'main-black': "#483434",
      'trans-white': "rgba(255, 255, 255, 0.2);"
    },
    fontFamily: {
      robotoFlex: ["Roboto Flex", "sans-serif"],
    },
    animation: {
      folderBounce: "folderBounce 1s cubic-bezier(0.4, 0, 0.2, 1) 200ms infinite",
      folderBounceDelayed: "folderBounce 1s cubic-bezier(0.4, 0, 0.2, 1) 275ms infinite"
    },
    keyframes: {
      folderBounce: {
        '0%, 100%': { marginTop: "-0.5rem" },
        '50%': { marginTop: '0rem' },
      }
    }
  }
}
};
