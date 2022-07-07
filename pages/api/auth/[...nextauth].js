import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../util/connectDB'

export default NextAuth({    
    providers: [        
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),          
        GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),  
    ],    
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user }) {       
            if (!user.posts) {
                user.isAdmin = false;
                user.banned = false;
                user.posts = {
                    jobs: [],
                    housings: [],
                    forsales: [],
                    communities: [],
                    qnas: [],
                }    
            }                                
            return user;
        },
        async session(session, user) {            
            if (!session.session.user?.uid) {
                session.session.user.uid = session.user.id
            }            
            return session
        },        
    }
})