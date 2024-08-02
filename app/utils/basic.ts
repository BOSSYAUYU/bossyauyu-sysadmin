export const timestampToDateString = function (timestamp: number) {
  const date = new Date(timestamp);

  // 验证时间戳是否有效
  if (isNaN(date.getTime())) {
    return;
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

// 获取到期时间
export const getExpireDate = function (
  dateString: string,
  dayNum: number,
  changeType: string
) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return;
  }

  const timestamp = date.getTime();
  const number = dayNum * 24 * 60 * 60 * 1000;
  const target = changeType === "1" ? timestamp + number : timestamp - number;
  return timestampToDateString(target);
};

// 获取剩余日期
export const getLastDate = function (dateString: string) {
  const targetDate = new Date(dateString);

  if (isNaN(targetDate.getTime())) {
    return;
  }
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = target - now;
  const diffDay = Math.floor(diff / 1000 / 60 / 60 / 24);
  return diffDay;
};

// 手动生成前端id
export const getFrontId = function () {
  return Math.round(Math.random() * 1000000000000000000).toString();
};

// 格式化数据
export const getInitBtnList = function (arr: any[], disabled?: boolean) {
  return arr.map((item) => {
    item.disabled = disabled;
    if (item.menuBtnList) {
      item.menuBtnList.map((menu: any) => {
        menu.label = menu.btnName;
        menu.value = menu.id;
        menu.disabled = disabled;
        menu.parentId = item.id;
        return menu;
      });
      item.value = item.menuBtnList
        .filter((a: any) => a.btnStatus === "2")
        .map((b: any) => b.id);
    }
    if (item.childMenuList) {
      item.childMenuList = getInitBtnList(item.childMenuList, disabled);
    }
    return item;
  });
};

// 格式化数据是否选中
export const getInitBtnListSelectAll = function (
  arr: any[],
  selectAll: boolean
) {
  return arr.map((item) => {
    if (item.menuBtnList) {
      item.menuBtnList.map((menu: any) => {
        menu.label = menu.btnName;
        menu.value = menu.id;
        menu.parentId = item.id;
        return menu;
      });
      item.value = selectAll ? item.menuBtnList.map((b: any) => b.id) : [];
    }
    if (item.childMenuList) {
      item.childMenuList = getInitBtnListSelectAll(
        item.childMenuList,
        selectAll
      );
    }
    return item;
  });
};

// 设置指定id的值
export const setBtnListData = function (
  arr: any[],
  id: number,
  data: number[]
) {
  return arr.map((item) => {
    if (item.id === id) {
      item.value = data;
    } else if (item.childMenuList) {
      setBtnListData(item.childMenuList, id, data);
    }
    return item;
  });
};

// 调用接口返回的数据
export const getTreeData = function (arr: any[]) {
  let target: any[] = [];
  arr.map((item) => {
    if (item.menuBtnList) {
      const _target = item.menuBtnList.map((a: any) => {
        a.btnStatus = item.value.includes(a.id) ? "2" : "0";
        return a;
      });
      target = [...target, ..._target];
    }
    if (item.childMenuList) {
      target = [...target, ...getTreeData(item.childMenuList)];
    }
  });
  return target;
};
