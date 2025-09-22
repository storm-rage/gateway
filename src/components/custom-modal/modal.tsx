/*
 * @Author: chenmeifeng
 * @Date: 2024-12-06 11:35:21
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-06 14:30:45
 * @Description:
 */
import { ForwardRefExoticComponent, useEffect, useRef, useState } from "react";
import CustomModal, { ICustomModalRef } from ".";

export default function CustomModalFrame(props: {
  [x: string]: any;
  title: any;
  open: boolean;
  childNode: ForwardRefExoticComponent<any>;
}) {
  const { title, open, childNode, ...otherProps } = props;
  const modeRef = useRef<any>();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    console.log(open, "open");

    setOpenModal(open);
  }, [open]);
  return (
    <CustomModal
      ref={modeRef}
      title={title}
      destroyOnClose
      open={openModal}
      footer={null}
      onCancel={() => setOpenModal(false)}
      Component={childNode}
      componentProps={otherProps}
    />
  );
}
