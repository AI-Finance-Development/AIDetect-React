import './title-text.css';

/* eslint-disable-next-line */
export interface TitleTextProps {
  text: string;
}

export function TitleText(props: TitleTextProps) {
  return <span className={'title'}>{props.text}</span>;
}

export default TitleText;