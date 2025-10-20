import { Post } from '@/models';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { format } from 'date-fns';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {post.title}
        </Typography>
        {/*Mặc định Typography render ra thẻ p, Divider render thẻ div. P bọc div là không hợp lệ, nên thêm  component="div" để hợp lệ*/}
        {/* <Typography variant="body1" my={2} sx={{ display: 'flex' }} component="div">
          {format(Number(post.publishedDate), 'dd MMM yyyy')}
          <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
          {post.tagList.join(',')}
        </Typography>*/}
        <Stack direction="row" my={2}>
          <Typography variant="body1">{format(Number(post.publishedDate), 'dd MMM yyyy')}</Typography>
          <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
          <Typography variant="body1">{post.tagList.join(',')}</Typography>
        </Stack>

        <Typography variant="body2">{post.description}</Typography>
      </CardContent>
    </Card>
  );
}
