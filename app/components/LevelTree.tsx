"use client";

import { Checkbox } from "antd";

function LevelTree(props: { menuList: any[]; onCheckedChange?: Function }) {
  const { menuList, onCheckedChange } = props;
  const handleChange = (data: any, currentId: number, parentId: number) => {
    onCheckedChange?.(data, currentId, parentId);
  };

  return (
    <div>
      {menuList.map((item) => {
        return (
          <div className="flex flex-col" key={item.id}>
            {/* <Checkbox style={{ marginBottom: "16px" }} disabled={item.disabled}>
              {item.menuName}
            </Checkbox> */}
            {item.menuName && (
              <div style={{ marginBottom: "16px" }}>{item.menuName}</div>
            )}
            {item.menuBtnList && (
              <div className="pl-[24px] mb-[16px]">
                <Checkbox.Group
                  options={item.menuBtnList}
                  value={item.value}
                  onChange={(data) =>
                    handleChange(data, item.id, item.parentId)
                  }
                ></Checkbox.Group>
              </div>
            )}
            {item.childMenuList && (
              <div className="pl-[24px]  mb-[16px]">
                <LevelTree
                  menuList={item.childMenuList}
                  onCheckedChange={onCheckedChange}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default LevelTree;
