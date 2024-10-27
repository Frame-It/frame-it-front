import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from 'react';

interface Props {
  word: string;
  keyword: string;
  style?: CSSProperties;
}

const HighlightedText = forwardRef<
  HTMLSpanElement,
  Props & HTMLAttributes<HTMLSpanElement>
>(({ word, keyword, style, ...props }, ref) => {
  if (!keyword) return <UnMarkedSpan>{word}</UnMarkedSpan>;
  const regex = new RegExp(keyword, 'gi');
  const highlighted = word.replace(regex, (match) => `<mark>${match}</mark>`);
  return (
    <span
      ref={ref}
      className="overflow-hidden truncate whitespace-nowrap"
      style={style}
      dangerouslySetInnerHTML={{ __html: highlighted }}
      {...props}
    />
  );
});

const UnMarkedSpan: FC<PropsWithChildren> = ({ children }) => (
  <span className="overflow-hidden truncate whitespace-nowrap">{children}</span>
);

export default HighlightedText;
