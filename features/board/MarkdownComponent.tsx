import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { start } from "repl";

const markdownStyles: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.2,
  color: "#333",
  backgroundColor: "#efefef",
  width: "100%",
  textAlign: "left",
  padding: "1em",
  boxSizing: "border-box",
  borderRadius: "8px",
};

const MarkdownComponent = ({ content }: { content: string }) => {
  return (
    <div style={markdownStyles}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontSize: "2em", margin: "0.67em 0" }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontSize: "1.5em", margin: "0.75em 0" }}>
              {children}
            </h2>
          ),
          ul: ({ children }) => (
            <ul style={{ paddingLeft: "1.5em", listStyleType: "disc" }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ paddingLeft: "1.5em", listStyleType: "decimal" }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ margin: "0.5em 0" }}>{children}</li>
          ),
          u: ({ children }) => (
            <u style={{ textDecoration: "underline" }}>{children}</u>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: "bold" }}>{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export { MarkdownComponent };
