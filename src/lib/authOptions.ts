import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOption } from "next-auth";
import { SignInSchema, SignInSchemaType } from "./validators/auth.validators";
import { ErrorHandler } from "./error";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const result = SignInSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            "Input Validation failed",
            "VALIDATION_ERROR",
            {
              fieldErros: result.error?.flatten().fieldErrors,
            }
          );
        }
        // const {email ,password} = result.data;

        return {
          id:user.id,
          name: user.name
          
        }

      },
    }),
  ],
};
