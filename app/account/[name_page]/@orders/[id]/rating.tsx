'use client';
import UserContext from '@/contexts/UserContext';
import CommentService from '@/services/commentService';
import { Button, Group, Rating, Stack, Textarea } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

const RatingProduct = ({ productId }: { productId: string }) => {
  const { user } = useContext(UserContext);
  const [comment, setCommet] = useState('');
  const [rating, setRating] = useState(5);
  const commentMutation = useMutation({
    mutationKey: ['createComment'],
    mutationFn: async ({
      productId,
      content,
      rating,
    }: {
      productId: string;
      content: string;
      rating: number;
    }) => {
      const commentService = new CommentService(user);
      return await commentService.createComment(productId, content, rating);
    },
    onSuccess: () => {
      toast.success('Đánh giá sản phẩm thành công');
    },
  });

  const sendComment = (productId: string, content: string, rating: number) => {
    commentMutation.mutate({ productId, content, rating });
  };

  return (
    <Group w={'100%'} h={50} pb={10}>
      <Textarea
        className='flex-[3]'
        value={comment}
        onChange={(event) => {
          setCommet(event.currentTarget.value);
        }}
      />
      <Stack className=' flex-[1]' justify='center' align='flex-start' gap={0}>
        <Rating value={rating} onChange={setRating} />
        <Button
          bg={'transparent'}
          w={'100%'}
          className=' bg-transparent border-[#02B1AB] text-[#02B1AB]'
          onClick={() => {
            sendComment(productId, comment, rating);
          }}
        >
          Đánh giá
        </Button>
      </Stack>
    </Group>
  );
};

export default RatingProduct;
