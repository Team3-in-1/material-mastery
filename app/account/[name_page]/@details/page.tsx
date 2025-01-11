'use client'
import '@/styles/global.css'
import {
  Stack,
  Group,
  Image,
  Button,
  TextInput,
  Text,
  Flex,
  LoadingOverlay,
  Modal,
  Input,
  Textarea,
  Box,
} from '@mantine/core'
import NextImage from 'next/image'
import { useDebounceCallback, useDisclosure } from '@mantine/hooks'
import { useDebouncedCallback } from 'use-debounce'
import defaultAvatar from '@/public/pic/Avatar.png'
import queryClient from '@/helpers/client'
import { useRouter } from 'next/navigation'
import { IconMapPinFilled } from '@tabler/icons-react'
import { useContext, useRef, useState, useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { constant } from '@/utils/constant'
import toast, { Toaster } from 'react-hot-toast'
import {
  checkAddressFormat,
  checkEmailFormat,
  checkNameFormat,
  checkPhoneFormat,
} from '@/utils/regex'
import { userService } from '@/services/userService'
import UserContext from '@/contexts/UserContext'
import { FilePreview } from '@/types/file'
import dynamic from 'next/dynamic'
import { Pos } from '@/types/mapType'
import { async } from 'rxjs'

const DetailsPage = () => {
  const { user } = useContext(UserContext)

  const userInfor = useQuery({
    queryKey: ['userInfor'],
    queryFn: () => {
      return userService.getUserById(user)
    },
    enabled: !!user,
    staleTime: Infinity,
    refetchOnMount: false,
  })

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState<string>()
  const [avatarInput, setAvatarInput] = useState<FilePreview>()
  const [email, setEmail] = useState('')
  const [listAddresses, setListAddresses] = useState<string[]>([])
  const [coordinates, setCoordinates] = useState<Pos[]>([
    { lat: 11.0355624, lng: 107.1881076 },
  ])

  const [enableBox1, setEnableBox1] = useState(false)
  const [enableBox2, setEnableBox2] = useState(false)

  // store initial value
  const isSet = useRef(false)
  let initialName = useRef('')
  let initialEmail = useRef('')
  let initialPhone = useRef('')
  let initialAddress = useRef('')

  if (!isSet.current && userInfor.isSuccess) {
    initialName.current = userInfor.data.display_name
    initialEmail.current = userInfor.data.email
    initialPhone.current = userInfor.data.phone
    if (userInfor.data?.user_attributes?.address)
      initialAddress.current = userInfor.data.user_attributes.address
    else {
      const userAttributes = JSON.parse(userInfor.data.user_attributes)
      initialAddress.current = userAttributes.address
      const userAddressInfo = userAttributes.address_info
      setCoordinates([
        {
          lat: userAddressInfo?.latitude ?? 107.1881076,
          lng: userAddressInfo?.longitude ?? 11.0355624,
        },
      ])
    }
    setName(initialName.current)
    setPhone(initialPhone.current)
    setAddress(initialAddress.current)
    setEmail(initialEmail.current)
    setAvatar(userInfor.data.avatar)

    isSet.current = true
  }

  const returnInitialValue = (type: number) => {
    if (type == 0) {
      setName(initialName.current)
      setPhone(initialPhone.current)
    } else setAddress(initialAddress.current)
  }

  const userId = user?.userId

  const token = user?.accessToken
  const [opened, { open, close }] = useDisclosure(false)
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map/LeafletMap'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  )

  const addressMutation = useMutation({
    mutationKey: ['update-user', 'address'],
    mutationFn: () => {
      const updateUserPromise = userService.updateAddress(
        userId,
        token,
        address,
        coordinates[0].lng,
        coordinates[0].lat,
      )
      toast.promise(updateUserPromise, {
        success: "Cập nhập thành công'",
        error: 'Cập nhập thất bại.',
        loading: 'Đang xử lý',
      })
      return updateUserPromise
    },

    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ['userInfor'],
        type: 'active',
        exact: true,
      })
    },
    throwOnError: false,
  })
  const namePhoneMutation = useMutation({
    mutationKey: ['update-user', 'name', 'phone'],
    mutationFn: () => {
      const updateUserPromise = userService.updateNamePhone(
        userId,
        token,
        name,
        phone,
      )
      toast.promise(updateUserPromise, {
        success: "Cập nhập thành công'",
        error: 'Cập nhập thất bại.',
        loading: 'Đang xử lý',
      })
      return updateUserPromise
    },

    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ['userInfor'],
        type: 'active',
        exact: true,
      })
    },
    throwOnError: false,
  })
  const avatarMutation = useMutation({
    mutationKey: ['update-user', 'avatar'],
    mutationFn: (newAvatar: File) => {
      const updateUserPromise = userService.updateAvatar(
        userId,
        token,
        newAvatar,
      )
      toast.promise(updateUserPromise, {
        success: "Cập nhập thành công'",
        error: 'Cập nhập thất bại.',
        loading: 'Đang xử lý',
      })
      return updateUserPromise
    },

    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ['userInfor'],
        type: 'active',
        exact: true,
      })
    },
    throwOnError: false,
  })

  const selectAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setAvatarInput({ file, previewUrl: URL.createObjectURL(file) })
  }
  const searchAddress = useDebouncedCallback((searchString: string) => {
    const params = new URLSearchParams()
    params.set('q', searchString)
    params.set('format', 'json')
    params.set('addressdetails', '1')
    params.set('polygon_geojson', '0')
    params.set('limit', '10')
    const queryString = params.toString()
    fetch(`${constant.NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result))
        setListAddresses(JSON.parse(result))
        // setListPlace(JSON.parse(result))
      })
      .catch((err) => console.log('err: ', err))
  }, 300)

  return (
    <Stack w={'100%'} h={'100%'} px={100}>
      <Modal opened={opened} onClose={close} centered>
        <Stack>
          <Stack>
            <Text>Chọn ảnh</Text>
            {avatarInput && (
              <img
                src={avatarInput?.previewUrl}
                style={{ width: '200px', height: 'auto' }}
              />
            )}
            <input type='file' accept='image/' onChange={selectAvatarImage} />
          </Stack>
          <Group w={'100%'} justify='space-evenly'>
            <Button
              h={'1.25 rem'}
              bg={'transparent'}
              className='text-[#02B1AB] border-0'
              onClick={async () => {
                if (!avatarInput?.file) return
                setAvatar(avatarInput.previewUrl)
                setAvatarInput(undefined)
                close()
                avatarMutation.mutate(avatarInput.file)
              }}
            >
              Lưu
            </Button>
            <Button
              h={'1.25 rem'}
              bg={'transparent'}
              className=' text-[#02B1AB] border-0'
              onClick={() => {
                setAvatarInput(undefined)
                close()
              }}
            >
              Hủy
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Group>
        <Stack align='center' justify='center' className='flex-[1]'>
          <Group
            w={140}
            h={140}
            justify='center'
            align='center'
            className=' rounded-full '
          >
            <Image
              alt='avatar'
              h={120}
              w='auto'
              fit='contain'
              className='rounded-full '
              src={avatar}
            />
          </Group>

          <Button
            bg={'transparent'}
            h={25}
            w={120}
            className=' text-[#02B1AB] font-light border-[1.5px] border-[#02B1AB] rounded-[5px]'
            onClick={() => {
              open()
            }}
          >
            Thay đổi
          </Button>
        </Stack>
        <Stack
          bg={'white'}
          p={20}
          className='flex-[2] rounded-[10px] box-content'
        >
          <Flex w={'100%'} direction={'row-reverse'}>
            {enableBox1 && (
              <Button
                bg={'transparent'}
                className=' h-5 text-[#02B1AB] border-0'
                //style={{ height: '1.25rem', color: '#02B1AB' }}
                onClick={() => {
                  returnInitialValue(0)
                  setEnableBox1(!enableBox1)
                }}
              >
                Hủy
              </Button>
            )}
            <Button
              bg={'transparent'}
              className=' h-5 text-[#02B1AB] border-0'
              onClick={() => {
                if (enableBox1) {
                  // input valid check function will return null
                  if (checkNameFormat(name)) {
                    toast.error('Tên không hợp lệ')
                    returnInitialValue(0)
                  } else if (checkPhoneFormat(phone)) {
                    returnInitialValue(0)
                    toast.error('Số điện thoại không hợp lệ')
                  } else {
                    namePhoneMutation.mutate()
                  }
                }
                setEnableBox1(!enableBox1)
              }}
            >
              {enableBox1 ? 'Lưu' : 'Thay đổi'}
            </Button>
          </Flex>
          <TextInput
            withAsterisk
            label={'Tên'}
            value={name}
            disabled={!enableBox1}
            onChange={(event) => {
              setName(event.currentTarget.value)
            }}
          />
          <TextInput
            withAsterisk
            label={'Email'}
            value={email}
            disabled={true}
          />
          <TextInput
            withAsterisk
            label={'Số điện thoại'}
            value={phone}
            disabled={!enableBox1}
            onChange={(event) => {
              setPhone(event.currentTarget.value)
            }}
          />
        </Stack>
      </Group>
      <Stack p={20} bg={'white'} className='rounded-[10px]'>
        <Group justify='space-between' w={'100%'}>
          <Group className='gap-2'>
            <IconMapPinFilled style={{ color: '#02B1AB' }} />
            <Text className='text-[#02B1AB] font-bold'>Địa chỉ</Text>
          </Group>
          <Group gap={0}>
            <Button
              onClick={() => {
                if (enableBox2) {
                  // input valid check function will return null
                  if (checkAddressFormat(address)) {
                    toast.error('Địa chỉ không hợp lệ')
                    returnInitialValue(1)
                  } else {
                    addressMutation.mutate()
                  }
                }
                setEnableBox2(!enableBox2)
              }}
              bg={'transparent'}
              className=' h-5 cursor-pointer text-[#02B1AB]  border-0'
            >
              {enableBox2 ? 'Lưu' : 'Thay đổi'}
            </Button>
            {enableBox2 && (
              <Button
                onClick={() => {
                  returnInitialValue(1)
                  setEnableBox2(!enableBox2)
                }}
                bg={'transparent'}
                className=' h-5 text-[#02B1AB] border-0'
              >
                Hủy
              </Button>
            )}
          </Group>
        </Group>
        {listAddresses.map((item: any, index) => (
          <div
            key={index}
            className='cursor-pointer'
            onClick={() => {
              setAddress(item.name)
              setCoordinates([{ lng: item.lon, lat: item.lat }])
              setListAddresses([])
            }}
          >
            <p>{item.name}</p>
          </div>
        ))}
        <Textarea
          withAsterisk
          disabled={!enableBox2}
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value)
            searchAddress(event.currentTarget.value)
          }}
        />
        <div className='w-full h-[500px]'>
          <Map allPositions={coordinates} zoom={15} />
        </div>
      </Stack>
      {userInfor.isPending && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
    </Stack>
  )
}

// export default dynamic(() => Promise.resolve(DetailsPage), { ssr: false });
export default DetailsPage
