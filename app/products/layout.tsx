import '@/styles/global.css'
import { Container } from '@mantine/core'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='page-container'>
      <Container fluid py={70} px={50}>
        <div className='mt-4'>{children}</div>
      </Container>
    </div>
  )
}
