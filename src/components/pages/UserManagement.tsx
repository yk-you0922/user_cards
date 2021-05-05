/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, VFC } from "react";
import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";

export const UserManagement: VFC = memo(() => {

  const { getUsers, users, loading } = useAllUsers();

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
                />
              </WrapItem>
            ))}
        </Wrap>
      )}
    </>
  )
});