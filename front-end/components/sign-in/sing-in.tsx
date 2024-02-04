'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


const SignInSchema = z.object({
  email: z.string().email('Email must be valid.').min(1, 'Email is required'),
  password: z.string().min(8, 'Password is required'),
}).required();

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const error = searchParams.get('error');

  const session = useSession()
  if(session.data?.user.accessToken) {
    router.push('/admin')
  }


  const resolver = zodResolver(SignInSchema);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: { email: string, password: string}) => {
    await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: searchParams.get('callbackUrl') ?? "http://localhost:3000"
    });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        {!!error && (
          <p className="bg-red-100 text-red-600 text-center p-2">
            Authentication Failed.
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="Insert email" {...field} />
                  </FormControl>
                  <div className='h-[20px]'>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="!mt-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Insert password" {...field} />
                  </FormControl>
                  <div className='h-[20px]'>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full !mt-1" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <CardDescription className="mt-3 text-center">Don&#39;t have an account? <Link className="underline cursor-pointer" href='/signup'>Sign up</Link></CardDescription>
      </CardContent>
    </Card>



  )
}

