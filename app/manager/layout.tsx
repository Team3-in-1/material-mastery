'use client';
import SideBar from '@/components/SideBar/SideBar';
import UserContext from '@/contexts/UserContext';
import { constant } from '@/utils/constant';
import { Button, Group } from '@mantine/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

let socket;

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notify, setNotify] = useState<any>(null);
  const socketInitializer = () => {
    socket = io(constant.SOCKET_URL);

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('notificationChange', (notification) => {
      console.log('Received notification change:', notification);
      if (!notification) {
        setNotify(1);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  };
  useEffect(() => {
    if (notify) {
      toast.error('Hết hàng rồi');
      setNotify(null);
    }
  }, [notify]);

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <Group
      w='100%'
      h='100%'
      pos='fixed'
      className='z-[2]'
      bg='white'
      pt={72}
      gap='0'
      wrap='nowrap'
    >
      <SideBar from='manager' />
      {children}
    </Group>
  );
}
