'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
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
import { updateArticle } from "@/services/articles.service"
import { Article, UpdateArticle } from "@/models/article.model"

const UpdateArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  link: z.string().min(1, 'Link is required'),
  author: z.string().min(1, 'Author is required'),
}).required();

export type UpdateArticleForm = z.infer<typeof UpdateArticleSchema>;



export function ArticleUpdateForm({article}: {article: Article}) {
  const router = useRouter();

  const queryClient = useQueryClient()

  const articleUpdateMutation = useMutation({
    mutationKey: ['articles'],
    mutationFn: (updatedArticle: UpdateArticle) => updateArticle(article.id, updatedArticle),
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onSuccess: () => {
      router.push('/admin')
    }
  })

  const articleUpdateFn = (data: UpdateArticle) => {
    return articleUpdateMutation.mutate(data)
  }
  const resolver = zodResolver(UpdateArticleSchema);
  
  const form = useForm<UpdateArticleForm>({
    resolver,
    defaultValues: {
      title: article.title,
      content: article.content,
      link: article.link,
      author: article.author
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(articleUpdateFn)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
