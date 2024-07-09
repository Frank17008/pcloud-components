import { useMemo } from 'react';
import { IAuthComponentProps } from './interface';

// 查找指定元素
function deepFind(node, fn) {
  const treelist = node instanceof Array ? node : [node];
  for (let i = 0; i < treelist.length; i++) {
    if (fn(treelist[i])) {
      return treelist[i];
    } else {
      const target = deepFind(treelist[i].children || [], fn);
      if (target) return target;
    }
  }
}
// 通过字段判断是否存在按钮权限(或者菜单权限)
function isAuth(fieldValue: string | number | boolean, fieldName = 'code', authList: any[]) {
  if (!authList) return false;
  const target = deepFind(authList, (item) => item[fieldName] === fieldValue);
  return !!target;
}

const AuthComponent = ({ value, noAuthContent, children, authList, fieldName }: IAuthComponentProps) => {
  const auth = useMemo(() => (!value ? true : isAuth(value, fieldName, authList)), [value]);
  return <>{!auth ? noAuthContent : children}</>;
};

export default AuthComponent;
