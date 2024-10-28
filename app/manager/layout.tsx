'use client'
import SideBar from '@/components/SideBar/SideBar'
import UserContext from '@/contexts/UserContext'
import { constant } from '@/utils/constant'
import { Button, Group } from '@mantine/core'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Socket, io } from 'socket.io-client'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>

const socketInitializer = () => {
  socket = io(constant.SOCKET_URL)

  if (socket && socket.connected) {
    socket.disconnect()
  }
  socket.on('connect', () => {
    console.log('connected')
  })
  const listener = (notification: any) => {
    toast.success('Có sản phẩm sắp hết hàng')
    // console.log('Received notification change:', notification)
  }
  socket.on('notificationChange', listener)

  return () => socket.off('notificationChange', listener)
}

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // useEffect(() => {
  //   socketInitializer()
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])
  //
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
      <Toaster position='top-center' reverseOrder={false} />
    </Group>
  )
}

