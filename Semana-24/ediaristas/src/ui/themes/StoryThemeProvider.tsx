import { ThemeProvider } from "@mui/system";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import theme from "./theme";

const StoryThemeProvider = (storyFn: any) => (
  <ThemeProvider theme={theme}>
    <EmotionThemeProvider theme={theme}>{storyFn()}</EmotionThemeProvider>
  </ThemeProvider>
);

export default StoryThemeProvider;
