import { memo, VFC, useState, useEffect, ChangeEvent } from "react";
import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";


type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { user, isOpen, onClose, isAdmin = false } = props;

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 初期表示をuseEffectで表示
  useEffect(() => {
    // A ?? B -> Aがundefinedの場合、Bにする 今回はユーザー情報がundefinedなら空白にする内容 
    setUsername(user?.username ?? '');
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPhone(user?.phone ?? '');
  }, [user]);

  const onClickUpdate = () => {
    // 更新APIなどを組んでいたらここで処理を記述（カスタムフックを用いて行うのかな？）
  }

  // ユーザー名を変更するonChange
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  // フルネームを変更するonChange
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  // Emailを変更するonChange
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  // 電話番号を変更するonChange
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={username} onChange={onChangeUserName} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
            </FormControl>
            </Stack>
          </ModalBody>
            {isAdmin && (
              // isAdmin === trueのとき
              <ModalFooter>
                <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
              </ModalFooter>
            )}
      </ModalContent>
    </Modal>
  );
});
