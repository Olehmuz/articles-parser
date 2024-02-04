'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createArticle } from "@/services/articles.service"
import { CreateArticle } from "@/models/article.model"

const CreateArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  link: z.string().min(1, 'Link is required'),
  author: z.string().min(1, 'Author is required'),
}).required();


export function ArticleCreateForm() {
  const router = useRouter();

  const queryClient = useQueryClient()

  const articleCreateMutation = useMutation({
    mutationKey: ['articles'],
    mutationFn: (article: CreateArticle) => createArticle(article),
    onError: (err, variables, rollback) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onSuccess: () => {
      router.push('/admin')
    }
  })

  const articleCreateFn = (data: CreateArticle) => {
    return articleCreateMutation.mutate(data)
  }

  const resolver = zodResolver(CreateArticleSchema);
  const form = useForm<CreateArticle>({
    resolver,
    defaultValues: {
      title: '',
      content: '',
      link: '',
      author: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(articleCreateFn)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title" {...field} />
              </FormControl>
              <div className='h-[20px]'>
                  <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Article content" {...field} />
              </FormControl>
              <div className='h-[20px]'>
                  <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Article link" {...field} />
              </FormControl>
              <div className='h-[20px]'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Article author" {...field} />
              </FormControl>
              <div className='h-[20px]'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
