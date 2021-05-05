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

export const UserManagement: VFC = memo(() => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  const onClickUser = useCallback(() => {
    onOpen();
  }, [])

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
        userName={"Yuki"}
        fullName={"Yuki Arami"}
        email={"test@test.com"}
        phone={"000-1111-222"}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
});