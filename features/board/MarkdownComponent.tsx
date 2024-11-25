import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeReact from "rehype-react";

interface MarkdownComponentProps {
  content: string;
}

const renderers = {
  h1: (props: any) => (
    <h1
      style={{ fontSize: "36px !important" }}
      className="font-semibold text-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      style={{ fontSize: "30px !important" }}
      className="font-semibold text-3xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      style={{ fontSize: "24px !important" }}
      className="font-semibold text-2xl"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      style={{ fontSize: "20px !important" }}
      className="font-semibold text-xl"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      style={{ fontSize: "16px" }}
      className="leading-relaxed text-base"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul style={{ marginLeft: "20px" }} className="list-disc" {...props} />
  ),
  ol: (props: any) => (
    <ol style={{ marginLeft: "20px" }} className="list-decimal" {...props} />
  ),
  li: (props: any) => (
    <li style={{ fontSize: "16px" }} className="text-base" {...props} />
  ),
};

const MarkdownComponent = ({ content }: MarkdownComponentProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[
        [
          rehypeReact,
          { createElement: React.createElement, components: renderers },
        ],
      ]}
    >
      {content}
    </ReactMarkdown>
  );
};

export { MarkdownComponent };
