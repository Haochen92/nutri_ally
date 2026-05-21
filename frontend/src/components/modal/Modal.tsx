'use client';

import { ReactNode } from 'react';
import { Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface ModalWrapperProps {
  children: ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const router = useRouter();

  return (
    <Modal opened={true} onClose={() => router.back()} size="md" centered>
      {children}
    </Modal>
  );
}
