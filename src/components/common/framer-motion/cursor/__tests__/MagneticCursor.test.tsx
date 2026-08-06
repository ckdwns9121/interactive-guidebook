import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react";
import MagneticCursor from "../MagneticCursor";

// 모바일 환경 모킹을 위한 유틸리티 함수
const mockUserAgent = (userAgent: string) => {
  Object.defineProperty(navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
};

describe("MagneticCursor", () => {
  const originalUserAgent = navigator.userAgent;

  beforeEach(() => {
    // 각 테스트 전에 window.innerWidth/Height 설정
    Object.defineProperty(window, "innerWidth", { value: 1024, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 768, configurable: true });
  });

  afterEach(() => {
    // 각 테스트 후에 UserAgent 원복
    mockUserAgent(originalUserAgent);
  });

  it("데스크톱 환경에서 커서가 렌더링되어야 함", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const { container } = render(<MagneticCursor />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("모바일 환경에서는 커서가 렌더링되지 않아야 함", () => {
    mockUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)");
    const { container } = render(<MagneticCursor />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("마우스 이동 시 커서 위치가 업데이트되어야 함", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const { container } = render(<MagneticCursor />);

    act(() => {
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });
    });

    const cursor = container.querySelector("div");
    expect(cursor).toHaveClass("fixed", "pointer-events-none");
  });

  it("마그네틱 타겟 진입 시 커서 크기가 변경되어야 함", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const { container } = render(<MagneticCursor />);

    const targetRect = {
      width: 200,
      height: 100,
      left: 300,
      top: 200,
      right: 500,
      bottom: 300,
      x: 300,
      y: 200,
    };

    act(() => {
      window.dispatchEvent(
        new CustomEvent("magnetic-cursor:enter", {
          detail: { rect: targetRect },
        })
      );
    });

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", (targetRect.width + 16).toString());
    expect(svg).toHaveAttribute("height", (targetRect.height + 16).toString());
  });

  it("마그네틱 타겟 이탈 시 커서가 원래 크기로 돌아와야 함", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const { container } = render(<MagneticCursor />);

    act(() => {
      window.dispatchEvent(new CustomEvent("magnetic-cursor:leave"));
    });

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "40");
    expect(svg).toHaveAttribute("height", "40");
  });
});
