'use client';

import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { saveAs } from 'file-saver';

const MermaidDialog = ({ chart, isOpen, onClose }: { chart: string; isOpen: boolean; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svg, setSvg] = useState('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chart) {
      mermaid
        .render(`mermaid-diagram-${Date.now()}`, chart)
        .then(({ svg: renderedSvg }) => setSvg(renderedSvg))
        .catch((error) => {
          console.error('Mermaid rendering failed:', error);
          setSvg('<p class="text-red-500">Error rendering diagram</p>');
        });
    }
  }, [isOpen, chart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
          handleReset();
          break;
        case 'Escape':
          onClose();
          break;
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y + 10 }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y - 10 }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x + 10 }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x - 10 }));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleDownload = () => {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    saveAs(svgBlob, 'mermaid-diagram.svg');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Mermaid Diagram</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative group"
            >
              <ZoomOut size={16} />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2">
                Zoom Out
              </span>
            </button>
            <span className="text-gray-400 text-sm min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative group"
            >
              <ZoomIn size={16} />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2">
                Zoom In
              </span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative group"
            >
              <RotateCcw size={16} />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2">
                Reset View
              </span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2">
                Download SVG
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative group"
            >
              <X size={16} />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2">
                Close
              </span>
            </button>
          </div>
        </div>
        <div
          className="flex-1 overflow-hidden bg-black relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="p-8 transition-transform duration-200 select-none w-full h-full flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            <div ref={mermaidRef} dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Mermaid = ({ chart }: { chart: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (!chart || typeof chart !== 'string') {
      console.error('Invalid chart data:', chart);
      setSvg('<p class="text-red-500">Invalid chart data</p>');
      return;
    }

    mermaid
      .render(`mermaid-diagram-${Date.now()}`, chart)
      .then(({ svg: renderedSvg }) => {
        console.log('Mermaid render result:', renderedSvg);
        setSvg(renderedSvg);
      })
      .catch((error) => {
        console.error('Mermaid rendering failed:', error);
        setSvg('<p class="text-red-500">Error rendering diagram</p>');
      });
  }, [chart]);

  return (
    <>
      <div
        className="my-6 p-6 bg-black border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors group relative"
        onClick={() => setIsDialogOpen(true)}
        role="button"
        aria-label="Interactive Mermaid diagram"
      >
        <div className="absolute inset-0 bg-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-semibold">Click to interact</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="sr-only">Diagram description: {chart.substring(0, 100)}...</div>
        <div className="mt-3 text-center">
          <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
            Click to expand and interact
          </span>
        </div>
      </div>
      <MermaidDialog chart={chart} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-white mb-8 pb-4 border-b-2 border-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-white mt-12 mb-6 pb-2 border-b border-gray-600">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-white mt-10 mb-4">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-medium text-white mt-8 mb-3">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-medium text-white mt-6 mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-medium text-white mt-4 mb-2">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4 text-base">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-white font-medium underline decoration-2 underline-offset-2 hover:decoration-gray-400 transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-white pl-6 py-2 my-6 bg-black italic text-gray-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-700">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-black text-white">{children}</thead>,
          tbody: ({ children }) => <tbody className="bg-black">{children}</tbody>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold border-r border-gray-400 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-r border-gray-700 border-b last:border-r-0 text-gray-300">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-0 h-px bg-black" />,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            // Use children for raw content
            let codeContent = Array.isArray(children) ? children.join('') : String(children);
            codeContent = codeContent.trim();

            console.log('Code block node:', node, 'Children:', children, 'Processed content:', codeContent);

            if (match?.[1] === 'mermaid') {
              return <Mermaid chart={codeContent} />;
            }

            if (!match) {
              return (
                <code className="bg-black text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-700">
                  {codeContent}
                </code>
              );
            }

            return (
              <div className="my-6">
                <div className="bg-black text-white px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
                  {match[1]}
                </div>
                <pre className="bg-black text-gray-200 p-4 rounded-b-lg border border-gray-700 border-t-0 overflow-x-auto">
                  <code className={`language-${match[1]} font-mono text-sm leading-relaxed`} {...props}>
                    {codeContent}
                  </code>
                </pre>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const DocsPage = () => {
  const [markdownContent, setMarkdownContent] = useState('');


// Centralized Mermaid initialization
useEffect(() => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      background: '#000000',
      mainBkg: '#2c2c2c',
      secondBkg: '#3a3a3a',
      tertiaryColor: '#444444',
      primaryColor: '#5a5a5a',
      primaryBorderColor: '#aaaaaa',
      lineColor: '#e0e0e0',
      primaryTextColor: '#ffffff',
      secondaryTextColor: '#e0e0e0',
      noteBkgColor: '#222222',
      noteTextColor: '#ffffff',
      edgeLabelBackground: '#111111',
    },
    themeCSS: `
      .node rect, .node circle, .node polygon { fill: #2c2c2c !important; stroke: #aaaaaa !important; }
      .edgePath path { stroke: #e0e0e0 !important; }
    `,
  });
}, []);
  useEffect(() => {
    try {
      import('../../lib/markDown').then((mod) => {
        if (mod.markdownContent) {
          setMarkdownContent(mod.markdownContent);
        }
      }).catch(() => {
        // Keep default content if import fails
      });
    } catch (error) {
      // Keep default content if import fails
    }
  }, []);
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <MarkdownRenderer content={markdownContent} />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;