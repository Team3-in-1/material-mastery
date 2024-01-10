'use client';
import { formatDate } from '@/utils/string';
import { Group, Image, Rating, Stack, Text, TextInput } from '@mantine/core';
import { identity } from 'cypress/types/lodash';
import { useState } from 'react';

const Comments = ({
  comments,
  isRateChoosing,
  ImageLink,
}: {
  comments: any;
  isRateChoosing: any;
  ImageLink: any;
}) => {
  const [isCommenting, setIsCommenting] = useState(-1);
  const replyClick = (index: number) => {
    setIsCommenting(index === isCommenting ? -1 : index);
  };

  return (
    <>
      {comments.data?.map((person: any, index: number) => {
        return (
          (isRateChoosing == 0 ||
            isRateChoosing == (person.comment_rating || 3)) && (
            <Group
              key={person._id}
              className='border-b-[1px]'
              gap='16'
              align='flex-center'
              py='1rem'
              wrap='nowrap'
            >
              <Image
                alt='avt'
                w='32'
                h='32'
                src={
                  person.user_avatar == null || person.user_avatar == ''
                    ? ImageLink
                    : person.user_avatar
                }
                className=' rounded-full w-[35px]'
              />
              <Stack gap='sm' w={'100%'}>
                <Stack gap={5}>
                  <Text>{person.comment_userName}</Text>
                  <Group gap='5'>
                    <Text c='gray.6' size='14px'>
                      {formatDate(person.createdAt)}
                    </Text>
                    <Rating value={person.comment_rating || 3} readOnly />
                  </Group>
                </Stack>
                <Text lineClamp={4}>{person.comment_content}</Text>
                {isCommenting === index && <TextInput w={'100%'} />}
                <Text
                  size='15px'
                  c={'red'}
                  className=' cursor-pointer'
                  onClick={() => {
                    replyClick(index);
                  }}
                >
                  Trả lời
                </Text>
              </Stack>
            </Group>
          )
        );
      })}
    </>
  );
};

export default Comments;
