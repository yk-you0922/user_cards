import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // isAdminフラグはresultのユーザーIDが10ならtrue, それ以外はfalseになるように定義
            const isAdmin = res.data.id === 10 ? true : false;
            // スプレッド構文で配列を展開し、そこにisAdminを配列の要素として足した形で表現
            setLoginUser({ ...res.data, isAdmin});
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            alert("ユーザーが見つかりません");
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );

  return { login, loading };
};
