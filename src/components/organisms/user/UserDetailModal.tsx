import { memo, VFC } from "react";
import { 
  Stack, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
}

export const UserDetailModal: VFC<Props> = memo((props) => {

  const { userName, fullName, email, phone, isOpen, onClose } = props;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      autoFocus={false} 
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={userName} isReadOnly/>
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={fullName} isReadOnly/>
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={email} isReadOnly/>
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={phone} isReadOnly/>
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
});