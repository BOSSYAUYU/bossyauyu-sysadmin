'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/app/store/store';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import zh from 'antd/locale/zh_CN';

import 'dayjs/locale/zh-cn';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <AntdRegistry>
        <ConfigProvider
          locale={zh}
          theme={{
            token: {
              colorPrimary: '#2C695D',
              colorError: '#BB5830',
            },
            components: {
              Input: {
                borderRadius: 8,
                colorBorder: '#dedede',
                paddingBlock: 8,
                paddingInline: 16,
              },
              InputNumber: {
                borderRadius: 8,
                colorBorder: '#dedede',
                paddingBlock: 8,
                paddingInline: 16,
              },
              Button: {
                borderRadiusLG: 20,
                primaryShadow: 'none',
                defaultBg: '#F5F8F7',
                defaultBorderColor: '',
                colorLink: '#344B7C',
              },
              Menu: {
                colorBgContainer: 'transparent',
                itemHeight: 54,
                itemSelectedBg: 'transparent',
                itemSelectedColor: 'black',
                colorText: '#8F8F95',
              },
              Tabs: {
                inkBarColor: 'transparent',
                itemColor: '#8F8F95',
                itemSelectedColor: '#000',
                titleFontSize: 16,
                titleFontSizeLG: 24,
              },
              Table: {
                headerColor: '#3C3F50',
                headerBg: '#F5F8F7',
                headerSplitColor: 'transparent',
              },
              Form: {},
              Select: {
                controlHeight: 40,
              },
              DatePicker: {
                controlHeight: 40,
              },
              Typography: {
                fontSizeHeading1: 24,
              },
              Modal: {
                titleFontSize: 24,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </Provider>
  );
}
