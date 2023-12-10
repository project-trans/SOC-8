import { defineUserConfig } from "vuepress";
import mdPangu from "markdown-it-pangu";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "SOC-8",
  description: "跨性别和多元性别人群健康照护指南第八版（SOC-8）",

  base: "/SOC-8",

  extendsMarkdown: (md) => {
    md.use(mdPangu);
  },

  theme,
});
