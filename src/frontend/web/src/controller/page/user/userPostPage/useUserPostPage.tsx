import { useErrorsContext } from 'Controller/provider';
import { usePostService } from 'Controller/service/postService';
import { Post } from 'Models/post';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export interface UseUserPostPageData {
  isLoading: boolean;
  post?: Post;
}

export const useUserPostPage = (): UseUserPostPageData => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { setMessage } = useErrorsContext();
  const { fetchPostByIdAsync } = usePostService();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();

  const handlePostNotfound = () => {
    navigate('/');
    setMessage(t('api.err.validation.post.notFound'));
  };

  useEffect(() => {
    if (params.id) {
      fetchPostByIdAsync(params.id).then((data) => {
        if (!data) {
          handlePostNotfound();
          return;
        }

        setPost(data);
      });
      return;
    }

    handlePostNotfound();
  }, []);

  return {
    isLoading,
    post,
  };
};
