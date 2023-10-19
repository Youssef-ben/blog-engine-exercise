import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Category } from '../../../../../models/category';
import { Post } from '../../../../../models/post';
import { ApiResponse, Pagination } from '../../../../../models/response';
import { PostItemProps, PostsListProps } from '../../../../../views/post';
import { PostCategoryOption, PostModalProps } from '../../../../../views/post/postModal';
import { UpdateNotifier } from '../../../../utils/UpdateNotifier';
import { API_URL, formatDate } from '../../../../utils/constants';
import { getErrorMessage } from '../../../../utils/responseHelpers';

type PostForm = Post & {
  apiError?: string;
};

const INITIAL_VALUES: PostForm = {
  title: '',
  content: '',
  categoryId: '',
  publicationDate: new Date(),
  apiError: '',
};

export interface EditPostContainerDate {
  postsListProps: PostsListProps;
  postModalProps: PostModalProps;
}

export const useEditPostContainer = (): EditPostContainerDate => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostItemProps>();
  const [posts, setPosts] = useState<Pagination<Post>>();
  const [postCategories, setPostCategories] = useState<PostCategoryOption[]>([]);

  const handlePrimaryButtonClick = async () => {
    setIsLoading(true);

    if (!(await editPostAsync())) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsModalOpen(false);
    resetForm();
  };

  const { values, errors, handleSubmit, handleChange, setErrors, resetForm } = useFormik<PostForm>({
    initialValues: INITIAL_VALUES,
    validationSchema: Yup.object().shape({
      title: Yup.string().trim().required(t('post.form.error.titleRequired')),
      content: Yup.string().trim().required(t('post.form.error.contentRequired')),
      categoryId: Yup.string().trim().required(t('post.form.error.contentRequired')),
      publicationDate: Yup.string().trim().required(t('post.form.error.publicationDateRequired')),
    }),
    onSubmit: handlePrimaryButtonClick,
  });

  const editPostAsync = async () => {
    try {
      await axios<Post, ApiResponse<Post>>({
        method: 'PUT',
        url: `${API_URL}/posts/admin`,
        data: {
          ...values,
          publicationDate: formatDate(values.publicationDate),
        },
      });

      UpdateNotifier.notify('posts');
      return true;
    } catch (err: any) {
      setErrors({ apiError: getErrorMessage(err) });
      return false;
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Post>>>({
        method: 'GET',
        url: `${API_URL}/posts`,
      });

      if (data) {
        console.log();
        setPosts(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories?recordsPerPage=100`,
      });

      if (data) {
        const postCategoriesOption = data.results.records.map((category) => {
          return {
            value: category.id,
            label: category.title,
          };
        });

        setPostCategories(postCategoriesOption);
      }
    } catch (error: any) {
      return [];
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchPosts();
      await fetchCategories();
    };

    fetchDataAsync();

    /**
     * This normally should a websocket connection with the web api
     * But for the purpose of this exercise we add little pub/sub event
     */
    UpdateNotifier.subscribe('category', () => {
      fetchDataAsync();
    });
    UpdateNotifier.subscribe('posts', () => {
      fetchDataAsync();
    });
  }, []);

  const onEditPostClick = (id: string) => {
    const post = posts?.records.find((c) => c.id === id);
    if (post) {
      const { id, title, publicationDate } = post;
      setCurrentPost({
        id: id || '',
        title,
        publicationDate: formatDate(publicationDate),
      });
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getPosts = (): PostItemProps[] => {
    if (!posts || posts.totalRecords === 0) {
      return [];
    }

    return posts?.records.map(({ id, title, publicationDate }) => {
      return {
        id: id || '',
        title,
        publicationDate: formatDate(publicationDate),
      };
    });
  };

  const getSelectedCategory = () => {
    return postCategories.find((category) => category.value === values.categoryId);
  };

  return {
    postsListProps: {
      posts: getPosts(),
      onEditClick: onEditPostClick,
    },
    postModalProps: {
      handleChange,
      title: values.title,
      content: values.content,
      publicationDate: values.publicationDate,
      categoriesOptions: {
        categories: postCategories,
        selected: getSelectedCategory(),
      },
      error: {
        messages: [errors.title as string, errors.content as string, errors.categoryId as string].filter((m) => m),
      },
      isOpen: isModalOpen,
      isLoading: isLoading,
      modalTitle: t('post.form.edit'),
      primaryButtonLabel: t('common.edit'),
      onPrimaryButtonClick: handlePrimaryButtonClick,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
