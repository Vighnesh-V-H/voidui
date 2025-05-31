import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>VoidUI</span>,
  project: {
    link: "https://github.com/yourusername/voidui",
  },
  docsRepositoryBase:
    "https://github.com/yourusername/voidui/tree/main/apps/docs",
  footer: {
    text: "© 2024 VoidUI. MIT License.",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – VoidUI",
    };
  },
  head: (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta
        name='description'
        content='VoidUI: Modern, Accessible React Components'
      />
      <meta name='og:title' content='VoidUI: Modern React Components' />
    </>
  ),
  primaryHue: 240,
  banner: {
    key: "beta-release",
    text: "🎉 VoidUI is in beta. Try it now!",
  },
};

export default config;
