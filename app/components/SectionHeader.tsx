import { Typography, Divider } from 'antd';
import { ReactNode } from 'react';

interface Props {
  title?: ReactNode;
  extra?: ReactNode;
}

const SectionHeader = ({ title, extra }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Typography.Title>{title}</Typography.Title>
        {extra && <div>{extra}</div>}
      </div>
      <Divider className="!my-[16px]"></Divider>
    </div>
  );
};

export default SectionHeader;
