/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, VFC } from "react";
import { 
    Center, 
    useDisclosure,
    Spinner, 
    Wrap, 
    WrapItem,
  } from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";

export const UserManagement: VFC = memo(() => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();

  // ① 選択したユーザーカードから情報を取得 ② ①を内包したモーダルを開く
  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
    // users, onSelectUser, onOpenに関心を持たせないと、最初に読み込んだままの状態になる
    // 基本的に1行目のeslint-disabledはなしにして行うとこのバグには遭遇しにくくなるのでどうしてもという場合以外は使わない。
  }, [users, onSelectUser, onOpen])

  // 画面読み込み時に1回のみ全ユーザーのデータを取得したいのでuseEffect
  useEffect(() => getUsers(), [])

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem　key={user.id} mx="auto">
              <UserCard 
                id={user.id}
                imageUrl={"https://source.unsplash.com/random/users"} 
                userName={user.username} 
                fullName={user.name}
                onClick={onClickUser}
              />
              </WrapItem>
            ))}
        </Wrap>
      )}
      <UserDetailModal  
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
});