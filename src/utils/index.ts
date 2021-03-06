import { useEffect, useRef, useState } from "react";
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initValue: T[]) => {
  const [value, setValue] = useState(initValue);

  return {
    value,
    setValue,
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      let cpValue = [...value];
      cpValue.splice(index, 1);
      setValue(cpValue);
    },
    add: (item: T) => {
      setValue([...value,item]);
    }
  }
};

export const useDocument = (title: string, keepOnUnmount: boolean=true) => {
  // 页面加载时：oldTitle = 旧 title 'react app'
  // 加载后：oldTitle = 新 title
  // const oldTitle = document.title;
  const oldTitle = useRef(document.title).current;   // 使用 useRef 获取到的值在整个生命周期都不会发生变化

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(()=> {
    return () => {
      if(!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧 title 对应文档
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle])
}