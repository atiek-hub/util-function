import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shadcn-components/ui/form';
import { Input } from '@/shadcn-components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/shadcn-components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const userSchema = z.object({
    userEmail: z.string(),
    userPassword: z.string()
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { userEmail, userPassword } = form.getValues()
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
      })
      if (error) throw new Error(error.message)
      navigate('/');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
        </div>
        <Form {...form}>
          <form onSubmit={handleSignin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit' className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
