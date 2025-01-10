'use client'
import UserContext from '@/contexts/UserContext'
import { userService } from '@/services/userService'
import {
  Alert,
  Button,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { IconInfoCircle } from '@tabler/icons-react'
import queryClient from '@/helpers/client'
import toast from 'react-hot-toast'
import { relative } from 'path'
import Timer from './timer'
const VerifyPage = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const [disableResendButton, setDisableResendButton] = useState(true)
  const [code, setCode] = useState('')

  const formDataQuery = useQuery({
    queryKey: ['signUpData'],
    queryFn: (): any => queryClient.getQueryData(['signUpData']),
    gcTime: 0,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (!formDataQuery.data) {
      router.back()
    }
  }, [formDataQuery.isPending])

  useEffect(() => {
    setTimeout(
      () => {
        setDisableResendButton(true)
      },
      1000 * 60 * 5,
    )
  }, [])

  const verifyMutation = useMutation({
    mutationFn: async (code: string) => {
      return await userService.verifyEmail(code)
    },
    onSuccess: (res) => {
      if (res.statusCode === 200) {
        toast.success('Xác thực thành công.')
        registerMutation.mutateAsync(formDataQuery.data)
      }
    },
    onError(error) {
      toast.error('Xác thực thất bại.')
    },
  })

  const sendEmail = useMutation({
    mutationFn: async (email: string) => {
      return await userService.sendEmail(email)
    },
    onSuccess: async (res) => {
      if (res.statusCode === 200) {
        toast.success('Gửi lại emai thành công.')
      } else {
        router.back()
      }
    },
    onError(error) {
      console.log(error)
      toast.error('Gửi lại email thất bại.')
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (formdata: any) => {
      return await userService.register(formdata)
    },
    onSuccess: (res) => {
      if (!res.error) {
        setUser(res)
        router.push('/')
      } else {
        toast.error(res.error)
      }
    },
    onError(error) {
      console.log(error)
    },
  })

  const handleVerify = (code: string = '') => {
    if (code !== '') {
      verifyMutation.mutateAsync(code)
    } else {
      toast.error('Vui lòng nhập mã.')
    }
  }

  const handleSendEmail = (email: string = '') => {
    if (email !== '') {
      sendEmail.mutateAsync(email)
    } else {
      router.back()
    }
  }
  return (
    <>
      <Group
        bg={'#f1f3f5'}
        align='flext-start'
        justify='center'
        h={'fit-content'}
        w={'100%'}
        pos={'relative'}
        className='z-[1] min-h-full'
        mt={180}
      >
        <Stack
          bg={'white'}
          h={300}
          w={500}
          className=' rounded-md'
          pt={20}
          pl={20}
          pr={20}
          pb={10}
        >
          <Stack gap={5}>
            <Text size='20px'>{`Chúng tôi đã gửi mã xác nhận vào email`}</Text>
            <Text size='15px'>{formDataQuery.data?.email}</Text>
          </Stack>
          <TextInput
            maxLength={6}
            size='60px'
            value={code}
            onChange={(event) => {
              setCode(event.currentTarget.value)
            }}
          />
          <Group w={'100%'} justify='center' align='center' mt={30}>
            <Flex justify={'center'} align={'center'} className='flex-[3]'>
              <Timer props={{ initialMinute: 5, initialSeconds: 0 }} />
            </Flex>
            <Stack align='center' className='flex-[1]'>
              <Button
                w={'100%'}
                bg={'#02B1AB'}
                disabled={disableResendButton}
                onClick={() => {
                  handleSendEmail(formDataQuery.data?.email)
                }}
              >
                Gửi lại mã xác nhận
              </Button>
              <Button
                w={'100%'}
                bg={'#02B1AB'}
                onClick={() => {
                  handleVerify(code)
                }}
              >
                Xác nhận
              </Button>
            </Stack>
          </Group>
        </Stack>
      </Group>
      {(registerMutation.isPending || verifyMutation.isPending) && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
    </>
  )
}

export default VerifyPage
