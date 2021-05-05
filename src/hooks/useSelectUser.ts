import { useCallback, useState } from "react";

import { User } from "../types/api/user";

type Props = {
  id: number;
  users: Array<User>
  onOpen: () => void;
}

// 選択したユーザー情報を特定し、モーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    // Array.find()　条件に一致する一番最初の配列の要素を取得
    const targetUser = users.find((user) => user.id === id);
    // findで検索した結果がなかった場合undefinedが返却される場合もあるのでsetSelectedUser(targetUser);はエラーになっている（型としてはUserかnull型なので）
    // ① if文条件分岐にてエラーを回避
    // ② setSelectedUser(target ?? null);という記述でtargetがundefinedなら初期値をnullにする。という記述で回避
    // ③ 絶対にfindの結果があるという前提でsetSelectedUser(targetUser!);という記述で回避
    // ③のやり方は安易に使うとTypeScriptの意味がなくなるので注意（バグの温床になる）
    // 今回は表示されているデータをクリックして取得なので無い可能性が存在しないので③を採用
    setSelectedUser(targetUser!);
    onOpen();
  }, [])

  return { onSelectUser, selectedUser }
}