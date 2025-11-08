'use client';

import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import Konva from 'konva';

interface CanvasElement {
  type: 'text' | 'rect' | 'image';
  content?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  align?: string;
}

interface DesignCanvasProps {
  width: number;
  height: number;
  elements: CanvasElement[];
  variables: Record<string, string>;
  backgroundColor?: string;
}

export function DesignCanvas({
  width,
  height,
  elements,
  variables,
  backgroundColor = '#ffffff',
}: DesignCanvasProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const [scale, setScale] = useState(1);

  // Calculate scale to fit in viewport
  useEffect(() => {
    const containerWidth = window.innerWidth > 1280 ? 800 : window.innerWidth - 100;
    const containerHeight = window.innerHeight - 200;
    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const newScale = Math.min(scaleX, scaleY, 1);
    setScale(newScale);
  }, [width, height]);

  // Replace variables in text content
  const replaceVariables = (text: string): string => {
    let result = text;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'gi');
      result = result.replace(regex, value || `[${key}]`);
    });
    return result;
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
      <div
        className="shadow-2xl"
        style={{
          width: width * scale,
          height: height * scale,
        }}
      >
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill={backgroundColor}
            />

            {/* Render elements */}
            {elements.map((element, index) => {
              if (element.type === 'text') {
                return (
                  <Text
                    key={index}
                    x={element.x}
                    y={element.y}
                    text={replaceVariables(element.content || '')}
                    fontSize={element.fontSize || 24}
                    fontFamily={element.fontFamily || 'Arial'}
                    fill={element.fill || '#000000'}
                    align={element.align as 'left' | 'center' | 'right' || 'center'}
                    offsetX={element.align === 'center' ? (element.content?.length || 0) * (element.fontSize || 24) / 4 : 0}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

// Export function to convert canvas to image
export const exportCanvasToImage = (
  stageRef: React.RefObject<Konva.Stage>,
  format: 'png' | 'jpg' = 'png',
  quality: number = 1
): string | null => {
  if (!stageRef.current) return null;
  
  return stageRef.current.toDataURL({
    mimeType: format === 'jpg' ? 'image/jpeg' : 'image/png',
    quality,
    pixelRatio: 2, // Higher quality
  });
};
