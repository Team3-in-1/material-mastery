import { ActionIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
    const router = useRouter()
    return (
        <ActionIcon variant="light" size='lg' aria-label="Back to previous page"
            onClick={() => router.back()}><IconArrowLeft /></ActionIcon>
    )
}
