module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
    colors: {
      'main-black': "#483434",
      'trans-white': "rgba(255, 255, 255, 0.2)",
      'cta-grey': "#E5E7EB"
    },
    fontFamily: {
      robotoFlex: ["Roboto Flex", "sans-serif"],
      roboto: ["Roboto", "sans-serif"]
    },
    animation: {
      folderBounce: "folderBounce 1000ms ease-in-out 450ms infinite",
      folderBounceDelayed: "folderBounce 1000ms ease-in-out 525ms infinite"
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
