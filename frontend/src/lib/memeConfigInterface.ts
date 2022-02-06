export interface MemeText {
  text: string;
  size: number;
  xPos: number;
  yPos: number;
  fontFamily: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}
export interface MemeConfig {
  texts: MemeText[];
}
