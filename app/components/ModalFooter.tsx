import { Button } from 'antd';

interface Props {
  onOK?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
}

const ModalFooter = ({ onOK, onCancel, okText, cancelText }: Props) => {
  return (
    <div className="flex gap-[16px] mt-[32px]">
      <Button type="primary" danger size="large" onClick={onOK}>
        {okText ?? '確定'}
      </Button>
      <Button size="large" onClick={onCancel}>
        {cancelText ?? '取消'}
      </Button>
    </div>
  );
};

export default ModalFooter;
