
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
type SearchText = {
  content: string
}
export default function Search({ content }: SearchText) {
  return (
    <TextInput
      w='37.5rem'
      leftSection={
        <IconSearch style={{ height: '1.5rem', width: '1.5rem' }}></IconSearch>
      }
      placeholder='Search'
      radius='xl'
      size='sm'
      ml='md'
    />
  )
}
