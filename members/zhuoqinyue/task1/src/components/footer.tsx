import { Typography } from "antd";

interface FooterProps {
  len: number;
  finishLen: number;
}

const Footer = ({ len, finishLen }: FooterProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row-reverse",
      marginTop: 12,
    }}
  >
    <Typography.Paragraph style={{ color: "#1a3" }}>
      共計有 {len || 0} 條代辦, 你已完成 {finishLen} 條
    </Typography.Paragraph>
  </div>
);

export default Footer;
