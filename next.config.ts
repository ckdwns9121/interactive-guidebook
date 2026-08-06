import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // `import source from "./Component.tsx?raw"` 형태로 파일 원본 문자열을 가져올 수 있게 한다.
    // 기존 로더(swc 등)가 ?raw 모듈을 먼저 변환하지 않도록 모든 기존 룰에서 ?raw 를 제외한다.
    const excludeRawQuery = (rules: unknown[]) => {
      for (const rule of rules) {
        if (!rule || typeof rule !== "object") continue;
        const r = rule as {
          oneOf?: unknown[];
          test?: unknown;
          resourceQuery?: unknown;
        };
        if (Array.isArray(r.oneOf)) excludeRawQuery(r.oneOf);
        if (r.test && r.resourceQuery === undefined) {
          r.resourceQuery = { not: [/raw/] };
        }
      }
    };
    excludeRawQuery(config.module.rules);

    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
