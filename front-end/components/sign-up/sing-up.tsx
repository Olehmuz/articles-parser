'use client'

import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserRoles } from "@/lib/roles.enum"


const SignInSchema = z.object({
  email: z.string().email('Email must be valid.').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}).required();

export default function SignUpPage() {
  const router = useRouter();

  const session = useSession()
  if(session.data?.user.accessToken) {
    router.push('/admin')
  }

  const searchParams = useSearchParams()
  const error = searchParams.get('error');

  const resolver = zodResolver(SignInSchema);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: { email: string, password: string}) => {
    try{
      await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/auth/register`, {
        email: data.email,
        password: data.password,
        role: UserRoles.ADMIN
      })  

      await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: searchParams.get('callbackUrl') ?? "http://localhost:3000"
      });
    } catch(e) {
       router.push('/signup?error=true')
       return
    } 
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Enter your email and password to register an account</CardDescription>
      </CardHeader>
      <CardContent>
        {!!error && (
          <p className="bg-red-100 text-red-600 text-center p-2">
            Register Failed.
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
              Sign Up
            </Button>
          </form>
        </Form>
        <CardDescription className="mt-3 text-center">Already have an account? <Link className="underline cursor-pointer" href='/signin'>Sign in</Link></CardDescription>
      </CardContent>
    </Card>
  )
}

