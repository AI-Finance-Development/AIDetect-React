import './subtitle-text.css';

/* eslint-disable-next-line */
export interface SubtitleTextProps {
    text: string;
  }
  
  export function SubtitleText(props: SubtitleTextProps) {
    return <span className={'sub-title'}>{props.text}</span>;
  }
  
  export default SubtitleText;